---
title: Code Editor
tags: [Tool]
---

<script setup>
import { NButton, NTag, NFlex } from 'naive-ui'

const open = (url) => window.open(url)
</script>

## WebStorm

`WebStorm` is a professional `JavaScript/TypeScript` integrated development environment developed by `JetBrains`, focusing on modern frontend development.
On October 24, 2024, during the official Programmer's Day, JetBrains officially announced: **WebStorm Personal Edition is now completely free for non-commercial use**.

<NFlex align="center">
  <NButton type="primary" @click="open('https://www.jetbrains.com/webstorm/')">Download WebStorm</NButton>
  <NTag type="warning">
    Compared to VS Code, it uses more memory
  </NTag>
</NFlex>

### Recommended WebStorm Plugins

- [.env files](https://plugins.jetbrains.com/plugin/9525--env-files): `.env` file syntax highlighting
- [.ignore](https://plugins.jetbrains.com/plugin/7495--ignore): `.ignore` file syntax highlighting
- [Lingma - Alibaba Cloud AI Coding Assistant](https://plugins.jetbrains.com/plugin/17809-lingma--alibaba-cloud-ai-coding-assistant): AI code suggestions
- [CodeGlance Pro](https://plugins.jetbrains.com/plugin/18824-codeglance-pro): Code minimap
- [Translation](https://plugins.jetbrains.com/plugin/8579-translation): Translation plugin

## Visual Studio Code

`VS Code` is a **free, open-source, cross-platform** modern code editor developed by `Microsoft`. With its **lightweight, efficient, rich plugins, and high customizability**, it has become one of the most popular developer tools worldwide.

<NFlex align="center">
  <NButton type="primary" @click="open('https://code.visualstudio.com/')">Download VS Code</NButton>
  <NTag type="warning">
    For complex project debugging, may not be as good as WebStorm
  </NTag>
</NFlex>

### Recommended VS Code Plugins

- [Chinese (Simplified)](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans): Simplified Chinese
- [Lingma - Alibaba Cloud AI Coding Assistant](https://marketplace.visualstudio.com/items?itemName=Alibaba-Cloud.tongyi-lingma): AI code suggestions
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar): Official Vue support
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify): Icon visualization in editor
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): ESLint support
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatting
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig): `.editorconfig` support
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss): UnoCSS support
- [To Unocss](https://marketplace.visualstudio.com/items?itemName=simonhe.to-unocss): Hover to show UnoCSS styles
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens): Error highlighting
- [Parameter Hints](https://marketplace.visualstudio.com/items?itemName=DominicVonk.parameter-hints): Function parameter hints
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag): Auto close tags
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag): Auto rename tags
- [colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize): Color visualization
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv): `.env` file syntax highlighting
- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph): Git branch visualization
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory): View file Git history
- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens): Conveniently view git commit info in editor
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally): i18n translation plugin
- [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview): Quick image asset preview
