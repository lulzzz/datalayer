---
title: JupyterHub Proxy
---

```bash
# jupyterhub_config.py: Force the proxy to only listen to connections to 127.0.0.1
c.JupyterHub.ip = '127.0.0.1'
```

## Nginx

```bash
# vi /etc/nginx/sites-enabled/default 
# top-level http config for websocket headers
# If Upgrade is defined, Connection = upgrade
# If Upgrade is empty, Connection = close
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    ssl off;

    server_name hub.datalayer.io.local;

    location /api-browser {
        proxy_pass http://127.0.0.1:10000/services/api-browser;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # websocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        # websocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
    }

    # Managing requests to verify letsencrypt host
    location ~ /.well-known {
        allow all;
    }

}
```

## Apache2

```bash
apt install apache2
a2enmod ssl rewrite proxy proxy_http proxy_wstunnel
service apache2 start
```

```bash
# vi /etc/apache2/sites-enabled/000-default.conf
<VirtualHost hub.datalayer.io.local:80>
  ServerName hub.datalayer.io.local
  # Use RewriteEngine to handle websocket connection upgrades
  RewriteEngine On
  RewriteCond %{HTTP:Connection} Upgrade [NC]
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteRule /(.*) ws://127.0.0.1:8000/$1 [P,L]
  # preserve Host header to avoid cross-origin problems
  ProxyPreserveHost on
  # proxy to api-browser
  ProxyPass        /api-browser http://127.0.0.1:10000/services/api-browser
  ProxyPassReverse /api-browser http://127.0.0.1:10000/services/api-browser
  # proxy to JupyterHub
  ProxyPass        / http://127.0.0.1:8000/
  ProxyPassReverse / http://127.0.0.1:8000/
</VirtualHost>
```

```bash
# vi /etc/apache2/sites-enabled/000-default.conf
# SSL redirect HTTP to HTTPS
Listen 80
<VirtualHost hub.datalayer.io.local:80>
  ServerName hub.datalayer.io.local
  Redirect / https://hub.datalayer.io.local/
</VirtualHost>

Listen 443
<VirtualHost hub.datalayer.io.local:443>

  ServerName hub.datalayer.io.local

  # configure SSL
  SSLEngine on
  SSLCertificateFile /etc/letsencrypt/live/hub.datalayer.io.local/fullchain.pem
  SSLCertificateKeyFile /etc/letsencrypt/live/hub.datalayer.io.local/privkey.pem
  SSLProtocol All -SSLv2 -SSLv3
  SSLOpenSSLConfCmd DHParameters /etc/ssl/certs/dhparam.pem
  SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH

  # Use RewriteEngine to handle websocket connection upgrades
  RewriteEngine On
  RewriteCond %{HTTP:Connection} Upgrade [NC]
  RewriteCond %{HTTP:Upgrade} websocket [NC]
  RewriteRule /(.*) ws://127.0.0.1:8000/$1 [P,L]

  <Location "/">
    # preserve Host header to avoid cross-origin problems
    ProxyPreserveHost on
    # proxy to JupyterHub
    ProxyPass         http://127.0.0.1:8000/
    ProxyPassReverse  http://127.0.0.1:8000/
  </Location>
</VirtualHost>
```