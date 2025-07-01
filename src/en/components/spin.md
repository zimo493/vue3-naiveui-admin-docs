---
title: Common Async Execution Function & Loading Animation Unified Handling
tags: [Tool]
---

## Method Definition

```ts [src/utils/spin.ts]
import { useLoading } from "@/hooks";

const {
  loading: spin, // Whether loading
  startLoading: startSpin, // Start loading
  endLoading: endSpin, // End loading
} = useLoading();

/**
 * Common async execution function
 * @param apiCall API call function
 * @param onSuccess Success callback
 * @param message Success message
 */
const executeAsync = async <T>(
  apiCall: () => Promise<T>,
  onSuccess?: (data: T) => void | Promise<void>,
  message: string | null = "Operation successful"
) => {
  try {
    startSpin(); // Start loading animation
    const data = await apiCall(); // Execute the passed async API call

    if (message) {
      window.$message.success(message); // Show success message if provided
    }
    if (onSuccess) {
      await onSuccess(data); // Execute and await onSuccess callback if provided
    }

    return data; // Return API call result
  } catch (error) {
    console.error(error); // Catch and print error

    return null;
  } finally {
    endSpin(); // End loading animation regardless of success or failure
  }
};
```

## useLoading

The `useLoading` function is a custom Hook for managing loading state.

- Uses the `useBoolean` Hook to initialize a boolean state `loading` (default is `false`).
- Provides `startLoading` and `endLoading` methods to start and stop loading state.
- Returns an object containing the `loading` state and control methods for use in components.

## executeAsync

The `executeAsync` function is a common async execution function for unified API call handling logic.

- **API Call**: Executes the passed async function `apiCall`
- **Show Loading Animation**: Calls `startSpin()` and `endSpin()` before and after the call
- **Success Handling**: Shows the specified `message` if provided, otherwise shows "Operation successful"; executes `onSuccess` callback if provided
- **Error Handling**: Catches errors, prints them, and returns `null`

## Example

```vue [src/views/system/user/index.vue]
<template>
  <!-- Loading state -->
  <span>{{ spin }}</span>
</template>

<script setup lang="ts">
import { spin, executeAsync } from "@/utils";

/** Submit form */
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
