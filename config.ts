/**
 * 首页团队成员
 */
const coreMembers = [
  {
    avatar: "https://gitee.com/zimo493.png",
    name: "NuyOah",
    title: "Do everything with love.",
    links: [
      { icon: "github", link: "https://github.com/zimo493" },
      { icon: "gitee", link: "https://gitee.com/zimo493" },
    ],
  },
  {
    avatar: "/logo.svg",
    name: "李四",
    title: "团队成员",
    links: [
      { icon: "github", link: "#" },
      { icon: "twitter", link: "#" },
      { icon: "linkedin", link: "#" },
    ],
  },
];

/**
 * 配置仓库贡献者信息
 */
const gitLogConfig = {
  repoURL: "https://gitee.com/zimo493/vue3-naiveui-admin-docs",
  mapAuthors: [
    {
      name: "NuyOah",
      username: "zimo493",
      avatar: "https://gitee.com/zimo493.png",
      links: [
        {
          type: "github",
          link: "https://github.com/zimo493",
        },
      ],
    },
  ],
};

/**
 * 需要统计文章的路径
 */
const postsUrl = [
  "components/**/*.md", // 匹配组件文档
  "guide/**/*.md", // 匹配指南文档
  "faq/**/*.md", // 匹配常见问题
  "dev/**/*.md", // 匹配开发配置
  "en/**/!(index|archive|tags).md", // 匹配英文文档
];

export { coreMembers, gitLogConfig, postsUrl };
