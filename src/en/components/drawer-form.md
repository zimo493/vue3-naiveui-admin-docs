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
    v-model="modelValue"
    :form="editFormConfig"
    :loading="spin"
    @submit="submitForm"
  />
</template>

<script setup lang="ts">
import { spin, startSpin, endSpin, executeAsync } from "@/utils";
import UserAPI from "@/api/system/user";

/** Form configuration */
const editFormConfig: DialogForm.Form = {
  config: [
    { name: "username", label: "Username" },
    { name: "nickname", label: "Nickname" },
    {
      name: "status",
      label: "Status",
      component: "radio",
      props: {
        options: [
          { label: "Active", value: 1 },
          { label: "Disabled", value: 0 },
        ],
      },
    },
  ],
  props: {
    rules: {
      username: [
        { required: true, message: "Username cannot be empty", trigger: "blur" },
      ],
      nickname: [
        { required: true, message: "Nickname cannot be empty", trigger: "blur" },
      ],
    },
    // Other form property configurations
  },
};

/** Initialize form */
const modelValue = ref<User.Form>({
  status: 1,
});

/** Open drawer */
const drawerFormRef = useTemplateRef("drawerForm");

const openDrawer = (row?: User.VO) => {
  drawerFormRef.value?.open(row ? "Edit User" : "Add User", modelValue.value);

  if (row) {
    startSpin();
    UserAPI.getFormData(row.id)
      .then((data) => {
        modelValue.value = { ...data };
      })
      .finally(() => endSpin());
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

## No Validation Needed

If you don't need validation or other form configurations, just pass the form item configuration `form-config` without passing `form`.

```vue [vue]
<template>
  <!-- Add/Edit -->
  <DrawerForm
    ref="drawerForm"
    v-model="modelValue"
    :form-config="editFormConfig.config"
    :loading="spin"
    @submit="submitForm"
  />
</template>
```

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | :--: | --- |
| props | [Drawer Props](https://www.naiveui.com/en-US/os-theme/components/drawer#Drawer-Props) | No | `{}` | Drawer properties except `show` |
| form | [Same as TablePro's form](/en/components/table-pro#formpro-props) | No | `{}` | Form configuration |
| form-config | [FormItemConfig[]](/en/components/form-pro#formitemconfig) | No | `[]` | Form item configuration |
| loading | `boolean` | No | `false` | Loading state |
| use-type | `submit`, `view` | No | `submit` | Usage type |

::: tip 💡 Note

- `loading` will also affect the loading state of the `Submit` and `Cancel` buttons
- `use-type` determines the usage type. When set to `view`, only the Cancel button is displayed at the bottom

:::

## Slots

| Name | Params | Description |
| --- | --- | --- |
| header | `()` | Content above the form |
| footer | `()` | Content below the form |

## Expose

| Function Name | Params | Description |
| --- | --- | --- |
| open | `(title: string, data: object) => void` | Method to open the drawer.<br />`title` is the drawer title<br />`data` is the form data |
| close | `() => void` | Close the drawer. Will reset the form |

## Events

| Name | Type | Description |
| --- | --- | --- |
| submit | `(val) => void` | Trigger submit |
| cancel | `() => void` | Trigger cancel |
