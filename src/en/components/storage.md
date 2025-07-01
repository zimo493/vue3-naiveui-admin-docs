---
title: Storage Unified Local Storage
tags: [Tool]
---

## Introduction

`localStorage` and `sessionStorage` encapsulate `set`, `get`, `remove`, `clear` and other methods for convenient use.

- `set` Set value
- `get` Get value
- `remove` Delete value
- `clear` Clear values

::: warning ⚠️ Ensure type-safe key access

- The generic `T` passed to `local` extends `Local`
- The generic `T` passed to `session` extends `Session`
- `Local` and `Session` are defined in [`src/types/global.d.ts`](https://gitee.com/zimo493/vue3-naiveui-admin/blob/main/src/types/global.d.ts)

:::

## Usage Example

Add custom types to `Local` and `Session` in `src/types/global.d.ts`

```ts
/** LocalStorage */
interface Local {
  // Existing types ...
  localMsg: string; // [!code ++]
}

/** SessionStorage */
interface Session {
  // Existing types ...
  sessionMsg: string; // [!code ++]
}
```

### LocalStorage

```ts
import { local } from "@/utils";

/**
 * Incorrect usage
 * - The parameter "msg" cannot be assigned to a parameter of type "keyof Local"
 */
local.set("msg", "hello World"); // [!code error]

/**
 * Correct usage
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
 * Incorrect usage
 * - The parameter "msg" cannot be assigned to a parameter of type "keyof Session"
 */
session.set("msg", "hello World"); // [!code error]

/**
 * Correct usage
 */
session.set("sessionMsg", "hello VitePress");
session.get("sessionMsg");
session.remove("sessionMsg");
session.clear();
``` 