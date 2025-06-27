import { computed } from "vue";

type SupportedLang = "zh-CN" | "en-US";

const language: Record<
  SupportedLang,
  {
    published: string;
    updated: string;
    words: string;
    read: string;
    minute: string;
    article: string;
    piece: string;
    tags: string;
  }
> = {
  "zh-CN": {
    published: "发布于",
    updated: "更新于",
    words: "字数",
    read: "阅读",
    minute: "分钟",
    article: "全部文章",
    piece: "篇",
    tags: "标签列表",
  },
  "en-US": {
    published: "Published",
    updated: "Updated",
    words: "Words",
    read: "Read",
    article: "All articles",
    minute: "Min",
    piece: "Pieces",
    tags: "Label list",
  },
};

export default (lang: string) => {
  // 获取语言文本
  const langText = computed(
    () => language[lang as SupportedLang] || language["zh-CN"]
  );
  return langText.value;
};
