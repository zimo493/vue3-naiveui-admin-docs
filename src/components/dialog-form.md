# 模态框表单 DialogForm

## 介绍

我感觉和 [`DrawerForm`](/components/drawer-form) 功能差不太多，位置有点差别。

- 表单组件基于 [FormPro](/components/form-pro) 封装
- 对话框组件采用 [NModal](https://www.naiveui.com/zh-CN/os-theme/components/modal) 组件

## 基本使用

```vue [vue]
<template>
  <!-- 新增、编辑 -->
  <DialogForm
    ref="dialogForm"
    :form-config="editConfig"
    :model-value="modelValue"
    :width="800"
    :loading="spin"
    @submit="submitForm"
  />
</template>

<script setup lang="ts">
import { spin, executeAsync } from "@/utils";
import UserAPI from "@/api/system/user";

/** 表单配置项 */
const editConfig = ref<TablePro.FormOption<DictType.Form>>({
  fields: [
    { field: "username", label: "用户名" },
    { field: "nickname", label: "用户昵称" },
    {
      field: "status",
      label: "状态",
      type: "radio",
      options: [
        { label: "正常", value: 1 },
        { label: "禁用", value: 0 },
      ],
    },
    { field: "remark", label: "备注", type: "textarea" },
  ],
  labelWidth: 80,
  rules: {
    username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
    nickname: [
      { required: true, message: "用户昵称不能为空", trigger: "blur" },
    ],
  },
});

/** 初始化表单 */
const modelValue = ref<User.Form>({
  status: 1,
});

/** 打开对话框 */
const dialogFormRef = useTemplateRef("dialogForm");
const openDrawer = (row?: User.VO) => {
  dialogFormRef.value?.open(row ? "编辑用户" : "新增用户", modelValue.value);

  if (row) {
    dialogFormRef.value?.startLoading();
    UserAPI.getFormData(row.id)
      .then((data) => {
        modelValue.value = { ...data };
      })
      .finally(() => dialogFormRef.value?.hideLoading());
  }
};

/** 表单提交 */
const submitForm = (val: User.Form) =>
  executeAsync(
    () => (val.id ? UserAPI.update(val.id, val) : UserAPI.create(val)),
    () => {
      dialogFormRef.value?.close();
      handleQuery();
    }
  );
</script>
```

## Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| v-model 或 model-value | `Object` | 是 | | 表单参数 |
| form-config | [`FormOption<T>`](/components/form-pro#formoption) | 是 | | 表单配置项 |
| width | `Number` | 否 | `700` | 对话框的宽度 |
| is-look | `Boolean` | 否 | `false` | 是否是查看模式 |
| loading | `Boolean` | 否 | `false` | 表单加载状态 |
| draggable | `Boolean` | 否 | `false` | 是否允许拖拽 |

## Slots

| 属性 | 参数 | 说明 |
| --- | --- | --- |
| header | `()` | 头部内容，展示在表单上方 |
| footer | `()` | 尾部内容，展示在表单下方 |

## Expose
| 函数名 | 参数 | 说明 |
| --- | --- | --- |
| open | `(title: string, data: Object) => void` | 打开对话框方法。`title` 为对话框标题，`data` 为表单数据|
| close | `() => void` | 关闭对话框。会重置表单 |
| startLoading | `() => void` | 开始加载 |
| hideLoading | `() => void` | 关闭加载 |

## Events

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| submit | `(val) => void` | 触发提交 |
| cancel | `() => void` | 触发取消 |

