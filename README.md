# Vue3 Naive Admin 文档站点

基于 `VitePress` 构建的 Vue3 Naive Admin 中后台管理系统文档站点。

## 项目介绍

> Vue3 Naive Admin 是一个基于 `Vue3` `TypeScript` `NaiveUI` `UnoCSS` 等最新技术栈开发的中后台管理系统模板。本仓库为其官方文档站点，提供了详细的使用指南和 API 文档。

## 技术栈

- [VitePress](https://vitepress.dev/) 基于 Vite 和 Vue 的静态站点生成器
- [Vue3](https://vuejs.org/) 渐进式 JavaScript 框架
- [Naive UI](https://www.naiveui.com/) 一个 Vue3 组件库，使用 TypeScript

## 本地开发

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建文档站点

```bash
pnpm build
```

### 本地预览构建结果

```bash
pnpm preview
```

## 项目结构

```

├── .vitepress/         # VitePress 配置
│   ├── config/          # 配置文件目录
│   └── theme/           # 主题配置
├── src/                # 文档内容
|   ├── dev/             # 开发配置
|   ├── en/              # 英文文档
|   ├── guide/           # 指南
|   ├── index.md         # 首页
|   └── logo.svg         # 项目 Logo
├── .gitignore          # Git 忽略文件
├── package.json        # 项目配置文件
├── pnpm-lock.yaml      # 依赖锁定文件
└── README.md           # 项目文档
```

## 多语言支持

本文档站点支持中文和英文两种语言：

- 中文（默认）：`/`
- 英文：`/en/`

## 贡献指南

欢迎提交 Issue 或 Pull Request 来帮助改进文档！
