---
title: 表格 TablePro
description: 搜索表格组件包含表单、表格、分页组件
tags: [组件, 表单, 表格]
---

- 搜索表单基于 [FormPro](/components/form-pro) 封装
- 表格采用 [NDataTable](https://www.naiveui.com/zh-CN/os-theme/components/data-table) 组件
- 分页基于 [NPagination](https://www.naiveui.com/zh-CN/os-theme/components/pagination) 封装

## 基本使用

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
/** 查询参数 */
const queryParams = ref<DemoFormModel>({});

const loading = ref(false); // 加载状态
const tableData = ref<User.VO[]>([]); // 表格数据
const total = ref<number>(0); // 表格数据总量

/** 获取表格数据 */
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

/** 搜索表单配置 */
const formConfig: FormPro.FormItemConfig[] = [
  { name: "username", label: "用户名" },
  { name: "nickname", label: "昵称" },
]

/** 表格列配置 */
const columns = ref<DataTableColumns<User.VO>>([
  { title: "用户名", key: "username", align: "center" },
  { title: "昵称", key: "nickname", align: "center" },
  // ......
])
</script>
```

## 不要搜索

不要传递 `v-model` 和 `form-config` 属性。

## 不要分页

不要传递 `total` 属性。

## 表单配置

如果默认的表单配置不满足需求时，可以使用 `form` 属性进行配置。例如`设置标签的宽度`、`添加校验` 等等

::: tip 💡 提示
如果要对表单属性单独配置，原先的 `:form-config="formConfig"` 配置需要移入 `form` 内，使用 `config` 代替
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
  // 需要验证的表单字段
};
</script>
```

## Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | :--: | :--: | --- |
| v-model 或 model-value | `object` | 否 | | 搜索参数 |
| form-config | [FormItemConfig[]](/components/form-pro#formitemconfig) | 否 | | 搜索表单项配置 |
| columns | [columns](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props) | 否 | `[]` | 展示的列 |
| table-data | [data](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props) | 否 | `[]` | 展示的数据 |
| total | `number` | 否 | `0` | 数据总条数 |
| loading | `boolean` | 否 | `false` | 是否正在加载中 |
| row-key | [row-key](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props) | 否 | `undefined` | 行数据唯一标识 |
| table-props | [DataTable Props](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props) | 否 | `{}` | 表格额外属性 |
| show-table | `boolean` | 否 | `true` | 是否显示表格 |
| operation-span | `number` | 否 | `4` | 操作列栅格宽度 |
| operation-button-position | `left` `right` | 否 | `right` | 操作按钮位置 |
| pagination-position | `left` `center` `right` | 否 | `left` | 分页位置 |
| collapse-rows | `number` | 否 | `3` | 折叠搜索项断点 |
| form | [FormPro Props](/components/table-pro#formpro-props) | 否 | `{}` | 表单配置项 |

::: tip 💡 提示

- `table-props` 接受除 `data` `columns` `striped` `single-column` `single-line` 以外所有的 [`DataTable Props`](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props) 属性
- `operation-span` 设置的是操作按钮的栅格宽度，默认为 4，一般不用手动设置，因为 `operation-span` 默认会根据 `form-config` 的长度自动计算剩余宽度
- `operation-button-position` 设置的是操作列的位置，如果设置为 `left`，则操作列会紧挨着搜索项显示，如果设置为 `right`，则操作列会远离搜索项最右侧显示
- `collapse-rows` 折叠搜索项断点，默认为 `3`，即当搜索项长度小于 `3` 时，不会显示 `展开` 和 `收起` 按钮
- `form` 表单配置项，当默认的表单配置不满足需求时，可以使用此属性自定义表单配置。如果设置此属性，原先的 `form-config` 属性请移入 `form` 属性内，使用 `config` 配置代替

:::

### FormPro Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | :--: | :--: | --- |
| config | [同 FormPro 的 form-config](/components/form-pro#formitemconfig) | 否 | `[]` | 表单配置 |
| props | [同 FormPro 的 form-props](/components/form-pro#props)  | 否 | `{}` | 表单属性 |
| grid-props | [同 FormPro 的 grid-props](/components/form-pro#props) | 否 | `{}` | 表单布局属性 |
| positive-text | `string` | 否 | `如下` | 确定按钮文字 |
| negative-text | `string` | 否 | `如下` | 取消按钮文字 |

- 在 `TablePro` 组件中 `positive-text` 默认为 `搜索`，`negative-text` 默认为 `重置`
- 在 `DrawerForm` 和 `ModalForm` 组件中 `positive-text` 默认为 `提交`，`negative-text` 默认为 `取消`


## Slots

| 属性 | 参数 | 说明 |
| --- | --- | --- |
| before | `()` | 表单搜索按钮前的内容 |
| after | `()` | 表单搜索按钮后的内容 |
| controls | `()` | 表格操作区内容 |

## Events

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| query | `(val) => void` | 触发搜索 |
| reset | `(val) => void` | 重置表单 |
