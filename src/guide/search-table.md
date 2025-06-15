# 搜索表格组件

## 介绍

搜索表格组件包含 **搜索表单**、**表格**、**分页** 组件

- 搜索表单基于 [NForm](https://www.naiveui.com/zh-CN/os-theme/components/form) 封装
- 表格采用 [NDataTable](https://www.naiveui.com/zh-CN/os-theme/components/data-table) 未经过封装
- 分页基于 [NPagination](https://www.naiveui.com/zh-CN/os-theme/components/pagination) 封装

## 基本使用案例

具体使用可查看项目代码或 [案例](https://gitee.com/zimo493/vue3-naiveui-admin/blob/main/src/views/demo/curd/index.vue)

```vue
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
// 查询参数
const queryParams = ref<User.Query>({
  pageNum: 1,
  pageSize: 10,
});
const loading = ref(false); // 加载状态
const tableData = ref<User.VO[]>([]); // 表格数据
const total = ref<number>(0); // 表格数据总量

// 获取表格数据
const getList = async () => {
  try {
    loading.value = true;
    const { data } = await getUserList(queryParams.value);
    tableData.value = data.list;
    total.value = data.total;
  } ffinally {
    loading.value = false;
  }
};

// 表格列配置
const columns = ref<DataTableColumns<User.VO>>([
  { title: "用户名", key: "username", align: "center" },
  { title: "昵称", key: "nickname", align: "center" },
  // ......
])
</script>
```

## API

### 常用 Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| tableData | `Array` | 是 | `""` | 需要展示的数据 |
| v-model 或 model-value | `Object` | 否 | `{}` | 搜索参数，与 `form-config` 一起使用。如果不传递则不显示搜索表单 |
| form-config | [`FormOption`](/guide/search-table#formoption) | 否 | `{}` | 表单配置项 |
| columns | [`DataTableColumn`](https://www.naiveui.com/zh-CN/os-theme/components/data-table#DataTable-Props) | 否 | `[]` | 需要展示的列 |
| total | `Number` | 否 | `0` | 总条数，为零0则不显示分页组件 |
| controls-span | `Number` | 否 | `4` | 按钮操作区的宽度，最大值：24 |
| collapse-length | `Number` | 否 | `3` | 搜索项的折叠长度。超出则会被折叠 |
| operation-button-position | `left / right` | 否 | `right` | 搜索按钮的展示位置。紧贴搜索项显示还是靠最右侧显示 |

#### FormOption
