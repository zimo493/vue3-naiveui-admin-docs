import { data } from "./utils/posts.data";
import { useData } from "vitepress";

import { NEl, NFlex, NH1, NTag, NText } from "naive-ui";
import { h } from "vue";

type SupportedLang = "zh-CN" | "en-US" | "ja-JP";

const language: Record<
  SupportedLang,
  { published: string; updated: string; read: string; minute: string }
> = {
  "zh-CN": {
    published: "发布于",
    updated: "更新于",
    read: "阅读",
    minute: "分钟",
  },
  "en-US": {
    published: "Published",
    updated: "Updated",
    read: "Read",
    minute: "min",
  },
  "ja-JP": {
    published: "投稿日",
    updated: "更新日",
    read: "読了",
    minute: "分",
  },
};

export default {
  name: "Layout",
  render: () => {
    const postMateList = data.map((item) => {
      return {
        ...item,
        url: item.url.replaceAll("\\", "/"),
      };
    });

    const { page, lang } = useData();

    const { published, updated, read, minute } =
      language[lang.value as SupportedLang];

    return h(NFlex, {}, () =>
      postMateList.map((item) => {
        if (item.url + ".md" === page.value.filePath) {
          return h(NEl, {}, () => [
            h(NH1, { class: "post-title" }, () => item.title),
            h(NFlex, { class: "post-meta" }, () => [
              h(NText, {}, () => `📆 ${published} ${item.dateText[0]}`),
              h(NText, {}, () => `🕙 ${updated} ${item.dateText[1]}`),
              h(NText, {}, () => `📖 ${read} ${item.readingTime} ${minute}`),
              item.category && h(NText, {}, () => `🏷️ ${item.category}`),
            ]),
            item.tags &&
              h(NFlex, { class: "post-tags" }, () => [
                item.tags?.map((tag) =>
                  h(
                    NTag,
                    { type: "info", bordered: false, size: "small" },
                    () => tag
                  )
                ),
              ]),
            item.description &&
              h(
                NEl,
                { class: "post-description" },
                () => `${item.description}`
              ),
          ]);
        }
      })
    );
  },
};
