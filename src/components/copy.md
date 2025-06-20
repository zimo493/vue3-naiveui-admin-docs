# Copy 指令

## 介绍

Copy 指令采用 [`useClipboard`](https://vueuse.org.cn/core/useclipboard/#useclipboard) 实现，用于复制内容到剪贴板

::: warning ⚠️ 注意

#### 剪贴板 API 兼容性

- 剪贴板 API（如 `navigator.clipboard` ）在部分浏览器中只有在 `HTTPS` 或 `localhost` 下才可用。
- 如果你部署到服务器后用 `HTTP` 访问，很多现代浏览器会禁用剪贴板 API，导致 `isSupported.value` 为 `false`

#### 解决建议

- 确保使用 `HTTPS` 访问 ：将你的站点配置为 `HTTPS`，绝大多数浏览器只在 `HTTPS` 下开放剪贴板 API。
- 检查浏览器兼容性 ：确保你用的浏览器版本支持剪贴板 API。可以在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web) 文档 查看兼容性。
- 本地开发和生产环境差异 ：本地开发通常是 `localhost`，浏览器会放宽安全限制；生产环境如果不是 `HTTPS`，API 就不可用。

#### 临时方案

- 如果暂时无法上 `HTTPS`，可以考虑降级使用 `document.execCommand('copy')` 作为兼容方案，但该方法已被废弃且未来可能无法使用

:::

## 示例

```vue [vue]
<template>
  <div v-copy="msg">点击复制</div>
</template>

<script lang="ts" setup>
const msg = `Too many of us are not living our dreams because we are living our fears.`;
</script>
```
