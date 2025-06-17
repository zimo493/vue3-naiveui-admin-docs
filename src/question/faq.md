# 常见问题

## 页面白屏

确保页面路径配置正确，确保页面保持 **单标签根节点**

::: tip 💡 提示
在 Vue.js 中，`<Transition>` 组件设计用于处理单个节点元素的过渡效果。当你在 `<Transition>` 中放置多个同级节点时，会导致过渡行为异常
:::

```vue [vue]
<!-- 错误示范 -->
<template>
  <div>hello vue</div>
  <div>hello vite</div>
  <div>hello preview</div>
</template>

<!-- 正确示范 -->
<template>
  <div> <!-- [!code ++] -->
    <div>hello vue</div>
    <div>hello vite</div>
    <div>hello preview</div>
  </div> <!-- [!code ++] -->
</template>
```