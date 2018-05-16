---
title: JupyterLab Extensions Dev
---

[JupyterLab Extensions Dev Doc](https://jupyterlab.readthedocs.io/en/latest/developer/extension_dev.html).

## JupyterLab Extensions Dev

```bash
cookiecutter https://github.com/jupyterlab/extension-cookiecutter-ts
# In Extension Repo.
yarn install
yarn run build
jupyter labextension link .
yarn watch
# In Jupyterlab Repo.
cd $DLAHOME/repos/jupyterlab
jupyter lab build
jupyter lab --watch
jupyter lab --dev-mode
jupyter lab --dev-mode --watch
jupyter lab --core-mode
```

```bash
cd $DLAHOME/repos/datalayer-jupyterlab
yarn install
yarn run build
jupyter labextension install
```

```bash
# Step 1
cd $DLAHOME/repos/datalayer-jupyterlab
jupyter labextension link
yarn watch
# Step 2
cd $DLAHOME/repos/jupyterlab
jupyter lab --watch
```

```bash
# Installation and activation of Git handler.
# Installation and activation for jupyterlab_git python handler package.
cd $DLAHOME/repos/jupyterlab-git
pip install .
jupyter serverextension enable --py jupyterlab_git
yarn install
yarn run build
jupyter labextension install
# Launch JupyterLab & you will see the new Git buttons on the left side of the window.
jupyter lab
```

```bash
# If you must install a extension into a development branch of JupyterLab, you have to graft it into the source tree of JupyterLab itself. This may be done using the command.
yarn run add:sibling $DLAHOME/repos/datalayer-jupyterlab
jupyter lab --dev-mode --watch
# In the JupyterLab root directory, where <path-or-url> refers either to an extension npm package on the local filesystem, or a URL to a git repository for an extension npm package. This operation may be subsequently reversed by running.
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

## Publish

```bash
npm login
npm config set scope datalayer
# Publishing extensions.
npm publish --access=public
```
