---
title: KeepCache 缓存组件手动刷新解决方案
tags: [错误排查]
---

项目中采用 **`页签缓存`** 方式，系统管理下的菜单管理中设置页面需要缓存时，被选中的页面才会缓存。

## 概述

本文档针对 `KeepCache.vue` 组件中的缓存处理机制提供注意事项和常见问题的排除方法。该组件通过监听 `loadFlag` 变化来动态管理 KeepAlive 缓存，确保页面刷新时能够正确更新数据。

- 例如右键页签的 `刷新` 按钮

## 核心机制说明

### 缓存处理流程

1. **监听路由缓存变化**：实时同步 `routeStore.cacheRoutes` 到本地 `currentCacheRoutes`
2. **监听 loadFlag 变化**：当 `loadFlag` 从 `false` 变为 `true` 时触发缓存处理
3. **临时移除缓存**：将当前路由从 `currentCacheRoutes` 中移除
4. **恢复缓存**：在 `nextTick` 后恢复缓存列表

### 关键代码逻辑

```ts
// 当loadFlag从false变为true时（页面刷新完成）
if (!oldVal && newVal) {
  const currentRouteName = route.name as string;

  // 如果当前路由在缓存列表中，临时移除它以强制重新渲染
  if (currentRouteName && routeStore.cacheRoutes.includes(currentRouteName)) {
    // 临时从缓存中移除当前路由
    currentCacheRoutes.value = routeStore.cacheRoutes.filter(
      (name) => name !== currentRouteName
    );

    // 下一个tick后恢复缓存
    nextTick(() => {
      currentCacheRoutes.value = [...routeStore.cacheRoutes];
    });
  }
}
```

## 注意事项

### 路由命名规范

::: warning ⚠️ **重要**
确保组件的 `name` 属性与路由的 `name` 一致，这是 `KeepAlive` 缓存的关键
:::

```vue{2}
<script setup lang="ts">
defineOptions({ name: "User" }); // 必须
</script>
```

### 多级菜单缓存

使用 `KeepCache` 组件代替 `KeepAlive`，确保每一级的父级菜单都有 `name` 属性

::: tip 💡 提示
在系统菜单中开启菜单缓存时如果子菜单开启缓存，父级菜单没有开启缓存，则子菜单的缓存依然会生效
:::

### 内存泄漏或性能问题

**可能原因：**

- 缓存的组件过多
- 组件内部有未清理的定时器或事件监听

**解决方案：**

```vue
<!-- 限制缓存数量 -->
<KeepAlive :include="currentCacheRoutes" :max="10">

</KeepAlive>
```

### 性能监控

```javascript
// 监控组件渲染性能
const startTime = performance.now();

onMounted(() => {
  const endTime = performance.now();
  console.log(`组件渲染耗时: ${endTime - startTime}ms`);
});
```

## 最佳实践

### 1. 合理使用缓存

- 只对需要保持状态的页面启用缓存
- 定期清理不必要的缓存
- 避免缓存包含大量数据的组件

### 2. 数据管理

- 使用 Pinia 管理全局状态
- 在组件激活时检查数据是否需要更新
- 实现数据的增量更新而非全量刷新

### 3. 用户体验

- 提供明确的刷新反馈
- 保持页面状态的一致性
- 合理处理加载状态

## 总结

`KeepCache.vue` 的缓存处理机制通过精确控制 KeepAlive 的 include 列表来实现强制刷新，这是一个相对安全和可控的方案。在使用过程中，需要特别注意路由命名规范、组件生命周期管理和资源清理，以确保系统的稳定性和性能。

如果遇到问题，建议逐一检查，并开启调试日志来定位具体原因。
