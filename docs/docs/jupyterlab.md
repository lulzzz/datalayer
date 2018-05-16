---
title: JupyterLab
---

## JupyterLab

[JupyterLab Docs](https://jupyterlab.readthedocs.io).

[JupyterLab Repository](https://github.com/jupyterlab/jupyterlab).

```bash
pip install --upgrade jupyterlab
jupyter lab
jupyter lab --log-level DEBUG --port 8080 --notebook-dir /d
jupyter lab paths
```

```bash
# Option...
jupyter serverextension enable --py jupyterlab --sys-prefix
jupyter notebook
open http://localhost:8888/lab
```

## Modes

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
