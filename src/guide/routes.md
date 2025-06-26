---
title: 路由
tags: [路由, 权限, 配置]
---

## 静态路由

代表那些不需要动态判断权限的路由，如登录页、404、等通用页面，在 `src/router/modules/ruotes.ts` 配置对应的公共路由

## 动态路由

代表那些需要根据用户动态判断权限并通过 `addRoutes` 动态添加的页面，在 `src/store/models/route.ts` 加载后端接口路由配置。

::: tip 提示

动态路由可以在 `系统管理/菜单管理` 进行新增和修改操作，前端加载会自动请求接口获取菜单信息并转换成前端对应的路由。

:::

## 路由白名单

在有些情况下，某些路由不需要登录就可以访问，比如 `/login`、`/404` 等，此时可以在 `src/router/modules/guard.ts` 中添加白名单。

```ts [src/router/modules/guard.ts]
const whiteList = ["/login", "/404"];
```

## 路由数据结构

```ts [src/types/ruoter.d.ts]
declare namespace AppRoute {
  /** RouteVO，路由对象 */
  interface RouteVO {
    /** 子路由列表 */
    children: RouteVO[];
    /** 组件路径 */
    component?: string;
    /** 路由属性 */
    meta?: AppRoute.RouteMeta;
    /** 路由名称 */
    name?: string;
    /** 路由路径 */
    path: string;
    /** 跳转链接 */
    redirect?: string;
  }

  /** 单个路由所携带的meta标识 */
  interface RouteMeta {
    /**
     * 菜单名称
     * @example 'Dashboard'
     */
    title?: string;

    /**
     * 菜单图标
     * @example 'el-icon-edit'
     */
    icon?: string;

    /**
     * 是否隐藏菜单
     * true 隐藏, false 显示
     * @default false
     */
    hidden?: boolean;

    /**
     * 始终显示父级菜单，即使只有一个子菜单
     * true 显示父级菜单, false 隐藏父级菜单，显示唯一子节点
     * @default false
     */
    alwaysShow?: boolean;

    /**
     * 是否缓存页面
     * true 缓存, false 不缓存
     * @default false
     */
    keepAlive?: boolean;

    /** 路由参数 */
    params?: Recordable;
    /** 是否固定在tab */
    affix?: boolean;
  }
}
```
