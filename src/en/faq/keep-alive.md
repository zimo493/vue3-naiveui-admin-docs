---
title: KeepCache Manual Refresh Solution
tags: [Faq]
---

The project uses **tab caching**. In the menu management under system management, when a page is set to be cached, only the selected page will be cached.

## Overview

This document provides notes and troubleshooting methods for the cache handling mechanism in the `KeepCache.vue` component. This component dynamically manages KeepAlive cache by listening to `loadFlag` changes, ensuring that data is correctly updated when the page is refreshed.

- For example, the "Refresh" button on the tab's right-click menu

## Core Mechanism Explanation

### Cache Handling Process

1. **Listen for route cache changes**: Synchronize `routeStore.cacheRoutes` to local `currentCacheRoutes` in real time
2. **Listen for loadFlag changes**: When `loadFlag` changes from `false` to `true`, trigger cache handling
3. **Temporarily remove cache**: Remove the current route from `currentCacheRoutes`
4. **Restore cache**: Restore the cache list after `nextTick`

### Key Code Logic

```ts
// When loadFlag changes from false to true (page refresh complete)
if (!oldVal && newVal) {
  const currentRouteName = route.name as string;

  // If the current route is in the cache list, temporarily remove it to force re-render
  if (currentRouteName && routeStore.cacheRoutes.includes(currentRouteName)) {
    // Temporarily remove the current route from the cache
    currentCacheRoutes.value = routeStore.cacheRoutes.filter(
      (name) => name !== currentRouteName
    );

    // Restore the cache after the next tick
    nextTick(() => {
      currentCacheRoutes.value = [...routeStore.cacheRoutes];
    });
  }
}
```

## Notes

### Route Naming Convention

::: warning ⚠️ **Important**
Make sure the component's `name` property matches the route's `name`. This is key for `KeepAlive` caching.
:::

```vue{2}
<script setup lang="ts">
defineOptions({ name: "User" }); // Required
</script>
```

### Multi-level Menu Caching

Use the `KeepCache` component instead of `KeepAlive` to ensure each parent menu level has a `name` property.

::: tip 💡 Tip
If menu caching is enabled in the system menu and a child menu enables caching but the parent does not, the child menu's cache will still take effect.
:::

### Memory Leaks or Performance Issues

**Possible causes:**

- Too many cached components
- Uncleaned timers or event listeners inside components

**Solution:**

```vue
<!-- Limit cache count -->
<KeepAlive :include="currentCacheRoutes" :max="10">

</KeepAlive>
```

### Performance Monitoring

```javascript
// Monitor component render performance
const startTime = performance.now();

onMounted(() => {
  const endTime = performance.now();
  console.log(`Component render time: ${endTime - startTime}ms`);
});
```

## Best Practices

### 1. Use Cache Reasonably

- Only enable cache for pages that need to retain state
- Regularly clean up unnecessary cache
- Avoid caching components with large amounts of data

### 2. Data Management

- Use Pinia for global state management
- Check if data needs updating when the component is activated
- Implement incremental data updates instead of full refreshes

### 3. User Experience

- Provide clear refresh feedback
- Maintain consistent page state
- Handle loading states appropriately

## Summary

The cache handling mechanism of `KeepCache.vue` achieves forced refresh by precisely controlling the `include` list of KeepAlive. This is a relatively safe and controllable solution. During use, pay special attention to route naming conventions, component lifecycle management, and resource cleanup to ensure system stability and performance.

If you encounter problems, check step by step and enable debug logs to locate the specific cause. 