---
title: Project Icon Usage
tags: [Icon, Tutorial]
---

## VUE Files

### Local Icons in Template (Works Offline)

This project uses [unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing) to automatically import `@iconify-json/icon-park-outline` icons. You can search for the icons you need at [icones](https://icones.js.org/collection/icon-park-outline).

::: info 💡 Tip
If you find an icon named `user`, you must use the `<{collection}-{icon} />` format to import it, otherwise it will not work.
:::

```vue [vue]
<!-- Usage -->
<icon-park-outline-user />
<IconParkOutlineUser />

<!-- Change style -->
<icon-park-outline-user style="font-size: 2em; color: red" />

<!-- Change style via Unocss -->
<icon-park-outline-user class="text-red text-2em" />
```

::: tip 💡 Tip
It is recommended to use the [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) plugin in VS Code for real-time icon display and improved development experience.
:::

### Network Icons in Template (Not Available Offline)

Automatically load network icons. You can use any icon from [icones](https://icones.js.org). This feature is based on [@iconify/vue](https://iconify.design/docs/icon-components/vue/) and [NIcon](https://www.naiveui.com/zh-CN/light/components/icon). **This method does not bundle icons into the project. Not available offline.**

::: info 💡 Tip
If you want to use `icon-park-outline:edit`
:::

```vue [vue]
<!-- Usage -->
<Icones icon="icon-park-outline:edit" />

<!-- Change style -->
<Icones icon="icon-park-outline:useeditr" :color="red" :size="22" />
```

::: details Props Type Declaration

```ts
interface iconPorps {
  /* Icon name */
  icon?: string;
  /* Icon color */
  color?: string;
  /* Icon size */
  size?: number;
  /* Icon depth */
  depth?: 1 | 2 | 3 | 4 | 5;
}
```

:::

## TS Files

### Local Icons in TS (Works Offline)

In some scenarios, you may not be able to use icons directly as components, such as in **ts files** or in the `script` section of **vue files** when adding icons to Naive components. In this case, you need to import the icon manually.

```vue [vue]
<script setup lang="ts">
import Plus from "~icons/icon-park-outline/plus";

const options = [
  {
    label: "Add",
    key: "plus",
    icon: () => h(Plus),
  },
];
</script>
```

### Network Icons in TS (Not Available Offline)

Same as above, but the icon is loaded via the network.

```vue [vue]
<script setup lang="ts">
import { renderIcon } from "@/utils";

const options = [
  {
    label: "Add",
    key: "plus",
    icon: renderIcon("icon-park-outline:plus"),
  },
];
</script>
```

::: info 💡 Tip
`renderIcon` returns an [h function](https://cn.vuejs.org/api/render-function.html#h) wrapped `@iconify/vue`, not a direct `VNode` node. Depending on your needs, you may use `renderIcon('{collection}:{icon}')` or `renderIcon('{collection}:{icon}')()`. The latter returns a direct `VNode` node.
:::

## SVG Icons

This project uses [unplugin-icons](https://github.com/unplugin/unplugin-icons#auto-importing) to automatically import svg icons. First, you need to add svg icons to `src/assets/svg-icons`.

::: info 💡 Tip
If you add a `logo.svg`, you can use it in the project. The custom import name must follow the format `svg-icons-{name}`.
:::

```vue [vue]
<!-- Usage -->
<SvgIconsLogo />

<!-- Change style via Unocss -->
<SvgIconsLogo class="text-2em" />
```

::: tip 💡 Tip
The default size for svg icons is `1.2em`. You can change this default behavior by modifying `build/pluginsOptions.ts`.
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

### Dynamically Import Local SVG Icons

Sometimes you may need to dynamically import svg icons. In this case, use the `renderIcon` function, and the icon name must start with the `local:` identifier.

```vue [vue]
<script setup lang="ts">
import { renderIcon } from "@/utils";

// Automatically import `/src/assets/svg-icons/logo.svg`
renderIcon("local:logo", { size: 20 });
</script>
```

In the template, use the `Icones` component to import

```vue [vue]
<!-- Usage -->
<Icones icon="local:logo" />

<!-- Change style -->
<Icones icon="local:logo" :color="red" :size="22" />
```
