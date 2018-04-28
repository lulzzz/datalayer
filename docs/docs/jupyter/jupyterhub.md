---
title: JupyterHub
---

## JupyterHub

[JupyterHub Docs](https://jupyterhub.readthedocs.io).

[JupyterHub Repository](https://github.com/jupyterhub/jupyterhub).

[JupyterHub Tutorial Docs](https://jupyterhub-tutorial.readthedocs.io).

[JupyterHub Tutorial Repository](https://github.com/jupyterhub/jupyterhub-tutorial).

[JupyterHub Gitter](https://gitter.im/jupyterhub/jupyterhub).

[REST API](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyterhub/jupyterhub/master/docs/rest-api.yml#/default)

```bash
npm install -g configurable-http-proxy
pip3 install --upgrade jupyterhub
configurable-http-proxy -h
# netifaces
pip3 install --upgrade ldapauthenticator oauthenticator dockerspawner
jupyterhub --version
jupyterhub --help
jupyterhub --help-all
```

```bash
sudo su
jupyterhub
open http://localhost:8000/user/datalayer/tree
```

```bash
jupyterhub --generate-config
jupyterhub -f /etc/jupyterhub/jupyterhub_config.py
jupyterhub --Spawner.notebook_dir='~/assignments'
```

```bash
# The cookie secret should be 32 random bytes, encoded as hex, and is typically stored in a jupyterhub_cookie_secret file. An example command to generate the jupyterhub_cookie_secret file is:
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_cookie_secret
# In most deployments of JupyterHub, you should point this to a secure location on the file system, such as /srv/jupyterhub/jupyterhub_cookie_secret. The location of the jupyterhub_cookie_secret file can be specified in the jupyterhub_config.py file as follows.
c.JupyterHub.cookie_secret_file = '/srv/jupyterhub/jupyterhub_cookie_secret'
# If you would like to avoid the need for files, the value can be loaded in the Hub process from the JPY_COOKIE_SECRET environment variable, which is a hex-encoded string. You can set it this way:
export JPY_COOKIE_SECRET=`openssl rand -hex 32`
# For security reasons, this environment variable should only be visible to the Hub. If you set it dynamically as above, all users will be logged out each time the Hub starts.
```

```bash
# Proxy authentication token
# The Hub authenticates its requests to the Proxy using a secret token that the Hub and Proxy agree upon. The value of this string should be a random string, for example, generated
openssl rand -hex 32
# Generating and storing token in the configuration file
# Or you can set the value in the configuration file, jupyterhub_config.py:
c.JupyterHub.proxy_auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
# Generating and storing as an environment variable
# You can pass this value of the proxy authentication token to the Hub and Proxy using the CONFIGPROXY_AUTH_TOKEN environment variable:
export CONFIGPROXY_AUTH_TOKEN='openssl rand -hex 32'
# This environment variable needs to be visible to the Hub and Proxy.
# Default if token is not set
# If you don’t set the Proxy authentication token, the Hub will generate a random key itself, which means that any time you restart the Hub you must also restart the Proxy. If the proxy is a subprocess of the Hub, this should happen automatically (this is the default configuration).
```

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout jupyterhub.key -out jupyterhub.crt
# jupyterhub --generate-config
# c.JupyterHub.ssl_key = 'jupyterhub.key'
# c.JupyterHub.ssl_cert = 'jupyterhub.crt'
# c.JupyterHub.port = 443
sudo su
jupyterhub --ip localhost --port 443 --ssl-key jupyterhub.key --ssl-cert jupyterhub.crt
open https://localhost/user/datalayer/tree
```

```bash
jupyter troubleshooting
jupyter kernelspec list
jupyterhub --debug
```

## Docker

```bash
docker pull jupyterhub/singleuser
docker run -p 8000:8000 -d --name jupyterhub jupyterhub/jupyterhub jupyterhub
open http://localhost:8000
docker exec -it jupyterhub bash
```
