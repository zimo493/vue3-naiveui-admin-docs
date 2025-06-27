---
title: 代码编辑器
tags: [工具类]
---

<script setup>
import { NButton, NTag, NFlex } from 'naive-ui'

const open = (url) => window.open(url)
</script>

## WebStorm

`WebStorm` 是由 `JetBrains` 公司开发的一款专业的 `JavaScript/TypeScript` 集成开发环境，专注于现代前端开发。
`2024年10月24日` 正值程序员节之际，JetBrains 正式宣布：`针对非商业用途` **WebStorm 个人版现已全面免费开放使用**

<NFlex align="center">
  <NButton type="primary" @click="open('https://www.jetbrains.com/webstorm/')">下载 WebStorm</NButton>
  <NTag type="warning">
    相比 VS Code，内存占用较高
  </NTag>
</NFlex>

### WebStorm 插件推荐

- [.env files](https://plugins.jetbrains.com/plugin/9525--env-files)：`.env` 文件支持高亮
- [.ignore](https://plugins.jetbrains.com/plugin/7495--ignore)：`.ignore` 文件支持高亮
- [Lingma - Alibaba Cloud AI Coding Assistant](https://plugins.jetbrains.com/plugin/17809-lingma--alibaba-cloud-ai-coding-assistant)：代码智能提示
- [CodeGlance Pro](https://plugins.jetbrains.com/plugin/18824-codeglance-pro)：代码小地图
- [Translation](https://plugins.jetbrains.com/plugin/8579-translation)：翻译插件

## Visual Studio Code

`VS Code` 是由 `Microsoft` 开发的一款 **免费、开源、跨平台** 的现代化代码编辑器，凭借其 **轻量高效、插件丰富、高度可定制** 的特点，已成为全球最受欢迎的开发者工具之一。

<NFlex align="center">
  <NButton type="primary" @click="open('https://code.visualstudio.com/')">下载 VS Code</NButton>
  <NTag type="warning">
    复杂项目调试，可能不如 WebStorm
  </NTag>
</NFlex>

### VS Code 插件推荐

- [Chinese (Simplified)](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)：中文简体
- [Lingma - Alibaba Cloud AI Coding Assistant](https://marketplace.visualstudio.com/items?itemName=Alibaba-Cloud.tongyi-lingma)：代码智能提示
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)：Vue 官方支持插件
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)：编辑器可视化图标
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)：ESlint 支持插件
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)：代码美化插件
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)：使用 `.editorconfig` 支持编辑器格式配置
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)：UnoCSS 支持插件
- [To Unocss](https://marketplace.visualstudio.com/items?itemName=simonhe.to-unocss)：鼠标移入你写的样式提示出 UnoCSS 样式
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)：错误提示
- [Parameter Hints](https://marketplace.visualstudio.com/items?itemName=DominicVonk.parameter-hints)：函数参数提示
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)：自动闭合标签
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)：自动重命名标签
- [colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize)：可视化颜色
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)：`.env` 文件支持高亮
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)：Git 分支查看
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)：查看文件 Git 历史
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)：编辑器中快捷查看 git 提交信息
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)：i18n 翻译便利插件
- [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)：快捷查看导入的图片素材
