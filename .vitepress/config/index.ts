import { defineConfig } from "vitepress";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";

import { shared } from "./shared";
import { zh } from "./zh";
import { en } from "./en";

const fileAndStyles: Record<string, string> = {};

export default defineConfig({
  ...shared,
  locales: {
    root: { label: "简体中文", ...zh },
    en: { label: "English", ...en },
  },
  vite: {
    ssr: {
      noExternal: ["naive-ui", "date-fns", "vueuc"],
    },
    plugins: [
      groupIconVitePlugin(),
      GitChangelog({
        // 设置您的仓库URL
        repoURL: () => "https://github.com/zimo493/vue3-naiveui-admin-docs",
      }),
      GitChangelogMarkdownSection(),
    ],
  },
  postRender(context) {
    const styleRegex = /<css-render-style>((.|\s)+)<\/css-render-style>/;
    const vitepressPathRegex = /<vitepress-path>(.+)<\/vitepress-path>/;
    const style = styleRegex.exec(context.content)?.[1];
    const vitepressPath = vitepressPathRegex.exec(context.content)?.[1];
    if (vitepressPath && style) {
      fileAndStyles[vitepressPath] = style;
    }
    context.content = context.content.replace(styleRegex, "");
    context.content = context.content.replace(vitepressPathRegex, "");
  },
  transformHtml(code, id) {
    const html = id.split("/").pop();
    if (!html) return;
    const style = fileAndStyles[`/${html}`];
    if (style) {
      return code.replace(/<\/head>/, `${style}</head>`);
    }
  },
});
