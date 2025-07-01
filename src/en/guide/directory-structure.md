---
title: Directory Structure
---

::: code-group

```text [vue3-naiveui-admin]
├─ .husky                   # Git commit hooks
├─ .vscode                  # VSCode recommended configuration
├─ build                    # Build file configuration
│  ├─ buildOptions.ts        # Vite build configuration
│  ├─ cssOptions.ts          # CSS configuration
│  ├─ index.ts               # Build entry
│  ├─ optimizeDepsOptions.ts # Dependency optimization configuration
│  ├─ pluginsOptions.ts      # Plugin configuration
│  ├─ resolveOptions.ts      # Path configuration
│  ├─ rollupOptions.ts       # rollup configuration
│  ├─ serverOptions.ts       # Development server configuration
│  └─ terserOptions.ts       # terser configuration
├─ locales                  # Internationalization files
├─ public                   # Static resource files (this folder will not be packaged)
├─ sql                      # Database scripts
│  └─ youlai_boot.sql        # Basic database script
├─ src                      # Source code
│  ├─ api                   # API interface management
│  ├─ assets                # Static resource files
│     └── svg-icons          # Custom svg icon resources (icon selector selects local icon source)
│  ├─ components            # Global components
│     ├── common             # Internal components
│     └── custom             # Custom components
│  ├─ directives            # Global directive files
│  ├─ enums                 # Enum files
│  ├─ hooks                 # Common Hooks encapsulation
│     ├── index.ts           # Unified export global Hooks
│     ├── useBoolean.ts      # Composition API Boolean usage
│     ├── useCompRef.ts      # Composition API ref usage
│     ├── useDict.ts         # Get dictionary data
│     ├── useKeepTicking.ts  # Composition API timer hook method
│     ├── useLoading.ts      # Composition API Loading method
│     └── useRange.ts        # List search time range processing method
│  ├─ layout                # Framework layout module
│     ├── components         # Layout internal components
│     ├── main               # Layout framework
│     └── index.txs          # Layout component base
│  ├─ modules               # Global module registration
│     ├── assets.ts          # Auto-register static resources
│     └── directives.ts      # Auto-register directives
│  ├─ router                # Route management
│     ├── modules            # Route modules
│         ├── guard.ts        # Route guard configuration
│         └── routes.ts       # Local static page routes
│     └── index.ts           # Instantiate route export
│  ├─ store                 # pinia store
│     ├── modules            # store modules
│         ├── app/index.ts     # Style layout settings related storage
│         ├── app/theme.ts     # Theme configuration
│         ├── auth.ts         # User permission related storage
│         ├── dict.ts         # Dictionary related storage
│         ├── routes.ts       # Route related storage
│         └── tab.ts          # Tab page related storage
│     └── index.ts           # Instantiate store export
│  ├─ styles                # Global style files
│     ├── index.css          # Unified export outlet
│     ├── naive.css          # Modify NaiveUI original styles
│     ├── reset.css          # Reset style css
│     ├── transition.css     # Transition style css
│     └── wangEditor.css     # wangEditor rich text editor styles
│  ├─ types                 # Global ts declarations
│  ├─ typings               # Auto-import type files (this directory can be deleted, will be auto-generated after project startup)
│     ├── auto-imports.d.ts  # Auto-import method type files
│     └── components.d.ts    # Auto-import component type files
│  ├─ utils                 # Common utility library
│     ├── comm.ts            # Common utility methods
│     ├── i18n.ts            # Internationalization methods
│     ├── icon.ts            # Icon utilities
│     ├── index.ts           # Utility class unified export outlet
│     ├── is.ts              # Various judgment methods
│     ├── jsencrypt.ts       # encrypt encryption and decryption methods
│     ├── request.ts         # axios request encapsulation
│     ├── router.ts          # Router utilities
│     ├── spin.ts            # Loading animation and common async operation encapsulation utilities
│     └── storage.ts         # Storage encapsulation utilities
│  ├─ views                 # All project pages
│  ├─ App.tsx               # APP root component
│  └─ main.ts               # Project entry file
├─ .env.development        # Development environment configuration
├─ .env.production         # Production environment configuration
├─ .eslintrc-auto-import.json  # eslint auto-import configuration file
├─ .gitignore              # Ignore git commits
├─ .prettierignore         # prettier ignore files
├─ .prettierrc.yaml        # prettier rule configuration
├─ .stylelintignore        # stylelint ignore files
├─ .stylelintrc.cjs        # stylelint rule configuration
├─ commitlint.config.cjs   # Code commit rule configuration
├─ eslint.config.ts        # eslint rule configuration
├─ index.html              # Entry html
├─ LICENSE                 # Open source license file
├─ package.json            # Dependency package management
├─ pnpm-lock.json          # Dependency package version lock file
├─ README.md               # README introduction
├─ tsconfig.json           # typescript global configuration
├─ unocss.config.js        # unocss configuration
└─ vite.config.ts          # vite global configuration file
```

:::
