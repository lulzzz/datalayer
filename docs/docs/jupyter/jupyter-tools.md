---
title: Jupyter Tools
---

## NbConvert

[NbConvert Docs](https://nbconvert.readthedocs.io).

[NbConvert Repository](https://github.com/jupyter/nbconvert.git).

## Dashboard

[Dashboard Docs](http://jupyter-dashboards-layout.readthedocs.io/en/latest).

[Dashboard Repository](https://github.com/jupyter/dashboards).

```bash
# jupyter nbextension install --py jupyter_dashboards --sys-prefix
# jupyter nbextension enable --py jupyter_dashboards --sys-prefix
pip install jupyter_dashboards
jupyter dashboards quick-setup --sys-prefix
```

```bash
pip install -r requirements-demo.txt
jupyter notebook --notebook-dir=./etc/notebooks/
```
