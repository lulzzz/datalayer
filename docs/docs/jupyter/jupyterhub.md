---
title: JupyterHub
---

## JupyterHub

[JupyterHub Docs](https://jupyterhub.readthedocs.io).

[JupyterHub Repository](https://github.com/jupyterhub/jupyterhub).

[JupyterHub Tutorial Docs](https://jupyterhub-tutorial.readthedocs.io).

[JupyterHub Tutorial Repository](https://github.com/jupyterhub/jupyterhub-tutorial).

[JupyterHub Gitter](https://gitter.im/jupyterhub/jupyterhub).

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

## JupyterLab Hub Plugin

[JupyterLab Hub Repository Extension](https://github.com/jupyterhub/jupyterlab-hub).

```bash
# This adds a "Hub" menu to JupyterLab that allows a user to log out of JupyterHub or access their JupyterHub control panel. This follows the JupyterLab extension system where an extension is just an npm package, not wrapped in a Python package.
jupyter serverextension enable --py jupyterlab --sys-prefix
jupyter labextension install @jupyterlab/hub-extension
open http://localhost:8000/user/datalayer/lab
```

```bash
# In `jupyterhub_config.py` configure the Spawner to tell the single-user notebook servers to default to Jupyter-Lab.
c.Spawner.default_url = '/lab'
```

```bash
# You will also need to start the single user servers in JupyterHub using the following command (that ships with JupyterLab).
jupyter labhub
```

```bash
# Alternatively, you can add the following to `jupyterhub_config.py`
c.Spawner.cmd = ['jupyter-labhub']
```

Additional information may be found in the [Zero to JupyterHub Guide for Kubernetes](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-environment.html#use-jupyterlab-by-default)

```bash
# Development: For a development install (requires npm version 4 or later), do the following in the repository directory.
npm install
jupyter labextension link .
```

```bash
# To rebuild the package and the JupyterLab app after making changes.
npm run build
jupyter lab build
```

## NbGitPuller

[NbPuller Repository](https://github.com/data-8/nbgitpuller).

```bash
pip install git+https://github.com/data-8/nbgitpuller
```

## JupyterHub on Kubernetes

[JupyterHub-K8S Docs](https://zero-to-jupyterhub.readthedocs.io).

[JupyterHub-K8S Repository](https://github.com/jupyterhub/zero-to-jupyterhub-k8s).

[JupyterHub-K8S Helm Charts Repository](https://github.com/jupyterhub/helm-chart).

[JupyterHub-K8S Helm Charts Install Repository](https://jupyterhub.github.io/helm-chart).

```bash
mkdir jupyter
cd jupyter
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart
helm repo update

# singleuser:
#   image:
#     name: jupyter/scipy-notebook
#     tag: 8a1b90cbcba5

# singleuser:
#   storage:
#     type: none
#   storage:
#     dynamic:
#       storageClass: <storageclass-name>

# ingress:
#     enabled: true
#     hosts:
#      - <hostname>

# ingress:
#   annotations:
#     kubernetes.io/tls-acme: "true"
#   tls:
#    - hosts:
#       - <hostname>
#      secretName: kubelego-tls-jupyterhub

echo """
proxy:
  secretToken: \"$(openssl rand -hex 32)\"
singleuser:
  defaultUrl: \"/lab\"
  image:
    name: datalayer/jupyterlab
    tag: 0.0.1
  cpu:
    limit: .5
    guarantee: .5
  memory:
    limit: 1G
    guarantee: 1G
  lifecycleHooks:
    postStart:
      exec:
        command: [\"gitpuller\", \"https://github.com/data-8/materials-fa17\", \"master\", \"materials-fa\"]
  storage:
    capacity: 1Gi
hub:
  extraEnv:
    JUPYTER_ENABLE_LAB: 1
  extraConfig: |
    c.KubeSpawner.cmd = [\"jupyter-labhub\"]
auth:
  admin:
    users:
      - adminuser1
      - adminuser2
""" > ./jupyterhub-config.yaml
cat ./jupyterhub-config.yaml
```

```bash
helm install jupyterhub/jupyterhub \
  --version=v0.7-8bec89c \
  --name=jupyterhub \
  --namespace=jupyterhub \
  --timeout=99999 \
  -f jupyterhub-config.yaml
kubectl get pods -n jupyterhub
kubectl get svc -n jupyterhub
minikube -n jupyterhub service proxy-public --url
open $(minikube -n jupyterhub service proxy-public --url)
```

```bash
helm upgrade jupyterhub \
  jupyterhub/jupyterhub \
  --version=v0.7-8bec89c \
  --namespace=jupyterhub \
  -f jupyterhub-config.yaml
```

```bash
helm delete jupyterhub --purge
kubectl delete namespace jupyterhub
```
