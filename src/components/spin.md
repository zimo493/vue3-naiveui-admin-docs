---
title: 通用异步执行函数加载动画统一处理
---

## 方法定义

```ts [src/utils/spin.ts]
import { useLoading } from "@/hooks";

const {
  loading: spin, // 是否加载中
  startLoading: startSpin, // 开始加载
  endLoading: endSpin, // 结束加载
} = useLoading();

/**
 * 通用异步执行函数
 * @param apiCall API调用函数
 * @param onSuccess 成功回调
 * @param message 成功消息
 */
const executeAsync = async <T>(
  apiCall: () => Promise<T>,
  onSuccess?: (data: T) => void | Promise<void>,
  message: string | null = "操作成功"
) => {
  try {
    startSpin(); // 开始加载动画
    const data = await apiCall(); // 执行传入的异步 API 调用

    if (message) {
      window.$message.success(message); // 如果提供了 message，显示成功提示
    }
    if (onSuccess) {
      await onSuccess(data); // 如果提供了 onSuccess 回调，执行并等待完成
    }

    return data; // 返回 API 调用的结果
  } catch (error) {
    console.error(error); // 捕获并打印错误信息

    return null;
  } finally {
    endSpin(); // 无论成功与否，最后结束加载动画
  }
};
```

## useLoading

该函数 `useLoading` 是一个自定义 Hook，用于管理加载状态

- 使用 `useBoolean` Hook 初始化一个布尔状态 `loading`（默认为 `false`）。
- 提供 `startLoading` 和 `endLoading` 方法分别用于开启和关闭加载状态。
- 返回包含 `loading` 状态及控制方法的对象，便于在组件中使用。

## executeAsync

该函数 `executeAsync` 是一个通用的异步执行函数，用于封装 API 调用的统一处理逻辑。

- **调用 API**：执行传入的异步函数 `apiCall`
- **显示加载动画**：在调用前后分别执行 `startSpin()` 和 `endSpin()`。
- **成功处理**：若指定 `message`，则显示指定的 `message`；否则默认显示 `操作成功`；若提供 `onSuccess` 回调，则传递结果并等待其完成
- **异常捕获**：捕获错误并打印，返回 `null`

## 案例

```vue [src/views/system/user/index.vue]
<template>
  <!-- 加载状态 -->
  <span>{{ spin }}</span>
</template>

<script setup lang="ts">
import { spin, executeAsync } from "@/utils";

/** 表单提交 */
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
