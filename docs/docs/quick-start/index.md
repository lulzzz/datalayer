---
title: Quick Start
---

Quick Start the Datalayer Science Platform on AWS.

From your Linux laptop (with [Git](https://git-scm.com/downloads), [Golang](https://golang.org/dl), [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-binary-via-curl) and [Helm](https://github.com/kubernetes/helm/releases) available), run the following.

```shell
# Define your valid AWS Credentials
export AWS_ACCESS_KEY_ID=<your-aws-key-id>
export AWS_SECRET_ACCESS_KEY=<your-aws-key-secret>
```

```shell
git clone https://github.com/datalayer/kuber
cd kuber
go build
kuber create kuber -p aws
kuber apply kuber -v 4
```

Check the cluster is running.

```shell
watch kubectl get nodes; watch kubectl get pods --all-namespaces;
```

Launch a K8s proxy in another terminal to have easy access to the services.

```shell
kubectl proxy
```

Check the Dashboard.

```shell
open  http://localhost:8001/api/v1/namespaces/kube-system/services/http:k8s-dashboard-kubernetes-dashboard:/proxy/#!/overview?namespace=_all
```

Deploy the applications.

```shell
git clone https://github.com/datalayer/helm-charts
cd helm-charts
./deploy-charts.sh hdfs
./deploy-charts.sh spitfire
./deploy-charts.sh kuber-plane
```

Browse the Notebook.

```
open http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:8080/proxy
```

...or get the URL from the AWS Load Balancer

```shell
URL=$(kubectl describe services spitfire-lb | grep Ingress)
```

Delete the cluster.

```shell
kuber delete kuber -v 4 --purge
```
