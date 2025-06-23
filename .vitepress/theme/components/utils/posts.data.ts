import { createContentLoader } from "vitepress";
import { sep, normalize } from "path";
import { getGitTimestamp } from "./fileTime";

export interface Post {
  title: string; // 标题
  url: string; // url
  date: [number, number]; // 日期：创建日期，更新日期
  dateText: [string, string]; // 日期文本
  description: string; // 摘要
  category?: string | undefined; // 分类
  tags?: string[] | undefined; // 标签
  readingTime: number; // 添加阅读时间字段（分钟）
}

declare const data: Post[];
export { data };

export default createContentLoader(
  [
    "components/**/*.md", // 匹配组件文档
    "guide/**/*.md", // 匹配指南文档
    "faq/**/*.md", // 匹配常见问题
    "dev/**/*.md", // 匹配开发配置
    "en/**/!(index).md", // 匹配英文文档
  ],
  {
    includeSrc: true, // 需要原始内容来计算阅读时间
    excerpt: false,
    async transform(data) {
      const promises: Promise<Post>[] = [];
      const posts: Post[] = [];
      const dateOption = formatDate();

      data.forEach(({ frontmatter, url, src }) => {
        const {
          title,
          tags: _tags,
          category,
          description,
          firstCommit,
          lastUpdated,
        } = frontmatter;

        const createdDate = firstCommit ? +new Date(firstCommit) : undefined;
        const updatedDate = lastUpdated ? +new Date(lastUpdated) : undefined;

        // 处理 URL：去掉开头的斜杠和 .html 后缀
        const link = normalize(url)
          .split(sep)
          .filter((item) => item)
          .join(sep)
          .replace(/^\//, "") // 移除开头的斜杠
          .replace(/\.html$/, ""); // 移除 .html 后缀

        // 计算阅读时间（单位：分钟）
        const readingTime = calculateReadingTime(src);

        if (createdDate && updatedDate) {
          posts.push({
            title,
            url: link,
            date: [createdDate, updatedDate],
            dateText: [
              dateOption.format(createdDate),
              dateOption.format(updatedDate),
            ],
            description,
            category,
            tags: _tags,
            readingTime, // 添加阅读时间
          });
        } else {
          // 构建文件系统路径 (基于 src 目录)
          const filePath = `src/${link}.md`;

          const task: Promise<Post> = getGitTimestamp(
            filePath,
            createdDate,
            updatedDate
          ).then((date) => ({
            title,
            url: link,
            date: [date[0], date[1]] as [number, number],
            dateText: [dateOption.format(date[0]), dateOption.format(date[1])],
            description,
            category,
            tags: _tags,
            readingTime, // 添加阅读时间
          }));
          promises.push(task);
        }
      });

      const resolvedPosts = await Promise.all(promises);
      const formattedPosts = posts.concat(resolvedPosts);

      // 按发布时间降序排列
      return formattedPosts.sort((a, b) => b.date[0] - a.date[0]);
    },
  }
);

// 计算阅读时间（单位：分钟）
function calculateReadingTime(content?: string): number {
  if (!content) return 0;
  // 移除Markdown语法和HTML标签
  const text = content
    .replace(/<[^>]+>/g, "") // 移除HTML标签
    .replace(/[#*\-_=`~|\[\](){}<>!\\]/g, "") // 移除Markdown特殊字符
    .replace(/\n\s*\n/g, "\n") // 压缩多个空行
    .replace(/^---\s*[\s\S]*?---\s*/, ""); // 移除Frontmatter

  // 计算中文字数和英文单词数
  const chineseCharCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWordCount = (
    text.replace(/[\u4e00-\u9fa5]/g, "").match(/\b\w+\b/g) || []
  ).length;

  // 计算总字数（中文按字计数，英文按单词计数）
  const totalWords = chineseCharCount + englishWordCount;

  // 计算阅读时间（中文按400字/分钟，英文按200词/分钟）
  const chineseTime = chineseCharCount / 400;
  const englishTime = englishWordCount / 200;

  // 总阅读时间（向上取整，至少1分钟）
  return Math.max(1, Math.ceil(chineseTime + englishTime));
}

export const formatDate = (hasTime?: boolean) => {
  let formatOption = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  return new Intl.DateTimeFormat(
    "zh",
    formatOption as Intl.DateTimeFormatOptions
  );
};
