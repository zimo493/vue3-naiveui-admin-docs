---
title: Custom Theme
tags: [Configuration]
---

## System Settings

Modify the corresponding configuration in `src/store/models/app.ts`.

- `footerText`: Footer text
- `theme`: Global component library theme variables
- `lang`: Language (to be developed)
- `borderRadius`: Component border radius, default `4px`
- `followPrimary`: Whether the component library info color follows the theme color, default `false`
- `collapsed`: Whether the sidebar is collapsed, default `false`
- `grayMode`: Whether to enable gray mode, default `false`
- `colorWeak`: Whether to enable color weak mode, default `false`
- `fixed`: Whether to fix the header and footer, default `true`
- `loadFlag`: Page reload flag, default `true`
- `showLogo`: Whether to show the logo, default `true`
- `showTabs`: Whether to show tagsView, default `true`
- `showTabsIcon`: Whether to show icons on tab pages, default `true`
- `showFooter`: Whether to show the footer, default `false`
- `showProgress`: Whether to show the progress bar, default `true`
- `showBreadcrumb`: Whether to show breadcrumbs, default `true`
- `showBreadcrumbIcon`: Whether to show breadcrumb icons, default `true`
- `showWatermark`: Whether to show watermark, default `false`
- `watermarkText`: Watermark text, can be edited in System Settings
- `transitionAnimation`: Page transition animation, default `fade-slide`
- `layoutMode`: Layout mode, default `LayoutMode.LEFT`
- `contentFullScreen`: Whether the content area is fullscreen, default `false`
- `sideWidth`: Sidebar width, default `200`
- `sideCollapsedWidth`: Sidebar collapsed width, default `50`
- `sideTrigger`: Sidebar trigger, default `bar`
- `placement`: Message notification position, default `top`
- `inverted`: Whether the menu and dropdown menu use inverted theme, default `false`

## Component Library Styles

Modify `src/utils/theme.ts` to add the style variables you need. For details, refer to [Naive-UI](https://www.naiveui.com/en-US/dark/docs/customize-theme#Customizing-component-theme-vars)

```ts [src/utils/theme.ts]
import type { GlobalThemeOverrides } from "naive-ui";

/** Default primary color */
export const primaryColor = "#ac29e1";
/** Default info color */
export const infoColor = "#70c0e8";
/** Default success color */
export const successColor = "#18a058";
/** Default warning color */
export const warningColor = "#f0a020";
/** Default error color */
export const errorColor = "#d03050";

/** Default theme configuration */
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
