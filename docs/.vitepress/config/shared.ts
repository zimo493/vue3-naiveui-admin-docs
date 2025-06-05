import { defineConfig } from "vitepress";

export const shared = defineConfig({
  title: "Vue3 Naive Admin",
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
    socialLinks: [{ icon: "gitee", link: "https://gitee.com/zimo493" }],
  },
});
