---
title: 项目基本配置
---

## 修改项目名称

要更改项目名称，需要更新两个文件：`index.html` 和 `package.json`

- **更新** `index.html`

在根目录下的 `index.html` 文件中，找到 `<title>` 标签，并将其内容替换为新的项目名称

```html [index.html]
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>vue3-naiveui-admin</title> <!-- [!code --] -->
  <title>自定义内容</title> <!-- [!code ++] -->
</head>
```

- **更新** `package.json`

在 `package.json` 文件中，找到 `"name"` 字段，并将其值替换为新的项目名称

::: code-group

```json [package.json]
{
  "name": "vue3-naiveui-admin", // [!code focus]
  "version": "1.0.0",
  "description": "",
  "type": "module"
}
```

:::

- **动态标题** 配置

如果不希望项目有动态页签，请注释 `src/router/modules/guard.ts` 中动态标题配置

::: code-group

```ts [src/router/modules/guard.ts]
router.afterEach((to) => {
  // 注释以下设置
  // document.title = to.meta?.title ? to.meta?.title : pkg.name; [!code --]
});
```

:::

## 环境变量

### 开发环境

开发环境变量是只有在开发中才会切换的变量，例如设置请求前缀等。在 `.env.development` 文件中定义这些变量

#### VITE_BASE_URL

- **类型**：`string`
- **默认值**：`/`

如果你的项目是部署在子路径下，请将 `VITE_BASE_URL` 设置为子路径，例如 `/admin`

#### VITE_APP_PORT

- **类型**：`number`
- **默认值**：`5173`

默认情况下，Vite 会在端口 `5173` 上运行开发服务器。请将 `VITE_APP_PORT` 设置为项目端口，例如 `8080`

#### VITE_APP_BASE_API

- **类型**：`string`
- **默认值**：`/dev-api`

配置接口请求前缀，例如 `/dev-api`

#### VITE_APP_TIMEOUT

- **类型**：`number`
- **默认值**：`6000`

配置接口请求超时时间，例如 `6000`

#### VITE_APP_API_URL

- **类型**：`string`
- **默认值**：`http://localhost:8989`

代理转发真实接口地址

#### VITE_APP_WS_ENDPOINT

- **类型**：`string`
- **默认值**：`ws://localhost:8989/ws`

配置 WebSocket 地址

#### VITE_DEFAULT_LANG (实现中)

- **类型**：`zhCN` `enUS` `zhTW`
- **默认值**：`zhCN`

配置默认语言，默认为中文简体

#### VITE_STORAGE_PREFIX

- **类型**：`string`
- **默认值**：`store-`

设置全局存储的前缀，默认为 `store-`，在使用 `src\utils\storage.ts` 时 `localStorage` 和 `sessionStorage` 中的数据都会加上 `store-` 前缀，例如 `store-user`

### 生产环境

配置生产环境变量，例如 `.env.production` 文件中定义这些变量， 配置和 `开发环境` 相同，
