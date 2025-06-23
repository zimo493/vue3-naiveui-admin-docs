---
title: 开始使用
---

## 环境准备

Vue3 NaiveUI Admin 是基于最新 Vite 版本开发，所以需要 [Node.js](https://nodejs.org/en/) 20+ 版本来支持。
包管理器推荐使用 [pnpm](https://pnpm.io/) 9+ 版本

- [Node.js 安装和使用教程](/dev/nodejs)

## 获取代码

安装 Git，使用 Git 命令行工具拉取代码。

- [Git 安装和使用教程](/dev/git)

### 仓库拉取

::: code-group

```shell [GitHub]
git clone https://github.com/zimo493/vue3-naiveui-admin.git
```

```shell [Gitee]
git clone https://gitee.com/zimo493/vue3-naiveui-admin.git
```

:::

::: tip 💡 提示
或者直接下载 zip 包进行解压
:::

## 本地启动

### 全局安装 pnpm

```bash [npm]
npm i -g pnpm
```

### 安装依赖

```bash [pnpm]
pnpm config set registry https://registry.npmmirror.com # 设置镜像源（可忽略）

pnpm i
```

### 本地开发

```bash [pnpm]
pnpm dev
```

### 打包构建

```bash [pnpm]
pnpm build
```

## 命令脚本

::: code-group

```json [package.json]
"scripts": {
  // 本地开发
  "dev": "vite",
  // 构建
  "build": "vue-tsc --noEmit & vite build",
  // 预览
  "preview": "vite preview",
  // 仅构建，不进行类型检查
  "build-only": "vite build",
  // 类型检查
  "type-check": "vue-tsc --noEmit",
  // 使用eslint检查代码并修复问题
  "lint:eslint": "eslint --cache \"src/**/*.{vue,ts,tsx}\" --fix",
  // 使用prettier格式化代码
  "lint:prettier": "prettier --write \"**/*.{js,cjs,ts,tsx,json,css,scss,vue,html,md}\"",
  // 使用stylelint检查代码并修复问题
  "lint:stylelint": "stylelint --cache \"**/*.{css,scss,vue}\" --fix",
  "lint:lint-staged": "lint-staged",
  "preinstall": "npx only-allow pnpm",
  "prepare": "husky",
  // 提交代码
  "commit": "git-cz"
},
```

:::
