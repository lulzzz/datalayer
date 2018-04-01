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
minikube stop
minikube delete
```

```
minikube get-k8s-versions
minikube help
```

```
# --network-plugin cni
# --allocate-node-cidrs=true
# --cluster-cidr=10.244.0.0/16
# --pod-network-cidr=10.244.0.0/16
# --vm-driver none
CHANGE_MINIKUBE_NONE_USER=true minikube start --kubernetes-version v1.9.4 --cpus 8 --memory 8192 --insecure-registry localhost:5000
```

```
eval $(minikube docker-env)
minikube status
minikube dashboard
minikube ssh
```

```
minikube logs -f
journalctl -fu localkube
```

## Local Registry

```
kubectl create -f $DLAHOME/specs/registry/kube-registry.yaml
```

```
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
```

## Echo Header

```
kubectl apply -f $DLAHOME/specs/echoheaders/echoheaders.yaml
curl $(minikube service echoheaders --url)
kubectl delete -f $DLAHOME/specs/echoheaders/echoheaders.yaml
```

## Helm

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
