import { defineConfig } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";

export const shared = defineConfig({
  title: "Vue3 NaiveUI Admin",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  srcDir: "src",
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }]],

  themeConfig: {
    logo: { src: "/logo.svg", width: 24, height: 24 },
    search: { provider: "local" },
    /** search: {
      provider: "algolia",
      options: {
        appId: "Your APP ID",
        apiKey: "Your API Key",
        indexName: "Your Index Name",

        locales: {
          root: {
            placeholder: "搜索文档",
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索",
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "清除查询",
                  resetButtonAriaLabel: "清除查询",
                  cancelButtonText: "取消",
                  cancelButtonAriaLabel: "取消",
                },
                startScreen: {
                  recentSearchesTitle: "搜索历史",
                  noRecentSearchesText: "无搜索历史",
                  saveRecentSearchButtonTitle: "保存至搜索历史",
                  removeRecentSearchButtonTitle: "从搜索历史移除",
                  favoriteSearchesTitle: "收藏",
                  removeFavoriteSearchButtonTitle: "从收藏移除",
                },
                errorScreen: {
                  titleText: "无法获取结果",
                  helpText: "你可能需要检查网络连接",
                },
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                  searchByText: "搜索提供者",
                },
                noResultsScreen: {
                  noResultsText: "无法找到相关结果",
                  suggestedQueryText: "你可以尝试查询",
                  reportMissingResultsText: "你认为该查询应该有结果？",
                  reportMissingResultsLinkText: "点击反馈",
                },
              },
            },
          },
        },
      },
    }, */
    socialLinks: [
      { icon: "github", link: "https://github.com/zimo493/vue3-naiveui-admin" },
      { icon: "gitee", link: "https://gitee.com/zimo493/vue3-naiveui-admin" },
    ],
  },
  markdown: {
    /** 代码块行号显示 */
    lineNumbers: true,
    /** 图片懒加载 */
    image: {
      lazyLoading: true,
    },
    config(md) {
      /** 原始的 fence 渲染函数 */
      const fence = md.renderer.rules.fence!;
      /** * 自定义代码块复制按钮标题 */
      const copyButtonTitleByLocale: Record<string, string> = {
        en: "Copy Code",
        zh: "复制代码",
      };
      /** 自定义代码块渲染函数，添加复制按钮标题 */
      md.renderer.rules.fence = function (tokens, idx, options, env, self) {
        /** 获取当前语言，默认中文 */
        const localeIndex = env?.localeIndex ?? "zh";
        /** 获取当前语言的复制按钮标题 */
        const copyButtonTitle =
          copyButtonTitleByLocale[localeIndex] ?? copyButtonTitleByLocale.zh;

        /** 调用原始的 fence 渲染函数 */
        const html = fence(tokens, idx, options, env, self);
        /** 如果是复制按钮标题为 Copy Code，则返回原始的 html */
        if (copyButtonTitle === "Copy Code") return html;

        /** 否则，将复制按钮标题替换为自定义的标题 */
        return html.replace(/title="Copy Code"/, `title="${copyButtonTitle}"`);
      };
      md.use(groupIconMdPlugin);
    },
  },
});
