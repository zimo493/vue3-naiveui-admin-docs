import { type Theme, useRoute, useData, inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { defineComponent, h, inject, computed } from "vue";
import { NConfigProvider, darkTheme } from "naive-ui";
import { setup } from "@css-render/vue3-ssr";
// 导入git-changelog插件的客户端组件
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
// 导入增强阅读abilities插件
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
} from "@nolebase/vitepress-plugin-enhanced-readabilities/client";

import { bindFancybox, destroyFancybox } from "./components/ImgPreview"; // 图片查看器

// 导入git-changelog插件的样式
import "@nolebase/vitepress-plugin-git-changelog/client/style.css";
// 导入增强阅读abilities样式
import "@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css";
// 导入代码块图标
import "virtual:group-icons.css";
// 导入自定义样式
import "./styles/index.css";

const { Layout } = DefaultTheme;

const CssRenderStyle = defineComponent({
  setup() {
    const collect = inject("css-render-collect") as () => string;
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
          this.$slots.default?.(),
          h(Layout, null, {
            // 为较宽的屏幕的导航栏添加阅读增强菜单
            "nav-bar-content-after": () => h(NolebaseEnhancedReadabilitiesMenu),
            // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
            "nav-screen-content-after": () =>
              h(NolebaseEnhancedReadabilitiesScreenMenu),
          }),
          (import.meta as any).env.SSR
            ? [h(CssRenderStyle), h(VitepressPath)]
            : null,
        ],
      }
    );
  },
});

export default <Theme>{
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app, router }) => {
    if (inBrowser) {
      router.onBeforeRouteChange = () => {
        destroyFancybox(); // 销毁图片查看器
      };
      router.onAfterRouteChanged = () => {
        bindFancybox(); // 绑定图片查看器
      };
    }
    if ((import.meta as any).env.SSR) {
      const { collect } = setup(app);
      app.provide("css-render-collect", collect);
    }
    // 注册git-changelog插件
    app.use(NolebaseGitChangelogPlugin, {
      displayAuthorsInsideCommitLine: true,
    });
  },
};
