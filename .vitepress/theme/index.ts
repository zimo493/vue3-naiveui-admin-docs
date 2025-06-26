import { type Theme, useRoute, useData, inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { defineComponent, h, inject, onMounted, onUnmounted, ref } from "vue";
import { NConfigProvider, darkTheme, lightTheme } from "naive-ui";
import { setup } from "@css-render/vue3-ssr";

// 导入git-changelog插件的客户端组件
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
// 图片查看器
import { bindFancybox, destroyFancybox } from "./components/ImgPreview";

/** 创建自定义的布局组件 */
import Layout from "./components/Layout";

/** 文章归档页面 */
import Archive from "./components/Archive";

/** 文章标签页面 */
import Tags from "./components/Tags";

// 全局扩展ImportMeta类型
declare global {
  interface ImportMeta {
    env: {
      SSR: boolean;
    };
  }
}

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
  setup() {
    const { isDark } = useData();
    const isClient = ref(false);

    onMounted(() => {
      isClient.value = true;
    });

    return {
      isDark,
      isClient,
    };
  },
  render() {
    // 在SSR期间使用默认的light主题，避免hydration不匹配
    const theme = import.meta.env.SSR
      ? lightTheme
      : this.isClient
      ? this.isDark
        ? darkTheme
        : lightTheme
      : lightTheme;

    return h(
      NConfigProvider,
      { abstract: true, inlineThemeDisabled: true, theme },
      {
        default: () => [
          h(Layout, null, { default: this.$slots.default?.() }),
          import.meta.env.SSR ? [h(CssRenderStyle), h(VitepressPath)] : null,
        ],
      }
    );
  },
});

export default <Theme>{
  extends: DefaultTheme,
  Layout: NaiveUIProvider,
  enhanceApp: ({ app, router }) => {
    if (import.meta.env.SSR) {
      const { collect } = setup(app);
      app.provide("css-render-collect", collect);
    }
    if (inBrowser) {
      router.onBeforeRouteChange = async () => await destroyFancybox(); // 销毁图片查看器
      router.onAfterRouteChange = async () => await bindFancybox(); // 绑定图片查看器
    }
    // 注册git-changelog插件
    app.use(NolebaseGitChangelogPlugin, {
      displayAuthorsInsideCommitLine: true,
    });
    app.component("Archive", Archive);
    app.component("Tags", Tags);
  },
  setup() {
    /** 挂载和卸载图片查看器 */
    onMounted(() => bindFancybox());
    onUnmounted(() => destroyFancybox());
  },
};
