---
title: K8S Dashboard
---

To ease the management, it is interesting to install the standard `Kubernetes Dashboard`.

```shell
# Temp workaround to relax roles...
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```

```shell
helm install k8s-dashboard \
  --namespace kube-system \
  --set=httpPort=3000,resources.limits.cpu=200m,rbac.create=true \
  -n k8s-dashboard
```

Browse the Dashboard UI with a proxy to the HTTP port.

```shell
export POD_NAME=$(kubectl get pods -n kube-system -l "app=kubernetes-dashboard,release=k8s-dashboard" -o jsonpath="{.items[0].metadata.name}")
echo http://127.0.0.1:9090
kubectl -n kube-system port-forward $POD_NAME 9090:9090
```

Or if you prefer, you can activate a full running proxy.

```shell
kubectl proxy
echo http://localhost:8001/api/v1/namespaces/kube-system/services/http:k8s-dashboard-kubernetes-dashboard:/proxy/#!/overview?namespace=_all
```
