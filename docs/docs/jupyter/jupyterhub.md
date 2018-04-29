---
title: JupyterHub
---

## JupyterHub

[JupyterHub Docs](https://jupyterhub.readthedocs.io).

[JupyterHub Repository](https://github.com/jupyterhub/jupyterhub).

[JupyterHub Tutorial Docs](https://jupyterhub-tutorial.readthedocs.io).

[JupyterHub Tutorial Repository](https://github.com/jupyterhub/jupyterhub-tutorial).

[JupyterHub Gitter](https://gitter.im/jupyterhub/jupyterhub).

## API

By default, this REST API listens on port 8081 of localhost only. The Hub service talks to the proxy via a REST API on a secondary port. The API URL can be configured separately and override the default settings.

[REST API Docs](https://jupyterhub.readthedocs.io/en/stable/api/index.html).

[REST API Swagger](http://petstore.swagger.io/?url=https://raw.githubusercontent.com/jupyterhub/jupyterhub/master/docs/rest-api.yml#/default)

## Setup

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
sudo jupyterhub
open http://localhost:8000
open http://localhost:8000/user/datalayer/lab
```

## Config

```bash
jupyterhub --generate-config
mv ./jupyterhub_config.py /etc/jupyterhub/jupyterhub_config.py
jupyterhub -f /etc/jupyterhub/jupyterhub_config.py
jupyterhub --Spawner.notebook_dir='~/assignments'
```

## Cookie Secret

The cookie secret should be 32 random bytes, encoded as hex, and is typically stored in a `jupyterhub_cookie_secret` file. 

```bash
# Generate the jupyterhub_cookie_secret file is:
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_cookie_secret
# In most deployments of JupyterHub, you should point this to a secure location on the file system, such as /srv/jupyterhub/jupyterhub_cookie_secret. The location of the jupyterhub_cookie_secret file can be specified in the jupyterhub_config.py file as follows.
c.JupyterHub.cookie_secret_file = '/srv/jupyterhub/jupyterhub_cookie_secret'
# If you would like to avoid the need for files, the value can be loaded in the Hub process from the JPY_COOKIE_SECRET environment variable, which is a hex-encoded string. For security reasons, this environment variable should only be visible to the Hub. If you set it dynamically, all users will be logged out each time the Hub starts.
export JPY_COOKIE_SECRET=`openssl rand -hex 32`
```

## Proxy Authentication Token

The Hub authenticates its requests to the Proxy using a secret token that the Hub and Proxy agree upon. The value of this string should be a random string.

```bash
# Generating and storing token in the configuration file
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_config_secret
# Or you can set the value in the configuration file, jupyterhub_config.py:
c.JupyterHub.proxy_auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
# Generating and storing as an environment variable
# You can pass this value of the proxy authentication token to the Hub and Proxy using the CONFIGPROXY_AUTH_TOKEN environment variable. This environment variable needs to be visible to the Hub and Proxy.
export CONFIGPROXY_AUTH_TOKEN='openssl rand -hex 32'
# Default if token is not set: If you don’t set the Proxy authentication token, the Hub will generate a random key itself, which means that any time you restart the Hub you must also restart the Proxy. If the proxy is a subprocess of the Hub, this should happen automatically (this is the default configuration).
```

## SSL

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout jupyterhub.key -out jupyterhub.crt
# In jupyterhub_config.py
# c.JupyterHub.ssl_key = 'jupyterhub.key'
# c.JupyterHub.ssl_cert = 'jupyterhub.crt'
# c.JupyterHub.port = 443
sudo su
jupyterhub --ip localhost --port 443 --ssl-key jupyterhub.key --ssl-cert jupyterhub.crt
open https://localhost/user/datalayer/tree
```

## Authentication

```bash
sudo usermod -a -G shadow $USER
sudo -u jupyterhub python3 -c "import pamela, getpass; print(pamela.authenticate('$USER', getpass.getpass()))"
```

```python
import pamela
username = '$USER'
password = 'pwd'
service = 'login'
try:
    print("PAM Authentication test. username = {0} and service = {1}".format(username, service))
    pamela.authenticate(username, password, service)
except pamela.PAMError as e:
    print("PAM Authentication failed: {0}".format(e))
else:
    print("success!")
```

## Troubleshooting

```bash
jupyter kernelspec list
jupyterhub --debug
```

## Docker

```bash
docker pull jupyterhub/singleuser
docker run -p 8000:8000 --rm -d --name jupyterhub jupyterhub/jupyterhub jupyterhub
open http://localhost:8000
docker exec -it jupyterhub bash; adduser datalayer
docker stop jupyterhub
```

## Services

```bash
export JUPYTERHUB_API_TOKEN=`jupyterhub token`
python3 cull_idle_servers.py [--timeout=900] [--url=http://127.0.0.1:8081/hub/api]
```

## Upgrade

[Upgrade Docs](https://jupyterhub.readthedocs.io/en/latest/tutorials/upgrade-dot-eight.html).

```bash
jupyterhub upgrade-db
```
