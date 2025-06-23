import { type Theme, useRoute, useData, inBrowser } from "vitepress";
import DefaultTheme from "vitepress/theme";
import {
  defineComponent,
  h,
  inject,
  computed,
  onMounted,
  onUnmounted,
} from "vue";
import { NConfigProvider, darkTheme } from "naive-ui";
import { setup } from "@css-render/vue3-ssr";

// 导入git-changelog插件的客户端组件
import { NolebaseGitChangelogPlugin } from "@nolebase/vitepress-plugin-git-changelog/client";
// 图片查看器
import { bindFancybox, destroyFancybox } from "./components/ImgPreview";

/** 创建自定义的布局组件 */
import Layout from "./components/Layout";

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
          h(Layout),
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
      router.onBeforeRouteChange = async () => await destroyFancybox(); // 销毁图片查看器
      router.onAfterRouteChanged = async () => await bindFancybox(); // 绑定图片查看器
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
  setup() {
    /** 挂载和卸载图片查看器 */
    onMounted(() => bindFancybox());
    onUnmounted(() => destroyFancybox());
  },
};
