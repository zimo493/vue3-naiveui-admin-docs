import { h, onMounted, computed, ref } from "vue";
import { NBadge, NEl, NFlex, NH1 } from "naive-ui";

import { PostListVO, data } from "./utils/posts.data";
import { type Year, postsYearData } from "./utils/archive";
import langText from "./utils/language";

import PostList from "./PostList";
import { useData } from "vitepress";

export default {
  name: "Archive",
  setup() {
    const { lang } = useData();

    const posts = ref<Year>({});

    // 计算处理后的文章列表
    const postList = computed<PostListVO[]>(() => {
      return Object.entries(posts.value)
        .map(([year, posts]) => ({
          title: year,
          posts,
        }))
        .reverse()
        .filter(Boolean);
    });

    // 计算文章总数
    const postLength = computed(() =>
      postList.value.reduce((sum, item) => sum + item.posts.length, 0)
    );

    onMounted(() => {
      posts.value = postsYearData(data);
    });

    const { article, piece } = langText(lang.value);

    return () =>
      h(NEl, {}, () => [
        h(NFlex, { wrap: false, align: "center" }, () => [
          h(
            NH1,
            { style: { fontSize: "24px", marginTop: "20px" } },
            () => article
          ),
          h(NBadge, { value: `${postLength.value} ${piece}`, type: "success" }),
        ]),
        ...postList.value.map((post) => h(PostList, { post, key: post.title })),
      ]);
  },
};
