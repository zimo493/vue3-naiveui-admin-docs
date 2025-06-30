import { createContentLoader } from "vitepress";
import { sep, normalize } from "path";
import { getGitTimestamp } from "./fileTime";
import { postsUrl } from "../../../../config";

export interface Post {
  title: string; // 标题
  url: string; // url
  date: [number, number]; // 日期：创建日期，更新日期
  dateText: [string, string]; // 日期文本
  abstract: string; // 摘要
  category?: string | undefined; // 分类
  tags?: string[] | undefined; // 标签
  readingTime: number; // 阅读时间（分钟）
  wordCount: number; // 添加字数统计字段
}

export interface PostListVO {
  title: string;
  posts: Post[];
}

// 创建文章对象参数
interface PostOption {
  title: string;
  url: string;
  createdDate: number;
  updatedDate: number;
  abstract: string;
  wordCount: number;
  readingTime: number;
  category?: string;
  tags?: string[];
}

declare const data: Post[];
export { data };

// 预编译正则表达式
const MARKDOWN_CLEAN_REGEX = /<[^>]+>|[#*\-_=`~|\[\](){}<>!\\]/g;
const CHINESE_CHAR_REGEX = /[\u4e00-\u9fa5]/g;
const ENGLISH_WORD_REGEX = /\b\w+\b/g;

// 缓存日期格式化器
const DATE_FORMATTER = new Intl.DateTimeFormat("zh", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * 规范化URL路径
 * - 移除开头斜杠和.html后缀
 * - 统一路径分隔符
 */
const normalizeUrl = (url: string): string => {
  return normalize(url)
    .split(sep)
    .filter(Boolean)
    .join(sep)
    .replace(/^\//, "")
    .replace(/\.html$/, "");
};

/**
 * 创建文章对象工厂函数
 */
const createPost = (options: PostOption): Post => ({
  ...options,
  date: [options.createdDate, options.updatedDate],
  dateText: [
    DATE_FORMATTER.format(options.createdDate).replaceAll("/", "-"),
    DATE_FORMATTER.format(options.updatedDate).replaceAll("/", "-"),
  ],
});

/**
 * 计算字数和阅读时间
 */
const calculateWordStats = (
  content = ""
): {
  wordCount: number;
  readingTime: number;
} => {
  // 清理内容：移除Frontmatter、HTML标签、Markdown符号
  const cleaned = content
    .replace(/^---\s*[\s\S]*?---\s*/, "")
    .replace(MARKDOWN_CLEAN_REGEX, "")
    .replace(/\n\s*\n/g, "\n")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return { wordCount: 0, readingTime: 0 };

  // 统计中文字数
  const chineseChars = (cleaned.match(CHINESE_CHAR_REGEX) || []).length;

  // 统计英文单词数（排除中文字符后）
  const englishText = cleaned.replace(CHINESE_CHAR_REGEX, "");
  const englishWords = englishText.match(ENGLISH_WORD_REGEX) || [];

  // 计算总字数（中文按字计数，英文按词计数）
  const totalWords = chineseChars + englishWords.length;

  // 计算阅读时间（中文400字/分钟 + 英文200词/分钟）
  const readingMinutes = Math.ceil(
    chineseChars / 400 + englishWords.length / 200
  );

  return {
    wordCount: totalWords,
    readingTime: Math.max(1, readingMinutes),
  };
};

export default createContentLoader(postsUrl, {
  includeSrc: true, // 需要原始内容来计算阅读时间和字数
  excerpt: false,
  async transform(rawData) {
    // 并行处理所有文章
    const postPromises = rawData.map(async ({ frontmatter, url, src }) => {
      const {
        title,
        tags,
        category,
        description: abstract = "",
        firstCommit,
        lastUpdated,
      } = frontmatter;

      // 公共参数
      const baseParams = {
        title,
        url: normalizeUrl(url),
        abstract,
        ...calculateWordStats(src), // 计算字数和阅读时间
        category,
        tags,
      };

      // 预处理基础数据
      const normalizedUrl = normalizeUrl(url);

      try {
        // 尝试使用Frontmatter中的日期
        if (firstCommit && lastUpdated) {
          return createPost({
            ...baseParams,
            createdDate: +new Date(firstCommit),
            updatedDate: +new Date(lastUpdated),
          });
        }

        // 异步获取Git时间戳
        const filePath = `src/${normalizedUrl}.md`;
        const [created, updated] = await getGitTimestamp(
          filePath,
          firstCommit ? +new Date(firstCommit) : undefined,
          lastUpdated ? +new Date(lastUpdated) : undefined
        );

        return createPost({
          ...baseParams,
          createdDate: created,
          updatedDate: updated,
        });
      } catch (error) {
        // 错误处理：使用当前日期作为默认值
        console.error(`Error processing ${url}:`, error);
        const now = Date.now();
        // 错误时使用当前时间
        return createPost({
          ...baseParams,
          createdDate: now,
          updatedDate: now,
        });
      }
    });

    // 等待所有文章处理完成
    const posts = await Promise.all(postPromises);

    // 按创建日期降序排序
    return posts.sort((a, b) => b.date[0] - a.date[0]);
  },
});
