---
title: DatalayerHub Development
---

## JupyterHub

```bash
npm install -g configurable-http-proxy
```

```bash
source deactivate
conda remove --name datalayerhub --all
conda config --add channels conda-forge
conda create --name datalayerhub python=3.6 pip=10.0.1 notebook jupyter jupyterhub
source activate datalayerhub
pip install oauthenticator sudospawner dockerspawner jupyterlab pyqt5
```

```bash
source deactivate
conda remove --name datalayerhub --all
conda create --name datalayerhub python=3.6 pip=10.0.1
source activate datalayerhub
pip install pyqt5
cd $DLAHOME/repos/jupyter-notebook
pip install -e .
cd $DLAHOME/repos/jupyterhub
git checkout datalayer
python setup.py sdist
pip install -e .
cd $DLAHOME/repos/jupyterhub-auth-oauth
pip install -e .
cd $DLAHOME/repos/jupyterhub-spawner-sudo
pip install -e .
cd $DLAHOME/repos/jupyterhub-spawner-docker
pip install -e .
cd $DLAHOME/repos/jupyterlab
pip install -e .
jupyter serverextension enable --py jupyterlab --sys-prefix
yarn install
jupyter lab build
```

```bash
source activate datalayerhub
```

```bash
cat <<EOF > jupyterhub_config.py
# --- Common ---
# c.JupyterHub.cookie_secret_file = '/srv/jupyterhub/jupyterhub_cookie_secret'
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl =True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'
# --- Users ---
c.Authenticator.admin_users = {'datalayer', 'eric.umg.charles2@gmail.com'}
c.Authenticator.whitelist = {'datalayer', 'eric.umg.charles2@gmail.com'}
# --- Authenticator ---
# from jupyterhub.auth import PAMAuthenticator
# c.JupyterHub.authenticator_class = PAMAuthenticator
# from jupyterhub.auth import LocalAuthenticator
# c.JupyterHub.authenticator_class = LocalAuthenticator
# c.LocalAuthenticator.create_system_users = True
from oauthenticator.google import GoogleOAuthenticator
c.JupyterHub.authenticator_class = GoogleOAuthenticator
c.GoogleOAuthenticator.oauth_callback_url = 'http://localhost:8000/hub/oauth_callback'
c.GoogleOAuthenticator.client_id = '448379464054-3a3oeofpsvin51988i9m90u79kej4a9k.apps.googleusercontent.com'
c.GoogleOAuthenticator.client_secret = 'hb9gex2oV4xgnMGexjYct6dq'
# c.HubOAuth.oauth_redirect_uri  = 'http://localhost:8000/hub/oauth_callback'
# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.image = 'jupyterhub/singleuser:0.9'
c.DockerSpawner.default_url = '/lab'
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]
# c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
# c.SudoSpawner.default_url = '/lab'
# --- Services ---
c.JupyterHub.services = [
    {'name': 'cull-idle', 'api_token': 'd587ce42bc34407687901bbc723dcb0f'},
]
EOF
```

```bash
datalayerhub
```

## JupyterLab

```bash
cd $DLAHOME/repos/datalayer-jupyterlab
yarn watch
```

```bash
cd $DLAHOME/repos/jupterlab
jupyter lab --dev-mode --watch --browser chromium-browser
```
