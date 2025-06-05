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
    socialLinks: [{ icon: "gitee", link: "https://gitee.com/zimo493" }],
  },
});
