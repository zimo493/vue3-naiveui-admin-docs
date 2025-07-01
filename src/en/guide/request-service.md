---
title: Request Service Configuration
tags: [Configuration]
---

## Modify Backend Address

Please set `VITE_APP_BASE_API` (proxy prefix) and `VITE_APP_API_URL` (real API forwarding address) in the `.env.development` file in the root directory.

::: code-group

```ini [.env.development]
VITE_APP_BASE_API=/dev-api
VITE_APP_API_URL=http://localhost:8989
```

:::

## Custom Requests

All requests in the project are initiated through `src/utils/request.ts`, which encapsulates common request methods such as `get`, `post`, `put`, `delete`, `patch`, and `request`.

### Common Usage Examples

Here are some examples of using different request methods.

::: details API Response Format

```json
{
  "code": "string",
  "data": "object",
  "msg": "string"
}
```

:::

::: code-group

```ts [GET Request]
import { get } from "@/utils";

interface IGetData {
  id: number;
  name: string;
}

// The type passed corresponds to the data type returned by the API
export const fetchGet: () => get<IGetData>(`/get`, { id: 1 }),
```

```ts [POST Request]
import { post } from "@/utils";
export const fetchPost: () => post(`/post`, { id: 1 }, { name: "Zhang San" }),
```

```ts [PUT Request]
import { put } from "@/utils";
export const fetchPut: () => put(`/put`, undefined, { name: "Zhang San" }),
```

```ts [DELETE Request]
import { del } from "@/utils";
export const fetchDelete: () => del(`/delete`, { id: 1 }),
```

:::

## Usage

- Create a new file under `src/api` corresponding to the page and define and export the request
- Define the return type in a new `.d.ts` file under `src/types`

::: details Global Type Definition `src/types/global.d.ts` file, for pagination query and pagination response, etc.

```ts
/**
 * Pagination query parameters
 */
interface PageQuery {
  pageNum: number;
  pageSize: number;
}

/**
 * Pagination response object
 */
interface PageResult<T> {
  /** Data list */
  list: T;
  /** Total count */
  total: number;
}
```

:::

::: code-group

```ts [src/api/auth.ts]
import request, { get } from "@/utils";

const AUTH_BASE_URL = "/api/v1/auth";

export default {
  /**
   * Get captcha
   * @return Captcha info
   */
  getCaptcha: () => get<Auth.CaptchaInfo>(`${AUTH_BASE_URL}/captcha`),

  /**
   * Use request
   * @return Captcha info
   */
  getCaptcha2: () =>
    request<any, Auth.CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
      // other params
    }),

  getCaptcha3: () =>
    request.get<any, Auth.CaptchaInfo>(`${AUTH_BASE_URL}/captcha`),
};
```

```ts [src/types/auth.d.ts]
/* Auth type data */
declare namespace Auth {
  /** Captcha info */
  interface CaptchaInfo {
    /** Captcha cache key */
    captchaKey: string;
    /** Captcha image Base64 string */
    captchaBase64: string;
  }

  // Other request type definitions
}
```

:::

### Without Token and Without Repeat Submit Prevention

By default, all requests will carry a `Token`. In some cases, requests do not need to pass a `Token`, such as **getting a captcha**. In this case, you can add the `headers` parameter and set `isToken` to `false` to ignore the `Token`.

By default, `POST` and `PUT` requests will have repeat submit prevention, such as **form submission**. In some cases, you do not need repeat submit prevention. You can add the `headers` parameter and set `isRepeatSubmit` to `false` to ignore repeat submit prevention.

::: warning Note
The maximum data size for repeat submit prevention requests is `5M`. If it exceeds the allowed `5M` limit, repeat submit prevention verification cannot be performed.
:::

::: code-group

```ts [src/api/auth.ts]
import request from "@/utils";

const AUTH_BASE_URL = "/api/v1/auth";

export default {
  /**
   * Get captcha
   * @return Captcha info
   */
  getCaptcha2: () =>
    request<any, Auth.CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
      // other params
      headers: {
        isToken: false, // The request will not carry token
        isRepeatSubmit: false, // Allow repeat submit (not applicable in captcha scenario)
      },
    }),
};
```

:::

### Using Multiple Services

In some cases, you may need to use multiple backend service addresses, such as **file upload** where you need to use the file service address. You can do this as follows.

- Override baseURL

```ts [/src/api/upload.ts]
import { request } from "@/utils/request";

export default {
  upload: (
    formData: FormData,
    onUploadProgress?: (e: AxiosProgressEvent) => void
  ) =>
    request<any, FileInfo>({
      baseURL: "/dev-upload", // Override baseURL
      url: "/file/upload",
      method: "post",
      data: formData,
```
