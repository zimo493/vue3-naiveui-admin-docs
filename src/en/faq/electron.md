---
title: "Integrating Electron to Create Desktop Applications"
tags: [Plugin]
---

It only takes two steps to implement a desktop application

- Frontend project packaging
- Pull configuration repository

## Frontend Project Packaging

First, you need to modify two configurations by editing the `.env.production` and `src\router\index.ts` files

```ini [.env.production]
# Change base path to './'
VITE_BASE_URL=/ ; [!code --]
VITE_BASE_URL=./ ; [!code ++]

# Change proxy prefix to backend API address
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

> [!TIP] 💡 Tip
> Change `history: createWebHistory()` to `createWebHashHistory()` to avoid 404 errors or path not found issues

After completing the above two file modifications, you can directly run the packaging command to generate the `dist` folder

```bash [pnpm]
pnpm build
```

## Pull Configuration Repository

### Code Pull

::: code-group

```shell [GitHub]
git clone https://github.com/zimo493/electron-app.git
```

```shell [Gitee]
git clone https://gitee.com/zimo493/electron-app.git
```

:::

### Install Dependencies

```bash [pnpm]
cd electron-app
pnpm i
```

### File Overwrite

Delete all files under `electron-app/src/*`, and copy all files from the previously packaged `vue3-naiveui-admin/dist/*` to `electron-app/src/`

### Modify Configuration

The application uses `electron-builder` for packaging, with the main configurations as follows:

- `appId`: Application ID, used to uniquely identify the application.
- `productName`: Application name, displayed in the installer and after installation.
- `copyright`: Copyright information.
- `icon`: Application icon

```json [package.json]
"build": {
  "appId": "com.zimo.todo",
  "productName": "To-Do List",
  "copyright": "Copyright © 2025 zimo",
  "icon": "build/icon.ico",
}
```

### Run Project

Execute the following command in the `electron-app` directory to start the project and check if it works properly

```bash [pnpm]
pnpm dev
```

### Package Project

Execute the following command in the `electron-app` directory to package the project

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
  • updating asar integrity executable resource  executablePath=dist_electron\win-unpacked\To-Do List.exe
  • signing with signtool.exe  path=dist_electron\win-unpacked\To-Do List.exe
  • building        target=nsis file=dist_electron\To-Do List Setup 1.5.0.exe archs=x64 oneClick=false perMachine=false
  • signing with signtool.exe  path=dist_electron\win-unpacked\resources\elevate.exe
  • signing with signtool.exe  path=dist_electron\__uninstaller-nsis-electron-app.exe
  • signing with signtool.exe  path=dist_electron\To-Do List Setup 1.5.0.exe
  • building block map  blockMapFile=dist_electron\To-Do List Setup 1.5.0.exe.blockmap
PS E:\Code\electron-app>
```

> [!WARNING] 💡 Tip
> If errors occur during packaging, please open the terminal with administrator privileges and re-execute the packaging command

After successful execution, a `dist_electron` folder will be generated.

- `To-Do List Setup 1.5.0.exe` file: This is the packaged installer, double-click to install.
- `win-unpacked` folder: This is the portable version, double-click the `To-Do List.exe` file to run.
