---
title: DictTag Component
description: Display dictionary data in tag component form
tags: [Component, Dictionary]
---

<script setup lang="ts">
import { NTag, NFlex, NText, NDivider } from 'naive-ui'
</script>

- Encapsulated based on [NTag](https://www.naiveui.com/en-US/os-theme/components/tag)

## Basic Usage

```vue [vue]
<template>
  <!-- Single Number value -->
  <DictTag :options="gender" :value="1" />

  <!-- Single String value -->
  <DictTag :options="gender" value="2" />

  <!-- Array value -->
  <DictTag :options="gender" :value="[0, 1]" />
  <DictTag :options="gender" :value="['1', '2']" />

  <!-- String value with separator -->
  <DictTag :options="gender" value="0,1,2" />

  <!-- String value with custom separator -->
  <DictTag :options="gender" value="0-1-2" separator="-" />
</template>

<script lang="ts" setup>
import { useDict } from "@/hooks";

const { gender } = useDict("gender");
</script>
```

## Page Rendering

<NFlex vertical>
  <NFlex align="center">
    <NTag type="primary" :round="false" :bordered="false"> Male </NTag>
    <span style="font-size: 14px">Single Number value</span>
  </NFlex>

  <NFlex align="center">
    <NTag type="error" :round="false" :bordered="false"> Female </NTag>
    <span style="font-size: 14px">Single String value</span>
  </NFlex>

  <NFlex align="center">
    <NText style="font-size: 14px">Confidential</NText>
    <NTag type="info" :round="false" :bordered="false"> Male </NTag>
    <NDivider vertical />
    <NTag type="info" :round="false" :bordered="false"> Male </NTag>
    <NTag type="error" :round="false" :bordered="false"> Female </NTag>
    <span style="font-size: 14px">Array value</span>
  </NFlex>

  <NFlex align="center">
    <NText style="font-size: 14px">Confidential</NText>
    <NTag type="info" :round="false" :bordered="false"> Male </NTag>
    <NTag type="error" :round="false" :bordered="false"> Female </NTag>
    <span style="font-size: 14px">String value with separator</span>
  </NFlex>

  <NFlex align="center">
    <NText style="font-size: 14px">Confidential</NText>
    <NTag type="info" :round="false" :bordered="false"> Male </NTag>
    <NTag type="error" :round="false" :bordered="false"> Female </NTag>
    <span style="font-size: 14px">String value with custom separator</span>
  </NFlex>
</NFlex>

## Props

| Name | Type | Required | Default | Description |
| --- | --- | :--: | --- | --- |
| options | `DictData.Option[]` | Yes | | Dictionary data list |
| value | `String \| Number \| String[] \| Number[]` | Yes | | Bound value |
| round | `Boolean` | No | `false` | Whether rounded |
| bordered | `Boolean` | No | `false` | Whether to show border |
| separator | `String` | No | `,` | Separator |

</rewritten_file> 