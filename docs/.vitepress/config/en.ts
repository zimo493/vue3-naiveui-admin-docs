import { defineConfig, type DefaultTheme } from "vitepress";

/**
 * 导航栏
 */
const nav = (): DefaultTheme.NavItem[] => [
  { text: "Guide", link: "/en/demo/api-examples", activeMatch: "/en/demo/" },
  {
    text: "Related links",
    items: [
      { text: "Vue3", link: "https://cn.vuejs.org/" },
      { text: "NaiveUI", link: "https://www.naiveui.com/zh-CN/os-theme" },
      { text: "Pinia", link: "https://pinia.vuejs.org/zh/" },
      { text: "Vite", link: "https://cn.vitejs.dev/" },
      { text: "TypeScript", link: "https://www.typescriptlang.org/" },
      { text: "UnoCSS", link: "https://unocss.dev/" },
    ],
  },
];

/**
 * 侧边栏
 */
const sidebarDemo = (): DefaultTheme.SidebarItem[] => [
  {
    text: "Guide",
    items: [
      { text: "api-examples", link: "api-examples" },
      { text: "markdown-examples", link: "markdown-examples" },
    ],
  },
];

export const en = defineConfig({
  lang: "en-US",
  description: "A free middle and back-end framework",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/demo/": { base: "/en/demo/", items: sidebarDemo() },
    },

    editLink: {
      pattern:
        "https://github.com/zimo493/vue3-naiveui-admin-docs/edit/main/docs/src/:path",
      text: "Help improve this page",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright ©`,
    },
  },
});
