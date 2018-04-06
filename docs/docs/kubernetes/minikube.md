---
title: Minikube
---

## Install Minikube

```
docker rm -f $(docker ps -a -q)
sudo rm -fr $HOME/.kube 
sudo rm -fr $HOME/.minikube /var/lib/localkube /var/lib/kubelet; sudo mkdir /var/lib/localkube; sudo chown -R datalayer:datalayer /var/lib/localkube
sudo rm -fr /var/lib/etcd
sudo rm -fr /etc/kubernetes; sudo mkdir /etc/kubernetes; sudo chown -R datalayer:datalayer /etc/kubernetes
```

```
systemctl disable localkube
systemctl stop localkube
```

## Create Local Cluster

```
minikube version
minikube get-k8s-versions
minikube help
```

```
minikube addons list
```

```
minikube stop
minikube delete
```

```
# --network-plugin cni
# --allocate-node-cidrs=true
# --cluster-cidr=10.244.0.0/16
# --pod-network-cidr=10.244.0.0/16
# --vm-driver none
# apiserver.EnableInsecureLogin.Mode=false
CHANGE_MINIKUBE_NONE_USER=true minikube start --kubernetes-version v1.9.4 --cpus 8 --memory 8192 --insecure-registry localhost:5000 --extra-config=apiserver.Authorization.Mode=RBAC
kubectl create clusterrolebinding add-on-cluster-admin --clusterrole=cluster-admin --serviceaccount=kube-system:default
```

```
minikube addons enable heapster
minikube addons open heapster
minikube addons disable heapster
```

```
minikube addons enable ingress
```

```
k get pods --all-namespaces
```

```
eval $(minikube docker-env)
minikube status
minikube ssh
```

```
minikube logs -f
journalctl -fu localkube
```

## Dashboard

```
minikube addons disable dashboard
minikube addons enable dashboard
minikube dashboard
k get deploy --all-namespaces
k get svc --all-namespaces
open http://192.168.99.100:30000
```

```
kubectl create -f $DLAHOME/manifests/k8s-dashboard/k8s-dashboard-minikube.yaml
open http://192.168.99.100:30000
```

## Local Registry

```
kubectl create -f $DLAHOME/manifests/registry/kube-registry.yaml
```

```
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
```

## Echo Header

```
kubectl apply -f $DLAHOME/manifests/echoheaders/echoheaders.yaml
curl $(minikube service echoheaders --url)
kubectl delete -f $DLAHOME/manifests/echoheaders/echoheaders.yaml
```

## Helm

```
kubectl -n kube-system create sa tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
```

```
helm init --canary-image --upgrade
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'      
helm init --service-account tiller --upgrade
```

```
helm ls
```
