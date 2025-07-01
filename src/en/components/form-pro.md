---
title: FormPro Form
description: Easily create a form with simple configuration
tags: [Component, Form]
---

- Encapsulated based on [NForm](https://www.naiveui.com/en-US/os-theme/components/form)

## Basic Usage

::: warning ⚠️ Note
The `FormPro` component is rarely used alone. It is generally used together with `SearchTable`, `Drawer`, and `Dialog`. See the following for more information:

- [SearchTable](/en/components/search-table)
- [DrawerForm](/en/components/drawer-form)
- [DialogForm](/en/components/dialog-form)
:::

```vue [vue]
<template>
  <FormPro v-model="modelValue" v-bind="formConfig" use-type="submit" />
</template>
<script lang="ts" setup>
import { useDict } from "@/hooks";

// Form field types
interface FormFields {
  name?: string;
  age?: number;
  sex: number;
}

// Form configuration
const formConfig = ref<TablePro.FormOption<FormFields>>({
  fields: [
    { field: "name", label: "Name" },
    { field: "age", label: "Age", type: "number" },
    {
      field: "sex",
      label: "Gender",
      type: "select",
      dict: "gender",
      placeholder: "Please select gender",
    },
  ],
  labelWidth: 60, // Form field label width
  // showLabel: false, // Whether to show label
});

// Form data
const modelValue = ref<FormFields>({
  sex: 1,
});
</script>
```

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| v-model or model-value | `Object` | Yes | | Form binding data |
| fields | [`Array<FormItem<T>>`](/en/components/form-pro#form-item-configuration-formitem-v) | Yes | | Form field configuration |
| rules | [`FormRules`](https://www.naiveui.com/en-US/os-theme/components/form#Form-Props) | No | `{}` | Validation rules for form items |
| show-label | `Boolean` | No | `true` | Whether to show label |
| label-width | `Number` | No | `auto` | Form field label width, effective when `show-label` is `true` |
| label-placement | `left \| top` | No | `left` | Label position |
| label-align | `left \| right` | No | `right` | Label alignment |
| is-look | `Boolean` | No | `false` | View-only mode |
| use-type | `search \| submit` | No | `search` | Form usage mode. In `submit` mode, the `Search` and `Reset` buttons are not displayed |
| show-feedback | `Boolean` | No | `false` | Whether to show error messages for form fields. Defaults to `false` in `is-look` mode, `true` when submitting the form |
| gutter | `Number` | No | `16` | Spacing between form fields. Defaults to `12` in `is-look` mode, `0` for `y-gap` in `submit` mode |
| Others | [`Form-Props`](https://www.naiveui.com/en-US/os-theme/components/form#Form-Props) | No | | `NForm` component props |

### FormOption

Use `v-bind` to bind `form-config`

| Name | Description | Name | Description |
| --- | --- | --- | --- |
| `fields` | Form field configuration (same as above) | `rules` | Validation rules for form fields (same as above) |
| `label-width` | Form field label width (same as above) | `show-label` | Whether to show label (same as above) |
| `label-placement` | Label position (same as above) | `label-align` | Label alignment (same as above) |
| `show-feedback` | Whether to show error messages (same as above) | `gutter` | Spacing (same as above) |

### Form Item Configuration `FormItem<V>`

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| field | `keyof V` | Yes | `/` | Form field name |
| label-message | `String` | No | `""` | Label tip message |
| type | [`FormItemType`](/en/components/form-pro#form-item-types-formitemtype) | No | `input` | Form field type |
| label | `String` | No | `""` | Input label |
| show-label | `Boolean` | No | `true` | Whether to show label |
| col-span | `Number` | No | Default `24` for `submit` mode, otherwise `4` | Field width, max: 24 |
| disabled | `Boolean` | No | `false` | Whether editable |
| readonly | `Boolean` | No | `false` | Read-only |
| clearable | `Boolean` | No | `true` | Whether clearable |
| placeholder | `String` | No | `Please enter {label}` or `Please select {label}` | Input placeholder |
| options | [`Array<ItemOption>`](/en/components/form-pro#selector-option-itemoption) | No | `[]` | Options for selector |
| dict | `String` | No | `""` | Dictionary options. If passed, options will be fetched from the dictionary. `options` will be ignored |
| is-hidden | `Boolean` | No | `false` | Whether hidden |
| slot-name | `String` | No | `""` | Custom slot name (priority display) |
| other-options | `{ [key: string]: any }` | No | `{}` | Other configuration for form item |
| other-events | `{ [key: string]: (...args: any[]) => any }` | No | `{}` | Form item event configuration |

### Form Item Types `FormItemType`

| Name | Type | Name | Type |
| --- | --- | --- | --- |
| input | `Text Input` | number | `Number Input` |
| password | `Password Input` | textarea | `Textarea` |
| select | `Select` | datepicker | `Date Picker` |
| timepicker | `Time Picker` | switch | `Switch` |
| radio | `Radio` | checkbox | `Checkbox` |
| tree-select | `Tree Select` | text | `Text` |

### Selector Option `ItemOption`

| Name | Type | Description |
| --- | --- | --- |
| label | `String` | Option label |
| value | `String` | Option value |
| disabled | `Boolean` | Whether disabled |

## Slots

| Name | Params | Description |
| --- | --- | --- |
| header | `()` | Content above the form |

## Methods

::: tip 💡 Note
The type of `val` returned by the triggered method is the type bound to the passed `v-model` value
:::

| Name | Type | Description |
| --- | --- | --- |
| submit | `(val) => void` | Trigger search |
| reset | `(val) => void` | Reset form |
