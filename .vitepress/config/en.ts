import { defineConfig, type DefaultTheme } from "vitepress";
import { gitLogConfig } from "../../config";

/**
 * Navigation Bar
 */
const nav = (): DefaultTheme.NavItem[] => [
  {
    text: "💡Guide",
    activeMatch: "^/en/(guide|components)/",
    items: [
      {
        text: "Basic Usage",
        link: "/en/guide/introduction",
        activeMatch: "^/en/guide/",
      },
      {
        text: "Components",
        link: "/en/components/form-pro",
        activeMatch: "^/en/components/",
      },
    ],
  },
  {
    text: "⚙️Development Setup",
    link: "/en/dev/editor",
    activeMatch: "/en/dev/",
  },
  { text: "❓FAQ", link: "/en/faq/white-screen", activeMatch: "/en/faq/" },
  {
    text: "🔗Related Links",
    items: [
      {
        items: [
          { text: "Archive Page", link: "/en/post/archive" },
          { text: "Tags Page", link: "/en/post/tags" },
        ],
      },
      {
        items: [
          { text: "Vue3", link: "https://cn.vuejs.org/" },
          { text: "NaiveUI", link: "https://www.naiveui.com/zh-CN/os-theme" },
          { text: "Pinia", link: "https://pinia.vuejs.org/zh/" },
          { text: "Vite", link: "https://cn.vitejs.dev/" },
          { text: "TypeScript", link: "https://www.typescriptlang.org/" },
          { text: "UnoCSS", link: "https://unocss.dev/" },
        ],
      },
    ],
  },
];

/**
 * Guide Sidebar
 */
const sidebarGuide = (): DefaultTheme.SidebarItem[] => [
  {
    text: "Guide",
    collapsed: false, // Default expanded
    items: [
      { text: "Introduction", link: "introduction" },
      { text: "Quick Start", link: "start" },
      { text: "Directory Structure", link: "directory-structure" },
    ],
  },
  {
    text: "Project Configuration",
    collapsed: false, // Default expanded
    items: [
      { text: "Basic Settings", link: "basic-settings" },
      { text: "Request Service Configuration", link: "request-service" },
      { text: "Routes and Menus", link: "routes" },
      { text: "Custom Theme", link: "theme" },
    ],
  },
  {
    text: "Extended Usage",
    collapsed: false,
    items: [
      { text: "Using Icons", link: "use-icons" },
      { text: "Internationalization (i18n)", link: "i18n" },
      { text: "Project Deployment", link: "deploy" },
    ],
  },
];

/**
 * Component Encapsulation Sidebar
 */
const sidebarComponent = (): DefaultTheme.SidebarItem[] => [
  {
    text: "Component Encapsulation",
    collapsed: false,
    items: [
      { text: "FormPro", link: "form-pro" },
      { text: "TablePro", link: "table-pro" },
      { text: "DrawerForm", link: "drawer-form" },
      { text: "ModalForm", link: "modal-form" },
      { text: "UploadFile", link: "upload-file" },
      { text: "DictTag", link: "dict-tag" },
      { text: "CronExpression", link: "cron-expression" },
    ],
  },
  {
    text: "Global Directives",
    collapsed: false,
    items: [
      { text: "Copy", link: "copy" },
      { text: "Permission", link: "permission" },
    ],
  },
  {
    text: "Utility Methods",
    collapsed: false,
    items: [
      { text: "spin.ts", link: "spin" },
      { text: "storage.ts", link: "storage" },
    ],
  },
];

/**
 * Development Configuration Sidebar
 */
const sidebarDev = (): DefaultTheme.SidebarItem[] => [
  {
    items: [
      {
        text: "Development Setup",
        items: [{ text: "Code Editor", link: "editor" }],
      },
      {
        text: "Development Environment",
        items: [
          { text: "Git", link: "git" },
          { text: "NodeJS", link: "nodejs" },
        ],
      },
    ],
  },
];

/**
 * FAQ Sidebar
 */
const sidebarFAQ = (): DefaultTheme.SidebarItem[] => [
  {
    items: [
      {
        text: "Frequently Asked Questions",
        items: [
          { text: "White Screen", link: "white-screen" },
          { text: "KeepAlive Cache", link: "keep-alive" },
          { text: "Other FAQ", link: "other-faq" },
        ],
      },
    ],
  },
];

export const en = defineConfig({
  lang: "en-US",
  description: "A free middle and back-end framework",

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/en/guide/": { base: "/en/guide/", items: sidebarGuide() },
      "/en/components/": { base: "/en/components/", items: sidebarComponent() },
      "/en/dev/": { base: "/en/dev/", items: sidebarDev() },
      "/en/faq/": { base: "/en/faq/", items: sidebarFAQ() },
    },

    /** Local search configuration */
    search: {
      provider: "local",
    },

    editLink: {
      pattern: `${gitLogConfig.repoURL}/edit/main/src/:path`,
      text: "Help improve this page",
    },

    footer: {
      message: "Released under the MIT License",
      copyright: `Copyright © 2025-${new Date().getFullYear()}`,
    },

    outline: {
      level: [2, 6], // Display h2 to h6
      label: "Page Navigation",
    },

    notFound: {
      title: "Resource not found",
      quote:
        "Sorry! Some links are like missed buses, the next one will be better.",
      linkText: "Return to homepage",
    },
  },
});
