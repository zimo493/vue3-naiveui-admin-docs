---
title: UploadFile
description: File upload, always useful.
tags: [Component, Tool]
---

- Encapsulated based on [NUpload](https://www.naiveui.com/en-US/os-theme/components/upload)

## Type Definitions

::: code-group

```ts [Type for bound file list]
/**
 * File list type
 * @property name File name
 * @property url File path
 */
interface FileInfo {
  /** File name */
  name: string;
  /** File path */
  url: string;
}
```

```ts [Type for removed file]
/**
 * Removed file type
 * @property idx File index
 * @property name File name
 * @property url File path
 */
interface RemoveFile {
  /** File name */
  name: string;
  /** File path */
  url: string;
  /** File index */
  idx: number;
}
```

:::

## Basic Usage

::: code-group

```vue [Single file upload]
<template>
  <UploadFile
    :value="imgUrl"
    :limit="1"
    @upload="(val) => (imgUrl = val.url)"
    @remove="imgUrl = ''"
  />
</template>

<script setup lang="ts">
const imgUrl = ref<string>(""); // Image URL, string type
</script>
```

```vue [Multiple file upload]
<template>
  <UploadFile
    :value="imgUrls"
    @upload="(val) => imgUrls.push(val.url)"
    @remove="
      (val) => {
        if (imgUrls[idx] === val.url) {
          imgUrls.splice(idx, 1);
        }
      }
    "
  />
</template>

<script setup lang="ts">
const imgUrls = ref<string[]>([]); // Image URLs, array type
</script>
```

:::

::: info 💡 Tip
This is just a common usage. For more, see [example](https://gitee.com/zimo493/vue3-naiveui-admin/blob/main/src/views/demo/upload.vue)
:::

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| value | `string[]`<br/>`string`<br/>`FileInfo[]`<br/>`FileInfo` | No | `[]` | File list |
| data | `Object` | No | `{}` | Data to be attached to the form submission |
| name | `String` | No | `file` | Parameter name for uploaded file |
| limit | `Number` | No | `10` | File upload quantity limit |
| max-file-size | `Number` | No | `10` | Maximum allowed size for a single file |
| accept | `String` | No | `image/*` | Allowed file types, see [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#accept) |
| type | [`NUpload[list-type]`](/en/components/form-pro#upload-type) | No | `image-card` | Built-in style for file list |
| multiple | `Boolean` | No | `true` | Whether to support multiple selection, invalid when `limit` is `1` |
| drag | `Boolean` | No | `false` | Whether to support drag upload |
| drag-options | [`DragOptions`](/en/components/upload-file#dragoptions) | No | [`DragOptions`](/en/components/upload-file#dragoptions) | Drag upload configuration, only valid when `drag` is `true` |
| Others | [`Upload-Props`](https://www.naiveui.com/en-US/os-theme/components/upload#Upload-Props) | No | | `NUpload` component props |

### DragOptions

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| icon | `String` | `ep:upload-filled` | Icon |
| iconSize | `Number` | `50` | Icon size |
| title | `String` | `Click here or drag files to this area to upload` | Title |

## Slots

| Name | Params | Description |
| --- | --- | --- |
| default | `()` | Default slot, trigger, etc. |

## Events

| Name | Type | Description |
| --- | --- | --- |
| upload | `(val: FileInfo) => val` | Callback for successful file upload |
| remove | `(val: RemoveFile) => val` | Callback for file removal |
