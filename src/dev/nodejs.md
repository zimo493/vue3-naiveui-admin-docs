---
title: Node.js 入门指南
tags: [Node.js, 教程]
---

<script setup>
import { NButton } from 'naive-ui'

const open = (url) => window.open(url)
</script>

## Node.js 简介

### 什么是 Node.js？

Node.js 是一个基于 **Chrome V8 引擎** 的 JavaScript 运行时环境，用于构建高性能的网络应用。它采用 **事件驱动、非阻塞 I/O** 模型，使其轻量且高效。

### 主要特点

- 🚀 **跨平台**：支持 Windows、macOS 和 Linux
- ⚡ **高性能**：V8 引擎 + 异步 I/O
- 📦 **npm 生态**：全球最大的开源库生态系统
- 🔄 **全栈开发**：前后端统一使用 JavaScript

### 应用场景

- Web 服务器开发
- RESTful API 服务
- 实时应用（如聊天室）
- 命令行工具
- 微服务架构

## 安装 Node.js

### Windows/macOS

1. 访问官网下载：[ 下载 NodeJS](https://nodejs.org)
2. 选择 **LTS（长期支持版）** 进行下载
3. 运行安装包，按向导完成安装

### Linux (Ubuntu/Debian)

```bash
# 使用 NodeSource 安装
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 验证安装

验证安装成功后，您可以使用以下命令查看 Node.js 的版本

```bash
node -v
npm -v
```

## npm 包管理

常用命令

<!-- 表格 -->

| 命令 | 描述 |
| --- | --- |
| `npm init` | 初始化项目 |
| `npm install <package>` | 安装包 |
| `npm install -g <package>` | 全局安装包 |
| `npm uninstall <package>` | 卸载包 |
| `npm update <package>` | 更新包 |
| `npm list` | 列出所有包 |
| `npm run <script>` | 运行 package.json 中的脚本 |

## 全局安装 pnpm

1. 安装 pnpm

```bash
npm install -g pnpm

```

2. 设置镜像源

```bash
pnpm config set registry https://registry.npmmirror.com
```

## 版本管理（推荐）

### NVM (Node Version Manager)

:::tip 什么是 NVM？
NVM 是一个 **Node.js 版本管理工具**，允许你在同一台机器上安装和切换多个 Node.js 版本。
:::

#### 核心功能

- ✅ 多版本 Node.js 并行安装
- 🔄 快速切换版本（全局/项目级）
- 🧹 干净卸载不需要的版本
- 🌐 支持 Windows/macOS/Linux

#### 适用场景

- 测试不同 Node.js 版本兼容性
- 同时维护多个使用不同 Node 版本的项目
- 安全升级/降级 Node 版本

### Windows 安装

<br />
<NButton type="primary" @click="open('https://github.com/coreybutler/nvm-windows/releases')">下载 NVM</NButton>

### macOS/Linux 安装

```bash
# 使用安装脚本（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# 或使用 Homebrew（macOS）
brew install nvm
```

### NVM 基础使用

::: code-group

```bash [查看可用版本]
nvm ls-remote        # 查看远程所有版本
nvm ls               # 查看本地已安装版本
```

```bash [安装指定版本]
nvm install 20       # 安装最新 v20.x
nvm install 16.14.0  # 安装指定版本
```

```bash [切换版本]
nvm use 20           # 临时切换
nvm alias default 20 # 设置默认版本
```

```bash [其他常用命令]
nvm current          # 查看当前版本
nvm run 14 app.js    # 使用指定版本运行脚本
nvm uninstall 12     # 卸载指定版本
```

:::
