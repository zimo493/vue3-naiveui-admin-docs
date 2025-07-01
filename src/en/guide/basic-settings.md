---
title: Basic Project Settings
tags: [Project, Configuration]
---

## Change Project Name

To change the project name, you need to update two files: `index.html` and `package.json`

- **Update** `index.html`

In the root directory's `index.html` file, find the `<title>` tag and replace its content with the new project name.

```html [index.html]
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/logo.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>vue3-naiveui-admin</title> <!-- [!code --] -->
  <title>Custom Content</title> <!-- [!code ++] -->
</head>
```

- **Update** `package.json`

In the `package.json` file, find the `"name"` field and replace its value with the new project name.

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

- **Dynamic Title** Configuration

If you do not want the project to have dynamic page titles, comment out the dynamic title configuration in `src/router/modules/guard.ts`.

::: code-group

```ts [src/router/modules/guard.ts]
router.afterEach((to) => {
  // Remove the following setting
  document.title = to.meta?.title ? to.meta?.title : pkg.name; // [!code --]
});
```

:::

## Environment Variables

### Development Environment

Development environment variables are variables that are only switched during development, such as setting the request prefix. Define these variables in the `.env.development` file.

#### VITE_BASE_URL

- **Type**: `string`
- **Default**: `/`

If your project is deployed under a subpath, set `VITE_BASE_URL` to the subpath, such as `/admin`.

#### VITE_APP_PORT

- **Type**: `number`
- **Default**: `5173`

By default, Vite runs the dev server on port `5173`. Set `VITE_APP_PORT` to your project port, such as `8080`.

#### VITE_APP_BASE_API

- **Type**: `string`
- **Default**: `/dev-api`

Configure the API request prefix, such as `/dev-api`.

#### VITE_APP_TIMEOUT

- **Type**: `number`
- **Default**: `6000`

Configure the API request timeout, such as `6000`.

#### VITE_APP_API_URL

- **Type**: `string`
- **Default**: `http://localhost:8989`

Proxy forwarding real API address.

#### VITE_APP_WS_ENDPOINT

- **Type**: `string`
- **Default**: `ws://localhost:8989/ws`

Configure the WebSocket address.

#### VITE_DEFAULT_LANG (in progress)

- **Type**: `zhCN` `enUS` `zhTW`
- **Default**: `zhCN`

Configure the default language, default is Simplified Chinese.

#### VITE_STORAGE_PREFIX

- **Type**: `string`
- **Default**: `store-`

Set the global storage prefix, default is `store-`. When using `src\utils\storage.ts`, the data in `localStorage` and `sessionStorage` will be prefixed with `store-`, for example, `store-user`.

### Production Environment

Configure production environment variables, such as those defined in the `.env.production` file. The configuration is the same as the `Development Environment`.
