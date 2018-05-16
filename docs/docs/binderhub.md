---
title: BinderHub
---

[BinderHub Repository](https://github.com/jupyterhub/binderhub)

[BinderHub Docs](https://binderhub.readthedocs.io).

## Examples

[BinderHub Examples Repository](https://github.com/binder-examples)

## Commmunity

[BinderHub Gitter](https://gitter.im/jupyterhub/binder).

## Develop

```bash
minikube start
helm version
cd $DLAHOME/repos/jupyter-binderhub
pip install -e . -r dev-requirements.txt
./testing/minikube/install-hub
eval $(minikube docker-env)
python -m binderhub -f testing/minikube/binderhub_config.py
open http://localhost:8585
```
