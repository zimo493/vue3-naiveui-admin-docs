import { defineConfig } from "vitepress";
import { groupIconVitePlugin } from "vitepress-plugin-group-icons";
import {
  GitChangelog,
  GitChangelogMarkdownSection,
} from "@nolebase/vitepress-plugin-git-changelog/vite";

import { shared } from "./shared";
import { zh } from "./zh";
import { en } from "./en";

import { gitLogConfig } from "../../config";

const { repoURL, mapAuthors } = gitLogConfig;

const fileAndStyles: Record<string, string> = {};

export default defineConfig({
  ...shared,
  locales: {
    root: { label: "简体中文", ...zh },
    en: { label: "English", ...en },
  },
  vite: {
    optimizeDeps: {
      exclude: [
        "@nolebase/vitepress-plugin-enhanced-readabilities/client",
        "vitepress",
        "@nolebase/ui",
      ],
    },
    ssr: {
      noExternal: [
        "naive-ui",
        "date-fns",
        "vueuc",
        "@nolebase/vitepress-plugin-enhanced-readabilities",
        "@nolebase/ui",
      ],
    },
    plugins: [
      groupIconVitePlugin(),
      GitChangelog({
        // 设置您的仓库URL
        repoURL,
        // 设置作者信息
        mapAuthors,
      }),
      GitChangelogMarkdownSection({
        // exclude: (id) => id.endsWith("index.md"), // 排除 index.md 结尾的文件
        exclude: (id) =>
          ["index.md", "archive.md", "tags.md"].some((ext) => id.endsWith(ext)),
      }),
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
