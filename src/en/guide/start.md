---
title: Getting Started
tags: [Tutorial]
---

## Environment Preparation

Vue3 NaiveUI Admin is developed based on the latest Vite version, so it requires [Node.js](https://nodejs.org/en/) 20+ version for support.
Package manager recommends using [pnpm](https://pnpm.io/) 9+ version

- [Node.js Installation and Usage Tutorial](/en/dev/nodejs)

## Get the Code

Install Git and use Git command line tools to pull the code.

- [Git Installation and Usage Tutorial](/en/dev/git)

### Repository Clone

::: code-group

```shell [GitHub]
git clone https://github.com/zimo493/vue3-naiveui-admin.git
```

```shell [Gitee]
git clone https://gitee.com/zimo493/vue3-naiveui-admin.git
```

:::

::: tip 💡 Tip
Or directly download the zip package and extract it
:::

## Local Startup

### Global Install pnpm

```bash [npm]
npm i -g pnpm
```

### Install Dependencies

```bash [pnpm]
pnpm config set registry https://registry.npmmirror.com # Set mirror source (can be ignored)

pnpm i
```

### Local Development

```bash [pnpm]
pnpm dev
```

### Build Package

```bash [pnpm]
pnpm build
```

## Command Scripts

::: code-group

```json [package.json]
"scripts": {
  // Local development
  "dev": "vite",
  // Build
  "build": "vue-tsc --noEmit & vite build",
  // Preview
  "preview": "vite preview",
  // Build only, no type checking
  "build-only": "vite build",
  // Type checking
  "type-check": "vue-tsc --noEmit",
  // Use eslint to check code and fix issues
  "lint:eslint": "eslint --cache \"src/**/*.{vue,ts,tsx}\" --fix",
  // Use prettier to format code
  "lint:prettier": "prettier --write \"**/*.{js,cjs,ts,tsx,json,css,scss,vue,html,md}\"",
  // Use stylelint to check code and fix issues
  "lint:stylelint": "stylelint --cache \"**/*.{css,scss,vue}\" --fix",
  "lint:lint-staged": "lint-staged",
  "preinstall": "npx only-allow pnpm",
  "prepare": "husky",
  // Commit code
  "commit": "git-cz"
},
```

:::
