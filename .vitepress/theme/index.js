import DefaultTheme from "vitepress/theme";
import { defineComponent, h, inject, computed } from "vue";
import { NConfigProvider, darkTheme } from "naive-ui";
import { setup } from "@css-render/vue3-ssr";
import { useRoute, useData } from "vitepress";
import "./style.css";

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
          h(Layout, null, { default: this.$slots.default?.() }),
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
  },
};
