---
title: Directory Structure
---

```ini [vue3-naiveui-admin]
├─ .husky                   # Git commit hooks
├─ .vscode                  # VSCode recommended settings
├─ build                    # Build configuration files
│  ├─ buildOptions.ts        # Vite build configuration
│  ├─ cssOptions.ts          # CSS configuration
│  ├─ index.ts               # Build entry
│  ├─ optimizeDepsOptions.ts # Dependency optimization configuration
│  ├─ pluginsOptions.ts      # Plugin configuration
│  ├─ resolveOptions.ts      # Path configuration
│  ├─ rollupOptions.ts       # Rollup configuration
│  ├─ serverOptions.ts       # Dev server configuration
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
│  ├─ hooks                 # Common hooks
│     ├── index.ts           # Unified export of global hooks
│     ├── useBoolean.ts      # Composable for Boolean
│     ├── useCompRef.ts      # Composable for ref
│     ├── useDict.ts         # Get dictionary data
│     ├── useKeepTicking.ts  # Composable timer hook
│     ├── useLoading.ts      # Composable for loading
│     └── useRange.ts        # List search time range handler
│  ├─ layout                # Layout modules
│     ├── components         # Internal layout components
│     ├── main               # Layout framework
│     └── index.txs          # Layout base component
│  ├─ modules               # Global module registration
│     ├── assets.ts          # Auto-register static assets
│     └── directives.ts      # Auto-register directives
│  ├─ router                # Router management
│     ├── modules            # Router modules
│         ├── guard.ts        # Router guard configuration
│         └── routes.ts       # Local static page routes
│     └── index.ts           # Export router instance
│  ├─ store                 # Pinia store
│     ├── modules            # Store modules
│         ├── app.ts     # Style/layout settings store
│         ├── auth.ts         # User permissions store
│         ├── dict.ts         # Dictionary store
│         ├── routes.ts       # Route store
│         └── tab.ts          # Tab store
│     └── index.ts           # Export store instance
│  ├─ styles                # Global styles
│     ├── index.css          # Unified export
│     ├── naive.css          # Override NaiveUI styles
│     ├── reset.css          # Reset CSS
│     ├── transition.css     # Transition styles
│     └── wangEditor.css     # wangEditor rich text editor styles
│  ├─ types                 # Global TS declarations
│  ├─ typings               # Auto-imported type files (can be deleted, auto-generated after project start)
│     ├── auto-imports.d.ts  # Auto-imported methods type file
│     └── components.d.ts    # Auto-imported components type file
│  ├─ utils                 # Utility libraries
│     ├── comm.ts            # Common utility methods
│     ├── i18n.ts            # Internationalization methods
│     ├── icon.ts            # Icon utilities
│     ├── index.ts           # Unified export for utilities
│     ├── is.ts              # Various check methods
│     ├── jsencrypt.ts       # Encrypt/decrypt methods
│     ├── request.ts         # Axios request wrapper
│     ├── router.ts          # Router utilities
│     ├── spin.ts            # Loading animation and async operation utilities
│     ├── storage.ts         # Storage utilities
│     └── theme.ts           # Theme configuration
│  ├─ views                 # All project pages
│  ├─ App.tsx               # App root component
│  └─ main.ts               # Project entry file
├─ .env.development        # Development environment config
├─ .env.production         # Production environment config
├─ .eslintrc-auto-import.json  # ESLint auto-import config
├─ .gitignore              # Git ignore
├─ .prettierignore         # Prettier ignore
├─ .prettierrc.yaml        # Prettier config
├─ .stylelintignore        # Stylelint ignore
├─ .stylelintrc.cjs        # Stylelint config
├─ commitlint.config.cjs   # Commit message lint config
├─ eslint.config.ts        # ESLint config
├─ index.html              # Entry HTML
├─ LICENSE                 # License
├─ package.json            # Package manager config
├─ pnpm-lock.json          # Package version lock file
├─ README.md               # Project introduction
├─ tsconfig.json           # TypeScript global config
├─ unocss.config.js        # UnoCSS config
└─ vite.config.ts          # Vite global config
```
