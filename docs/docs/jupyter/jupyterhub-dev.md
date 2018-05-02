---
title: JupyterHub Dev
---

## JupyterHub Dev

```bash
python setup.py clen
rm -fr build dist *.egg-info
python setup.py sdist
pip install -e .
```

```bash
python setup.py register -r pypi
python setup.py sdist upload -r pypi
```
