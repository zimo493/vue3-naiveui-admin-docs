# Permission 指令

## 介绍

Permission 指令用于控制当前用户是否具有某种权限。

## 按钮权限

### 示例

```vue [vue]
<template>
  <!-- 数组 -->
  <n-button v-has-perm="['sys:user:add', 'sys:user:edit']" type="primary">
    <template #icon>
      <icon-park-outline-plus />
    </template>
    新增
  </n-button>

  <!-- 字符串 -->
  <n-button v-has-perm="'sys:user:edit'" type="info">
    <template #icon>
      <icon-park-outline-plus />
    </template>
    修改
  </n-button>
</template>
```

## 角色权限

### 示例

```vue [vue]
<template>
  <!-- 数组 -->
  <n-button v-has-role="['ADMIN', 'TEST']" type="primary">
    <template #icon>
      <icon-park-outline-plus />
    </template>
    新增
  </n-button>

  <!-- 字符串 -->
  <n-button v-has-role="'ADMIN'" type="info">
    <template #icon>
      <icon-park-outline-plus />
    </template>
    修改
  </n-button>
</template>
```
