/**
 * 首页团队成员
 */
const coreMembers = [
  {
    avatar: "https://gitee.com/zimo493.png",
    name: "zimo493",
    title: "Do everything with love.",
    links: [
      { icon: "github", link: "https://github.com/zimo493" },
      // { icon: 'linkedin', link: 'https://linkedin.com/in/user1' }
      { icon: "gitee", link: "https://gitee.com/zimo493" },
    ],
  },
  {
    avatar: "/logo.svg",
    name: "李四",
    title: "团队成员",
    links: [
      { icon: "github", link: "https://github.com/user2" },
      { icon: "twitter", link: "https://twitter.com/user2" },
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
      name: "zimo493",
      username: "zimo493",
      avatar: "https:gitee.com/zimo493.png",
      links: [
        {
          type: "github",
          link: "https://github.com/zimo493",
        },
      ],
    },
  ],
};

export { coreMembers, gitLogConfig };
