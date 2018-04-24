---
title: Minikube
---

## Install

```bash
docker rm -f $(docker ps -a -q)
sudo rm -fr $HOME/.kube 
sudo rm -fr $HOME/.minikube /var/lib/localkube /var/lib/kubelet; sudo mkdir /var/lib/localkube; sudo chown -R datalayer:datalayer /var/lib/localkube
sudo rm -fr /var/lib/etcd
sudo rm -fr /etc/kubernetes; sudo mkdir /etc/kubernetes; sudo chown -R datalayer:datalayer /etc/kubernetes
```

```bash
systemctl disable localkube
systemctl stop localkube
```

## Local Cluster

```bash
minikube version
minikube get-k8s-versions
minikube help
```

```bash
minikube start
minikube stop
minikube delete
```

```bash
# --network-plugin cni
# --allocate-node-cidrs true
# --cluster-cidr 10.244.0.0/16
# --pod-network-cidr 10.244.0.0/16
# --vm-driver none
# apiserver.EnableInsecureLogin.Mode=false
CHANGE_MINIKUBE_NONE_USER=true minikube start \
  --kubernetes-version v1.9.4 \
  --cpus 8 \
  --memory 8192 \
  --insecure-registry localhost:5000 \
  --extra-config=apiserver.Authorization.Mode=RBAC
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```

```bash
k get pods --all-namespaces
```

```bash
eval $(minikube docker-env)
minikube status
minikube ssh
```

```bash
minikube logs -f
journalctl -fu localkube
```

## Addons

```bash
minikube addons list
minikube addons enable ingress
minikube addons enable heapster
minikube addons open heapster
minikube addons disable heapster
```

## Helm

```bash
kubectl -n kube-system create sa tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
kubectl --namespace=kube-system patch deployment tiller-deploy --type=json --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/command", "value": ["/tiller", "--listen=localhost:44134"]}]'
```

```bash
helm init --canary-image --upgrade
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'      
helm init --service-account tiller --upgrade
```

```bash
helm version
helm ls
```

```bash
helm install $DLAHOME/repos/datalayer-helm/hello -n hello
kubectl get po
kubectl get svc
helm ls
helm status hello
helm delete hello --purge
```

## Dashboard

```bash
# Option 1
minikube addons disable dashboard
kubectl create -f $DLAHOME/manifests/k8s-dashboard/k8s-dashboard-auth-header.yaml
kubectl proxy
open http://localhost:8001/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/#!/login
```

```bash
# Option 2
minikube addons enable dashboard
minikube dashboard
k get deploy --all-namespaces
k get svc --all-namespaces
open http://192.168.99.100:30000
```

## Local Registry

```bash
kubectl create -f $DLAHOME/manifests/registry/kube-registry.yaml
```

```bash
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
```

## Echo Header

```bash
kubectl apply -f $DLAHOME/manifests/echo/echo.yaml
curl $(minikube service echoheaders --url)
kubectl delete -f $DLAHOME/manifests/echoheaders/echoheaders.yaml
```
