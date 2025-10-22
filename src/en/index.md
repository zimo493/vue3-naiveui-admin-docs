---
layout: home

hero:
  name: "Vue3 NaiveUI Admin"
  text: "Admin Template"
  tagline: Vue3, TypeScript, NaiveUI
  image:
    src: /logo.svg
    alt: Vue3 NaiveUI Admin
  actions:
    - theme: brand
      text: Get Started 🚀
      link: /en/guide/introduction
    - theme: alt
      text: Github
      link: https://github.com/zimo493/vue3-naiveui-admin
    - theme: alt
      text: Live Preview
      link: https://vue.youlai.tech/naiveui

features:
  - title: Quick Start
    icon: 🚀
    details: Developed with the latest tech stack including Vue3, Vite6, TypeScript, NaiveUI, UnoCSS, TSX, etc.
    link: /en/guide/introduction
    linkText: Learn More

  - title: Component Encapsulation
    icon: 🎈
    details: FormPro is built on Naive, and TablePro, DrawerForm, and ModalForm are further built on FormPro. This greatly improves development efficiency.
    link: /en/components/form-pro
    linkText: Learn More

  - title: System Features
    icon: ⚙️
    details: Provides modules such as user management, role management, menu management, department management, and dictionary management.

  - title: Permission Management
    icon: 🔒
    details: Comprehensive permission management supporting dynamic routing, button permissions, role permissions, and data permissions.

  - title: Theme Adaptation
    icon: 🎨
    details: Beautiful page design supporting light, dark, and auto modes, keeping the NaiveUI style.

  - title: Code Standards
    icon: 📝
    details: Follows Airbnb JavaScript Style Guide, using Eslint, Prettier, Stylelint, and other tools to ensure code quality.
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'
import { coreMembers } from '../../config'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <!-- <template #title>Our Team</template> -->
    <template #lead>🚀 Committed to building efficient development & application solutions</template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="coreMembers" />
</VPTeamPage>
