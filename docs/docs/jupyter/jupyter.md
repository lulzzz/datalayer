---
title: Jupyter
---

## Architecture

```
jupyterhub binderhub nbgrader nbviewer dashboards
jupyer_console qtconsole notebook nbconvert
jupyter_core jupyter_client nbformat
ipykernel ipywidgets
ipython
traitlets
```

## Notebook

[Notebook Docs](https://jupyter-notebook.readthedocs.io).

[Notebook Repo](https://github.com/jupyter/notebook).

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
```

# Extensions

`nbextension` - A notebook extension. A single JS file, or directory of JavaScript, Cascading StyleSheets, etc. that contain at minimum a JavaScript module packaged as an AMD modules that exports a function `load_ipython_extension`.

`server extension` - An importable Python module that implements `load_jupyter_server_extension`.

`bundler extension` - An importable Python module with generated File -> Download as / Deploy as menu item. trigger that implements bundle.

```bash
jupyter nbextension list
jupyter serverextension list
jupyter bundlerextension list
```

```bash
# Pizza Extension
pip install pizzabutton
jupyter serverextension enable --py pizzabutton --sys-prefix
jupyter nbextension install --py pizzabutton --sys-prefix
jupyter nbextension enable --py pizzabutton --sys-prefix
```
