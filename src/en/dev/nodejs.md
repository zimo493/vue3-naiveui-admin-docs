---
title: Node.js Getting Started Guide
tags: [Node.js, Tutorial]
---

<script setup>
import { NButton } from 'naive-ui'

const open = (url) => window.open(url)
</script>

## Node.js Overview

### What is Node.js?

Node.js is a JavaScript runtime environment based on the **Chrome V8 engine**, used to build high-performance network applications. It adopts an **event-driven, non-blocking I/O** model, making it lightweight and efficient.

### Main Features

- 🚀 **Cross-platform**: Supports Windows, macOS, and Linux
- ⚡ **High Performance**: V8 engine + async I/O
- 📦 **npm Ecosystem**: The world's largest open-source library ecosystem
- 🔄 **Full Stack Development**: Unified JavaScript for frontend and backend

### Application Scenarios

- Web server development
- RESTful API services
- Real-time applications (e.g., chat rooms)
- Command-line tools
- Microservice architecture

## Install Node.js

### Windows/macOS

1. Visit the official website: [Download NodeJS](https://nodejs.org)
2. Choose the **LTS (Long Term Support)** version to download
3. Run the installer and follow the prompts to complete installation

### Linux (Ubuntu/Debian)

```bash
# Install using NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify Installation

After installation, you can check the Node.js version with the following commands

```bash
node -v
npm -v
```

## npm Package Management

Common commands

| Command | Description |
| --- | --- |
| `npm init` | Initialize project |
| `npm install <package>` | Install package |
| `npm install -g <package>` | Install package globally |
| `npm uninstall <package>` | Uninstall package |
| `npm update <package>` | Update package |
| `npm list` | List all packages |
| `npm run <script>` | Run script in package.json |

## Install pnpm Globally

1. Install pnpm

```bash
npm install -g pnpm
```

2. Set mirror source

```bash
pnpm config set registry https://registry.npmmirror.com
```

## Version Management (Recommended)

### NVM (Node Version Manager)

:::tip What is NVM?
NVM is a **Node.js version management tool** that allows you to install and switch between multiple Node.js versions on the same machine.
:::

#### Core Features

- ✅ Install multiple Node.js versions in parallel
- 🔄 Quickly switch versions (global/project level)
- 🧹 Cleanly uninstall unnecessary versions
- 🌐 Supports Windows/macOS/Linux

#### Application Scenarios

- Test compatibility with different Node.js versions
- Maintain multiple projects using different Node versions
- Safely upgrade/downgrade Node versions

### Windows Installation

<br />
<NButton type="primary" @click="open('https://github.com/coreybutler/nvm-windows/releases')">Download NVM</NButton>

### macOS/Linux Installation

```bash
# Use the install script (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Or use Homebrew (macOS)
brew install nvm
```

### NVM Basic Usage

::: code-group

```bash [View available versions]
nvm ls-remote        # View all remote versions
nvm ls               # View locally installed versions
```

```bash [Install specific version]
nvm install 20       # Install latest v20.x
nvm install 16.14.0  # Install specific version
```

```bash [Switch version]
nvm use 20           # Temporarily switch
nvm alias default 20 # Set default version
```

```bash [Other common commands]
nvm current          # View current version
nvm run 14 app.js    # Run script with specified version
nvm uninstall 12     # Uninstall specified version
```

:::
