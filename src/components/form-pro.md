---
title: 表单 FormPro
description: 采用简单的配置就可实现一个表单
tags: [组件, 表单]
---

- 基于 [NForm](https://www.naiveui.com/zh-CN/os-theme/components/form) 封装，

## 基本使用

```vue [vue]
<template>
  <FormPro ref="formPro" v-model="modelValue" :form-config="formConfig">
    <template #operation>
      <n-flex>
        <n-button type="primary" @click="submit">提交</n-button>
        <n-button @click="reset">重置</n-button>
      </n-flex>
    </template>
  </FormPro>
</template>

<script lang="ts" setup>
/** 表单字段类型 */
interface FormFields {
  name?: string;
  age?: number;
}

/** 表单配置 */
const formConfig: FormPro.FormItemConfig[] = [
  { name: "name", label: "姓名" },
  { name: "age", label: "年龄", component: "number" },
];

/** 表单数据 */
const modelValue = ref<FormFields>({});

/** 表单实例 */
const formProRef = useTemplateRef("formPro");

/** 提交 */
const submit = async () => {
  await formProRef.value?.validate(); // 校验
  console.log("表单提交：", modelValue.value);
};

const reset = () => formProRef.value?.reset();
</script>
```

## 表单校验

- 传递 `form-props` 中 `rules` 为参数，即可实现表单校验。
- 支持所有除 `model` 以外的 [`Form Props`](https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props) 参数

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

/** 表单校验 */
const formProps: FormProps = {
  rules: {
    name: [{ required: true, message: "请输入姓名" }],
    age: [{ required: true, message: "请输入年龄" }],
  },
};
</script>
```

## 表单项配置

你可以在每个表单项中单独配置 `props` `slots` `formItemProps`

::: warning ⚠️ 提示

**props** 和 **slots** 是根据你使用的 `component` 决定的

- 如果未配置 `component`，默认使用的是 `NInput` 的 [Input-Props](https://www.naiveui.com/zh-CN/os-theme/components/input#Input-Props) 和 [Input-Slots](https://www.naiveui.com/zh-CN/os-theme/components/input#Input-Slots)
- 如果配置 `component` 为 `select`， 则只能使用 `NSelect` 的 [Select-Props](https://www.naiveui.com/zh-CN/os-theme/components/select#Select-Props) 和 [Select-Slots](https://www.naiveui.com/zh-CN/os-theme/components/select#Select-Slots)
- 即使你不知道每个组件的 `props` 和 `slots` 有哪些配置，你也不用担心，会有TS提示。如果没有出现代码提示，只需要输入 `"` 就可以列出所有可用的属性。或者打开 [Naïve UI](https://www.naiveui.com/zh-CN/os-theme) 的官方网站查看

**formItemProps** 接受 [FormItem](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props) 和 [GridItem](https://www.naiveui.com/zh-CN/os-theme/components/grid#GridItem-Props) 所有除 `path`、`span`、`label` 以外的 Props

:::

```ts
/** 表单配置 */
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "name",
    label: "姓名",
    props: {
      // 自定义属性
      placeholder: "请输入您的姓名",
    },
    // 渲染插槽
    slots: {
      // prefix: () => <NEl>😁</NEl>, // 使用 tsx
      prefix: () => [h(NEl, {}, () => "😁")],
      suffix: () => [h("span", null, "😎")],
    },
    // 表单项配置
    formItemProps: {
      showFeedback: false,
    },
  },
  { name: "age", label: "年龄", component: "number" },
];
```

## 动态数据

在有些情况下，例如选项的数据是通过接口动态获取的，那么你可以使用 `computed` 返回配置项。

```ts
import { type SelectOption } from "naive-ui";

onMounted(async () => {
  loading.value = true;
  options.value = await asyncOptions();
  loading.value = false;
});

/** 默认选项 */
const options = ref<SelectOption[]>([{ label: "吃饭", value: 1 }]);

/** 选项加载状态 */
const loading = ref(false);

/** 模拟获取动态选项 */
const asyncOptions = () => {
  return new Promise<SelectOption[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          { label: "吃饭", value: 1 },
          { label: "睡觉", value: 2 },
          { label: "打游戏", value: 3, disabled: true },
        ]),
      2000
    )
  );
};

/** 表单配置 */
const formConfig = computed((): FormPro.FormItemConfig[] => [
  {
    name: "hobby",
    label: "爱好",
    component: "select",
    props: {
      multiple: true, // 开启多选
      loading: loading.value, // 加载状态
      options: options.value, // 动态选项
    },
  },
]);
```

## 动态显隐

当有时候某个表单项需要根据某些条件显示或者隐藏时，可以使用 `hidden` 属性。

```ts{13}
/** 表单数据 */
const modelValue = ref<FormFields>({
  age: 18,
});

/** 表单配置 */
const formConfig = computed((): FormPro.FormItemConfig[] => [
  { name: "age", label: "年龄", component: "number" },
  {
    name: "hobby",
    label: "爱好",
    component: "select",
    hidden: modelValue.value.age <= 18,
    props: {
      multiple: true, // 开启多选
      loading: loading.value, // 加载状态
      options: options.value, // 动态选项
    },
  },
]);
```

## 使用字典

有时候我们需要使用字典数据做为数据源，那么你可以在表单项配置中添加 `dict` 属性，指定字典的 key，这样会自动从字典中获取数据源。

> [!CAUTION] ⚠️ 注意
> 目前仅支持 `component` 为 `select`、`radio`、`checkbox` 这三种组件使用字典。<br />
> 如果在 `props` 中配置了 `options` 属性，那么 `dict` 属性将无效。

```ts
/** 表单配置 */
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "sex",
    label: "性别",
    component: "select",
    dict: "gender", // 使用字典 [!code focus]
  },
];
```

## 使用插槽

有时候我们需要使用自定义插槽在页面中渲染，那么可以这样做

::: tip 💡 提示

- 使用插槽时的名称需要和绑定 `form-config` 配置的 `name` 属性一致。
- 插槽内容优先展示，会覆盖 `component` 属性。

:::

```vue [vue]{3-4}
<template>
  <FormPro v-model="modelValue" :form-config="formConfig">
    <!-- 自定义插槽 -->
    <template #name>自定义内容</template>
  </FormPro>
</template>

<script lang="ts" setup>
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "name",
    label: "姓名",
    // 使用插槽后，component 属性无效
    component: "input", // [!code --]
  },
];
</script>
```

## 自定义组件

- 有的兄弟可能会说："如果是我自己定义的组件想要渲染怎么办？"
- 可以的兄弟，当然可以！

::: tip 💡 提示

`component` 属性除了接收基本的组件类型以外还可以使用函数返回一个组件，或者直接传递一个组件对象

:::

```ts
/** 简单创建一个组件渲染 msg 信息 */
const MyComponent = defineComponent({
  props: {
    msg: { type: String, default: "默认消息" },
  },
  setup(props) {
    return () => h("div", props.msg);
  },
});

/** 表单配置 */
const formConfig: FormPro.FormItemConfig[] = [
  {
    name: "msg",
    label: "消息",
    // component: () => <MyComponent msg="hello" />, // 使用tsx
    component: () => h(MyComponent, { msg: "hello" }), // 使用h函数
  },
];
```

## Props

| 名称 | 类型 | 必传 | 默认 | 说明 |
| --- | --- | :--: | :--: | --- |
| v-model 或 model-value | `object` | 否 | | 表单绑定数据 |
| operation-span | `number` | 否 | `4` | 操作栏宽度 |
| form-config | [FormItemConfig[]](/components/form-pro#formitemconfig) | 否 | |表单项配置 |
| form-props | [FormProps](https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props) | 否 | `如下` | 表单属性( `model` 除外) |
| grid-props | [GridProps](https://www.naiveui.com/zh-CN/os-theme/components/grid#Grid-Props) | 否 | `如下` | 表单布局属性 |

- `form-props` 默认 `{ labelPlacement: "left", labelWidth: 80 }`
- `grid-props` 默认 `{ xGap: 16 }`

### FormItemConfig

| 名称 | 类型 | 必传 | 默认 | 说明 |
| --- | --- | :--: | :--: | --- |
| name | `string` | 是 | | 字段名 |
| label | `string` | 否 | | 标签 (不传则不显示) |
| span | `number` | 否 | `4` | 栅格宽度 |
| dict | `string` | 否 | | 字典 |
| hidden | `boolean` | 否 | `false` | 是否隐藏 |
| label-message | `string` | 否 | | 提示信息 |
| label-reverse | `boolean` | 否 | `false` | 反转标签 |
| block-message | `string` | 否 | | 块状提示信息 |
| component | [component Type](/components/form-pro#组件类型) | 否 | `input` | 组件 |
| props | [component Props](/components/form-pro#组件属性和插槽) | 否 | `{}` | 组件属性 |
| slots | [component Slots](/components/form-pro#组件属性和插槽) | 否 | `{}` | 组件插槽 |
| form-item-props | [FormItemGi Props](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItemGi-Props) | 否 | `{}` | FormItemGi 属性 |

::: tip 💡 提示

- `label-reverse` 默认为 `false` 提示信息在前，标签在后； 为 `true` 时，提示信息在后，标签在前。

- `block-message` 除了接收 `string` 类型以外还支持 `Component` 和 `() => VNode` 类型。为了美观，在 [**TablePro**](/components/table-pro) 组件表单配置中无效，请使用 `label-message` 替代

- `form-item-props` 中排除了 `path` `label` `span` 属性

:::

### 组件类型

支持的组件类型有

- `input` 输入框
- `textarea` 多行输入框
- `number` 数字输入框
- `password` 密码输入框
- `select` 下拉框
- `radio` 单选组
- `radio-button` 单选按钮组
- `checkbox` 多选组
- `date` 日期选择框
- `time` 时间选择框
- `switch` 开关控件
- `tree-select` 树形选择框
- `color-picker` 颜色选择框
- `slider` 滑块选择器
- `text` 纯文本
- `Component` 自定义组件
- `() => VNode` 自定义组件

### 组件属性和插槽

| 组件 | Props | Slots |
| :--: | --- | --- |
| `input` `textarea` `password` | [Input Props](https://www.naiveui.com/zh-CN/os-theme/components/input#Input-Props) | [Input Slots](https://www.naiveui.com/zh-CN/os-theme/components/input#Input-Slots) |
| `select` | [Select Props](https://www.naiveui.com/zh-CN/os-theme/components/select#Select-Props) | [Select Slots](https://www.naiveui.com/zh-CN/os-theme/components/select#Select-Slots) |
| `radio` `radio-button` | [RadioGroup Props](https://www.naiveui.com/zh-CN/os-theme/components/radio#RadioGroup-Props) | `undefined` |
| `checkbox` | [Checkbox Props](https://www.naiveui.com/zh-CN/os-theme/components/checkbox#Checkbox-Props) | [Checkbox Slots](https://www.naiveui.com/zh-CN/os-theme/components/checkbox#Checkbox-Slots) |
| `date` | [DatePicker Props](https://www.naiveui.com/zh-CN/os-theme/components/date-picker#通用的-Props) | [DatePicker Slots](https://www.naiveui.com/zh-CN/os-theme/components/date-picker#DatePicker-Slots) |
| `time` | [TimePicker Props](https://www.naiveui.com/zh-CN/os-theme/components/time-picker#TimePicker-Props) | [TimePicker Slots](https://www.naiveui.com/zh-CN/os-theme/components/time-picker#TimePicker-Slots) |
| `switch` | [Switch Props](https://www.naiveui.com/zh-CN/os-theme/components/switch#Switch-Props) | [Switch Slots](https://www.naiveui.com/zh-CN/os-theme/components/switch#Switch-Slots) |
| `tree-select` | [TreeSelect Props](https://www.naiveui.com/zh-CN/os-theme/components/tree-select#TreeSelect-Props) | [TreeSelect Slots](https://www.naiveui.com/zh-CN/os-theme/components/tree-select#TreeSelect-Slots) |
| `color-picker` | [ColorPicker Props](https://www.naiveui.com/zh-CN/os-theme/components/color-picker#ColorPicker-Props) | [ColorPicker Slots](https://www.naiveui.com/zh-CN/os-theme/components/color-picker#ColorPicker-Slots) |
| `slider` | [Slider Props](https://www.naiveui.com/zh-CN/os-theme/components/slider#Slider-Props) | [Slider Slots](https://www.naiveui.com/zh-CN/os-theme/components/slider#Slider-Slots) |
| `text` | [Text Props](https://www.naiveui.com/zh-CN/os-theme/components/gradient-text#GradientText-Props) | [Test Slots](https://www.naiveui.com/zh-CN/os-theme/components/gradient-text#GradientText-Slots) |

## Slots

| 属性 | 参数 | 说明 |
| --- | --- | --- |
| operation | `()` | 操作区按钮 |
| \[name\] | `()` | 表单项插槽 |

## Expose

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| validate | `() => Promise<void>` | 触发校验 |
| reset | `() => void` | 重置表单 |
