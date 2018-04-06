---
title: Jupyter
---

## Jupyter Notebook

[Read the Docs](https://jupyter-notebook.readthedocs.io)

```bash
npm install -g configurable-http-proxy
pip3 install --upgrade notebook
pip3 install --upgrade jupyter
```

```bash
jupyter notebook
open http://localhost:8000
jupyter notebook list
```

```bash
jupyter notebook --generate-config
```
 
# Jupyter Kernels

```bash
jupyter kernelspec list
# Available kernels:
#  apache_toree_pyspark    /usr/local/share/jupyter/kernels/apache_toree_pyspark
#  apache_toree_scala      /usr/local/share/jupyter/kernels/apache_toree_scala
#  apache_toree_sparkr     /usr/local/share/jupyter/kernels/apache_toree_sparkr
#  apache_toree_sql        /usr/local/share/jupyter/kernels/apache_toree_sql

# rm -fr /usr/local/share/jupyter/kernels/apache_toree_sparkr
```

# Jupyter Magic

```
%lsmagic
%env
%run
%load
```

# Jupyter Extensions

`nbextension`: a notebook extension. A single JS file, or directory of JavaScript, Cascading StyleSheets, etc. that contain at minimum a JavaScript module packaged as an AMD modules that exports a function `load_ipython_extension`.

`server extension`: an importable Python module that implements `load_jupyter_server_extension`.

`bundler extension`: an importable Python module with generated File -> Download as / Deploy as menu item. trigger that implements bundle.

```bash
pip install pizzabutton
jupyter serverextension enable --py pizzabutton --sys-prefix
jupyter nbextension install --py pizzabutton --sys-prefix
jupyter nbextension enable --py pizzabutton --sys-prefix
```

```bash
jupyter nbextension list
jupyter serverextension list
jupyter bundlerextension list
```

## JupyterLab

[Read the Docs](https://jupyterlab.readthedocs.io)

```bash
# phosphor.js
open http://phosphorjs.github.io/examples/datagrid
```

```bash
pip3 install --upgrade jupyterlab
jupyter lab
# jupyter serverextension enable --py jupyterlab --sys-prefix
```

```bash
git clone https://github.com/jupyterlab/jupyterlab.git
cd jupyterlab
pip3 install -e .
# Use `jlpm` or globally installed `yarn`
yarn clean
yarn install
yarn run build         # Build the dev mode assets (optional)
yarn run build:core    # Build the core mode assets (optional)
jupyter lab build      # Build the app dir assets (optional)
jupyter lab --dev-mode --watch
```

```bash
yarn run clean:slate
yarn run build:dev:prod
yarn run build:test
yarn test
```

## JupyterHub

[Read the Docs](https://jupyterhub-tutorial.readthedocs.io)

```bash
pip3 install --upgrade jupyterhub
# netifaces
pip3 install --upgrade oauthenticator dockerspawner
jupyterhub -h
configurable-http-proxy -h
```

```bash
sudo su
jupyterhub
open http://localhost:8000/user/datalayer/tree
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
docker pull jupyterhub/singleuser
docker run -d --name jupyterhub jupyterhub/jupyterhub jupyterhub
open http://localhost:8000
docker exec -it jupyterhub bash
```

## JupyterHub on Kubernetes

[Read the Docs](https://zero-to-jupyterhub.readthedocs.io)

## JupyterHub for JupyterLab

[Read the Docs](https://zero-to-jupyterhub.readthedocs.io)

https://github.com/jupyterhub/jupyterlab-hub

```bash
jupyter labextension install @jupyterlab/hub-extension
open http://localhost:8000/user/datalayer/lab
```

This adds a "Hub" menu to JupyterLab that allows a user to log out of JupyterHub or access their JupyterHub control panel. This follows the JupyterLab extension system where an extension is just an npm package, not wrapped in a Python package.

```bash
jupyter labextension install @jupyterlab/hub-extension
```

In `jupyterhub_config.py` configure the Spawner to tell the single-user notebook servers to default to Jupyter-Lab:

```bash
c.Spawner.default_url = '/lab'
```

You will also need to start the single user servers in JupyterHub using the following command (that ships with JupyterLab):

```bash
jupyter labhub
```

Alternatively, you can add the following to `jupyterhub_config.py`:

```
c.Spawner.cmd = ['jupyter-labhub']
```

Note: Additional information may be found in the [Zero to JupyterHub Guide for Kubernetes](https://zero-to-jupyterhub.readthedocs.io/en/latest/user-environment.html#use-jupyterlab-by-default)

Development: For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app after making changes:

```bash
npm run build
jupyter lab build
```

## BinderHub

[Read the Docs](https://binderhub.readthedocs.io)

## NbConvert

[Read the Docs](https://nbconvert.readthedocs.io)

## NbGrader

[Read the Docs](https://nbgrader.readthedocs.io)

## Spark Toree

```bash
pip install --pre toree
```

```bash
pip install https://dist.apache.org/repos/dist/dev/incubator/toree/0.2.0/snapshots/dev1/toree-pip/toree-0.2.0.dev1.tar.gz
```

```bash
export SPARK_HOME=/opt/spark
cd $DLAHOME/repos/jupyter-toree
# make clean release APACHE_SPARK_VERSION=2.2.0-k8s-0.5.0
make clean release APACHE_SPARK_VERSION=2.2.0
# pip install toree --no-index --find-links=./dist/toree-pip/toree-0.2.0.dev1.tar.gz
pip install --upgrade ./dist/toree-pip/toree-0.3.0.dev1.tar.gz
pip freeze | grep toree
```

```bash
jupyter toree install --spark_home=/opt/spark --interpreters=Scala,PySpark,SparkR,SQL
jupyter notebook
```

## Spark Magic (Livy)

[sparkmagic](https://github.com/jupyter-incubator/sparkmagic)
