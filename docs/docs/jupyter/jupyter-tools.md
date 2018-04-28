---
title: Jupyter Tools
---

## NbConvert

[NbConvert Docs](https://nbconvert.readthedocs.io).

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
