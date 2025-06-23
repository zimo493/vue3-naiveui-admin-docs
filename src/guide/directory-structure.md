---
title: 目录结构
---

::: code-group

```text [vue3-naiveui-admin]
├─ .husky                   # Git 提交钩子
├─ .vscode                  # VSCode 推荐配置
├─ build                    # 构建文件配置
│  ├─ buildOptions.ts        # Vite构建配置
│  ├─ cssOptions.ts          # CSS 配置
│  ├─ index.ts               # 构建入口
│  ├─ optimizeDepsOptions.ts # 依赖优化配置
│  ├─ pluginsOptions.ts      # 插件配置
│  ├─ resolveOptions.ts      # 路径配置
│  ├─ rollupOptions.ts       # rollup 配置
│  ├─ serverOptions.ts       # 开发服务器配置
│  └─ terserOptions.ts       # terser 配置
├─ locales                  # 国际化文件
├─ public                   # 静态资源文件（该文件夹不会被打包）
├─ sql                      # 数据库脚本
│  └─ youlai_boot.sql        # 基础数据库脚本
├─ src                      # 源代码
│  ├─ api                   # API 接口管理
│  ├─ assets                # 静态资源文件
│     └── svg-icons          # 自定义svg图标资源(图标选择器选择本地图标源)
│  ├─ components            # 全局组件
│     ├── common             # 内部组件
│     └── custom             # 自定义组件
│  ├─ directives            # 全局指令文件
│  ├─ enums                 # 枚举文件
│  ├─ hooks                 # 常用 Hooks 封装
│     ├── index.ts           # 统一导出全局 Hooks
│     ├── useBoolean.ts      # 组合式使用 Boolean
│     ├── useCompRef.ts      # 组合式使用 ref
│     ├── useDict.ts         # 获取字典数据
│     ├── useKeepTicking.ts  # 组合式定时器钩子方法
│     ├── useLoading.ts      # 组合式使用Loading方法
│     └── useRange.ts        # 列表搜索时间范围处理方法
│  ├─ layout                # 框架布局模块
│     ├── components         # 布局内部组件
│     ├── main               # 布局框架
│     └── index.txs          # 布局组件基座
│  ├─ modules               # 全局模块注册
│     ├── assets.ts          # 自动注册静态资源
│     └── directives.ts      # 自动注册指令
│  ├─ router                # 路由管理
│     ├── modules            # 路由模块
│         ├── guard.ts        # 路由守卫配置
│         └── routes.ts       # 本地静态页面路由
│     └── index.ts           # 实例化路由导出
│  ├─ store                 # pinia store
│     ├── modules            # store模块
│         ├── app/index.ts     # 样式布局设置相关存储
│         ├── app/theme.ts     # 主题配置
│         ├── auth.ts         # 用户权限相关存储
│         ├── dict.ts         # 字典相关存储
│         ├── routes.ts       # 路由相关存储
│         └── tab.ts          # Tab页签相关存储
│     └── index.ts           # 实例化仓库导出
│  ├─ styles                # 全局样式文件
│     ├── index.css          # 统一导出出口
│     ├── naive.css          # 修改NaiveUI原有样式
│     ├── reset.css          # 重置样式css
│     ├── transition.css     # 过渡样式css
│     └── wangEditor.css     # wangEditor富文本编辑器样式
│  ├─ types                 # 全局 ts 声明
│  ├─ typings               # 自动导入类型文件(此目录可删除,启动项目后会自动生成)
│     ├── auto-imports.d.ts  # 自动导入方法类型文件
│     └── components.d.ts    # 自动导入组件类型文件
│  ├─ utils                 # 常用工具库
│     ├── comm.ts            # 常用工具方法
│     ├── i18n.ts            # 国际化方法
│     ├── icon.ts            # 图标工具
│     ├── index.ts           # 工具类统一导出出口
│     ├── is.ts              # 各种判断方法
│     ├── jsencrypt.ts       # encrypt加密解密方法
│     ├── request.ts         # axios 请求封装
│     ├── router.ts          # 路由工具
│     ├── spin.ts            # 加载动画和通用异步操作封装工具
│     └── storage.ts         # 存储封装工具
│  ├─ views                 # 项目所有页面
│  ├─ App.tsx               # APP根组件
│  └─ main.ts               # 项目入口文件
├─ .env.development        # 开发环境配置
├─ .env.production         # 生产环境配置
├─ .eslintrc-auto-import.json  # eslint 自动引入配置文件
├─ .gitignore              # 忽略 git 提交
├─ .prettierignore         # prettier 忽略文件
├─ .prettierrc.yaml        # prettier 规则配置
├─ .stylelintignore        # stylelint 忽略文件
├─ .stylelintrc.cjs        # stylelint 规则配置
├─ commitlint.config.cjs   # 代码提交规则配置
├─ eslint.config.ts        # eslint 规则配置
├─ index.html              # 入口 html
├─ LICENSE                 # 开源协议文件
├─ package.json            # 依赖包管理
├─ pnpm-lock.json          # 依赖包包版本锁定文件
├─ README.md               # README 介绍
├─ tsconfig.json           # typescript 全局配置
├─ unocss.config.js        # unocss 配置
└─ vite.config.ts          # vite 全局配置文件
```

:::
