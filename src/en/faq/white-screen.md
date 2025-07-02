---
title: White Screen Issue
tags: [Error Troubleshooting]
---

## Console Error Troubleshooting

- **Console Panel**: Check for JS errors
- **Network Panel**: Check resource loading status (404 marked in red)
- **Vue Devtools**: Check if the component tree is rendered

## Route Path Configuration Errors

- Route path configuration errors (e.g., `component` not imported correctly)
- No default route set (`path: "/"`)
- Dynamic route loading failed (e.g., wrong path in `() => import(...)`)

```ts [src/router/modules/routes.ts]
const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"), // Make sure the path is correct
  },
];
```

## Abnormal Route Transition Behavior

Make sure the page has a **single root tag**

::: tip 💡 Tip
In Vue.js, the `<Transition>` component is designed to handle transitions for a single node element. If you place multiple sibling nodes inside `<Transition>`, it will cause abnormal transition behavior.
:::

```vue [vue]
<!-- Incorrect Example -->
<template> <!-- [!code error] -->
  <!-- Comments also count as a node [!code error] -->
  <div>hello vue</div> <!-- [!code error] -->
  <div>hello vite</div> <!-- [!code error] -->
  <div>hello preview</div> <!-- [!code error] -->
</template> <!-- [!code error] -->

<!-- Correct Example -->
<template>
  <div> <!-- [!code ++] -->
    <!-- Comments also count as a node -->
    <div>hello vue</div>
    <div>hello vite</div>
    <div>hello preview</div>
  </div> <!-- [!code ++] -->
</template>
```

## Component Rendering Issues

- Undefined variables in the template
- Asynchronous component loading failed (e.g., API error causes component not to render)

```vue [vue]
<template>
  <!-- Add v-if to avoid undefined data -->
  <div v-if="data">{{ data.content }}</div>

  <!-- Use Suspense to handle async components -->
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

## Environment Variable Issues

- `.env` variables do not start with `VITE_`
- Production environment variables not configured correctly

```ini [.env.production]
# .env.production
VITE_API_BASE = 'https://prod.api.com' # Correct prefix
```

```ts
// Use variable
const apiUrl = import.meta.env.VITE_API_BASE;
```
