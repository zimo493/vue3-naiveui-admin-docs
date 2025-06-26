---
title: 项目图标使用
tags: [图标, 教程]
---

## VUE 文件

### 模板中本地图标（离线有效）

本项目使用 [unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing) 来自动引入 `@iconify-json/icon-park-outline` 图标，可前往 [icones](https://icones.js.org/collection/icon-park-outline) 来寻找你需要的图标。

::: info 💡 提示
你找到一个图标 `user`，必须使用 `<{collection}-{icon} />` 格式来引入它，否则无效
:::

```vue [vue]
<!-- 用法 -->
<icon-park-outline-user />
<IconParkOutlineUser />

<!-- 修改样式 -->
<icon-park-outline-user style="font-size: 2em; color: red" />

<!-- 通过 Unocss 修改样式 -->
<icon-park-outline-user class="text-red text-2em" />
```

::: tip 💡 提示
在 VS Code 中推荐使用 [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) 插件实时展示图标，提高开发体验
:::

### 模板中网络图标（离线无效）

自动加载网络图标，可以使用 [icones](https://icones.js.org) 中的所有图标，此功能是基于 [@iconify/vue](https://iconify.design/docs/icon-components/vue/) 和 [NIcon](https://www.naiveui.com/zh-CN/light/components/icon) 实现的。**该方式图标不会打包到项目中。离线无效**

::: info 💡 提示
如果你想使用 `icon-park-outline:edit`
:::

```vue [vue]
<!-- 用法 -->
<Icones icon="icon-park-outline:edit" />

<!-- 修改样式 -->
<Icones icon="icon-park-outline:useeditr" :color="red" :size="22" />
```

::: details Props 类型声明

```ts
interface iconPorps {
  /* 图标名称 */
  icon?: string;
  /* 图标颜色 */
  color?: string;
  /* 图标大小 */
  size?: number;
  /* 图标深度 */
  depth?: 1 | 2 | 3 | 4 | 5;
}
```

:::

## TS 文件

### TS 中本地图标（离线有效）

有些场景可能无法直接使用组件的方式来使用图标，比如在 **ts 文件** 或者 **vue 文件** 的 `script` 中配合 **Naive 组件** 添加一些图标渲染，这时需要通过手动引入的方式来使用图标。

```vue [vue]
<script setup lang="ts">
import Plus from "~icons/icon-park-outline/plus";

const options = [
  {
    label: "添加",
    key: "plus",
    icon: () => h(Plus),
  },
];
</script>
```

### TS 中网络图标（离线无效）

与上面场景一样，但是图标通过网络加载

```vue [vue]
<script setup lang="ts">
import { renderIcon } from "@/utils";

const options = [
  {
    label: "添加",
    key: "plus",
    icon: renderIcon("icon-park-outline:plus"),
  },
];
</script>
```

::: info 💡 提示
`renderIcon` 返回一个用 [h 函数](https://cn.vuejs.org/api/render-function.html#h) 包裹的 `@iconify/vue`，并不是直接返回 `VNode` 节点，根据需要，它的用法可能是 `renderIcon('{collection}:{icon}')` 或者 `renderIcon('{collection}:{icon}')()`，后一种方法是直接返回 `VNode` 节点。
:::

## SVG 图标

本项目使用 [unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing) 来自动引入 svg 图标，首先你需要在 `src/assets/svg-icons` 中加入 svg 图标

::: info 💡 提示
你添加了一个 `logo.svg`，这样在项目中使用，自定引入的名字需符合格式 `svg-icons-{name}`
:::

```vue [vue]
<!-- 用法 -->
<SvgIconsLogo />

<!-- 通过 Unocss 修改样式 -->
<SvgIconsLogo class="text-2em" />
```

::: tip 💡 提示
svg 图标默认为 `1.2em` 大小，你可用通过修改 `build/pluginsOptions.ts` 来更改这个默认行为
:::

:::code-group

```ts{7} [build/pluginsOptions.ts]
Icons({
  defaultStyle: 'display:inline-block',
  compiler: 'vue3',
  customCollections: {
    'svg-icons': FileSystemIconLoader(
      'src/assets/svg-icons',
      svg => svg.replace(/^<svg /, '<svg fill="currentColor" width="1.2em" height="1.2em"')
    ),
  },
})
```

:::

### 动态引入本地 svg 图标

有时可能需要动态引入 svg 图标，这时需要使用 `renderIcon` 函数，传入的图标名字必须以 `local:` 标识作为开头

```vue [vue]
<script setup lang="ts">
import { renderIcon } from "@/utils";

// 自动引入 `/src/assets/svg-icons/logo.svg`
renderIcon("local:logo", { size: 20 });
</script>
```

在模板中则使用 `Icones` 组件来引入

```vue [vue]
<!-- 用法 -->
<Icones icon="local:logo" />

<!-- 修改样式 -->
<Icones icon="local:logo" :color="red" :size="22" />
```
