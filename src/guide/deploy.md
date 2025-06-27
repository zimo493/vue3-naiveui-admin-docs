---
title: 项目部署
tags: [项目, 部署]
description: 如何部署项目到服务器？
---

## 项目打包

运行 `pnpm build` 命令后，将项目打包为静态文件，并生成 `dist` 目录。

```bash [pnpm]
pnpm build  # 参考package.json "scripts" 配置

```

## 项目部署

### 文件上传

将打包生成在 `dist` 目录下的文件拷贝至服务器 `/website/dist` 目录下

### Nginx 配置

::: warning ⚠️ 提示
不建议在 `nginx.conf` 中直接配置，选择单独配置方便后期维护

创建 `/etc/nginx/conf.d/admin.conf`

`nginx.conf` 默认会加载 `/etc/nginx/conf.d/*.conf` 文件
:::

```bash
vim /etc/nginx/conf.d/admin.conf
```

```shell
# admin.conf 配置， 添加以下内容
server {
  listen 80;
  server_name localhost;
  location / {
    root /website/dist; # 对应上传的文件夹路径
    try_files $uri $uri/ /index.html;
    index index.html;
  }
  # 反向代理配置
  location /prod-api/ {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # localhost:8989 替换成实际的后端API地址。请确保末尾的 '/'
    proxy_pass http://localhost:8989/;
  }
}
```
