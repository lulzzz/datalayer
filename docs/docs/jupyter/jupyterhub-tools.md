---
title: JupyterHub Tools
---

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

