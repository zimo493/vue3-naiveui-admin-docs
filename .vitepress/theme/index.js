import DefaultTheme from "vitepress/theme";
import { defineComponent, h, inject, computed } from "vue";
import { NConfigProvider, darkTheme } from "naive-ui";
import { setup } from "@css-render/vue3-ssr";
import { useRoute, useData } from "vitepress";
// 导入git-changelog插件的客户端组件
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
// 导入增强阅读abilities插件
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

// 导入git-changelog插件的样式
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
// 导入增强阅读abilities样式
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
// 导入代码块图标
import "virtual:group-icons.css";
// 导入主题样式
import "./styles/style.css";
// 导入链接样式
import "./styles/links.css";

const { Layout } = DefaultTheme;

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject("css-render-collect");
    return {
      style: collect(),
    };
  },
  render() {
    return h("css-render-style", {
      innerHTML: this.style,
    });
  },
});

const VitepressPath = defineComponent({
  setup() {
    const route = useRoute();
    return () => {
      return h("vitepress-path", null, [route.path]);
    };
  },
});

const NaiveUIProvider = defineComponent({
  setup: () => {
    // 获取VitePress的主题状态
    const { isDark } = useData();

    // 根据VitePress的主题状态计算NaiveUI的主题
    const theme = computed(() => (isDark.value ? darkTheme : null));

    return { theme };
  },
  render() {
    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true, theme: this.theme },
      {
        default: () => [
          h(Layout, null, {
            // 为较宽的屏幕的导航栏添加阅读增强菜单
            "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
            // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
            "nav-screen-content-after": () =>
              h(NolebaseEnhancedReadabilitiesScreenMenu),
            default: this.$slots.default?.(),
          }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
        ],
      }
    );
  },
});

export default {
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app }) => {
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide("css-render-collect", collect);
    }
    // 注册git-changelog插件
    app.use(NolebaseGitChangelogPlugin);
  },
};
