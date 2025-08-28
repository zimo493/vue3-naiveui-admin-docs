---
title: FormPro
description: Easily create a form with simple configuration
tags: [Component, Form]
---

- Encapsulated based on [NForm](https://www.naiveui.com/en-US/os-theme/components/form)

## Basic Usage

```vue [vue]
<template>
  <FormPro ref="formPro" v-model="modelValue" :form-config="formConfig">
    <template #operation>
      <n-flex>
        <n-button type="primary" @click="submit">Submit</n-button>
        <n-button @click="reset">Reset</n-button>
      </n-flex>
    </template>
  </FormPro>
</template>

<script lang="ts" setup>
/** Form field types */
interface FormFields {
  name?: string;
  age?: number;
}

/** Form configuration */
const formConfig: FormPro.FormItemConfig[] = [
  { name: "name", label: "Name" },
  { name: "age", label: "Age", component: "number" },
];

/** Form data */
const modelValue = ref<FormFields>({});

/** Form instance */
const formProRef = useTemplateRef("formPro");

/** Submit */
const submit = async () => {
  await formProRef.value?.validate(); // Validate
  console.log("Form submitted:", modelValue.value);
};

const reset = () => formProRef.value?.reset();
</script>
```

## Form Validation

- Pass `rules` in `form-props` to enable form validation.
- Supports all [`Form Props`](https://www.naiveui.com/en-US/os-theme/components/form#Form-Props) parameters except `model`.

```vue [vue]{6}
<template>
  <FormPro
    ref="formPro"
    v-model="modelValue"
    :form-config="formConfig"
    :form-props="formProps"
  >
    ...
  </FormPro>
</template>

<script lang="ts" setup>
import { type FormProps } from "naive-ui";

/** Form validation */
const formProps: FormProps = {
  rules: {
    name: [{ required: true, message: "Please enter your name" }],
    age: [{ required: true, message: "Please enter your age" }],
  },
};
</script>
```

## Form Item Configuration

You can configure `props`, `slots`, and `formItemProps` for each form item individually.

::: warning ⚠️ Note

**props** and **slots** depend on the `component` you use.

> If `component` is not set, the default is `NInput`'s [Input-Props](https://www.naiveui.com/en-US/os-theme/components/input#Input-Props) and [Input-Slots](https://www.naiveui.com/en-US/os-theme/components/input#Input-Slots).<br />
> If `component` is set to `select`, only [NSelect](https://www.naiveui.com/en-US/os-theme/components/select#Select-Props) props and slots are available.

**formItemProps** accepts all [FormItem](https://www.naiveui.com/en-US/os-theme/components/form#FormItem-Props) and [GridItem](https://www.naiveui.com/en-US/os-theme/components/grid#GridItem-Props) props except `path`, `span`, and `label`.

:::

```ts
/** Form configuration */
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "name",
    label: "Name",
    props: {
      // Custom attribute
      placeholder: "Please enter your name",
    },
    // Render slots
    slots: {
      // prefix: () => <NEl>😁</NEl>, // Using tsx
      prefix: () => [h(NEl, {}, () => "😁")],
      suffix: () => [h("span", null, "😎")],
    },
    // Form item configuration
    formItemProps: {
      showFeedback: false,
    },
  },
  { name: "age", label: "Age", component: "number" },
];
```

## Dynamic Data

In some cases, such as when options are fetched from an API, you can use `computed` to return the configuration.

```ts
import { type SelectOption } from "naive-ui";

onMounted(async () => {
  loading.value = true;
  options.value = await asyncOptions();
  loading.value = false;
});

/** Default options */
const options = ref<SelectOption[]>([{ label: "Eat", value: 1 }]);

/** Option loading state */
const loading = ref(false);

/** Simulate fetching dynamic options */
const asyncOptions = () => {
  return new Promise<SelectOption[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { label: "Eat", value: 1 },
          { label: "Sleep", value: 2 },
          { label: "Play games", value: 3, disabled: true },
        ]),
      2000
    )
  );
};

/** Form configuration */
const formConfig = computed((): FormPro.FormItemConfig[] => [
  {
    name: "hobby",
    label: "Hobby",
    component: "select",
    props: {
      multiple: true, // Enable multiple selection
      loading: loading.value, // Loading state
      options: options.value, // Dynamic options
    },
  },
]);
```

## Dynamic Show/Hide

If you need to show or hide a form item based on certain conditions, use the `hidden` property.

```ts{13}
/** Form data */
const modelValue = ref<FormFields>({
  age: 18,
});

/** Form configuration */
const formConfig = computed((): FormPro.FormItemConfig[] => [
  { name: "age", label: "Age", component: "number" },
  {
    name: "hobby",
    label: "Hobby",
    component: "select",
    hidden: modelValue.value.age <= 18,
    props: {
      multiple: true, // Enable multiple selection
      loading: loading.value, // Loading state
      options: options.value, // Dynamic options
    },
  },
]);
```

## Using Dictionary

If you need to use dictionary data as a data source, add the `dict` property to the form item configuration and specify the dictionary key. The data source will be automatically fetched from the dictionary.

> [!CAUTION] ⚠️ Note
> Currently, only `select`, `radio`, and `checkbox` components support dictionaries.<br />
> If the `options` property is set in `props`, the `dict` property will be ignored.

```ts
/** Form configuration */
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "sex",
    label: "Gender",
    component: "select",
    dict: "gender", // Use dictionary [!code focus]
  },
];
```

## Using Slots

If you need to use custom slots for rendering, you can do so as follows:

::: tip 💡 Note

- The slot name must match the `name` property in the `form-config`.
- Slot content takes priority and will override the `component` property.

:::

```vue [vue]{3-4}
<template>
  <FormPro v-model="modelValue" :form-config="formConfig">
    <!-- Custom slot -->
    <template #name>Custom content</template>
  </FormPro>
</template>

<script lang="ts" setup>
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "name",
    label: "Name",
    // The component property is ignored when using a slot
    component: "input", // [!code --]
  },
];
</script>
```

## Custom Component

- Some users may ask: "What if I want to render my own custom component?"
- Of course you can!

::: tip 💡 Note

The `component` property can accept not only basic component types, but also a function that returns a component, or you can directly pass a component object.

:::

```ts
/** Simple component to render msg info */
const MyComponent = defineComponent({
  props: {
    msg: { type: String, default: "Default message" },
  },
  setup(props) {
    return () => h("div", props.msg);
  },
});

/** Form configuration */
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "msg",
    label: "Message",
    // component: () => <MyComponent msg="hello" />, // Using tsx
    component: () => h(MyComponent, { msg: "hello" }), // Using h function
  },
];
```

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | :--: | --- |
| v-model or model-value | `object` | No | | Form binding data |
| operation-span | `number` | No | `4` | Operation column width |
| form-config | [FormItemConfig[]](/en/components/form-pro#formitemconfig) | No | | Form item configuration |
| form-props | [FormProps](https://www.naiveui.com/en-US/os-theme/components/form#Form-Props) | No | `see below` | Form properties (except `model`) |
| grid-props | [GridProps](https://www.naiveui.com/en-US/os-theme/components/grid#Grid-Props) | No | `see below` | Form layout properties |

- `form-props` default: `{ labelPlacement: "left", labelWidth: 80 }`
- `grid-props` default: `{ xGap: 16 }`

### FormItemConfig

| Name | Type | Required | Default | Description |
| --- | --- | :--: | :--: | --- |
| name | `string` | Yes | | Field name |
| label | `string` | No | | Label (not shown if not set) |
| span | `number` | No | `4` | Grid width |
| dict | `string` | No | | Dictionary |
| hidden | `boolean` | No | `false` | Whether hidden |
| label-message | `string` | No | | Tip message |
| block-message | `string` | No | | Block message |
| component | [component Type](/en/components/form-pro#component-types) | No | `input` | Component |
| props | [component Props](/en/components/form-pro#component-props-and-slots) | No | `{}` | Component props |
| slots | [component Slots](/en/components/form-pro#component-props-and-slots) | No | `{}` | Component slots |
| form-item-props | [FormItemGi Props](https://www.naiveui.com/en-US/os-theme/components/form#FormItemGi-Props) | No | `{}` | FormItemGi props |

::: tip 💡 Note

- `block-message` supports both `Component` and `() => VNode` types. This configuration is invalid in [**TablePro**](/en/components/table-pro) for aesthetic reasons, please use `label-message` instead

- `form-item-props` excludes `path`, `label`, and `span` properties.

:::

### Component Types

Supported component types:

- `input` Input
- `textarea` Textarea
- `number` Number input
- `password` Password input
- `select` Select
- `radio` Radio group
- `radio-button` Radio button group
- `checkbox` Checkbox group
- `date` Date picker
- `time` Time picker
- `switch` Switch
- `treeSelect` Tree select
- `text` Plain text
- `Component` Custom component
- `() => VNode` Custom component

### Component Props and Slots

| Component | Props | Slots |
| :--: | --- | --- |
| `input` `textarea` `password` | [Input Props](https://www.naiveui.com/en-US/os-theme/components/input#Input-Props) | [Input Slots](https://www.naiveui.com/en-US/os-theme/components/input#Input-Slots) |
| `select` | [Select Props](https://www.naiveui.com/en-US/os-theme/components/select#Select-Props) | [Select Slots](https://www.naiveui.com/en-US/os-theme/components/select#Select-Slots) |
| `radio` | [Radio Props](https://www.naiveui.com/en-US/os-theme/components/radio#Radio-Props) | [Radio Slots](https://www.naiveui.com/en-US/os-theme/components/radio#Radio-Slots) |
| `checkbox` | [Checkbox Props](https://www.naiveui.com/en-US/os-theme/components/checkbox#Checkbox-Props) | [Checkbox Slots](https://www.naiveui.com/en-US/os-theme/components/checkbox#Checkbox-Slots) |
| `date` | [DatePicker Props](https://www.naiveui.com/en-US/os-theme/components/date-picker#General-Props) | [DatePicker Slots](https://www.naiveui.com/en-US/os-theme/components/date-picker#DatePicker-Slots) |
| `time` | [TimePicker Props](https://www.naiveui.com/en-US/os-theme/components/time-picker#TimePicker-Props) | [TimePicker Slots](https://www.naiveui.com/en-US/os-theme/components/time-picker#TimePicker-Slots) |
| `switch` | [Switch Props](https://www.naiveui.com/en-US/os-theme/components/switch#Switch-Props) | [Switch Slots](https://www.naiveui.com/en-US/os-theme/components/switch#Switch-Slots) |
| `treeSelect` | [TreeSelect Props](https://www.naiveui.com/en-US/os-theme/components/tree-select#TreeSelect-Props) | [TreeSelect Slots](https://www.naiveui.com/en-US/os-theme/components/tree-select#TreeSelect-Slots) |
| `text` | [Text Props](https://www.naiveui.com/en-US/os-theme/components/gradient-text#GradientText-Props) | [Text Slots](https://www.naiveui.com/en-US/os-theme/components/gradient-text#GradientText-Slots) |

## Slots

| Name | Params | Description |
| --- | --- | --- |
| operation | `()` | Operation area buttons |
| [name] | `()` | Form item slot |

## Expose

| Name | Type | Description |
| --- | --- | --- |
| validate | `() => Promise<void>` | Trigger validation |
| reset | `() => void` | Reset form |
