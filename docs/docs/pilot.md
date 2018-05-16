---
title: Pilot
---

Pilot is plain Kubernetes, simple. It will help you create and manage your K8S cluster in the cloud and deploy applications for your Big Data Science projects.

We support for now [https://aws.amazon.com](Amazon Cloud). Read our [Release Plan](/docs/releases) to know more on other cloud support.

The [Pilot](https://github.com/datalayer/datalayer-pilot) repository contains the source code to run the REST server endpoints.

We distinguish `Pilot CLI` which is the command line interface to operate the K8S cluster and its applications from `Pilot UI` is the WEB user interface to operate the K8S cluster and its applications.

Before using `Kuber`, setup your `AWS` environment with the needed AWS credentials via environement variables.

```shell
export AWS_ACCESS_KEY_ID=<your-aws-key-id>
export AWS_SECRET_ACCESS_KEY=<your-aws-key-secret>
```

Optionaly, you can persist those credentials in your home folder (`~/.aws/credentials` and `~/.aws/config`).

```console
# ~/.aws/credentials
[kuber]
aws_access_key_id=<your-aws-key-id>
aws_secret_access_key=<your-aws-key-secret>
```

```console
# ~/.aws/config
[default]
region = us-west-2
```

From your Linux laptop (with [Git](https://git-scm.com/downloads), [Golang](https://golang.org/dl), [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-binary-via-curl) and [Helm](https://github.com/kubernetes/helm/releases) available), run the following.

```shell
git clone https://github.com/datalayer/datalayer-pilot
cd kuber
go build
kuber create kuber -p aws -z us-west-2 # eu-central-1 is also supported.
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

You must have a [Helm client available](https://github.com/kubernetes/helm/releases) to deploy applications.

For a snapshot version of the Datalayer helm charts, clone the Datalayer `helm-charts` repository.

```shell
git clone https://github.com/datalayer/helm-charts.git helm-charts
cd helm-charts
```

For a release version of the Datalayer helm charts, just add the Datalayer Helm chart repository (for now, we strongly recommend to use the latest and greates snapshots).

```shell
helm repo add datalayer http://helm-charts.datalayer.io
```

Deploy the dashboard (ensure you have the [Helm client available](https://github.com/kubernetes/helm/releases)).

```shell
./kuber.sh heapster
./kuber.sh k8s-dashboard
```

Launch a K8s proxy in another terminal to have easy access to the services.

```shell
kubectl proxy
```

[Check the Dashboard](http://localhost:8001/api/v1/namespaces/kube-system/services/http:k8s-dashboard-kubernetes-dashboard:/proxy/#!/overview?namespace=_all).

Deploy more applications.

```shell
./kuber.sh hdfs
./kuber.sh spark
./kuber.sh spitfire
./kuber.sh kuber-ui
```

For more control on the deployed applications, read the [Application section of Pilot documentation](/docs/pilot-apps).

For example [browse the Spitfire Notebook](http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:8080/proxy). Optionally, to connect without proxy, you can get the URL of the Notebook from the AWS Load Balancer.

```shell
kubectl describe services spitfire-lb | grep Ingress
```

Delete the cluster.

```shell
kuber delete kuber -v 4 --purge
```

![Pilot](/images/datalayer/datalayer-pilot.svg "Kuber")
