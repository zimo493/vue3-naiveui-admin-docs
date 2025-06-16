# FormPro 组件

## 介绍

表单组件封装，基于 [NForm](https://www.naiveui.com/zh-CN/os-theme/components/form) 封装

## 基本使用案例

::: warning
`FormPro` 组件单独使用情况较少，一般配合 `SearchTable` `Drawer` `Dialog` 使用，可跳转到以下内容查看
:::

- [SearchTable](/guide/search-table)
- [Drawer](/guide/drawer-form)
- [Dialog](/guide/dialog-form)

```vue
<template>
  <FormPro v-model="modelValue" v-bind="formConfig" use-type="submit" />
</template>
<script lang="ts" setup>
import { useDict } from "@/hooks";

// 表单字段类型
interface FormFields {
  name?: string;
  age?: number;
  sex: number;
}

// 表单配置
const formConfig = ref<TablePro.FormOption<FormFields>>({
  fields: [
    { field: "name", label: "姓名", type: "input" },
    { field: "age", label: "年龄", type: "number" },
    {
      field: "sex",
      label: "性别",
      type: "select",
      dict: "gender",
      placeholder: "请选择性别",
    },
  ],
  labelWidth: 60, // 表单字段标签宽度
  // showLabel: false, // 是否显示标签
});

// 表单数据
const modelValue = ref<FormFields>({
  sex: 1,
});
</script>
```

## API

### Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model 或 model-value | `Object` | 是 | `/` | 表单绑定数据 |
| fields | [`Array<FormItem<T>>`](/guide/form-pro#表单项配置-formitem-v) | 是 | `""` | 表单字段配置项 |
| rules | [`FormRules`](https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props) | 否 | `{}` | c |
| show-label | `Boolean` | 否 | `true` | 是否显示标签 |
| label-width | `Number` | 否 | `auto` | 表单字段标签宽度，在 `show-label` 为 `true` 时有效 |
| label-placement | `left / top` | 否 | `left` | 表单字段标签的位置 |
| label-align | `left / right` | 否 | `right` | 表单字段标签的对齐方式 |
| is-look | `Boolean` | 否 | `false` | 是否为查看模式 |
| use-type | `search / submit` | 否 | `search` | 表单使用方式，在 `submit` 模式下不会显示 `搜索` 和 `重置` 按钮 |` |
| show-feedback | `Boolean` | 否 | `false` | 是否显示表单字段的错误信息，`is-look` 为 `true` 时默认为 `false`， 提交表单时默认为 `true` |
| gutter | `Number` | 否 | `16` | 表单字段的间隔。在 `is-look` 为 `true` 时默认为 `12`，在 `use-type` 为 `submit` 时 `y-gap` 默认为 `0`|

### FormOption

使用 `v-band` 绑定 `form-config`

| 名称 | 说明 | 名称 | 说明 |
| --- | --- | --- | --- |
| `fields` | 表单字段配置项 `同上` | `rules` | 表单字段验证规则 `同上` |
| `label-width` | 表单字段标签宽度 `同上` | `show-label` | 是否显示标签 `同上` |
| `label-placement` | 标签位置 `同上` | `label-align` | 标签对齐方式 `同上` |
| `show-feedback` | 是否显示错误提示 `同上` | `gutter` | 栅格间隔 `同上` |


### 表单项配置 `FormItem<V>`

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| field | `keyof V & "dateRange"` | 是 | `/` | 表单字段名称 |
| label-message | `String` | 否 | `""` | 表单字段标签提示信息 |
| type | [`FormItemType`](/guide/form-pro#表单项类型-formitemtype) | 否 | `input` | 表单字段标签 |
| label | `String` | 否 | `""` | 输入框标题 |
| show-label | `Boolean` | 否 | `true` | 是否显示标签 |
| col-span | `Number` | 否 | 在 `use-type` 为 `submit` 默认 `24`，否则 `4` | 表单字段宽度，最大值：24 |
| disabled | `Boolean` | 否 | `false` | 是否可修改 |
| readonly | `Boolean` | 否 | `false` | 是否只读 |
| clearable | `Boolean` | 否 | `true` | 是否可清空 |
| placeholder | `String` | 否 | `请输入{label}` 或 `请选择{label}` | 输入框提示信息 |
| options | [`Array<ItemOption>`](/guide/form-pro#选择器选项-itemoption) | 否 | `[]` | 选择器的选项 |
| dict | `String` | 否 | `""` | 字典选项，传递后会从字典中获取选项，`options` 将无效 |
| is-hidden | `Boolean` | 否 | `false` | 是否隐藏 |
| slot-name | `String` | 否 | `""` | 自定义插槽名称 `优先展示` |
| other-options | `{ [key: string]: any }` | 否 | `{}` | 表单项其他配置 |
| other-events | `{ [key: string]: (...args: any[]) => any }` | 否 | `{}` | 表单事件配置 |

### 表单项类型 `FormItemType`
| 名称 | 类型 | 名称 | 类型 |
| --- | --- | --- | --- |
| input | `文本输入框` | number | `数字输入框` |
| password | `密码输入框` | textarea | `多行文本输入框` |
| select | `下拉选择器` | datepicker | `日期选择器` |
| timepicker | `时间选择器` | switch | `开关` |
| radio | `单选框` | checkbox | `复选框` |
| tree-select | `树形选择器` | text | `文本` |


### 选择器选项 `ItemOption`
| 名称 | 类型 | 说明 |
| --- | --- | --- |
| label | `String` | 选项标签 |
| value | `String` | 选项值 |
| disabled | `Boolean` | 是否禁用 |