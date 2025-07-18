---
title: 模态框表单 ModalForm
description: 感觉和 DrawerForm 功能差不太多，位置有点差别。
tags: [组件, 表单]
---

- 表单组件基于 [FormPro](/components/form-pro) 封装
- 模态框组件采用 [NModal](https://www.naiveui.com/zh-CN/os-theme/components/modal) 组件

## 基本使用

```vue [vue]
<template>
  <!-- 新增、编辑 -->
  <ModalForm
    ref="modalForm"
    v-model="modelValue"
    :form="editFormConfig"
    :loading="spin"
    @submit="submitForm"
  />
</template>

<script setup lang="ts">
import { spin, startSpin, endSpin, executeAsync } from "@/utils";
import UserAPI from "@/api/system/user";

/** 表单配置项 */
const editFormConfig: DialogForm.Form = {
  config: [
    { name: "username", label: "用户名" },
    { name: "nickname", label: "用户昵称" },
    {
      name: "status",
      label: "状态",
      component: "radio",
      props: {
        options: [
          { label: "正常", value: 1 },
          { label: "禁用", value: 0 },
        ],
      },
    },
  ],
  props: {
    rules: {
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
      ],
      nickname: [
        { required: true, message: "用户昵称不能为空", trigger: "blur" },
      ],
    },
    // 其他的表单属性配置
  },
};

/** 初始化表单 */
const modelValue = ref<User.Form>({
  status: 1,
});

/** 打开模态框 */
const modalFormRef = useTemplateRef("modalForm");

const openDrawer = (row?: User.VO) => {
  modalFormRef.value?.open(row ? "编辑用户" : "新增用户", modelValue.value);

  if (row) {
    startSpin();
    UserAPI.getFormData(row.id)
      .then((data) => {
        modelValue.value = { ...data };
      })
      .finally(() => endSpin());
  }
};
/** 表单提交 */
const submitForm = (val: User.Form) =>
  executeAsync(
    () => (val.id ? UserAPI.update(val.id, val) : UserAPI.create(val)),
    () => {
      modalFormRef.value?.close();
      handleQuery();
    }
  );
</script>
```

## 无需校验

不需要校验和其他的表单配置时，只需要传递表单项的配置 `form-config` 即可，无需传递 `form`

```vue [vue]
<template>
  <!-- 新增、编辑 -->
  <ModalForm
    ref="modalForm"
    v-model="modelValue"
    :form-config="editFormConfig.config"
    :loading="spin"
    @submit="submitForm"
  />
</template>
```

## Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | :--: | :--: | --- |
| props | [Modal Props](https://www.naiveui.com/zh-CN/os-theme/components/modal#Modal-Props) | 否 | `{}` | Modal属性<br />`show` `segmented` 除外 |
| width | `number` | 否 | `700` | 宽度 |
| form | [同 TablePro 的 form](/components/table-pro#formpro-props) | 否 | `{}` | 表单配置项 |
| form-config | [FormItemConfig[]](/components/form-pro#formitemconfig) | 否 | `[]` | 表单项配置 |
| loading | `boolean` | 否 | `fasle` | 加载状态 |
| use-type | `submit`、`view` | 否 | `submit` | 使用类型 |

::: tip 💡 提示

- `loading` 会连同 `提交`、`取消` 按钮的 `loading` 状态
- `use-type` 为使用的类型。为 `view` 时仅显示底部的 `取消` 按钮

:::

## Slots

| 属性 | 参数 | 说明 |
| --- | --- | --- |
| header | `()` | 头部内容，展示在表单上方 |
| footer | `()` | 尾部内容，展示在表单下方 |

## Expose

| 函数名 | 参数 | 说明 |
| --- | --- | --- |
| open | `(title: string, data: object) => void` | 打开模态框方法<br />`title` 为模态框标题<br />`data` 为表单数据 |
| close | `() => void` | 关闭模态框。会重置表单 |

## Events

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| submit | `(val) => void` | 触发提交 |
| cancel | `() => void` | 触发取消 |
