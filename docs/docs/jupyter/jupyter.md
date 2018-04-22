---
title: Jupyter
---

## Notebook

[Notebook Docs](https://jupyter-notebook.readthedocs.io).

```bash
npm install -g configurable-http-proxy
pip3 install --upgrade notebook
pip3 install --upgrade jupyter
pip3 install --upgrade pyqt5
```

```bash
jupyter notebook
open http://localhost:8000
jupyter notebook list
```

```bash
jupyter console
jupyter qtconsole
jupyter --runtime-dir
```

```bash
jupyter notebook --generate-config
```

```bash
docker run -it --rm -p 8888:8888 jupyter/scipy-notebook:8a1b90cbcba5
```

# Kernels

```bash
# ./home/datalayer/.local/share/jupyter/runtime/kernel-53354a78-bde7-4986-9acb-fc94191d5d16.json
# ./home/datalayer/.local/share/jupyter/runtime/kernel-d785bbc8-c058-49d0-861c-97a39089c91e.json
# ./run/user/1000/jupyter/kernel-5332.json
# ./run/user/1000/jupyter/kernel-772af73b-185b-4960-b0fb-a0532dc59e49.json
jupyter kernelspec list
```

```bash
# Magic
%lsmagic
%env
%run
%load
```

# Extensions

`nbextension` - A notebook extension. A single JS file, or directory of JavaScript, Cascading StyleSheets, etc. that contain at minimum a JavaScript module packaged as an AMD modules that exports a function `load_ipython_extension`.

`server extension` - An importable Python module that implements `load_jupyter_server_extension`.

`bundler extension` - An importable Python module with generated File -> Download as / Deploy as menu item. trigger that implements bundle.

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

[JupyterLab Docs](https://jupyterlab.readthedocs.io).

```bash
pip install --upgrade jupyterlab
jupyter lab
jupyter lab --log-level DEBUG --port 8080 --notebook-dir /d
jupyter lab paths
```

```bash
jupyter serverextension enable --py jupyterlab --sys-prefix
jupyter notebook
open http://localhost:8888/lab
```

Modes

+ Core mode (`--core-mode`): in this mode JupyterLab will run using the JavaScript
  assets contained in the installed `jupyterlab` Python package. In core mode, no
  extensions are enabled. This is the default in a stable JupyterLab release if you
  have no extensions installed.
+ Dev mode (`--dev-mode`): uses the unpublished local JavaScript packages in the
  `dev_mode` folder.  In this case JupyterLab will show a red stripe at the top of
  the page.  It can only be used if JupyterLab is installed as `pip install -e .`.
+ App mode: JupyterLab allows multiple JupyterLab "applications" to be
  created by the user with different combinations of extensions. The `--app-dir` can
  be used to set a directory for different applications. The default application
  path can be found using `jupyter lab path`.

## JupyterLab Dev

[JupyterLab Docs for Dev](https://jupyterlab.readthedocs.io/en/latest/developer/repo.html).

[TypeScript Doc](http://jupyterlab.github.io/jupyterlab/index.html).

[Phosphor.js Datagrid](http://phosphorjs.github.io/examples/datagrid).

[Implement Watch Mode](https://github.com/jupyterlab/jupyterlab/pull/3077).

```bash
git clone https://github.com/jupyterlab/jupyterlab.git
cd jupyterlab
pip install -e .
# Use `jlpm` or globally installed `yarn`
yarn install
```

```bash
# Build the core mode assets (optional).
yarn run build:core
# Builds the source files into javascript files in lib folder.
yarn run build
jupyter lab build
jupyter lab --dev-mode --watch --browser chromium-browser
```

Building consists of:

+ Populating the staging/ directory using template files
+ Handling any locally installed packages
+ Ensuring all installed assets are available
+ Bundling the assets
+ Copying the bundled assets to the static directory

Note that building will always use the latest JavaScript packages that meet the dependency requirements of JupyterLab itself and any installed extensions. If you wish to run JupyterLab with the set of pinned requirements that was shipped with the Python package, you can launch as jupyter lab –core-mode.

```bash
# At times, it may be necessary to clean your local repo with the command yarn run clean:slate.
# This will clean the repository, and re-install and rebuild.
yarn run clean:slate
# Deletes the lib directory.
yarn run clean 
```

```bash
yarn run build:test
yarn test
```

```bash
# Build more accurate sourcemaps that show the original Typescript code when debugging.
# However, it takes a bit longer to build the sources, so is used only to build for production by default.
yarn run build:dev:prod
```

```bash
# cd docs
yarn run docs
open ./docs/index.html
open ./docs/api/index.html
```

```bash
ls /home/datalayer/opt/miniconda3/share/jupyter/lab
extensions  schemas  settings  staging  static  themes
```

## JupyterLab Examples

[JupyterLab Examples Docs](https://jupyterlab.readthedocs.io/en/latest/developer/examples.html).

```bash
yarn run build:examples
```

```bash
cd examples/cell
python main.py
```

## JupyterLab Renderers

```bash
jupyter labextension install @jupyterlab/fasta-extension
jupyter labextension install @jupyterlab/geojson-extension
jupyter labextension install @jupyterlab/katex-extension
jupyter labextension install @jupyterlab/plotly-extension
jupyter labextension install @jupyterlab/vega2-extension
```

```bash
git clone https://github.com/jupyterlab/jupyter-renderers.git
cd jupyter-renderers
yarn install
yarn run build
```

```bash
# Link all extensions in packages.
yarn run link
# Link geojson-extension only.
jupyter labextension link packages/geojson-extension
# After making changes to the source packages, the jupyter packages must be rebuilt.
# Rebuild the source.
cd $DLAHOME/repos/jupyterlab
yarn build
# Rebuild the JupyterLab staging directory.
jupyter lab build
```

```bash
# You may also watch the jupyter-renderers directory for changes and automatically rebuild.
# In one terminal tab, watch the jupyter-renderers directory.
yarn watch
# In another terminal tab, run jupyterlab with the watch flag.
jupyter lab --watch
```

## JupyterLab Extensions

[JupyterLab Extensions](https://jupyterlab.readthedocs.io/en/latest/user/extensions.html).

[JupyterLab Extensions on Github](https://github.com/topics/jupyterlab-extension).

[JupyterLab Extensions on Github (2)](https://github.com/search?utf8=%E2%9C%93&q=topic%3Ajupyterlab-extension&type=Repositories).

```bash
jupyter labextension list
# The jupyter labextension install command builds the application, so you do not need to call build.
jupyter labextension install @jupyterlab/xkcd-extension
jupyter labextension disable @jupyterlab/xkcd-extension
jupyter labextension enable @jupyterlab/xkcd-extension
jupyter labextension uninstall @jupyterlab/xkcd-extension
```

```bash
# Installing and uninstalling extensions can take some time, as they are downloaded, bundled with the core extensions, and the whole application is rebuilt. You can install/uninstall more than one extension in the same command by listing their names after the install command. If you are installing/uninstalling several extensions in several stages, you may want to defer rebuilding the application by including the flag --no-build in the install/uninstall step. Once you are ready to rebuild, you can run the command:
pip install jupyterlab_github
jupyter labextension install @jupyterlab/github --no-build
jupyter labextension install @jupyterlab/github@0.5.1 --no-build
# You can also install an extension that is not uploaded to npm, i.e., my-extension can be a local directory containing the extension, a gzipped tarball, or a URL to a gzipped tarball.
jupyter labextension install $DLAHOME/repos/jupyterlab-xkcd-extension --no-build
jupyter lab build
jupyter labextension uninstall @datalayer/jupyterlab-xkcd-extension
# Sometimes you need also server extensions.
pip install jupyterlab_latex
jupyter labextension install @jupyterlab/latex
jupyter labextension install $DLAHOME/repos/jupyterlab-latex
```

## JupyterLab Extensions Dev

[JupyterLab Extensions Dev](https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html).

```bash
cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts
# In extension repo.
yarn install
yarn run build
jupyter labextension link .
yarn watch
# In jupyterlab repo.
cd $DLAHOME/repos/jupyterlab
jupyter lab --watch
jupyter lab --dev-mode
jupyter lab --dev-mode --watch
jupyter lab --core-mode
```

```bash
cd jupyterlab-xkcd-extension
yarn install
yarn run build
# The following will cause the builder to re-install the source folder before building the application files. You can re-build at any time using jupyter lab build and it will reinstall these packages.
jupyter labextension install
# You can also link other local npm packages that you are working on simultaneously using jupyter labextension link; they will be re-installed but not considered as extensions. Local extensions and linked packages are included in jupyter labextension list.
jupyter labextension link
yarn watch
# Rebuild the package and the JupyterLab app.
cd $DLAHOME/repos/jupyterlab
yarn run build
jupyter lab build
# When using local extensions and linked packages, you can run the following command. This will cause the application to incrementally rebuild when one of the linked packages changes. Note that only compiled JavaScript files (and the CSS files) are watched by the WebPack process.
jupyter lab --watch
```

```bash
# Installation and activation of Git handler
# Installation and activation for jupyterlab_git python handler package:
cd $DLAHOME/repos/jupyterlab-git
pip install .
jupyter serverextension enable --py jupyterlab_git
# Launch JupyterLab & you will see the new Git buttons on the left side of the window.
```

```bash
# If you must install a extension into a development branch of JupyterLab, you have to graft it into the source tree of JupyterLab itself. This may be done using the command
yarn run add:sibling $DLAHOME/repos/datalayer-jupyterlab
# In the JupyterLab root directory, where <path-or-url> refers either to an extension npm package on the local filesystem, or a URL to a git repository for an extension npm package. This operation may be subsequently reversed by running
yarn run remove:sibling $DLAHOME/repos/datalayer-jupyterlab
```

## JupyterLab VDOM

```bash
pip install vdom
```

```bash
git clone https://github.com/nteract/vdom
cd vdom
pip install -e .
```

## JupyterLab Extensions Publish

```bash
npm login
npm config set scope datalayer
# Publishing extensions.
npm publish --access=public
```

## JupyterHub

[JupyterHub Docs](https://jupyterhub.readthedocs.io).

[JupyterHub Tutorial](https://jupyterhub-tutorial.readthedocs.io).

[JupyterHub Repository](https://github.com/jupyterhub/jupyterhub).

[JupyterHub Gitter](https://gitter.im/jupyterhub/jupyterhub).

```bash
pip3 install --upgrade jupyterhub
configurable-http-proxy -h
# netifaces
pip3 install --upgrade oauthenticator dockerspawner
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

```bash
docker pull jupyterhub/singleuser
docker run -d --name jupyterhub jupyterhub/jupyterhub jupyterhub
open http://localhost:8000
docker exec -it jupyterhub bash
```

## JupyterHub Single Server

[JupyterHub Single Server Docs](http://jupyterhub-deploy-teaching.readthedocs.io/en/latest).

[JupyterHub Single Server Repo](https://github.com/jupyterhub/jupyterhub-deploy-teaching).

## JupyterHub Teaching

[JupyterHub Teaching Docs](http://jupyterhub-deploy-teaching.readthedocs.io/en/latest).

[JupyterHub Teaching Repo](https://github.com/jupyterhub/jupyterhub-deploy-teaching).

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

## Kernel Gateway

[Kernel Gateway Docs](https://jupyter-kernel-gateway.readthedocs.io).

[Kernel Gateway Repo](https://github.com/jupyter/kernel_gateway).

[Notebook to Kernel Gateway](https://github.com/jupyter-incubator/nb2kg).

```bash
pip install jupyter_kernel_gateway
jupyter kernelgateway
pip install nb2kg
jupyter serverextension enable --py nb2kg --sys-prefix
export KG_URL=http://127.0.0.1:8888
jupyter notebook \
  --NotebookApp.session_manager_class=nb2kg.managers.SessionManager \
  --NotebookApp.kernel_manager_class=nb2kg.managers.RemoteKernelManager \
  --NotebookApp.kernel_spec_manager_class=nb2kg.managers.RemoteKernelSpecManager 
```

```bash
# start from the jupyter image with R, Python, and Scala (Apache Toree) kernels pre-installed
FROM jupyter/all-spark-notebook
# install the kernel gateway
RUN pip install jupyter_kernel_gateway
# run kernel gateway on container start, not notebook server
EXPOSE 8888
CMD ["jupyter", "kernelgateway", "--KernelGatewayApp.ip=0.0.0.0", "--KernelGatewayApp.port=8888"]
```

```bash
docker build -t datalayer/kernel-gateway .
docker run -it --rm -p 8888:8888 datalayer/kernel-gateway
```

## Enterprise Gateway

[Enterprise Gateway Docs](https://jupyter-enterprise-gateway.readthedocs.io/en/latest).

[Enterprise Gateway Repo](https://github.com/jupyter-incubator/enterprise_gateway).

## Repo2Docker

[Repo2Docker Repository](https://github.com/jupyter/repo2docker).

[Repo2Docker Docs](http://repo2docker.readthedocs.io).

```bash
pip install jupyter-repo2docker
jupyter-repo2docker <YOUR-GITHUB-REPOSITORY> --image=gcr.io/<PROJECT-NAME>/<IMAGE-NAME>:<TAG> --no-run
docker push...
```

## BinderHub

[BinderHub Docs](https://binderhub.readthedocs.io).

## NbGitPuller

[NbPuller Repo](https://github.com/data-8/nbgitpuller).

```bash
pip install git+https://github.com/data-8/nbgitpuller
```

## NbConvert

[NbConvert Docs](https://nbconvert.readthedocs.io).

## NbGrader

[NbGrader Docs](https://nbgrader.readthedocs.io).

## Spark Toree

```bash
pip install --pre toree
pip install https://dist.apache.org/repos/dist/dev/incubator/toree/0.2.0/snapshots/dev1/toree-pip/toree-0.2.0.dev1.tar.gz
```

```bash
export SPARK_HOME=/opt/spark
cd $DLAHOME/repos/jupyter-toree
make clean release APACHE_SPARK_VERSION=2.2.0
# pip install toree --no-index --find-links=./dist/toree-pip/toree-0.3.0.dev1.tar.gz
pip install --upgrade ./dist/toree-pip/toree-0.3.0.dev1.tar.gz
pip freeze | grep toree
```

```bash
jupyter toree install --spark_home=/opt/spark --interpreters=Scala,PySpark,SparkR,SQL
jupyter notebook
```

## Spark Magic (Livy)

[sparkmagic](https://github.com/jupyter-incubator/sparkmagic)

## Dashboard

[Repository](https://github.com/jupyter/dashboards).

[Docs](http://jupyter-dashboards-layout.readthedocs.io/en/latest).

```bash
pip install jupyter_dashboards
# jupyter nbextension install --py jupyter_dashboards --sys-prefix
# jupyter nbextension enable --py jupyter_dashboards --sys-prefix
jupyter dashboards quick-setup --sys-prefix
```

```bash
pip install -r requirements-demo.txt
jupyter notebook --notebook-dir=./etc/notebooks/
```
