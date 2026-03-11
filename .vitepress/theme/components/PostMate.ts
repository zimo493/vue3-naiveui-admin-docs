import { h, computed } from "vue";
import { useData } from "vitepress";

import { data } from "./utils/posts.data";
import langText from "./utils/language";

import { NEl, NFlex, NH1, NTag, NText } from "naive-ui";

export default {
  name: "PostMate",
  render: () => {
    const { page, lang } = useData();

    // 计算当前页面的文章数据
    const currentPost = computed(() => {
      const normalizedFilePath = page.value.filePath;

      return data.find((item) => {
        const normalizedUrl = item.url.replaceAll("\\", "/");
        // 检查两种可能的匹配格式
        return (
          normalizedFilePath === `${normalizedUrl}.md` ||
          normalizedFilePath === normalizedUrl
        );
      });
    });

    // 如果没有匹配的文章，返回空内容
    if (!currentPost.value) return null;

    const post = currentPost.value;
    const { published, updated, words, read, minute } = langText(lang.value);

    // 创建标签组件
    const renderTags = () => {
      if (!post.tags || post.tags.length === 0) return null;

      return h(NFlex, { class: "post-tags", align: "center" }, () =>
        post.tags?.map((tag) =>
          h(
            NTag,
            { type: "info", bordered: false, size: "small", key: tag },
            () => tag
          )
        )
      );
    };

    // 创建元信息组件
    const renderMeta = () => {
      // 获取文章字数
      const wordCount = Math.max(post.wordCount / 1000, 0.1).toFixed(1);
      const metaItems = [
        h(NText, { depth: 3 }, () => `📅 ${published} ${post.dateText[0]}`),
        h(NText, { depth: 3 }, () => `📆 ${updated} ${post.dateText[1]}`),
        h(NText, { depth: 3 }, () => `✍️ ${words} ${wordCount}K`),
        h(
          NText,
          { depth: 3 },
          () => `💻 ${read} ${post.readingTime} ${minute}`
        ),
        post.category && h(NText, { depth: 3 }, () => `🏷️ ${post.category}`),
      ].filter(Boolean); // 过滤掉空项

      return h(
        NFlex,
        { class: "post-meta", align: "center", size: [12, 4] },
        () => metaItems
      );
    };

    // 创建摘要组件
    const renderAbstract = () => {
      if (!post.abstract) return null;

      return h(
        NEl,
        { class: "post-description", tag: "blockquote" },
        () => post.abstract
      );
    };

    return h(NFlex, { vertical: true }, () => [
      h(NH1, { class: "post-title" }, () => post.title),
      renderMeta(),
      renderTags(),
      renderAbstract(),
    ]);
  },
};
