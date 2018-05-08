---
title: JupyterHub
---

## JupyterHub

[JupyterHub Repository](https://github.com/jupyterhub/jupyterhub).

[JupyterHub Docs](https://jupyterhub.readthedocs.io).

## Tutorial

[JupyterHub Tutorial Docs](https://jupyterhub-tutorial.readthedocs.io).

[JupyterHub Tutorial Repository](https://github.com/jupyterhub/jupyterhub-tutorial).

## Community

[JupyterHub Gitter](https://gitter.im/jupyterhub/jupyterhub).

## Setup

```bash
source deactivate
conda remove --name jupyterhub --all
conda create --name jupyterhub python=3.6 notebook=5.4.1 jupyter pip
source activate jupyterhub
pip install pyqt5
```

```bash
npm install -g configurable-http-proxy
configurable-http-proxy -h
```

```bash
pip install --upgrade --pre jupyterhub jupyterhub-ldapauthenticator oauthenticator dockerspawner
jupyterhub --version
jupyterhub --help
jupyterhub --help-all
```

It is recommended to put all of the files used by JupyterHub into standard UNIX filesystem locations.

+ `/srv/jupyterhub`: All security and runtime files
+ `/etc/jupyterhub`: All configuration files
+ `/var/log`: Log files

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
```

```bash
jupyterhub --Spawner.notebook_dir='~/assignments'
```

## Cookie Secret

The cookie secret should be 32 random bytes, encoded as hex, and is typically stored in a `jupyterhub_cookie_secret` file. 

```bash
# Generate the jupyterhub_cookie_secret.
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_cookie_secret
# If you would like to avoid the need for files, the value can be loaded in the Hub process from the JPY_COOKIE_SECRET environment variable, which is a hex-encoded string. For security reasons, this environment variable should only be visible to the Hub. If you set it dynamically, all users will be logged out each time the Hub starts.
export JPY_COOKIE_SECRET=`openssl rand -hex 32`
```

```bash
# In most deployments of JupyterHub, you should point this to a secure location on the file system, such as /srv/jupyterhub/jupyterhub_cookie_secret. The location of the jupyterhub_cookie_secret file can be specified in the jupyterhub_config.py file as follows.
c.JupyterHub.cookie_secret_file = '/srv/jupyterhub/jupyterhub_cookie_secret'
```

```bash
c.JupyterHub.cookie_secret = bytes.fromhex('VERY LONG SECRET HEX STRING')
```

## Proxy Authentication Token

The Hub authenticates its requests to the Proxy using a secret token that the Hub and Proxy agree upon. The value of this string should be a random string.

Default if token is not set: If you don’t set the Proxy authentication token, the Hub will generate a random key itself, which means that any time you restart the Hub you must also restart the Proxy. If the proxy is a subprocess of the Hub, this should happen automatically (this is the default configuration).

```bash
# Generate and store token in the configuration file
openssl rand -hex 32 > /srv/jupyterhub/jupyterhub_config_secret
# Or you can set the value in the configuration file, jupyterhub_config.py:
c.JupyterHub.proxy_auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
# Generating and storing as an environment variable
# You can pass this value of the proxy authentication token to the Hub and Proxy using the CONFIGPROXY_AUTH_TOKEN environment variable. This environment variable needs to be visible to the Hub and Proxy.
export CONFIGPROXY_AUTH_TOKEN='openssl rand -hex 32'
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

## Docker

```bash
docker pull jupyterhub/singleuser
docker run -p 8000:8000 --rm -d --name jupyterhub jupyterhub/jupyterhub jupyterhub
open http://localhost:8000
docker exec -it jupyterhub bash; adduser datalayer
docker stop jupyterhub
```

## Spawners

```bash
pip install dockerspawner
# jupyterhub_config.py
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
```

## Users

```bash
# jupyterhub_config.py
c.Authenticator.whitelist = {'foo', 'bar'}
```

## Authentication

```bash
# See also https://github.com/jupyterhub/jupyterhub/wiki/Using-sudo-to-run-JupyterHub-without-root-privileges
sudo chmod +r /etc/shadow
sudo usermod -a -G shadow $USER
sudo -u $USER python3 -c "import pamela, getpass; print(pamela.authenticate('$USER', getpass.getpass()))"
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

```bash
# Create local users if needed by the Authenticator.
export NEW_USER=foo@gmail.com
# --home /home/$NEW_USER
# --force-badname
adduser -q --gecos "" --disabled-password $NEW_USER
```

```bash
pip3 install oauthenticator
open https://console.developers.google.com/apis/credentials
export OAUTH_CALLBACK_URL=http://localhost:8000/hub/oauth_callback
export OAUTH_CLIENT_ID=<id>
export OAUTH_CLIENT_SECRET=<secret>
# jupyterhub_config.py
c.JupyterHub.authenticator_class = 'oauthenticator.google.GoogleOAuthenticator'
c.DockerSpawner.image = 'jupyter/scipy-notebook:8f56e3c47fec'
```

```bash
jupyterhub -f /etc/jupyterhub/jupyterhub_config.py
open http://localhost:8000
```

## Troubleshoot

```bash
jupyterhub --debug -f /etc/jupyterhub/jupyterhub_config.py --Application.log_level=30 &>> /var/log/jupyterhub.log
```

```bash
jupyter kernelspec list
```

```bash
# Set the log level by value or name.
c.JupyterHub.log_level = 'DEBUG'
# Enable debug-logging of the single-user server
c.Spawner.debug = True
# Enable debug-logging of the single-user server
c.LocalProcessSpawner.debug = True
```

# Database

```bash
cd /srv/jupyterhub/
sqlite3 ./jupyterhub.sqlite 
```

```bash
SQLite version 3.22.0 2018-01-22 18:45:57
Enter ".help" for usage hints.
sqlite> .schema
CREATE TABLE alembic_version (
	version_num VARCHAR(32) NOT NULL, 
	CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);
CREATE TABLE oauth_clients (
	id INTEGER NOT NULL, 
	identifier VARCHAR(255), 
	secret VARCHAR(255), 
	redirect_uri VARCHAR(1023), 
	PRIMARY KEY (id), 
	UNIQUE (identifier)
);
CREATE TABLE groups (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	PRIMARY KEY (id), 
	UNIQUE (name)
);
CREATE TABLE servers (
	id INTEGER NOT NULL, 
	proto VARCHAR(15), 
	ip VARCHAR(255), 
	port INTEGER, 
	base_url VARCHAR(255), 
	cookie_name VARCHAR(255), 
	PRIMARY KEY (id)
);
CREATE TABLE users (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	admin BOOLEAN, 
	last_activity DATETIME, 
	cookie_id VARCHAR(255) NOT NULL, 
	state TEXT, 
	encrypted_auth_state BLOB, 
	PRIMARY KEY (id), 
	UNIQUE (name), 
	CHECK (admin IN (0, 1)), 
	UNIQUE (cookie_id)
);
CREATE TABLE services (
	id INTEGER NOT NULL, 
	name VARCHAR(255), 
	admin BOOLEAN, 
	_server_id INTEGER, 
	pid INTEGER, 
	PRIMARY KEY (id), 
	UNIQUE (name), 
	CHECK (admin IN (0, 1)), 
	FOREIGN KEY(_server_id) REFERENCES servers (id) ON DELETE SET NULL
);
CREATE TABLE spawners (
	id INTEGER NOT NULL, 
	user_id INTEGER, 
	server_id INTEGER, 
	state TEXT, 
	name VARCHAR(255), 
	last_activity DATETIME, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	FOREIGN KEY(server_id) REFERENCES servers (id) ON DELETE SET NULL
);
CREATE TABLE oauth_access_tokens (
	id INTEGER NOT NULL, 
	client_id VARCHAR(255), 
	grant_type VARCHAR(18) NOT NULL, 
	expires_at INTEGER, 
	refresh_token VARCHAR(255), 
	refresh_expires_at INTEGER, 
	user_id INTEGER, 
	hashed VARCHAR(255), 
	prefix VARCHAR(16), 
	PRIMARY KEY (id), 
	CONSTRAINT granttype CHECK (grant_type IN ('authorization_code', 'implicit', 'password', 'client_credentials', 'refresh_token')), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE, 
	UNIQUE (hashed)
);
CREATE INDEX ix_oauth_access_tokens_prefix ON oauth_access_tokens (prefix);
CREATE TABLE oauth_codes (
	id INTEGER NOT NULL, 
	client_id VARCHAR(255), 
	code VARCHAR(36), 
	expires_at INTEGER, 
	redirect_uri VARCHAR(1023), 
	user_id INTEGER, 
	PRIMARY KEY (id), 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE TABLE user_group_map (
	user_id INTEGER NOT NULL, 
	group_id INTEGER NOT NULL, 
	PRIMARY KEY (user_id, group_id), 
	FOREIGN KEY(user_id) REFERENCES users (id), 
	FOREIGN KEY(group_id) REFERENCES groups (id)
);
CREATE TABLE api_tokens (
	id INTEGER NOT NULL, 
	hashed VARCHAR(255), 
	prefix VARCHAR(16), 
	service_id INTEGER, 
	user_id INTEGER, 
	PRIMARY KEY (id), 
	UNIQUE (hashed), 
	FOREIGN KEY(service_id) REFERENCES services (id) ON DELETE CASCADE, 
	FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);
CREATE INDEX ix_api_tokens_prefix ON api_tokens (prefix);
```

## Upgrade

[Upgrade Docs](https://jupyterhub.readthedocs.io/en/latest/tutorials/upgrade-dot-eight.html).

```bash
jupyterhub upgrade-db
```
