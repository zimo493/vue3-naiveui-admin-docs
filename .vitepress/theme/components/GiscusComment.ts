import { defineComponent, h } from "vue";
import { useData, useRoute } from "vitepress";
import Giscus from "@giscus/vue";

export default defineComponent({
  name: "GiscusComment",
  render: () => {
    const { isDark, lang } = useData();
    const route = useRoute();
    return h(
      "div",
      { style: { marginTop: "2rem" } },
      h(Giscus, {
        key: route.path,
        id: "comments",
        repo: "zimo493/vue3-naiveui-admin-docs",
        repoId: "R_kgDOO2S9Dg",
        category: "Announcements",
        categoryId: "DIC_kwDOO2S9Ds4Cvx7E",
        mapping: "pathname",
        term: "请赐教！",
        reactionsEnabled: "1",
        emitMetadata: "0",
        inputPosition: "bottom",
        lang: lang.value === "zh-CN" ? "zh-CN" : "en",
        loading: "lazy",
        theme: isDark.value ? "dark_tritanopia" : "light_tritanopia",
      })
    );
  },
});
