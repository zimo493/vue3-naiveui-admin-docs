---
title: Permission Directive
description: Used to control whether the current user has certain permissions.
tags: [Directive, Permission]
---

## Button Permission

### Example

```vue [vue]
<template>
  <!-- Array -->
  <n-button v-has-perm="['sys:user:add', 'sys:user:edit']" type="primary">
    Add
  </n-button>

  <!-- String -->
  <n-button v-has-perm="'sys:user:edit'" type="info"> Edit </n-button>
</template>
```

## Role Permission

### Example

```vue [vue]
<template>
  <!-- Array -->
  <n-button v-has-role="['ADMIN', 'TEST']" type="primary"> Add </n-button>

  <!-- String -->
  <n-button v-has-role="'ADMIN'" type="info"> Edit </n-button>
</template>
``` 