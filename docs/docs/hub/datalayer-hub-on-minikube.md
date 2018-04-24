---
title: Datalayer Hub on Minikube
---

This is a `How To` develop the Datalayer Hub from source on Ubuntu with Minikube.

For other platforms (Centos...), replace the `apt` commands with their equivalents (or better, contribute to this doc with a PR).

## Repos and Env

```bash
git clone https://github.com/datalayer/datalayer.git
cd datalayer
export DLAHOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd repos
git clone https://github.com/datalayer/docker-files.git
git clone https://github.com/datalayer/helm-charts.git
git clone https://github.com/datalayer-contrib/data8-nbgitpuller.git
git clone https://github.com/datalayer-contrib/jupyterhub.git
git clone https://github.com/datalayer-contrib/jupyterhub-http-proxy.git
git clone https://github.com/datalayer-contrib/jupyterhub-k8s.git
```

## VirtualBox

```bash
apt install virtualbox
```

## Minikube

```bash
apt update && apt install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt update
apt install -y kubectl
curl -Lo /usr/local/bin/minikube https://storage.googleapis.com/minikube/releases/v0.25.2/minikube-linux-amd64 \
  && chmod +x /usr/local/bin/minikube
minikube stop
minikube delete
CHANGE_MINIKUBE_NONE_USER=true minikube start \
  --kubernetes-version v1.9.4 \
  --cpus 8 \
  --memory 8192 \
  --insecure-registry localhost:5000 \
  --extra-config=apiserver.Authorization.Mode=RBAC
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
minikube addons disable heapster
minikube addons enable dashboard
minikube addons enable ingress
kubectl label nodes minikube kuber-role=master
minikube dashboard
```

```bash
# Helm.
curl -Lo /tmp/helm-v2.9.0-rc3-linux-amd64.tar.gz https://storage.googleapis.com/kubernetes-helm/helm-v2.9.0-rc3-linux-amd64.tar.gz \
 && tar xvfz /tmp/helm-v2.9.0-rc3-linux-amd64.tar.gz -C /tmp \
 && mv /tmp/linux-amd64/helm /usr/local/bin \
 && chmod +x /usr/local/bin/helm
kubectl -n kube-system create sa tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller
kubectl --namespace=kube-system patch deployment tiller-deploy --type=json --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/command", "value": ["/tiller", "--listen=localhost:44134"]}]'
```

```bash
# Registry.
kubectl create -f $DLAHOME/manifests/registry/kube-registry.yaml
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
```

## Docker Images

```bash
docker pull datalayer/hdfs-nn:2.9.0
docker pull datalayer/hdfs-dn:2.9.0
docker pull datalayer/spark-base:2.2.0
docker pull datalayer/spark-resource-staging-server:2.2.0
docker pull datalayer/spark-shuffle-service:2.2.0
docker pull datalayer/spark-init:2.2.0
docker pull datalayer/spark-driver:2.2.0
docker pull datalayer/spark-driver-py:2.2.0
docker pull datalayer/spark-executor:2.2.0
docker pull datalayer/spark-executor-py:2.2.0
docker pull datalayer/hub:0.0.1
docker pull datalayer/hub-image-awaiter:0.0.1
docker pull datalayer/hub-network-tools:0.0.1
docker pull datalayer/hub-pod-culler:0.0.1
docker pull datalayer/hub-http-proxy:0.0.1
docker pull datalayer/hub-jupyterlab:0.0.1
```

Tag and push the Docker images to the Minikube registry.

```bash
$DLAHOME/repos/datalayer-docker/tag-push-images-to-minikube-registry.sh
```

*Option*: you can build your own custom Docker images and push them.

```bash
cd $DLAHOME/repos/datalayer-docker/hdfs && ./build.sh \
  && cd $DLAHOME/repos/datalayer-docker/hdfs-nn && ./build-push.sh \
  && cd $DLAHOME/repos/datalayer-docker/hdfs-dn && ./build-push.sh
datalayer spark-docker-build-push
cd $DLAHOME/repos/jupyterhub-http-proxy \
  && git checkout datalayer \
  && docker build \
    -t datalayer/hub-http-proxy:0.0.1 \
    . \
  && docker push datalayer/hub-http-proxy:0.0.1
cd $DLAHOME/repos/jupyterhub-k8s/images && git checkout datalayer && ./build-push.sh
cd $DLAHOME/repos/datalayer-docker/hub-jupyterlab && ./build-push.sh
```

## Deploy HDFS

```bash
cd $DLAHOME/repos/datalayer-helm
# Deploy HDFS Helm Chart.
helm install \
  hdfs \
  --set hdfs.nameNode.image=localhost:5000/hdfs-nn:2.9.0 \
  --set hdfs.nameNode.masterOperator=In \
  --set hdfs.dataNode.image=localhost:5000/hdfs-dn:2.9.0 \
  --set hdfs.dataNode.masterOperator=In \
  --set imagePullPolicy=Always \
  --set persistence.nameNode.enabled=true \
  --set persistence.nameNode.storageClass=standard \
  --set persistence.nameNode.size=1Gi \
  --set persistence.dataNode.enabled=true \
  --set persistence.dataNode.storageClass=standard \
  --set persistence.dataNode.size=1Gi \
  --set hdfs.dataNode.replicas=2 \
  -n hdfs
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfsadmin -report
```

## Deploy Spark

```bash
cd $DLAHOME/repos/datalayer-helm
# Deploy Spark Helm Chart.
helm install \
  spark \
  --set spark.resourceStagingServer.image=localhost:5000/spark-resource-staging-server:2.2.0 \
  --set spark.resourceStagingServer.masterOperator=In \
  --set spark.shuffleService.image=localhost:5000/spark-shuffle-service:2.2.0 \
  --set spark.shuffleService.masterOperator=In \
  --set spark.imagePullPolicy=Always \
  -n spark
```

## Deploy Datalayer Hub

```bash
cd $DLAHOME/repos/jupyterhub-k8s
export DOCKER_REPO=localhost:5000
echo """
hub:
  image:
    name: $DOCKER_REPO/hub
    tag: 0.0.1
  imagePullPolicy: Always
  extraEnv:
    JUPYTER_ENABLE_LAB: 1
  extraConfig: |
    c.KubeSpawner.cmd = [\"jupyter-labhub\"]
auth:
  admin:
    users:
      - adminuser1
      - adminuser2
proxy:
  secretToken: \"$(openssl rand -hex 32)\"
  chp:
    image:
      name: $DOCKER_REPO/hub-http-proxy
      tag: 0.0.1
    imagePullPolicy: Always
prePuller:
  hook:
    image:
      name: $DOCKER_REPO/hub-image-awaiter
      tag: 0.0.1
    imagePullPolicy: Always
singleuser:
  networkTools:
    image:
      name: $DOCKER_REPO/hub-network-tools
      tag: 0.0.1
    imagePullPolicy: Always
  defaultUrl: \"/lab\"
  image:
    name: $DOCKER_REPO/hub-jupyterlab
    tag: 0.0.1
  imagePullPolicy: Always
  cpu:
    limit: .5
    guarantee: .5
  memory:
    limit: 200M
    guarantee: 200M
  lifecycleHooks:
    postStart:
      exec:
        command: [\"gitpuller\", \"https://github.com/data-8/materials-fa17\", \"master\", \"materials-fa\"]
  storage:
    capacity: 10Mi
cull:
  podCuller:
    image:
      name: $DOCKER_REPO/hub-pod-culler
      tag: 0.0.1
    imagePullPolicy: Always
""" > ./datalayerhub-config.yaml
helm install ./jupyterhub \
  --name=datalayerhub \
  --namespace=datalayerhub \
  --timeout=99999 \
  -f datalayerhub-config.yaml
# kubectl get pods -n datalayerhub
# kubectl get svc -n datalayerhub
# minikube -n datalayerhub service proxy-public --url
open $(minikube -n datalayerhub service proxy-public --url)
```

## Iterative Development

```bash
cd $DLAHOME/repos/jupyterhub
python setup.py sdist upload -r pypi
```

```bash
cd $DLAHOME/repos/jupyterhub
python setup.py sdist && cp dist/datalayerhub-0.9.1.dev0.tar.gz $DLAHOME/repos/jupyterhub-k8s/images/hub
```

```bash
cd $DLAHOME/repos/jupyterlab-hub
yarn install && yarn build
npm login
npm publish --access=public
```

```bash
cd $DLAHOME/repos/jupyterhub-k8s/images/hub
docker build -t datalayer/hub:0.0.1 . && docker tag datalayer/hub:0.0.1 localhost:5000/hub:0.0.1 && docker push localhost:5000/hub:0.0.1
```

```bash
cd $DLAHOME/repos
tar cvfz $DLAHOME/repos/datalayer-docker/hub-jupyterlab/jupyterlab-datalayer.tgz jupyterlab-datalayer
cd $DLAHOME/repos/datalayer-docker/hub-jupyterlab
docker build -t datalayer/hub-jupyterlab:0.0.1 . && docker tag datalayer/hub-jupyterlab:0.0.1 localhost:5000/hub-jupyterlab:0.0.1 && docker push localhost:5000/hub-jupyterlab:0.0.1
minikube ssh docker pull localhost:5000/hub-jupyterlab:0.0.1
```

```bash
cd $DLAHOME/repos/jupyterhub-k8s
helm delete datalayerhub --purge
helm install ./jupyterhub \
  --name=datalayerhub \
  --namespace=datalayerhub \
  --timeout=99999 \
  -f datalayerhub-config.yaml
open $(minikube -n datalayerhub service proxy-public --url)
```

```bash
cd $DLAHOME/repos/jupyterlab-datalayer
yarn watch
cd $DLAHOME/repos/jupyterlab
jupyter lab --watch
jupyter lab --dev-mode --watch
```
