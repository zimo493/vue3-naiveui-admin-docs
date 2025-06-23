---
title: 请求服务配置
---

## 修改后台地址

请在根目录下的 `.env.development` 中设置好 `VITE_APP_BASE_API` 代理前缀 和 `VITE_APP_API_URL` 转发的真实接口地址
::: code-group

```ini [.env.development]
VITE_APP_BASE_API=/dev-api
VITE_APP_API_URL=http://localhost:8989
```

:::

## 定义请求

项目中的所有请求都通过 `src/utils/request.ts` 发起，封装了常用的请求方法，如 `get` `post` `put` `delete` `patch` `request` 等

### 常见使用方法

这里有一些定义不同的使用请求方法的例子

::: details 接口数据返回格式

```json
{
  "code": "string",
  "data": "object",
  "msg": "string"
}
```

:::

::: code-group

```ts [GET请求]
import { get } from "@/utils";

interface IGetData {
  id: number;
  name: string;
}

 // 传递的类型对应接口返回的 data 类型
export const fetachGet: () => get<IGetData>(`/get`, { id: 1 }),
```

```ts [POST请求]
import { post } from "@/utils";
export const fetachPost: () => post(`/post`, { id: 1 }, { name: "张三" }),
```

```ts [PUT请求]
import { put } from "@/utils";
export const fetachPut: () => put(`/put`, undefined, { name: "张三" }),
```

```ts [DELETE请求]
import { del } from "@/utils";
export const fetachDelete: () => del(`/delete`, { id: 1 }),
```

:::

## 使用方法

- 在 `src/api` 下新建一个和 `页面对应` 的文件定义请求并导出
- 返回类型定义在 `src/types` 下新建一个 ` .d.ts`

::: details 全局类型定义 `src/types/global.d.ts` 文件，分页查询和分页相应等

```ts
/**
 * 分页查询参数
 */
interface PageQuery {
  pageNum: number;
  pageSize: number;
}

/**
 * 分页响应对象
 */
interface PageResult<T> {
  /** 数据列表 */
  list: T;
  /** 总数 */
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
   * 获取验证码
   * @return 验证码信息
   */
  getCaptcha: () => get<Auth.CaptchaInfo>(`${AUTH_BASE_URL}/captcha`),

  /**
   * 使用 request
   * @return 验证码信息
   */
  getCaptcha2: () =>
    request<any, Auth.CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
      // 其他参数
    }),

  getCaptcha3: () =>
    request.get<any, Auth.CaptchaInfo>(`${AUTH_BASE_URL}/captcha`),
};
```

```ts [src/types/auth.d.ts]
/* 权限类型数据 */
declare namespace Auth {
  /** 验证码信息 */
  interface CaptchaInfo {
    /** 验证码缓存key */
    captchaKey: string;
    /** 验证码图片Base64字符串 */
    captchaBase64: string;
  }

  // 其他请求类型定义
}
```

:::

### 不携带 Token 和 不进行防重复提交

默认请求都会携带 `Token`， 某些情况下请求不需要传递 `Token`， 例如 **获取验证码**， 此时可以添加 `headers` 参数使用 `isToken` 参数设置为 `false` 来忽略 `Token`

默认的 `POST` `PUT` 请求会进行防重复提交，例如 **表单提交**，特定情况下不需要进行防重复提交，此时可以添加 `headers` 参数使用 `isRepeatSubmit` 参数设置为 `false` 来忽略防重复提交

::: warning 提示
防重复提交请求的最大数据量为 `5M`，超出允许的 `5M` 限制，无法进行防重复提交验证
:::

::: code-group

```ts [src/api/auth.ts]
import request from "@/utils";

const AUTH_BASE_URL = "/api/v1/auth";

export default {
  /**
   * 获取验证码
   * @return 验证码信息
   */
  getCaptcha2: () =>
    request<any, Auth.CaptchaInfo>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
      // 其他参数
      headers: {
        isToken: false, // 发送的请求不会携带 token
        isRepeatSubmit: false, // 允许重复提交 (在获取验证码场景下不适用)
      },
    }),
};
```

:::

### 使用多个服务

在有些情况下，可能需要使用多个后台服务地址，例如 **文件上传** 时，需要使用文件服务的地址，那么你可以这样做。

- 重写 baseURL

```ts [/src/api/upload.ts]
import { request } from "@/utils/request";

export default {
  upload: (
    formData: FormData,
    onUploadProgress?: (e: AxiosProgressEvent) => void
  ) =>
    request<any, FileInfo>({
      baseURL: "/dev-upload", // 重写baseURL
      url: "/file/upload",
      method: "post",
      data: formData,
      headers: { "Content-Type": "multipart/form-data", repeatSubmit: false },
      onUploadProgress,
    }),
};
```

- 添加代理
  在 `build/serverOptions.ts` 文件中添加代理配置

```ts [build/serverOptions.ts]
export const serverOptions = (env: ImportMetaEnv): ServerOptions => {
  return {
    // 允许IP访问
    host: "0.0.0.0",
    // 应用端口 (默认:3000)
    port: Number(env.VITE_APP_PORT),
    // 运行是否自动打开浏览器
    open: true,
    proxy: {
      // 原有的代理配置
      ...

      // 添加代理前缀为 /dev-upload 的请求
      "/dev-upload": {
        changeOrigin: true,
        target: "http://oss.demo.com",
        rewrite: (path: string) => path.replace(new RegExp("^/dev-upload", ""),
      }
    },
  };
};
```

经过以上步骤后以 `/dev-upload` 开头的请求都会被代理到 `http://oss.demo.com`
