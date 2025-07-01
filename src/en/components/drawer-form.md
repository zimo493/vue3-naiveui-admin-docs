---
title: DrawerForm
description: Display a form in a drawer to collect data.
tags: [Component, Form]
---

- The form component is encapsulated based on [FormPro](/en/components/form-pro)
- The drawer component uses [NDrawer](https://www.naiveui.com/en-US/os-theme/components/drawer)

## Basic Usage

```vue [vue]
<template>
  <!-- Add/Edit -->
  <DrawerForm
    ref="drawerForm"
    :form-config="editConfig"
    :model-value="modelValue"
    :width="580"
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

/** Open drawer */
const drawerFormRef = useTemplateRef("drawerForm");
const openDrawer = (row?: User.VO) => {
  drawerFormRef.value?.open(row ? "Edit User" : "Add User", modelValue.value);

  if (row) {
    drawerFormRef.value?.startLoading();
    UserAPI.getFormData(row.id)
      .then((data) => {
        modelValue.value = { ...data };
      })
      .finally(() => drawerFormRef.value?.hideLoading());
  }
};

/** Submit form */
const submitForm = (val: User.Form) =>
  executeAsync(
    () => (val.id ? UserAPI.update(val.id, val) : UserAPI.create(val)),
    () => {
      drawerFormRef.value?.close();
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
| placement | `'top' \| 'right' \| 'bottom' \| 'left'` | No | `right` | Drawer display position |
| width | `Number` | No | `502` | Drawer width |
| is-look | `Boolean` | No | `false` | View-only mode |
| loading | `Boolean` | No | `false` | Form loading state |

## Slots

| Name | Params | Description |
| --- | --- | --- |
| header | `()` | Content above the form |
| footer | `()` | Content below the form |

## Expose
| Function Name | Params | Description |
| --- | --- | --- |
| open | `(title: string, data: Object) => void` | Method to open the drawer. `title` is the drawer title, `data` is the form data |
| close | `() => void` | Close the drawer. Will reset the form |
| startLoading | `() => void` | Start loading |
| hideLoading | `() => void` | Stop loading |

## Events

| Name | Type | Description |
| --- | --- | --- |
| submit | `(val) => void` | Trigger submit |
| cancel | `() => void` | Trigger cancel |

</rewritten_file> 