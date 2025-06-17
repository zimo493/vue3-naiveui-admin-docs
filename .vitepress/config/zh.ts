import { type DefaultTheme, defineConfig } from "vitepress";

/**
 * 导航栏
 */
const nav = (): DefaultTheme.NavItem[] => [
  { text: "💡指南", link: "/guide/introduction", activeMatch: "/guide/" },
  { text: "⚙️开发配置", link: "/dev/editor", activeMatch: "/dev/" },
  {
    text: "🔗相关连接",
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
 * 指南侧边栏
 */
const sidebarGuide = (): DefaultTheme.SidebarItem[] => [
  {
    text: "指南",
    collapsed: false, // 默认展开
    items: [
      { text: "介绍", link: "introduction" },
      { text: "快速开始", link: "start" },
      { text: "目录结构", link: "directory-structure" },
    ],
  },
  {
    text: "项目配置",
    collapsed: false, // 默认展开
    items: [
      { text: "基本设置", link: "basic-settings" },
      { text: "请求服务配置", link: "request-service" },
      { text: "路由与菜单", link: "ruotes" },
      { text: "自定义主题", link: "theme" },
    ],
  },
  {
    text: "组件封装",
    collapsed: false,
    items: [
      { text: "FormPro (表单)", link: "form-pro" },
      { text: "SearchTable (搜索表格)", link: "search-table" },
      { text: "DrawerForm (抽屉表单)", link: "drawer-form" },
      { text: "DialogForm (模态框表单)", link: "dialog-form" },
      { text: "UploadFile (文件上传)", link: "upload-file" },
      { text: "DictTag (字典标签)", link: "dict-tag" },
    ],
  },
];

/**
 * 开发配置侧边栏
 */
const sidebarDev = (): DefaultTheme.SidebarItem[] => [
  {
    text: "开发配置",
    collapsed: false, // 默认展开
    items: [{ text: "代码编辑器", link: "editor" }],
  },
  {
    text: "开发环境",
    collapsed: false, // 默认展开
    items: [
      { text: "Git", link: "git" },
      { text: "NodeJS", link: "nodejs" },
    ],
  },
];

export const zh = defineConfig({
  lang: "zh-CN",
  description: "一个免费的中后台框架",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      "/dev/": { base: "/dev/", items: sidebarDev() },
    },

    /** local 搜索配置 */
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "全站内容搜索",
          },
          modal: {
            displayDetails: "查看详情",
            resetButtonTitle: "清空搜索条件",
            backButtonTitle: "返回结果列表",
            noResultsText: "未找到相关内容",
            footer: {
              selectText: "确认选择",
              selectKeyAriaLabel: "按回车键选择",
              navigateText: "结果导航",
              navigateUpKeyAriaLabel: "上方向键",
              navigateDownKeyAriaLabel: "下方向键",
              closeText: "关闭搜索",
              closeKeyAriaLabel: "按ESC键关闭",
            },
          },
        },
      },
    },

    editLink: {
      pattern:
        "https://github.com/zimo493/vue3-naiveui-admin-docs/edit/main/src/:path",
      text: "帮助改进此页",
    },

    footer: {
      message: "基于 MIT 许可发布",
      copyright: `版权所有 © 2025-${new Date().getFullYear()}`,
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: [2, 6], // 显示 h2 到 h6
      label: "页面导航",
    },

    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    notFound: {
      title: "资源不存在",
      quote: "抱歉！有些链接，就像错过的公交，下一班会更好。",
      linkText: "返回首页",
    },

    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
});
