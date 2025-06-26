import { useData, useRouter } from "vitepress";
import { Post, PostListVO } from "./utils/posts.data";
import { defineComponent, h } from "vue";
import { NBadge, NDivider, NEl, NFlex, NTag, NText } from "naive-ui";
import langText from "./utils/language";

export default defineComponent({
  name: "PostList",
  props: {
    post: {
      type: Object as () => PostListVO,
      required: true,
    },
    // 选中的标签
    selected: {
      type: String,
    },
  },

  setup({ post, selected }) {
    const router = useRouter();
    const { lang } = useData();

    const PostMate = ({ post }: { post: Post }) =>
      h(NEl, { class: "archive", onClick: () => router.go(post.url) }, () => [
        h(NFlex, { justify: "space-between" }, () => [
          h(
            NText,
            { depth: 3, style: { fontSize: "14px" } },
            () => post.dateText[0]
          ),
          post.category &&
            h(NTag, { size: "small" }, () => `🏷️${post.category}`),
        ]),
        h(NEl, { class: "archive-title" }, () => post.title),
        h(
          NText,
          { depth: 3, style: { fontSize: "14px", flex: 1 } },
          () => post.abstract
        ),
        post.tags &&
          h(NFlex, {}, () =>
            post.tags?.map((tag) =>
              h(
                NEl,
                {
                  class: "archive-tag",
                  onClick: (event: Event) => {
                    event.stopPropagation();
                    router.go(`/post/tags?tag=${tag}`);
                  },
                },
                () => [
                  h(NText, { depth: 3 }, () => "# "),
                  h(
                    NText,
                    {
                      class: [
                        "archive-tag-item",
                        { "archive-tag-selected": selected === tag },
                      ],
                    },
                    () => tag
                  ),
                ]
              )
            )
          ),
      ]);

    const { piece } = langText(lang.value);

    return () =>
      h(NFlex, {}, () => [
        h(NDivider, {}, () =>
          h(NFlex, { wrap: false, align: "center", justify: "center" }, () => [
            h(NText, { style: { fontSize: "20px" } }, () => post.title),
            h(NBadge, {
              value: `${post.posts.length} ${piece}`,
              color: "var(--vp-c-brand-3)",
            }),
          ])
        ),
        h(NEl, { class: "archive-list" }, () =>
          post.posts.map((post) => h(PostMate, { post }))
        ),
      ]);
  },
});
