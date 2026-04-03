---
title: Routing
tags: [Routing, Permission, Configuration]
---

## Static Routes

Routes that do not require dynamic permission checks—such as the login page, 404, and other shared pages. Configure the corresponding public routes in `src/router/modules/ruotes.ts`.

## Dynamic Routes

Routes that must be resolved per user permissions and added dynamically via `addRoutes`. The backend route configuration is loaded in `src/store/models/route.ts`.

::: tip Tip

You can add or edit dynamic routes under **System Management / Menu Management**. On startup, the frontend requests the menu API and maps the result to the corresponding frontend routes.

:::

## Route Whitelist

Some routes should be reachable without signing in—for example `/login` and `/404`. Register them in the whitelist in `src/router/modules/guard.ts`.

```ts [src/router/modules/guard.ts]
const whiteList = ["/login", "/404"];
```

## Route Data Structure

```ts [src/types/ruoter.d.ts]
declare namespace AppRoute {
  /** RouteVO: route object */
  interface RouteVO {
    /** Child routes */
    children: RouteVO[];
    /** Component path */
    component?: string;
    /** Route meta */
    meta?: AppRoute.RouteMeta;
    /** Route name */
    name?: string;
    /** Route path */
    path: string;
    /** Redirect target */
    redirect?: string;
  }

  /** Meta attached to a single route */
  interface RouteMeta {
    /**
     * Menu title
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
     * Always show the parent menu, even if there is only one child
     * true: show parent, false: hide parent and show the single child
     * @default false
     */
    alwaysShow?: boolean;

    /**
     * Whether to cache the page (keep-alive)
     * true: cache, false: do not cache
     * @default false
     */
    keepAlive?: boolean;

    /** Route parameters */
    params?: Recordable;

    /** Whether the tab is affixed (pinned) */
    affix?: boolean;

    /**
     * Which menu should stay active for this route
     * @example '/dashboard'
     */
    activeMenu?: string;
  }
}
```
