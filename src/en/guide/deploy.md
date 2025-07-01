---
title: Project Deployment
tags: [Project, Deployment]
description: How to deploy the project to a server?
---

## Project Build

After running the `pnpm build` command, the project will be built as static files and a `dist` directory will be generated.

```bash [pnpm]
pnpm build  # Refer to package.json "scripts" configuration
```

## Project Deployment

### File Upload

Copy the files generated in the `dist` directory to the server's `/website/dist` directory.

### Nginx Configuration

::: warning ⚠️ Note
It is not recommended to configure directly in `nginx.conf`. Choose a separate configuration for easier future maintenance.

Create `/etc/nginx/conf.d/admin.conf`

`nginx.conf` will load all files in `/etc/nginx/conf.d/*.conf` by default.
:::

```bash
vim /etc/nginx/conf.d/admin.conf
```

```shell
# admin.conf configuration, add the following content
server {
  listen 80;
  server_name localhost;
  location / {
    root /website/dist; # Corresponds to the uploaded folder path
    try_files $uri $uri/ /index.html;
    index index.html;
  }
  # Reverse proxy configuration
  location /prod-api/ {
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    # Replace localhost:8989 with the actual backend API address. Make sure to keep the trailing '/'
    proxy_pass http://localhost:8989/;
  }
}
``` 