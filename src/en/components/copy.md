---
title: Copy Directive
tags: [Directive]
---

## Introduction

The Copy directive uses [`useClipboard`](https://vueuse.org/core/useclipboard/#useclipboard) to copy content to the clipboard.

::: warning ⚠️ Note

#### Clipboard API Compatibility

- The Clipboard API (such as `navigator.clipboard`) is only available in some browsers under `HTTPS` or `localhost`.
- If you deploy to a server and use `HTTP`, many modern browsers will disable the Clipboard API, causing `isSupported.value` to be `false`.

#### Recommendations

- Ensure you use `HTTPS`: Configure your site to use `HTTPS`, as most browsers only enable the Clipboard API under `HTTPS`.
- Check browser compatibility: Make sure your browser version supports the Clipboard API. See [MDN](https://developer.mozilla.org/en-US/docs/Web) for compatibility.
- Local development vs. production: Local development is usually on `localhost`, so browsers relax security restrictions; in production, if not `HTTPS`, the API will not be available.

#### Temporary Solution

- If you can't use `HTTPS` for now, consider using `document.execCommand('copy')` as a fallback, but this method is deprecated and may not be available in the future.

:::

## Example

```vue [vue]
<template>
  <div v-copy="msg">Click to copy</div>
</template>

<script lang="ts" setup>
const msg = `Too many of us are not living our dreams because we are living our fears.`;
</script>
``` 