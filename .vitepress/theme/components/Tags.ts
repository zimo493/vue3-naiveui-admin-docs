import { type PostListVO, data } from "./utils/posts.data";
import { type Tag, postsTagData } from "./utils/archive";
import { h, onMounted, computed, ref, nextTick } from "vue";
import { useData } from "vitepress";
import langText from "./utils/language";

import { NBadge, NButton, NEl, NFlex, NH1 } from "naive-ui";
import PostList from "./PostList";

export default {
  name: "Tags",
  setup() {
    const { lang } = useData();

    const posts = ref<Tag>({});
    const selectedTag = ref(""); // 当前选中的标签

    // 计算处理后的文章列表
    const postList = computed<PostListVO[]>(() => {
      const entries = Object.entries(posts.value);
      return entries.map(([title, posts]) => ({ title, posts })).reverse();
    });

    // 计算所有的标签和标签的文章数量，最后按照字母表排个序
    const allTags = computed(() => {
      const tags = new Set<string>();
      for (const key in posts.value) {
        tags.add(key);
      }
      return Array.from(tags)
        .map((tag) => ({
          tag,
          count: posts.value[tag]?.length || 0,
        }))
        .sort((a, b) => a.tag.localeCompare(b.tag));
    });

    // 当前文章列表
    const currentPosts = computed(() =>
      selectedTag.value
        ? postList.value.filter((item) => item.title === selectedTag.value)
        : []
    );

    const getUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      selectedTag.value =
        Object.fromEntries(urlParams.entries()).tag ?? allTags.value[0].tag;
    };

    onMounted(async () => {
      posts.value = postsTagData(data);
      await nextTick(() => getUrlParams())
    });

    const { tags } = langText(lang.value);

    // 渲染标签按钮
    const renderTagButtons = () =>
      allTags.value.map(({ tag, count }) =>
        h(NBadge, { value: count, type: "info", key: tag }, () =>
          h(
            NButton,
            {
              size: "small",
              round: true,
              type: selectedTag.value === tag ? "primary" : "default",
              onClick: () => {
                selectedTag.value = tag;
                // 同步当前页面的url参数(可选)
                window.history.replaceState(null, "", `?tag=${tag}`);
              },
            },
            () => tag
          )
        )
      );

    return () =>
      h(NEl, {}, () => [
        h(NH1, { style: { fontSize: "24px", marginTop: "20px" } }, () => tags),
        h(NFlex, { size: [20, 20] }, renderTagButtons),
        ...currentPosts.value.map((post) =>
          h(PostList, {
            key: post.title,
            post,
            modelValue: selectedTag.value,
            "onUpdate:modelValue": (val: string) => (selectedTag.value = val),
          })
        ),
      ]);
  },
};
