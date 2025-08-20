---
title: "集成Electron实现桌面应用程序"
tags: [插件集成]
---

分为两步即可实现一个桌面应用程序

- 前端项目打包
- 拉取配置仓库

## 前端项目打包

首先需要修改两个配置，修改 `.env.production` 和 `src\router\index.ts` 文件

```ini [.env.production]
# 基础路径修改为 './'
VITE_BASE_URL=/ ; [!code --]
VITE_BASE_URL=./ ; [!code ++]

# 代理前缀修改为后端接口地址
VITE_APP_BASE_API='/prod-api' ; [!code --]
VITE_APP_BASE_API='http://192.168.1.5:8989' ; [!code ++]
```

```ts [src\router\index.ts]
import { createRouter, createWebHistory } from "vue-router"; // [!code --]
import { createRouter, createWebHashHistory } from "vue-router"; // [!code ++]

export const router = createRouter({
  history: createWebHistory(), // [!code --]
  history: createWebHashHistory(), // [!code ++]
});
```

> [!TIP] 💡 提示
> 把 `history: createWebHistory()` 修改为 `createWebHashHistory()` 避免路径 404 或找不到的问题

完成以上两处文件修改后就可直接运行打包命令生成 `dist` 文件夹

```bash [pnpm]
pnpm build
```

## 拉取配置仓库

### 代码拉取

::: code-group

```shell [GitHub]
git clone https://github.com/zimo493/electron-app.git
```

```shell [Gitee]
git clone https://gitee.com/zimo493/electron-app.git
```

:::

### 安装依赖

```bash [pnpm]
cd electron-app
pnpm i
```

### 文件覆盖

将 `electron-app/src/*` 下的文件全部删除，将之前打包的 `vue3-naiveui-admin/dist/*` 下所有文件复制到 `electron-app/src/` 下

### 修改配置

应用使用 `electron-builder` 进行打包，主要配置如下：

- `appId`：应用 ID，用于标识应用程序的唯一性。
- `productName`：应用程序的名称，安装包、安装后显示的应用名称等。
- `copyright`：版权信息。
- `icon`：应用图标

```json [package.json]
"build": {
  "appId": "com.zimo.todo",
  "productName": "待办事项清单",
  "copyright": "Copyright © 2025 zimo",
  "icon": "build/icon.ico",
}
```

### 运行项目

在 `electron-app` 目录下执行以下命令启动项目，查看是否正常

```bash [pnpm]
pnpm dev
```

### 打包项目

在 `electron-app` 目录下执行以下命令打包项目

```bash [pnpm]
PS E:\Code\electron-app> pnpm build

> electron-app@1.5.0 build E:\Code\electron-app
> electron-builder

  • electron-builder  version=26.0.12 os=10.0.26100
  • loaded configuration  file=package.json ("build" field)
  • description is missed in the package.json  appPackageFile=E:\Code\electron-app\package.json
  • author is missed in the package.json  appPackageFile=E:\Code\electron-app\package.json
  • writing effective config  file=dist_electron\builder-effective-config.yaml
  • executing @electron/rebuild  electronVersion=37.2.4 arch=x64 buildFromSource=false appDir=./
  • installing native dependencies  arch=x64
  • completed installing native dependencies
  • packaging       platform=win32 arch=x64 electron=37.2.4 appOutDir=dist_electron\win-unpacked
  • updating asar integrity executable resource  executablePath=dist_electron\win-unpacked\待办事项清单.exe
  • signing with signtool.exe  path=dist_electron\win-unpacked\待办事项清单.exe
  • building        target=nsis file=dist_electron\待办事项清单 Setup 1.5.0.exe archs=x64 oneClick=false perMachine=false
  • signing with signtool.exe  path=dist_electron\win-unpacked\resources\elevate.exe
  • signing with signtool.exe  path=dist_electron\__uninstaller-nsis-electron-app.exe
  • signing with signtool.exe  path=dist_electron\待办事项清单 Setup 1.5.0.exe
  • building block map  blockMapFile=dist_electron\待办事项清单 Setup 1.5.0.exe.blockmap
PS E:\Code\electron-app>
```

> [!WARNING] 💡 提示
> 如果在打包过程中出现错误，请使用管理员权限打开终端，重新执行打包命令

运行成功后，会生成 `dist_electron` 文件夹。

- `待办事项清单 Setup 1.5.0.exe` 文件：这是打包后的安装包，双击即可安装。
- `win-unpacked` 文件夹：这是免安装版，双击 `待办事项清单.exe` 文件即可运行。
