---
title: Jupyter
---

## Architecture

```
jupyterhub binderhub nbgrader nbviewer dashboards
jupyter_console qtconsole notebook nbconvert
jupyter_core jupyter_client nbformat
ipykernel ipywidgets
ipython
traitlets
```

## Notebook

[Notebook Docs](https://jupyter-notebook.readthedocs.io).

[Notebook Repository](https://github.com/jupyter/notebook).

```bash
pip3 install --upgrade notebook
pip3 install --upgrade jupyter
pip3 install --upgrade pyqt5
```

```bash
jupyter notebook
open http://localhost:8000
```

```bash
jupyter notebook list
```

## Config

```bash
jupyter notebook --generate-config
jupyter --runtime-dir
```

## Console

```bash
jupyter console
jupyter qtconsole
```

## Docker

```bash
docker run -it --rm -p 8888:8888 jupyter/scipy-notebook:8a1b90cbcba5
open http://localhost:8888
```
