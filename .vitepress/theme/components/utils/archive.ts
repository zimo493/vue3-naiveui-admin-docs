import { Post } from "./posts.data";

// 定义年份和标签的类型
export type Year = Record<string, Post[]>;
export type Tag = Record<string, Post[]>;

// 按年份显示文章
export const postsYearData = (posts: Post[]) => {
  const years: Year = {};
  posts.forEach((item) => {
    const year = new Date(item.date[0]).getFullYear();
    if (!years[year]) {
      years[year] = [];
    }
    years[year].push(item);
  });

  return years;
};

// 按标签显示文章
export const postsTagData = (posts: Post[]) => {
  let tags: Tag = {};
  // 固定文章从最早发布日期开始，以便标签数组能稳定显示（不会因为新发布文章而导致顺序变化）
  const fixPosts = [...posts].sort((a, b) => a.date[0] - b.date[0]);
  let tagNames: string[] = [];
  fixPosts.forEach((item) => {
    item.tags?.forEach((tag) => {
      if (tagNames.indexOf(tag) === -1) {
        tagNames.push(tag);
        tags[tag] = [];
      }
      tags[tag].push(item);
    });
  });

  // 排序
  for (const key in tags) {
    tags[key].sort((a: Post, b: Post) => b.date[0] - a.date[0]);
  }

  return tags;
};
