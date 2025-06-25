import { h, onMounted, computed, ref } from "vue";
import { type Post, data } from "./utils/posts.data";
import { type Year, postsYearData } from "./utils/archive";
import { NDivider, NEl, NFlex, NH1, NTag, NText } from "naive-ui";
import { useRouter } from "vitepress";

interface PostList {
  title: string;
  posts: Post[];
}

const PostMate = ({ post }: { post: Post }) => {
  const router = useRouter();

  return h(
    NEl,
    {
      class: "archive",
      onClick: () => router.go(post.url),
      style: { cursor: "pointer" },
    },
    () => [
      h(NFlex, { justify: "space-between" }, () => [
        h(
          NText,
          { depth: 3, style: { fontSize: "14px" } },
          () => post.dateText[0]
        ),
        post.category && h(NTag, { size: "small" }, () => `🏷️${post.category}`),
      ]),
      h(NEl, { class: "archive-title" }, () => post.title),
      h(NText, { depth: 3, style: { fontSize: "14px" } }, () => post.abstract),
      post.tags &&
        h(NFlex, { style: { marginTop: "10px" } }, () =>
          post.tags?.map((tag) =>
            h(NTag, { type: "info", bordered: false, size: "small" }, () => tag)
          )
        ),
    ]
  );
};

export default {
  name: "Archive",
  setup() {
    const posts = ref<Year>({});

    // 计算处理后的文章列表
    const postList = computed<PostList[]>(() => {
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

    return () =>
      h(NEl, {}, () => [
        h(NH1, { style: { fontSize: "24px", marginTop: "20px" } }, () => [
          h(NText, {}, () => "全部文章"),
          h(
            NText,
            { depth: 3, style: { fontSize: "16px" } },
            () => ` - ${postLength.value}篇`
          ),
        ]),

        ...postList.value.map((item) =>
          h(NFlex, {}, () => [
            h(NDivider, {}, () => [
              h(NText, { style: { fontSize: "20px" } }, () => item.title),
              h(
                NText,
                { depth: 3, style: { fontSize: "14px" } },
                () => ` - ${item.posts.length}篇`
              ),
            ]),

            h(NEl, { class: "archive-list" }, () =>
              item.posts.map((post) => h(PostMate, { post }))
            ),
          ])
        ),
      ]);
  },
};
