---
title: Crontab Component
description: Create and edit Cron expressions, you might not need it
tags: [Component]
---

- Uses [NModal](https://www.naiveui.com/en-US/os-theme/components/modal) modal component

## Example

```vue [vue]
<template>
  <div>
    <n-input-group>
      <n-input
        v-model:value="cronExpression"
        placeholder="Please enter or generate an expression"
        clearable
      />
      <n-button type="primary" @click="() => crontabRef?.open()">
        <template #icon>
          <Icones icon="ant-design:clock-circle-outlined" />
        </template>
        Generate Expression
      </n-button>
    </n-input-group>

    <!-- Expression Generator -->
    <Crontab ref="crontab" v-model="cronExpression" />
  </div>
</template>

<script lang="ts" setup>
const crontabRef = useTemplateRef("crontab");

const cronExpression = ref("0 0 0 * * ?");
</script>
```

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| v-model | `String` | No | `""` | Cron expression |

## Expose

| Function Name | Params | Description |
| --- | --- | --- |
| open | `() => void` | Method to open the expression generator modal |
``` 