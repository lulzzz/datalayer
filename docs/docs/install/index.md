---
title: Install
redirect_from:
- "/docs/quick-start"
---

{% capture overview %}

**Quick Start the Datalayer Science Platform on AWS in 10 minutes.**

{% endcapture %}

{% capture prerequisites %}

Check that you understand and have the following requirements.

* AWS or Azure account with credentials.
* A Linux platform connected to the Internet (This can be your laptop or a server in the cloud) with the following software:
  * [Git](https://git-scm.com/downloads) installed and configured.
  * [Golang](https://golang.org/dl) installed and configured.
  * [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-binary-via-curl) installed and configured.
  * [Helm](https://github.com/kubernetes/helm/releases) installed and configured.

{% endcapture %}

{% capture steps %}

## Deploy K8S

From your Linux laptop run the following.

{% capture cloud_aws %}

```shell
# Define your valid AWS Credentials
export AWS_ACCESS_KEY_ID=<your-aws-key-id>
export AWS_SECRET_ACCESS_KEY=<your-aws-key-secret>
```

{% endcapture %}

{% capture cloud_azure %}

```shell
# Define your valid Azure Credentials
export ...
```

{% endcapture %}

{% assign tab_set_name = "cloud" %}
{% assign tab_names = "AWS;Azure" | split: ';' | compact %}
{% assign tab_contents = site.emptyArray | push: cloud_aws | push: cloud_azure %}

{% include tabs.md %}

```shell
git clone https://github.com/datalayer/datalayer-pilot
cd kuber
go build
kuber create kuber -p aws -z us-west-2 # eu-central-1 also supported.
kuber apply kuber -v 4
```

Check the cluster is running.

```shell
watch kubectl get nodes; watch kubectl get pods --all-namespaces
```

This will give the list of nodes and then the list pods (there will be DNS, Calico as the Tiller pods for Helm).

```
NAME                                         STATUS    ROLES     AGE       VERSION
ip-10-0-0-62.us-west-2.compute.internal      Ready     master    1h        v1.9.2
ip-10-0-100-173.us-west-2.compute.internal   Ready     <none>    59m       v1.9.2
ip-10-0-100-227.us-west-2.compute.internal   Ready     <none>    59m       v1.9.2
ip-10-0-100-68.us-west-2.compute.internal    Ready     <none>    59m       v1.9.2
```

```
NAMESPACE     NAME                                                              READY     STATUS    RESTARTS   AGE
kube-system   calico-etcd-ck42p                                                 1/1       Running   0          1h
kube-system   calico-node-5sn7b                                                 2/2       Running   1          1h
kube-system   calico-node-6p26w                                                 2/2       Running   1          1h
kube-system   calico-node-gxw5b                                                 2/2       Running   0          1h
kube-system   calico-node-sgjpd                                                 2/2       Running   0          1h
kube-system   calico-policy-controller-7985d9cc6f-w9d8q                         1/1       Running   0          1h
kube-system   etcd-ip-10-0-0-62.us-west-2.compute.internal                      1/1       Running   0          59m
kube-system   kube-apiserver-ip-10-0-0-62.us-west-2.compute.internal            1/1       Running   0          59m
kube-system   kube-controller-manager-ip-10-0-0-62.us-west-2.compute.internal   1/1       Running   0          59m
kube-system   kube-dns-545bc4bfd4-7w6z8                                         3/3       Running   0          1h
kube-system   kube-proxy-6mtgq                                                  1/1       Running   0          1h
kube-system   kube-proxy-c68c9                                                  1/1       Running   0          1h
kube-system   kube-proxy-tgxhx                                                  1/1       Running   0          1h
kube-system   kube-proxy-z4q67                                                  1/1       Running   0          1h
kube-system   kube-scheduler-ip-10-0-0-62.us-west-2.compute.internal            1/1       Running   0          59m
kube-system   tiller-deploy-546cf9696c-9k9bk                                    1/1       Running   0          58m
```

## Deploy Monitoring Applications

Deploy the dashboard (ensure you have the [Helm client available](https://github.com/kubernetes/helm/releases)).

```shell
git clone https://github.com/datalayer/helm-charts
cd helm-charts
./kuber.sh heapster
./kuber.sh k8s-dashboard
```

Launch a K8s proxy in another terminal to have easy access to the services.

```shell
kubectl proxy
```

Check the [Dashboard](http://localhost:8001/api/v1/namespaces/kube-system/services/http:k8s-dashboard-kubernetes-dashboard:/proxy/#!/overview?namespace=_all).

## Add User Applications

```shell
./kuber.sh hdfs
./kuber.sh spark
./kuber.sh spitfire
./kuber.sh explorer
```

For more control on the deployed applications, read the [Application section of Pilot documentation](/docs/pilot/apps).

For example [browse the Spitfire Notebook](http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:8080/proxy). Optionally, to connect without proxy, you can get the URL of the Notebook from the AWS Load Balancer.

```shell
kubectl describe services spitfire-lb | grep Ingress
```

## Terminate

To teminate the Cluster, run the following command.

```shell
kuber delete kuber -v 4 --purge
```

{% endcapture %}

{% include templates/task.md %}
