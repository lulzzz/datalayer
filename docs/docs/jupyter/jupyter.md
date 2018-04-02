---
title: Jupyter
---

## Install

```
npm install -g configurable-http-proxy
sudo pip3 install --upgrade notebook
sudo pip3 install --upgrade jupyter
sudo pip3 install --upgrade jupyterhub
```

```
jupyter labextension install @jupyterlab/hub-extension
```

## Jupyter

```
jupyter notebook
echo http://localhost:8000
```

## JupyterHub

```
jupyterhub
echo http://localhost:8000/user/datalayer/lab
echo http://localhost:8000/user/datalayer/tree
```

## JupyterLab Install

```
pip3 install jupyterlab
jupyter lab
```

## JupyterLab Dev

Use `jlpm` or globally installed `yarn`.

```
git clone https://github.com/jupyterlab/jupyterlab.git
cd jupyterlab
```

```
pip3 install -e .
```

```
yarn clean
yarn install
yarn run build         # Build the dev mode assets (optional)
yarn run build:core    # Build the core mode assets (optional)
jupyter lab build      # Build the app dir assets (optional)
jupyter lab --dev-mode --watch
```

```
yarn run clean:slate
yarn run build:dev:prod
```

```
yarn run build:test
yarn test
```

```
jupyter serverextension enable --py --sys-prefix jupyterlab
jupyter lab --dev-mode
```
