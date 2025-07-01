---
title: Routing
tags: [Routing, Permission, Configuration]
---

## Static Routes

These are routes that do not require dynamic permission checks, such as login page, 404, and other common pages. Configure the corresponding public routes in `src/router/modules/routes.ts`.

## Dynamic Routes

These are routes that require dynamic permission checks based on the user and are dynamically added via `addRoutes`. The frontend loads the backend API route configuration in `src/store/models/route.ts`.

::: tip Note

Dynamic routes can be added and modified in `System Management / Menu Management`. The frontend will automatically request the API to get the menu information and convert it into the corresponding frontend routes.

:::

## Route Whitelist

In some cases, certain routes can be accessed without login, such as `/login`, `/404`, etc. You can add them to the whitelist in `src/router/modules/guard.ts`.

```ts [src/router/modules/guard.ts]
const whiteList = ["/login", "/404"];
```

## Route Data Structure

```ts [src/types/router.d.ts]
declare namespace AppRoute {
  /** RouteVO, route object */
  interface RouteVO {
    /** Child route list */
    children: RouteVO[];
    /** Component path */
    component?: string;
    /** Route attributes */
    meta?: AppRoute.RouteMeta;
    /** Route name */
    name?: string;
    /** Route path */
    path: string;
    /** Redirect link */
    redirect?: string;
  }

  /** Meta information carried by a single route */
  interface RouteMeta {
    /**
     * Menu name
     * @example 'Dashboard'
     */
    title?: string;

    /**
     * Menu icon
     * @example 'el-icon-edit'
     */
    icon?: string;

    /**
     * Whether to hide the menu
     * true: hide, false: show
     * @default false
     */
    hidden?: boolean;

    /**
     * Always show the parent menu, even if there is only one child menu
     * true: show parent menu, false: hide parent menu, show only the single child node
     * @default false
     */
    alwaysShow?: boolean;

    /**
     * Whether to cache the page
     * true: cache, false: do not cache
     * @default false
     */
    keepAlive?: boolean;

    /** Route parameters */
    params?: Recordable;
    /** Whether to affix in tab */
    affix?: boolean;
  }
}
``` 