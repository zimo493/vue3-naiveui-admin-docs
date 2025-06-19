---
layout: home

hero:
  name: "Vue3 Naive Admin"
  text: "中后台管理模板"
  tagline: Vue3、TypeScript、NaiveUI
  image:
    src: /logo.svg
    alt: Vue3 Naive Admin
  actions:
    - theme: brand
      text: 起步 🚀
      link: /guide/introduction
    - theme: alt
      text: Github
      link:
    - theme: alt
      text: 在线预览
      link:

features:
  - title: 快速上手
    icon: 🚀
    details: 基于 Vue3、Vite6、TypeScript、NaiveUI、UnoCSS、TSX 等最新技术栈开发
    link: /guide/introduction
    linkText: 去查看

  - title: 系统功能
    icon: ⚙️
    details: 提供用户管理、角色管理、菜单管理、部门管理、字典管理等功能模块

  - title: 网络请求
    icon: 🛠️
    details: 使用 TypeScript 对 Axios 整个二次封装，请求拦截、响应拦截、错误处理等

  - title: 权限管理
    icon: 🔒
    details: 完善的权限管理，支持动态路由、按钮权限、角色权限和数据权限等多种权限管理方式

  - title: 主题适配
    icon: 🎨
    details: 精美的页面设计，支持浅色、深色、自动模式，界面样式保持Naive风格

  - title: 代码规范
    icon: 📝
    details: 遵循 Airbnb JavaScript Style Guide 的代码规范，使用 Eslint、Prettier 等工具保证代码质量
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'
import { coreMembers } from '../config'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>我们的团队</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="coreMembers" />
</VPTeamPage>
