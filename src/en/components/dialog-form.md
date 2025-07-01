---
title: DialogForm
description: Functionally similar to DrawerForm, but with a different position.
tags: [Component, Form]
---

- The form component is encapsulated based on [FormPro](/en/components/form-pro)
- The dialog component uses [NModal](https://www.naiveui.com/en-US/os-theme/components/modal)

## Basic Usage

```vue [vue]
<template>
  <!-- Add/Edit -->
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

/** Form configuration */
const editConfig = ref<TablePro.FormOption<DictType.Form>>({
  fields: [
    { field: "username", label: "Username" },
    { field: "nickname", label: "Nickname" },
    {
      field: "status",
      label: "Status",
      type: "radio",
      options: [
        { label: "Active", value: 1 },
        { label: "Disabled", value: 0 },
      ],
    },
    { field: "remark", label: "Remark", type: "textarea" },
  ],
  labelWidth: 80,
  rules: {
    username: [{ required: true, message: "Username cannot be empty", trigger: "blur" }],
    nickname: [
      { required: true, message: "Nickname cannot be empty", trigger: "blur" },
    ],
  },
});

/** Initialize form */
const modelValue = ref<User.Form>({
  status: 1,
});

/** Open dialog */
const dialogFormRef = useTemplateRef("dialogForm");
const openDialog = (row?: User.VO) => {
  dialogFormRef.value?.open(row ? "Edit User" : "Add User", modelValue.value);

  if (row) {
    dialogFormRef.value?.startLoading();
    UserAPI.getFormData(row.id)
      .then((data) => {
        modelValue.value = { ...data };
      })
      .finally(() => dialogFormRef.value?.hideLoading());
  }
};

/** Submit form */
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

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| v-model or model-value | `Object` | Yes | | Form data |
| form-config | [`FormOption<T>`](/en/components/form-pro#formoption) | Yes | | Form configuration |
| width | `Number` | No | `700` | Dialog width |
| is-look | `Boolean` | No | `false` | View-only mode |
| loading | `Boolean` | No | `false` | Form loading state |
| draggable | `Boolean` | No | `false` | Whether draggable |

## Slots

| Name | Params | Description |
| --- | --- | --- |
| header | `()` | Content above the form |
| footer | `()` | Content below the form |

## Expose
| Function Name | Params | Description |
| --- | --- | --- |
| open | `(title: string, data: Object) => void` | Method to open the dialog. `title` is the dialog title, `data` is the form data |
| close | `() => void` | Close the dialog. Will reset the form |
| startLoading | `() => void` | Start loading |
| hideLoading | `() => void` | Stop loading |

## Events

| Name | Type | Description |
| --- | --- | --- |
| submit | `(val) => void` | Trigger submit |
| cancel | `() => void` | Trigger cancel |
