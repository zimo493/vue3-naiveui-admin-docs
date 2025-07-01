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
        text: "Component Encapsulation",
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
      { text: "FormPro (Form)", link: "form-pro" },
      { text: "SearchTable (Search Table)", link: "search-table" },
      { text: "DrawerForm (Drawer Form)", link: "drawer-form" },
      { text: "DialogForm (Modal Form)", link: "dialog-form" },
      { text: "UploadFile (File Upload)", link: "upload-file" },
      { text: "DictTag (Dictionary Tag)", link: "dict-tag" },
      { text: "Crontab (Cron Expression)", link: "cron" },
    ],
  },
  {
    text: "Global Directives",
    collapsed: false,
    items: [
      { text: "Copy (Copy)", link: "copy" },
      { text: "Permission (Permission)", link: "permission" },
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
        items: [{ text: "White Screen", link: "white-screen" }],
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
      pattern: `${gitLogConfig.repoURL}/edit/main/src/en/:path`,
      text: "Help improve this page",
    },

    footer: {
      message: "Released under the MIT License",
      copyright: `Copyright © 2025-${new Date().getFullYear()}`,
    },

    docFooter: {
      prev: "Previous",
      next: "Next",
    },

    outline: {
      level: [2, 6], // Display h2 to h6
      label: "Page Navigation",
    },

    lastUpdated: {
      text: "Last updated on",
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
      title: "Resource not found",
      quote:
        "Sorry! Some links are like missed buses, the next one will be better.",
      linkText: "Return to homepage",
    },

    langMenuLabel: "Language",
    returnToTopLabel: "Back to top",
    sidebarMenuLabel: "Menu",
    darkModeSwitchLabel: "Theme",
    lightModeSwitchTitle: "Switch to light mode",
    darkModeSwitchTitle: "Switch to dark mode",
  },
});
