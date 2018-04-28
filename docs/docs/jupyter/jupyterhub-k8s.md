---
title: JupyterHub on Kubernetes
---

## JupyterHub on Kubernetes

[JupyterHub-K8S Docs](https://zero-to-jupyterhub.readthedocs.io).

[JupyterHub-K8S Repository](https://github.com/jupyterhub/zero-to-jupyterhub-k8s).

[JupyterHub-K8S Helm Charts Repository](https://github.com/jupyterhub/helm-chart).

[JupyterHub-K8S Helm Charts Install Repository](https://jupyterhub.github.io/helm-chart).

```bash
mkdir jupyter
cd jupyter
helm repo add jupyterhub https://jupyterhub.github.io/helm-chart
helm repo update

# singleuser:
#   image:
#     name: jupyter/scipy-notebook
#     tag: 8a1b90cbcba5

# singleuser:
#   storage:
#     type: none
#   storage:
#     dynamic:
#       storageClass: <storageclass-name>

# ingress:
#     enabled: true
#     hosts:
#      - <hostname>

# ingress:
#   annotations:
#     kubernetes.io/tls-acme: "true"
#   tls:
#    - hosts:
#       - <hostname>
#      secretName: kubelego-tls-jupyterhub

echo """
proxy:
  secretToken: \"$(openssl rand -hex 32)\"
singleuser:
  defaultUrl: \"/lab\"
  image:
    name: datalayer/jupyterlab
    tag: 0.0.1
  cpu:
    limit: .5
    guarantee: .5
  memory:
    limit: 1G
    guarantee: 1G
  lifecycleHooks:
    postStart:
      exec:
        command: [\"gitpuller\", \"https://github.com/data-8/materials-fa17\", \"master\", \"materials-fa\"]
  storage:
    capacity: 1Gi
hub:
  extraEnv:
    JUPYTER_ENABLE_LAB: 1
  extraConfig: |
    c.KubeSpawner.cmd = [\"jupyter-labhub\"]
auth:
  admin:
    users:
      - adminuser1
      - adminuser2
""" > ./jupyterhub-config.yaml
cat ./jupyterhub-config.yaml
```

```bash
helm install jupyterhub/jupyterhub \
  --version=v0.7-8bec89c \
  --name=jupyterhub \
  --namespace=jupyterhub \
  --timeout=99999 \
  -f jupyterhub-config.yaml
kubectl get pods -n jupyterhub
kubectl get svc -n jupyterhub
minikube -n jupyterhub service proxy-public --url
open $(minikube -n jupyterhub service proxy-public --url)
```

```bash
helm upgrade jupyterhub \
  jupyterhub/jupyterhub \
  --version=v0.7-8bec89c \
  --namespace=jupyterhub \
  -f jupyterhub-config.yaml
```

```bash
helm delete jupyterhub --purge
kubectl delete namespace jupyterhub
```
