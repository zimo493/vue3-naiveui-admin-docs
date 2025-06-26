import { type Post, type PostListVO, data } from "./utils/posts.data";
import { type Tag, postsTagData } from "./utils/archive";
import { h, onMounted, computed, ref, nextTick } from "vue";
import { useData, useRouter } from "vitepress";
import langText from "./utils/language";

import { NBadge, NButton, NEl, NFlex, NH1 } from "naive-ui";
import PostList from "./PostList";

export default {
  name: "Tags",
  setup() {
    const { lang } = useData();
    const router = useRouter();

    const posts = ref<Tag>({});
    const selectedTag = ref(""); // 当前选中的标签

    // 计算处理后的文章列表
    const postList = computed<PostListVO[]>(() =>
      Object.entries(posts.value)
        .map(([title, posts]) => ({ title, posts }))
        .reverse()
        .filter(Boolean)
    );

    // 计算所有的标签和标签的文章数量，最后按照字母表排个序
    const allTags = computed(() =>
      postList.value
        .map(({ title: tag, posts }) => ({
          tag,
          count: posts.length,
        }))
        .sort((x, y) => x["tag"].localeCompare(y["tag"]))
    );

    // 当前的文章列表
    const currentPosts = computed(() => {
      return postList.value.filter((item) => item.title === selectedTag.value);
    });

    const getUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      selectedTag.value =
        Object.fromEntries(urlParams.entries()).tag ?? allTags.value[0].tag;
    };

    onMounted(() => {
      posts.value = postsTagData(data);
      nextTick(() => getUrlParams());
    });

    const { tags } = langText(lang.value);

    return () =>
      h(NEl, {}, () => [
        h(NH1, { style: { fontSize: "24px", marginTop: "20px" } }, () => tags),
        h(NFlex, { size: [20, 20], style: { marginBottom: "20px" } }, () =>
          allTags.value.map(({ tag, count }) => {
            return h(NBadge, { value: count, type: "info" }, () =>
              h(
                NButton,
                {
                  secondary: true,
                  type: selectedTag.value === tag ? "primary" : "default",
                  onClick: () => router.go(`/post/tags?tag=${tag}`),
                },
                () => tag
              )
            );
          })
        ),
        currentPosts.value.map((post) =>
          h(PostList, { post, selected: selectedTag.value })
        ),
      ]);
  },
};
