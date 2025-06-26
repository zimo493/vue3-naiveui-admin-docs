---
title: 页面白屏
tags: [错误排查]
---

## 控制台错误排查

- **Console 面板**：检查 JS 错误
- **Network 面板**：查看资源加载状态（404 红色标记）
- **Vue Devtools**：检查组件树是否渲染

## 路由路径配置错误

- 路由路径配置错误（如 `component` 未正确导入）
- 未设置默认路由（`path: "/"`）
- 动态路由加载失败（如 `() => import(...)` 路径错误）

```ts [src/router/modules/ruotes.ts]
const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"), // 确保路径正确
  },
];
```

## 路由过渡行为异常

确保页面保持 **单标签根节点**

::: tip 💡 提示
在 Vue.js 中，`<Transition>` 组件设计用于处理单个节点元素的过渡效果。当你在 `<Transition>` 中放置多个同级节点时，会导致过渡行为异常
:::

```vue [vue]
<!-- 错误示范 -->
<template> <!-- [!code error] -->
  <!-- 注释也算一个节点 [!code error] -->
  <div>hello vue</div> <!-- [!code error] -->
  <div>hello vite</div> <!-- [!code error] -->
  <div>hello preview</div> <!-- [!code error] -->
</template> <!-- [!code error] -->

<!-- 正确示范 -->
<template>
  <div> <!-- [!code ++] -->
    <!-- 注释也算一个节点 [!code --] -->
    <div>hello vue</div>
    <div>hello vite</div>
    <div>hello preview</div>
  </div> <!-- [!code ++] -->
</template>
```

## 组件渲染异常

- 模板中存在未定义的变量
- 异步组件加载失败（如 API 错误导致组件未渲染）

```vue [vue]
<template>
  <!-- 添加 v-if 避免未定义数据 -->
  <div v-if="data">{{ data.content }}</div>

  <!-- 使用 Suspense 处理异步组件 -->
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

## 环境变量问题

- `.env` 变量未以 `VITE_` 开头
- 生产环境变量未正确配置

```ini [.env.production]
# .env.production
VITE_API_BASE = 'https://prod.api.com' # 正确前缀
```

```ts
// 使用变量
const apiUrl = import.meta.env.VITE_API_BASE;
```
