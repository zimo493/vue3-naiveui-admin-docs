---
title: TablePro
description: The SearchTable component includes form, table, and pagination components
tags: [Component, Form, Table]
---

- The search form is encapsulated based on [FormPro](/en/components/form-pro)
- The table uses the [NDataTable](https://www.naiveui.com/en-US/os-theme/components/data-table) component
- Pagination is encapsulated based on [NPagination](https://www.naiveui.com/en-US/os-theme/components/pagination)

## Basic Usage

```vue [vue]
<template>
  <TablePro
    v-model="queryParams"
    :form-config="formConfig"
    :columns="columns"
    :table-data="tableData"
    :total="total"
    :loading="loading"
    :row-key="(row) => row.id"
    @query="getList"
    @reset="getList"
  />
</template>

<script lang="ts" setup>
/** Query parameters */
const queryParams = ref<DemoFormModel>({});

const loading = ref(false); // Loading state
const tableData = ref<User.VO[]>([]); // Table data
const total = ref<number>(0); // Total number of table data

/** Get table data */
const getList = async () => {
  try {
    loading.value = true;
    const { data } = await getUserList(queryParams.value);
    tableData.value = data.list;
    total.value = data.total;
  } finally {
    loading.value = false;
  }
};

/** Search form configuration */
const formConfig: FormPro.FormItemConfig[] = [
  { name: "username", label: "Username" },
  { name: "nickname", label: "Nickname" },
];

/** Table column configuration */
const columns = ref<DataTableColumns<User.VO>>([
  { title: "Username", key: "username", align: "center" },
  { title: "Nickname", key: "nickname", align: "center" },
  // ......
]);
</script>
```

## No Search

Do not pass the `v-model` and `form-config` properties.

## No Pagination

Do not pass the `total` property.

## Form Configuration

If the default form configuration does not meet your needs, you can use the `form` property for configuration. For example, to set the label width, add validation, etc.

::: tip 💡 Note
If you want to configure form properties individually, move the original `:form-config="formConfig"` into `form` and use `config` instead.
:::

```vue [vue]
<template>
  <TablePro
    v-model="queryParams"
    :form="{
      config: formConfig,
      props: { rules, labelWidth: 100 },
    }"
    :columns="columns"
    :table-data="tableData"
    :total="total"
    :loading="loading"
    :row-key="(row) => row.id"
    @query="getList"
    @reset="getList"
  />
</template>

<script lang="ts" setup>
const rules = {
  // Fields to validate
};
</script>
```

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | :--: | --- |
| v-model or model-value | `object` | No | | Search parameters |
| form-config | [FormItemConfig[]](/en/components/form-pro#formitemconfig) | No | | Search form item configuration |
| columns | [columns](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Props) | No | `[]` | Columns to display |
| table-data | [data](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Props) | No | `[]` | Data to display |
| total | `number` | No | `0` | Total number of data |
| loading | `boolean` | No | `false` | Loading state |
| row-key | [row-key](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Props) | No | `undefined` | Unique row identifier |
| table-props | [DataTable Props](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Props) | No | `{}` | Additional table properties |
| show-table | `boolean` | No | `true` | Whether to show the table |
| operation-span | `number` | No | `4` | Operation column grid width |
| operation-button-position | `left`, `right` | No | `right` | Operation button position |
| pagination-position | `left`, `center`, `right` | No | `left` | Pagination position |
| collapse-rows | `number` | No | `3` | Collapse search item breakpoint |
| form | [FormPro Props](/en/components/table-pro#formpro-props) | No | `{}` | Form configuration options |

::: tip 💡 Note

- `table-props` accepts all [`DataTable Props`](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Props) except `data` and `columns`
- `operation-span` sets the grid width of the operation buttons, default is 4. Usually, you don't need to set it manually, as it will be automatically calculated based on the length of `form-config`.
- `operation-button-position` sets the position of the operation column. If set to `left`, the operation column will be displayed next to the search items. If set to `right`, it will be displayed at the far right.
- `collapse-rows` is the breakpoint for collapsing search items. Default is 3, meaning if the number of search items is less than 3, the expand/collapse button will not be shown.
- `form` is the form configuration option. If the default form configuration does not meet your needs, you can use this property to customize the form configuration. If you set this property, please move the original `form-config` into `form` and use `config` instead.

:::

### FormPro Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | :--: | --- |
| config | [Same as FormPro's form-config](/en/components/form-pro#formitemconfig) | No | `[]` | Form configuration |
| props | [Same as FormPro's form-props](/en/components/form-pro#props)  | No | `{}` | Form properties |
| grid-props | [Same as FormPro's grid-props](/en/components/form-pro#props) | No | `{}` | Form layout properties |
| positive-text | `string` | No | see below | Confirm button text |
| negative-text | `string` | No | see below | Cancel button text |

- In the `TablePro` component, `positive-text` defaults to `Search`, `negative-text` defaults to `Reset`.
- In the `DrawerForm` and `ModalForm` components, `positive-text` defaults to `Submit`, `negative-text` defaults to `Cancel`.


## Slots

| Name | Params | Description |
| --- | --- | --- |
| before | `()` | Content before the form search button |
| after | `()` | Content after the form search button |
| controls | `()` | Table operation area content |

## Events

| Name | Type | Description |
| --- | --- | --- |
| query | `(val) => void` | Trigger search |
| reset | `(val) => void` | Reset form |
