# Git 版本控制系统指南

## Git 简介

Git 是一个开源的分布式版本控制系统，由 Linus Torvalds 于 2005 年创建，用于高效管理项目代码的版本历史。

### 核心特点

- **分布式架构**：每个开发者都有完整的代码仓库副本
- **高效性能**：快速处理大型项目
- **分支管理**：轻量级分支操作
- **完整性保障**：使用 SHA-1 哈希确保数据完整性

## 下载与安装

### Windows 系统

1. 访问官方下载页面：[🔗https://git-scm.com/downloads](https://git-scm.com/downloads)
2. 下载最新版 Windows 安装包
3. 运行安装程序，按向导完成安装
4. 安装时建议选择：
   - 将 Git 添加到 PATH
   - 使用 Git Bash 作为默认终端
   - 配置行结束符转换（推荐选择"Checkout as-is, commit Unix-style"）

### macOS 系统

**方法一（推荐）**：

```bash
# 使用 Homebrew 安装
brew install git
```

**方法二**：

1. 下载最新版 macOS 安装包
2. 运行安装程序，按向导完成安装

**Linux 系统**

```bash
# Debian/Ubuntu
sudo apt-get install git

# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

## 初始配置

安装完成后需要配置用户信息

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

可选配置

```bash
# 设置默认编辑器（如VSCode）
git config --global core.editor "code --wait"

# 启用彩色输出
git config --global color.ui auto
```

## 验证安装

验证安装是否成功，在终端输入以下命令

```bash
git --version
```

## 图形化工具

- Git GUI（内置）
- GitHub Desktop
- [🔗TortoiseGit（可视化工具）](https://tortoisegit.org/download/)

## 学习资源

> 提示：安装完成后建议运行 `git help tutorial` 查看基础教程

- 官方文档：https://git-scm.com/doc
- Git 图解教程：https://marklodato.github.io/visual-git-guide
- GitHub 学习资源：https://guides.github.com
