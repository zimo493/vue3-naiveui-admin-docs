<script setup lang="ts">
import { NTag, NFlex, NText, NDivider } from 'naive-ui'
</script>

# DictTag 组件

## 介绍

以 `Tag` 组件形式显示字典数据

- 基于 [NTag](https://www.naiveui.com/zh-CN/os-theme/components/tag) 封装

## 基本使用

```vue [vue]
<template>
  <!-- 单个 Number 类型的 value -->
  <DictTag :options="gender" :value="1" />

  <!-- 单个 String 类型的 value -->
  <DictTag :options="gender" value="2" />

  <!-- Array 类型的 value -->
  <DictTag :options="gender" :value="[0, 1]" />
  <DictTag :options="gender" :value="['1', '2']" />

  <!-- String 类型的 value 使用分隔符 -->
  <DictTag :options="gender" value="0,1,2" />

  <!-- String 类型的 value 自定义分隔符 -->
  <DictTag :options="gender" value="0-1-2" separator="-" />
</template>

<script lang="ts" setup>
import { useDict } from "@/hooks";

const { gender } = useDict("gender");
</script>
```

## 页面渲染

<NFlex vertical>
  <NFlex align="center">
    <NTag type="primary" :round="false" :bordered="false"> 男 </NTag>
    <span style="font-size: 14px">单个 Number 类型的 value</span>
  </NFlex>

  <NFlex align="center">
    <NTag type="error" :round="false" :bordered="false"> 女 </NTag>
    <span style="font-size: 14px">单个 String 类型的 value</span>
  </NFlex>

  <NFlex align="center">
    <NText style="font-size: 14px">保密</NText>
    <NTag type="info" :round="false" :bordered="false"> 男 </NTag>
    <NDivider vertical />
    <NTag type="info" :round="false" :bordered="false"> 男 </NTag>
    <NTag type="error" :round="false" :bordered="false"> 女 </NTag>
    <span style="font-size: 14px">Array 类型的 value</span>
  </NFlex>

  <NFlex align="center">
    <NText style="font-size: 14px">保密</NText>
    <NTag type="info" :round="false" :bordered="false"> 男 </NTag>
    <NTag type="error" :round="false" :bordered="false"> 女 </NTag>
    <span style="font-size: 14px">String 类型的 value 使用分隔符</span>
  </NFlex>

  <NFlex align="center">
    <NText style="font-size: 14px">保密</NText>
    <NTag type="info" :round="false" :bordered="false"> 男 </NTag>
    <NTag type="error" :round="false" :bordered="false"> 女 </NTag>
    <span style="font-size: 14px">String 类型的 value 自定义分隔符</span>
  </NFlex>
</NFlex>

## Props

| 名称 | 类型 | 必传 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| options | `DictData.Option[]` | 是 | | 字典数据列表 |
| value | `String \| Number \| String[] \| Number[]` | 是 | | 绑定值 |
| round | `Boolean` | 否 | `false` | 是否圆角 |
| bordered | `Boolean` | 否 | `false` | 是否显示边框 |
| separator | `String` | 否 | `,` | 分隔符 |
