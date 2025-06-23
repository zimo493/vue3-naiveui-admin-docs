---
title: Markdown Extension Examples
---

<script setup>
import { NSpace, NButton, NTag } from 'naive-ui'
</script>

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

## NaiveUI

> Button

<NSpace>
  <NButton>Default</NButton>
  <NButton type="primary">Primary</NButton>
  <NButton type="info">Info</NButton>
  <NButton type="success">Success</NButton>
  <NButton type="warning">Warning</NButton>
  <NButton type="error">Error</NButton>
</NSpace>

> Tag

<NSpace>
  <NTag :bordered="false">
  爱在西元前
  </NTag>
  <NTag :bordered="false" type="success">
  不该
  </NTag>
  <NTag :bordered="false" type="warning">
  超人不会飞
  </NTag>
  <NTag :bordered="false" type="error">
  手写的从前
  </NTag>
  <NTag :bordered="false" type="info">
  哪里都是你
  </NTag>
</NSpace>

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
