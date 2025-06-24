import { data } from "./utils/posts.data";
import { useData } from "vitepress";
import { NEl, NFlex, NH1, NTag, NText } from "naive-ui";
import { h, computed } from "vue";

type SupportedLang = "zh-CN" | "en-US" | "ja-JP";

const language: Record<
  SupportedLang,
  {
    published: string;
    updated: string;
    words: string;
    read: string;
    minute: string;
  }
> = {
  "zh-CN": {
    published: "发布于",
    updated: "更新于",
    words: "字数",
    read: "阅读",
    minute: "分钟",
  },
  "en-US": {
    published: "Published",
    updated: "Updated",
    words: "Words",
    read: "Read",
    minute: "min",
  },
  "ja-JP": {
    published: "投稿日",
    updated: "更新日",
    words: "文字数",
    read: "読了",
    minute: "分",
  },
};

export default {
  name: "Layout",
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

    // 获取语言文本
    const langText = computed(
      () => language[lang.value as SupportedLang] || language["zh-CN"]
    );

    // 如果没有匹配的文章，返回空内容
    if (!currentPost.value) return null;

    const post = currentPost.value;
    const { published, updated, words, read, minute } = langText.value;

    // 创建标签组件
    const renderTags = () => {
      if (!post.tags || post.tags.length === 0) return null;

      return h(NFlex, { class: "post-tags", align: "center" }, () =>
        post.tags?.map((tag) =>
          h(
            NTag,
            {
              type: "info",
              bordered: false,
              size: "small",
              class: "post-tag",
            },
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
        {
          class: "post-meta",
          align: "center",
          wrap: true,
        },
        () => metaItems
      );
    };

    // 创建摘要组件
    const renderAbstract = () => {
      if (!post.abstract) return null;

      return h(
        NEl,
        {
          class: "post-description",
          tag: "blockquote",
        },
        () => post.abstract
      );
    };

    return h(NFlex, { vertical: true }, () => [
      h(NH1, { class: "post-title" }, post.title),
      renderMeta(),
      renderTags(),
      renderAbstract(),
    ]);
  },
};
