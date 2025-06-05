import { defineConfig } from "vitepress";
import { shared } from "./config/shared";
import { zh } from "./config/zh";
import { en } from "./config/en";

export default defineConfig({
  ...shared,
  locales: {
    root: { label: "简体中文", ...zh },
    en: { label: "English", ...en },
  },
});
