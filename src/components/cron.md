---
title: Crontab 组件
---

## 介绍

`Crontab` 组件创建和编辑 Cron 表达式，我猜你可能用不到

- 采用 [NModal](https://www.naiveui.com/zh-CN/os-theme/components/modal) 模态框组件

## 示例

```vue [vue]
<template>
  <div>
    <n-input-group>
      <n-input
        v-model:value="cronExpression"
        placeholder="请输入或生成表达式"
        clearable
      />
      <n-button type="primary" @click="() => crontabRef?.open()">
        <template #icon>
          <Icones icon="ant-design:clock-circle-outlined" />
        </template>
        生成表达式
      </n-button>
    </n-input-group>

    <!-- 表达式生成器 -->
    <Crontab ref="crontab" v-model="cronExpression" />
  </div>
</template>

<script lang="ts" setup>
const crontabRef = useTemplateRef("crontab");

const cronExpression = ref("0 0 0 * * ?");
</script>
```

## Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | :--: | --- | --- |
| v-model | `String` | 否 | `""` | Cron表达式 |

## Expose

| 函数名 | 参数 | 说明 |
| --- | --- | --- |
| open | `() => void` | 打开表达式生成器模态框方法 |
