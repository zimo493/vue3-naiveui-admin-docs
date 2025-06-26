import { useData, useRouter } from "vitepress";
import { Post, PostListVO } from "./utils/posts.data";
import { computed, defineComponent, h, toRefs } from "vue";
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
    modelValue: {
      type: String,
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const router = useRouter();
    const { lang } = useData();

    const { post, modelValue } = toRefs(props);
    const PostItem = ({ post }: { post: Post }) =>
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
          h(NFlex, { size: [12, 0] }, () =>
            post.tags?.map((tag) =>
              h(
                NEl,
                {
                  class: "archive-tag",
                  onClick: (event: Event) => {
                    event.stopPropagation();
                    modelValue.value
                      ? emit("update:modelValue", tag)
                      : router.go(`/post/tags?tag=${tag}`);
                  },
                },
                () => [
                  h(NText, { depth: 3 }, () => "# "),
                  h(
                    NText,
                    {
                      class: [
                        "archive-tag-item",
                        { "archive-tag-selected": modelValue.value === tag },
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
            h(NText, { style: { fontSize: "20px" } }, () => post.value.title),
            h(NBadge, {
              value: `${post.value.posts.length} ${piece}`,
              color: "var(--vp-c-brand-3)",
            }),
          ])
        ),
        h(NEl, { class: "archive-list" }, () =>
          post.value.posts.map((post) => h(PostItem, { key: post.url, post }))
        ),
      ]);
  },
});
