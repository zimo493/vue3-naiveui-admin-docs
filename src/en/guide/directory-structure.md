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
│  └─ serverOptions.ts       # Development server configuration
├─ locales                  # Internationalization files
├─ public                   # Static assets (this folder is not bundled)
├─ sql                      # Database scripts
│  └─ youlai_admin.sql       # Base database script
├─ src                      # Source code
│  ├─ api                   # API management
│  ├─ assets                # Static assets
│     └── svg-icons          # Custom SVG icon resources (local icon source for icon picker)
│  ├─ components            # Global components
│  ├─ directives            # Global directive files
│  ├─ enums                 # Enum files
│  ├─ hooks                 # Common Hooks encapsulation
│     ├── useSse/*           # SSE subscription
│     ├── index.ts           # Unified export of global Hooks
│     ├── useBoolean.ts      # Composable for Boolean
│     ├── useCompRef.ts      # Composable for ref
│     ├── useDict.ts         # Get dictionary data
│     ├── useKeepTicking.ts  # Composable timer hook
│     ├── useLoading.ts      # Composable for loading
│     ├── useRange.ts        # List search time range handling
│     └── useResponsive.ts   # Responsive layout
│  ├─ layout                # Framework layout module
│     ├── components         # Layout internal components
│     ├── main               # Layout framework
│     └── index.txs          # Layout component shell
│  ├─ modules               # Global module registration
│     ├── assets.ts          # Static resources
│     ├── directives.ts      # Directives
│     └── i18n.ts            # Internationalization
│  ├─ plugins               # Global plugin registration
│     ├── appVersion.ts      # App update prompt refresh
│     ├── index.ts           # Unified export
│     └── sse.ts             # SSE subscription
│  ├─ router                # Route management
│     ├── modules            # Route modules
│         ├── guard.ts        # Route guard configuration
│         └── routes.ts       # Local static page routes
│     └── index.ts           # Route instance export
│  ├─ store                 # Pinia store
│     ├── modules            # Store modules
│         ├── app.ts     # Style/layout settings storage
│         ├── auth.ts         # User permissions storage
│         ├── dict.ts         # Dictionary storage
│         ├── routes.ts       # Route-related storage
│         ├── tab.ts          # Tab storage
│         └── watermark.ts    # Watermark storage
│     └── index.ts           # Store instance export
│  ├─ styles                # Global style files
│     ├── index.css          # Unified export entry
│     ├── naive.css          # Override NaiveUI default styles
│     ├── reset.css          # Reset CSS
│     ├── transition.css     # Transition styles
│     └── wangEditor.css     # wangEditor rich text editor styles
│  ├─ types                 # Global TypeScript declarations
│  ├─ typings               # Auto-import type files (this directory can be deleted; regenerated on project start)
│     ├── auto-imports.d.ts  # Auto-import methods type file
│     └── components.d.ts    # Auto-import components type file
│  ├─ utils                 # Common utility library
│     ├── comm.ts            # Common utility methods
│     ├── i18n.ts            # Internationalization methods
│     ├── icon.ts            # Icon utilities
│     ├── index.ts           # Utility class unified export entry
│     ├── is.ts              # Various type checks
│     ├── jsencrypt.ts       # Encrypt/decrypt helpers
│     ├── request.ts         # Axios request encapsulation
│     ├── router.ts          # Route utilities
│     ├── spin.ts            # Loading animation and common async operation helpers
│     ├── storage.ts         # Storage encapsulation
│     └── theme.ts           # Theme configuration
│  ├─ views                 # All project pages
│  ├─ App.tsx               # APP root component
│  └─ main.ts               # Project entry file
├─ .env.development        # Development environment configuration
├─ .env.production         # Production environment configuration
├─ .eslintrc-auto-import.json  # ESLint auto-import configuration
├─ .gitignore              # Git ignore rules
├─ .prettierignore         # Prettier ignore
├─ .stylelintignore        # Stylelint ignore
├─ commitlint.config.mjs   # Commit message rules
├─ eslint.config.ts        # ESLint rules configuration
├─ index.html              # Entry HTML
├─ LICENSE                 # Open source license file
├─ package.json            # Dependency management
├─ pnpm-lock.json          # Dependency lock file
├─ prettier.config.mjs     # Prettier rules configuration
├─ README.md               # README introduction
├─ stylelint.config.mjs    # Stylelint rules configuration
├─ tsconfig.json           # TypeScript global configuration
├─ unocss.config.js        # UnoCSS configuration
└─ vite.config.ts          # Vite global configuration file
```
