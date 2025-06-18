# 自定义主题

## 系统设置

在 `src/store/models/app/index.ts` 中修改对应的配置即可

- `footerText`: 页脚文字
- `theme`: 全局组件库主题变量
- `lang`: 语言(待开发)
- `borderRadius`: 组件边框圆角，默认 `4px`
- `followPrimary`: 组件库信息色是否跟随主题色，默认 `false`
- `collapsed`: 侧边栏是否收起，默认 `false`
- `grayMode`: 是否开启灰色模式，默认 `false`
- `colorWeak`: 是否开启色弱模式，默认 `false`
- `fixed`: 是否固定头部和底部，默认 `true`
- `loadFlag`: 页面重载标识，默认 `true`
- `showLogo`: 是否显示 logo，默认 `true`
- `showTabs`: 是否显示 tagsView，默认 `true`
- `showFooter`: 是否显示页脚，默认 `false`
- `showProgress`: 是否显示进度条，默认 `true`
- `showBreadcrumb`: 是否显示面包屑，默认 `true`
- `showBreadcrumbIcon`: 是否显示面包屑图标，默认 `true`
- `showWatermark`: 是否显示水印，默认 `false`
- `transitionAnimation`: 页面过度动画，默认 `fade-slide`
- `layoutMode`: 布局模式，默认 `LayoutMode.LEFT`
- `contentFullScreen`: 内容区域是否全屏，默认 `false`
- `sideWidth`: 侧边栏宽度，默认 `200`
- `sideCollapsedWidth`: 侧边栏折叠宽度，默认 `50`
- `sideTrigger`: 侧边栏触发器，默认 `bar`
- `placement`: message 消息提示位置，默认 `top`

## 组件库样式

修改 `src/store/models/app/theme.ts` ，添加你需要的样式变量，具体可参考 [Naive-UI](https://www.naiveui.com/zh-CN/dark/docs/customize-theme#调整组件主题变量)

```ts [src/store/models/app/theme.ts]
import type { GlobalThemeOverrides } from "naive-ui";

/** 默认主色 */
export const primaryColor = "#ac29e1";
/** 默认信息色 */
export const infoColor = "#70c0e8";
/** 默认成功色 */
export const successColor = "#18a058";
/** 默认警告色 */
export const warningColor = "#f0a020";
/** 默认错误色 */
export const errorColor = "#d03050";

/** 默认主题配置 */
const themeConfig: GlobalThemeOverrides = {
  common: {
    primaryColor,
    primaryColorHover: "#b644e5",
    primaryColorPressed: "#9b1dce",
    primaryColorSuppl: "#8e1abd",
    infoColor,
    infoColorHover: "#8accec",
    infoColorPressed: "#56b4e4",
    infoColorSuppl: "#44ade1",
    successColor,
    successColorHover: "#1cbb67",
    successColorPressed: "#148549",
    successColorSuppl: "#117440",
    warningColor,
    warningColorHover: "#f2ac3d",
    warningColorPressed: "#e2910f",
    warningColorSuppl: "#cf850e",
    errorColor,
    errorColorHover: "#d64965",
    errorColorPressed: "#b82a46",
    errorColorSuppl: "#a72640",
  },
};

export default themeConfig;
```
