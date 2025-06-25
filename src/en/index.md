---
layout: home

hero:
  name: "Vue3 Naive Admin"
  text: "Manage Template"
  tagline: Vue3, TypeScript, NaiveUI
  image:
    src: /logo.svg
    alt: Vue3 Naive Admin
  actions:
    - theme: brand
      text: Get Started 🚀
      link: /en/guide/introduction
    - theme: alt
      text: Github
      link:
    - theme: alt
      text: Live Preview
      link:

features:
  - title: Quick Start
    icon: 🚀
    details: Developed with the latest tech stack including Vue3, Vite6, TypeScript, NaiveUI, UnoCSS, TSX, etc.
    link: /en/guide/introduction
    linkText: Learn More

  - title: System Features
    icon: ⚙️
    details: Provides functional modules such as user management, role management, menu management, department management, and dictionary management.

  - title: Network Requests
    icon: 🛠️
    details: Comprehensive TypeScript-based encapsulation of Axios, including request interception, response interception, error handling, etc.

  - title: Permission Management
    icon: 🔒
    details: Robust permission management supporting dynamic routing, button permissions, role permissions, and data permissions.

  - title: Theme Adaptation
    icon: 🎨
    details: Elegant UI design supporting light, dark, and auto modes while maintaining NaiveUI style.

  - title: Code Standards
    icon: 📝
    details: Follows Airbnb JavaScript Style Guide with tools like Eslint and Prettier to ensure code quality.
---

<script setup> 
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme' 
import { coreMembers } from '../../config' 
</script>
<VPTeamPage> 
  <VPTeamPageTitle> 
    <template #title>Our Team</template> 
    <template #lead>🚀 Committed to building efficient development & application solutions</template>
  </VPTeamPageTitle> 
  <VPTeamMembers :members="coreMembers" /> 
</VPTeamPage>
