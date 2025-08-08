---
title: Directory Structure
---

```ini [vue3-naiveui-admin]
├─ .husky                   # Git commit hooks
├─ .vscode                  # VSCode recommended settings
├─ build                    # Build configuration files
│  ├─ buildOptions.ts        # Vite build configuration
│  ├─ cssOptions.ts          # CSS configuration
│  ├─ htmlPlugin.ts          # Custom Vite plugin
│  ├─ index.ts               # Build entry
│  ├─ optimizeDepsOptions.ts # Dependency optimization configuration
│  ├─ pluginsOptions.ts      # Plugin configuration
│  ├─ resolveOptions.ts      # Path configuration
│  ├─ rollupOptions.ts       # Rollup configuration
│  ├─ serverOptions.ts       # Development server configuration
│  └─ terserOptions.ts       # Terser configuration
├─ locales                  # Internationalization files
├─ public                   # Static assets (this folder will not be bundled)
├─ sql                      # Database scripts
│  └─ youlai_boot.sql        # Base database script
├─ src                      # Source code
│  ├─ api                   # API management
│  ├─ assets                # Static assets
│     └── svg-icons          # Custom SVG icon resources (local icon source for icon picker)
│  ├─ components            # Global components
│     ├── common             # Internal components
│     └── custom             # Custom components
│  ├─ directives            # Global directive files
│  ├─ enums                 # Enum files
│  ├─ hooks                 # Common Hooks encapsulation
│     ├── useWebsocket/*     # Websocket
│     ├── index.ts           # Unified export
│     ├── useBoolean.ts      # Composable for Boolean
│     ├── useCompRef.ts      # Composable for ref
│     ├── useDict.ts         # Get dictionary data
│     ├── useKeepTicking.ts  # Composable timer hook
│     ├── useLoading.ts      # Composable for loading
│     └── useRange.ts        # List search time range processing method
│  ├─ layout                # Framework layout module
│     ├── components         # Layout internal components
│     ├── main               # Layout framework
│     └── index.txs          # Layout component base
│  ├─ modules               # Global module registration
│     ├── assets.ts          # Static resources
│     ├── directives.ts      # Directives
│     └── i18n.ts            # Multilingual
│  ├─ plugins               # Global plugin registration
│     ├── appVersion.ts      # App update prompt refresh
│     ├── websocket.ts       # WebSocket
│     └── index.ts           # Unified export
│  ├─ router                # Route management
│     ├── modules            # Route modules
│         ├── guard.ts        # Route guard configuration
│         └── routes.ts       # Local static page routes
│     └── index.ts           # Route instance export
│  ├─ store                 # Pinia store
│     ├── modules            # Store modules
│         ├── app.ts         # Style layout settings related storage
│         ├── auth.ts        # User permissions related storage
│         ├── dict.ts        # Dictionary related storage
│         ├── routes.ts      # Route related storage
│         └── tab.ts         # Tab page related storage
│     └── index.ts           # Store instance export
│  ├─ styles                # Global style files
│     ├── index.css          # Unified export entry
│     ├── naive.css          # Modify NaiveUI original styles
│     ├── reset.css          # Reset CSS
│     ├── transition.css     # Transition styles
│     └── wangEditor.css     # wangEditor rich text editor styles
│  ├─ types                 # Global TS declarations
│  ├─ typings               # Auto-import type files (this directory can be deleted, automatically generated after project startup)
│     ├── auto-imports.d.ts  # Auto-import method type file
│     └── components.d.ts    # Auto-import component type file
│  ├─ utils                 # Common utility library
│     ├── comm.ts            # Common utility methods
│     ├── i18n.ts            # Internationalization methods
│     ├── icon.ts            # Icon utilities
│     ├── index.ts           # Utility class unified export entry
│     ├── is.ts              # Various judgment methods
│     ├── jsencrypt.ts       # Encrypt/decrypt methods
│     ├── request.ts         # Axios request encapsulation
│     ├── router.ts          # Route utilities
│     ├── spin.ts            # Loading animation and common async operation encapsulation tools
│     ├── storage.ts         # Storage encapsulation tools
│     └── theme.ts           # Theme configuration
│  ├─ views                 # All project pages
│  ├─ App.tsx               # APP root component
│  └─ main.ts               # Project entry file
├─ .env.development        # Development environment configuration
├─ .env.production         # Production environment configuration
├─ .eslintrc-auto-import.json  # ESLint auto-import configuration file
├─ .gitignore              # Ignore Git commits
├─ .prettierignore         # Prettier ignore
├─ .prettierrc.yaml        # Prettier rule configuration
├─ .stylelintignore        # Stylelint ignore
├─ .stylelintrc.cjs        # Stylelint rule configuration
├─ commitlint.config.cjs   # Code commit rule configuration
├─ eslint.config.ts        # ESLint rule configuration
├─ index.html              # Entry HTML
├─ LICENSE                 # Open source license file
├─ package.json            # Dependency package management
├─ pnpm-lock.json          # Dependency package version lock file
├─ README.md               # README introduction
├─ tsconfig.json           # TypeScript global configuration
├─ unocss.config.js        # UnoCSS configuration
└─ vite.config.ts          # Vite global configuration file
```
