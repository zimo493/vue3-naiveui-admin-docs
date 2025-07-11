---
title: ModalForm
description: Functionally similar to DrawerForm, but with a different position.
tags: [Component, Form]
---

- The form component is encapsulated based on [FormPro](/en/components/form-pro)
- The modal component uses [NModal](https://www.naiveui.com/en-US/os-theme/components/modal)

## Basic Usage

```vue [vue]
<template>
  <!-- Add/Edit -->
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

/** Open modal */
const modalFormRef = useTemplateRef("modalForm");

const openModal = (row?: User.VO) => {
  modalFormRef.value?.open(row ? "Edit User" : "Add User", modelValue.value);

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
      modalFormRef.value?.close();
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

| Name | Type | Required | Default | Description |
| --- | --- | :--: | :--: | --- |
| props | [Modal Props](https://www.naiveui.com/en-US/os-theme/components/modal#Modal-Props) | No | `{}` | Modal properties except `show` and `segmented` |
| width | `number` | No | `700` | Width |
| form | [Same as TablePro's form](/en/components/table-pro#formpro-props) | No | `{}` | Form configuration |
| form-config | [FormItemConfig[]](/en/components/form-pro#formitemconfig) | No | `[]` | Form item configuration |
| loading | `boolean` | No | `false` | Loading state |
| use-type | `submit`, `view` | No | `submit` | Usage type |

::: tip 💡 Note

- `loading` will also affect the loading state of the `Submit` and `Cancel` buttons
- `use-type` is the usage type. If set to `view`, the bottom buttons will not be displayed

:::

## Slots

| Name | Params | Description |
| --- | --- | --- |
| header | `()` | Content above the form |
| footer | `()` | Content below the form |

## Expose

| Function Name | Params | Description |
| --- | --- | --- |
| open | `(title: string, data: object) => void` | Method to open the modal.<br />`title` is the modal title<br />`data` is the form data |
| close | `() => void` | Close the modal. Will reset the form |

## Events

| Name | Type | Description |
| --- | --- | --- |
| submit | `(val) => void` | Trigger submit |
| cancel | `() => void` | Trigger cancel |
