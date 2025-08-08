---
layout: home

hero:
  name: "Vue3 NaiveUI Admin"
  text: "中后台管理模板"
  tagline: Vue3、TypeScript、NaiveUI
  image:
    src: /logo.svg
    alt: Vue3 NaiveUI Admin
  actions:
    - theme: brand
      text: 起步 🚀
      link: /guide/introduction
    - theme: alt
      text: Github
      link: https://github.com/zimo493/vue3-naiveui-admin
    - theme: alt
      text: 在线预览
      link: 

features:
  - title: 快速上手
    icon: 🚀
    details: 基于 Vue3、Vite6、TypeScript、NaiveUI、UnoCSS、TSX 等最新技术栈开发
    link: /guide/introduction
    linkText: 去查看

  - title: 组件封装
    icon: 🎈
    details: 基于 Naive 二次封装 FormPro、基于 FormPro 封装 TablePro、DrawerForm、ModalForm 组件。在一定程度上提高您的开发效率
    link: /components/form-pro
    linkText: 去查看

  - title: 系统功能
    icon: ⚙️
    details: 提供用户管理、角色管理、菜单管理、部门管理、字典管理等功能模块

  - title: 权限管理
    icon: 🔒
    details: 完善的权限管理，支持动态路由、按钮权限、角色权限和数据权限等多种权限管理方式

  - title: 主题适配
    icon: 🎨
    details: 精美的页面设计，支持浅色、深色、自动模式，界面样式保持Naive风格

  - title: 代码规范
    icon: 📝
    details: 遵循 Airbnb JavaScript Style Guide 的代码规范，使用 Eslint、Prettier、Stylelelint 等工具保证代码质量
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'
import { coreMembers } from '../config'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <!-- <template #title>我们的团队</template> -->
    <template #lead>🚀致力于构建高效开发应用解决方案</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="coreMembers" />
</VPTeamPage>
