import { h } from "vue";
import DefaultTheme from "vitepress/theme";

// 导入增强阅读abilities插件
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

import PostMate from "./PostMate";

// 导入git-changelog插件的样式
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
// 导入增强阅读abilities样式
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
// 导入代码块图标
import "virtual:group-icons.css";
// 导入自定义样式
import "../styles/index.css";

export default {
  name: "Layout",
  render() {
    return h(DefaultTheme.Layout, null, {
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      "nav-screen-content-after": () =>
        h(NolebaseEnhancedReadabilitiesScreenMenu),
      "doc-before": () => h(PostMate),
    });
  },
};
