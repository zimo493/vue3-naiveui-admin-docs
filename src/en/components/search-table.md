---
title: SearchTable
description: The search table component includes form, table, and pagination components
tags: [Component, Form, Table]
---

- The search form is encapsulated based on [FormPro](/en/components/form-pro)
- The table uses the [NDataTable](https://www.naiveui.com/en-US/os-theme/components/data-table) component
- Pagination is encapsulated based on [NPagination](https://www.naiveui.com/en-US/os-theme/components/pagination)

## Basic Usage

For detailed usage, see the project code or [example](https://gitee.com/zimo493/vue3-naiveui-admin/blob/main/src/views/demo/curd/index.vue)

```vue [vue]
<template>
  <SearchTable
    :form-config="formConfig"
    :model-value="queryParams"
    :columns="columns"
    :table-data="tableData"
    :total="total"
    :loading="loading"
    :rowKey="(row: User.VO) => row.id"
    @search="getList"
    @reset="getList"
  />
</template>
<script lang="ts" setup>
// Query parameters
const queryParams = ref<User.Query>({
  pageNum: 1,
  pageSize: 10,
});
const loading = ref(false); // Loading state
const tableData = ref<User.VO[]>([]); // Table data
const total = ref<number>(0); // Total table data

// Get table data
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

// Table column configuration
const columns = ref<DataTableColumns<User.VO>>([
  { title: "Username", key: "username", align: "center" },
  { title: "Nickname", key: "nickname", align: "center" },
  // ......
])
</script>
```

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| table-data | `Array<object>` | Yes | | Data to display |
| row-key | `(rowData: object) => (number \| string)` | Yes | | Key for table row data |
| v-model or model-value | `Object` | No | `{}` | Search parameters, used with `form-config`. If not passed, the search form is not displayed |
| form-config | [`FormOption<T>`](/en/components/form-pro#formoption) | No | `{}` | Form configuration |
| columns | [`DataTableColumn`](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Props) | No | `[]` | Columns to display |
| total | `Number` | No | `0` | Total count. If 0, pagination is not displayed |
| loading | `Boolean` | No | `false` | Whether the table is loading |
| controls-span | `Number` | No | `4` | Width of the button operation area, max: 24 |
| collapse-length | `Number` | No | `3` | Collapse length of search items. Items beyond this will be collapsed |
| operation-button-position | `left \| right` | No | `right` | Display position of search buttons. Whether to display next to search items or on the far right |
| table-events | [`DataTable-Methods`](https://www.naiveui.com/en-US/os-theme/components/data-table#DataTable-Methods) | No | `{}` | `NDataTable` event configuration |
| Others | [`DataTable Props`](https://www.naiveui.com/en-US/os-theme/components/data-table#API) | No | `{}` | `NDataTable` component props |

## Slots

| Name | Params | Description |
| --- | --- | --- |
| header | `()` | Content above the search form |
| controls | `()` | Content in the table operation area, such as `Add` button |

## Events

::: tip 💡 Note
The type of `val` returned by the triggered method is the type bound to the passed `v-model` value
:::

| Name | Type | Description |
| --- | --- | --- |
| search | `(val) => void` | Trigger search |
| reset | `(val) => void` | Reset form |