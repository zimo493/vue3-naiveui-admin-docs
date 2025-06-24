import { h, onMounted, ref } from "vue";
import { type Post, data } from "./utils/posts.data";
import { type Year, postsYearData } from "./utils/archive";
import { NDivider, NEl, NFlex, NH1, NTag, NText } from "naive-ui";
import { useRouter } from "vitepress";

export interface PostList {
  title: string;
  posts: Post[];
}

export default {
  name: "Archive",
  setup() {
    const router = useRouter();
    let postLength = ref(0);
    let posts = ref<Year>({});
    let postList = ref<PostList[]>([
      {
        title: new Date().getFullYear().toString(),
        posts: [],
      },
    ]);

    const getPost = () => {
      let _list: PostList[] = [];
      for (const key in posts.value) {
        _list.push({
          title: key,
          posts: posts.value[key],
        });
      }
      postList.value = _list.reverse().filter(Boolean);
    };

    const getPostLength = () => {
      let length = 0;
      postList.value.forEach((item) => {
        length += item.posts.length;
      });
      postLength.value = length;
    };

    onMounted(() => {
      posts.value = postsYearData(data);
      getPost();
      getPostLength();
    });

    const PostMate = ({ post }: { post: Post }) => {
      return h(NEl, {}, () => [
        h(NFlex, { justify: "space-between" }, () => [
          h(
            NText,
            { depth: 3, style: { fontSize: "14px" } },
            () => post.dateText[0]
          ),
          post.category &&
            h(NTag, { size: "small" }, () => "🏷️" + post.category),
        ]),
        h(NEl, { class: "archive-title" }, () => post.title),
        h(
          NText,
          { depth: 2, style: { fontSize: "14px" } },
          () => post.abstract
        ),
        post.tags &&
          h(NFlex, { style: { marginTop: "10px" } }, () =>
            post.tags?.map((tag) =>
              h(
                NTag,
                { type: "info", bordered: false, size: "small" },
                () => tag
              )
            )
          ),
      ]);
    };

    const handleClick = (post: Post) => router.go(post.url);

    return () =>
      h(NEl, {}, () => [
        h(NEl, {}, () => [
          h(NH1, { style: { fontSize: "24px", marginTop: "20px" } }, () => [
            h(NText, {}, () => `全部文章`),
            h(
              NText,
              { depth: 3, style: { fontSize: "16px" } },
              () => ` - ${postLength.value}篇`
            ),
          ]),
        ]),
        postList.value.map((item) =>
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
              item.posts.map((post) =>
                h(NEl, { class: "archive" }, () => {
                  return h(PostMate, {
                    post,
                    onClick: () => handleClick(post),
                  });
                })
              )
            ),
          ])
        ),
      ]);
  },
};
