---
title: Storage 统一本地存储
tags: [工具类]
---

## 介绍

`localStorage` 和 `sessionStorage` 封装了 `set` `get` `remove` `clear` 等方法，方便使用

- `set` 设置值
- `get` 获取值
- `remove` 删除值
- `clear` 清空值

::: warning ⚠️ 确保对键的类型安全访问

- `local` 中传递的泛型 `T` 继承自 `Local`
- `session` 中传递的泛型 `T` 继承自 `Session`
- `Local` 和 `Session` 定义在 [`src/types/global.d.ts`](https://gitee.com/zimo493/vue3-naiveui-admin/blob/main/src/types/global.d.ts) 中

:::

## 使用案例

在 `src/types/global.d.ts` 中的 `Local` 和 `Session` 添加自定义类型

```ts
/** LocalStorage */
interface Local {
  // 已有类型 ...
  localMsg: string; // [!code ++]
}

/** SessionStorage */
interface Session {
  // 已有类型 ...
  sessionMsg: string; // [!code ++]
}
```

### LocalStorage

```ts
import { local } from "@/utils";

/**
 * 错误使用
 * - 类型 "msg" 的参数不能赋给类型 "keyof Local"的参数
 */
local.set("msg", "hello World"); // [!code error]

/**
 * 正确使用
 */
local.set("localMsg", "hello VitePress");
local.get("localMsg");
local.remove("localMsg");
local.clear();
```

### SessionStorage

```ts
import { session } from "@/utils";

/**
 * 错误使用
 * - 类型 "msg" 的参数不能赋给类型 "keyof Session"的参数
 */
session.set("msg", "hello World"); // [!code error]

/**
 * 正确使用
 */
session.set("sessionMsg", "hello VitePress");
session.get("sessionMsg");
session.remove("sessionMsg");
session.clear();
```
