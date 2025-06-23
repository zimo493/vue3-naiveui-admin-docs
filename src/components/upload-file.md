---
title: 上传 UploadFile
---

## 介绍

文件上传，总归是会用到的。

- 基于 [NUpload](https://www.naiveui.com/zh-CN/os-theme/components/upload) 封装

## 类型定义

::: code-group

```ts [绑定的文件列表类型]
/**
 * 文件列表类型
 * @property name 文件名
 * @property url 文件路径
 */
interface FileInfo {
  /** 文件名 */
  name: string;
  /** 文件路径 */
  url: string;
}
```

```ts [移除文件返回的类型]
/**
 * 移除文件类型
 * @property idx 文件索引
 * @property name 文件名
 * @property url 文件路径
 */
interface RemoveFile {
  /** 文件名 */
  name: string;
  /** 文件路径 */
  url: string;
  /** 文件索引 */
  idx: number;
}
```

:::

## 基本使用

::: code-group

```vue [单文件上传]
<template>
  <UploadFile
    :value="imgUrl"
    :limit="1"
    @upload="(val) => (imgUrl = val.url)"
    @remove="imgUrl = ''"
  />
</template>

<script setup lang="ts">
const imgUrl = ref<string>(""); // 图片地址，字符串类型
</script>
```

```vue [多文件上传]
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
const imgUrls = ref<string[]>([]); // 图片地址，数组类型
</script>
```

:::

::: info 💡 提示
这仅是一个普通用法，更多用法请查看 [ 案例](https://gitee.com/zimo493/vue3-naiveui-admin/blob/main/src/views/demo/upload.vue)
:::

## Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | :--: | --- | --- |
| value | `string[] \| string \| FileInfo[] \| FileInfo` | 否 | `[]` | 文件列表 |
| data | `Object` | 否 | `{}` | 提交表单需要附加的数据 |
| name | `String` | 否 | `file` | 上传文件的参数名 |
| limit | `Number` | 否 | `10` | 文件上传数量限制 |
| max-file-size | `Number` | 否 | `10` | 单个文件的最大允许大小 |
| accept | `String` | 否 | `image/*` | 允许上传的文件类型，参考 [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file#accept) |
| type | [`NUpload[list-type]`](/components/form-pro#上传类型-uploadtype) | 否 | `image-card` | 文件列表的内建样式 |
| multiple | `Boolean` | 否 | `true` | 是否支持多选，在 `limit` 为 `1` 时无效 |
| drag | `Boolean` | 否 | `false` | 是否支持拖拽上传 |
| drag-options | [`DragOptions`](/components/upload-file#dragoptions) | 否 | [`DragOptions`](/components/upload-file#dragoptions) | 拖拽上传配置，仅在 `drag` 为 `true` 时有效 |
| 其他参数 | [`Upload-Props`](https://www.naiveui.com/zh-CN/os-theme/components/upload#Upload-Props) | 否 | | `NUpload` 组件参数 |

### DragOptions

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | `String` | `ep:upload-filled` | 图标 |
| iconSize | `Number` | `50` | 图标大小 |
| title | `String` | `点击此处 或 拖动文件到该区域进行上传` | 标题 |

## Slots

| 属性 | 参数 | 说明 |
| --- | --- | --- |
| default | `()` | 默认插槽，触发器等 |

## Events

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| upload | `(val: FileInfo) => val` | 文件上传成功回调 |
| remove | `(val: RemoveFile) => val` | 移除文件回调 |
