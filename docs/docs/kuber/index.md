---
title: Kuber
---

Kuber is plain Kubernetes, simple. It will help you create and manage your K8S cluster in the cloud and deploy applications for your Big Data Science projects.

We support for now [https://aws.amazon.com](Amazon Cloud). Read our [Release Plan](/docs/releases) to know more on other cloud support.

The [Kuber](https://github.com/datalayer/kuber) repository contains the source code to run the REST server endpoints.

Before using Kuber, setup your AWS environment with the needed AWS credentials via environement variables.

```shell
export AWS_ACCESS_KEY_ID=<your-aws-key-id>
export AWS_SECRET_ACCESS_KEY=<your-aws-key-secret>
```

Optionaly, you can persist those credentials in your home folder (`~/.aws/credentials` and `~/.aws/config`).

```console
# ~/.aws/credentials
[kuber-rest]
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
git clone https://github.com/datalayer/kuber
cd kuber
go build
kuber create kuber -p aws -z us-west-2 # eu-central-1 also supported.
kuber apply kuber -v 4
```

Check the cluster is running.

```shell
watch kubectl get nodes; watch kubectl get pods --all-namespaces;
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
kube-system   heapster-heapster-5dcd888f86-d5m5p                                2/2       Running   0          58m
kube-system   k8s-dashboard-kubernetes-dashboard-79846f6966-s9h64               1/1       Running   0          58m
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
./kuber-app heapster
./kuber-app k8s-dashboard
```

Launch a K8s proxy in another terminal to have easy access to the services.

```shell
kubectl proxy
```

[Check the Dashboard](http://localhost:8001/api/v1/namespaces/kube-system/services/http:k8s-dashboard-kubernetes-dashboard:/proxy/#!/overview?namespace=_all).

Deploy more applications.

```shell
./kuber-app hdfs
./kuber-app spark
./kuber-app spitfire
./kuber-app kuber-plane
```

For more control on the deployed applications, read the [Application section of Kuber documentation](/docs/kuber).

For example [browse the Spitfire Notebook](http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:8080/proxy). Optionally, to connect without proxy, you can get the URL of the Notebook from the AWS Load Balancer.

```shell
kubectl describe services spitfire-lb | grep Ingress
```

Delete the cluster.

```shell
kuber delete kuber -v 4 --purge
```

<!--
## Deprecated

This are the steps to deploy your development (unsecure) Kubernetes cluster on Amazon with AWS EC2.

We assume you have the needed PVC and network available in your availabilty zone (e.g. `us-west-2`).

You also need a IAM role setup with the correct profile (see at the bottom of this page).

**Create Master**

Deploy a master EC2 machine based on the Ubuntu image `ami-835b4efa` with size `c3.4xlarge` (16vCPU with 30 GB RAM). Ensure you have 32 GB as root storage and open the security group.

To allow reuse on shutdown, associate an fixed Elastic IP to the machine.

Connect with `ssh` to the machine and run the following commands.

```
sudo su
cd
curl https://raw.githubusercontent.com/datalayer/kuber/master/_specs/aws/kuber-aws-master -o /usr/local/bin/kuber-aws-master
chmod +x /usr/local/bin/kuber-aws-master
kuber-aws-master
```

Take note of the printed kubeadm command, e.g:

```
kubeadm join --token ed5ef9.6c35783ca6cb8994 52.88.44.52:433 --discovery-token-ca-cert-hash sha256:927f1dbe79dac89514ada952a5d283af45e695ddaf5d2c9020d52fa28edb36cb
```

**Join Workers**

Create workers based on the image `ami-4f0ad337` with size `c3.4xlarge`.

If you prefer spot instances, choose the size `r3.4xlarge`:

+ Set the maximum price to e.g. `0.4$`.
+ Select `persistent-request`.
+ Set the IAM role.
+ Define the worker security group.

To setup you worker instance from any other image, follow these steps:

```
sudo su
cd
curl https://raw.githubusercontent.com/datalayer/kuber/master/_specs/aws/kuber-aws-join -o /usr/local/bin/kuber-aws-join 
chmod +x /usr/local/bin/kuber-aws-join
kuber-aws-join
```

**Minimum IAM Profile**

```
{
    "Version": "2012-10-17",
    "Statement": {
        "Effect": "Allow",
        "Action": [
            "autoscaling:CreateAutoScalingGroup",
            "autoscaling:CreateLaunchConfiguration",
            "autoscaling:CreateOrUpdateTags",
            "autoscaling:DeleteAutoScalingGroup",
            "autoscaling:DeleteLaunchConfiguration",
            "autoscaling:DescribeAutoScalingGroups",
            "autoscaling:DescribeLaunchConfigurations",
            "autoscaling:UpdateAutoScalingGroup",
            "ec2:AssociateRouteTable",
            "ec2:AttachInternetGateway",
            "ec2:AuthorizeSecurityGroupIngress",
            "ec2:CreateInternetGateway",
            "ec2:CreateRoute",
            "ec2:CreateRouteTable",
            "ec2:CreateSecurityGroup",
            "ec2:CreateSubnet",
            "ec2:CreateTags",
            "ec2:CreateVpc",
            "ec2:DeleteInternetGateway",
            "ec2:DeleteRouteTable",
            "ec2:DeleteSecurityGroup",
            "ec2:DeleteSubnet",
            "ec2:DeleteTags",
            "ec2:DeleteVpc",
            "ec2:DescribeInstances",
            "ec2:DescribeInternetGateways",
            "ec2:DescribeRouteTables",
            "ec2:DescribeSecurityGroups",
            "ec2:DescribeSubnets",
            "ec2:DescribeVpcs",
            "ec2:DetachInternetGateway",
            "ec2:DisassociateRouteTable",
            "ec2:ImportKeyPair",
            "ec2:ModifyVpcAttribute",
            "ec2:RunInstances",
            "ec2:TerminateInstances",
            "iam:AddRoleToInstanceProfile",
            "iam:CreateInstanceProfile",
            "iam:CreateRole",
            "iam:DeleteInstanceProfile",
            "iam:DeleteInstanceProfile",
            "iam:DeleteRole",
            "iam:DeleteRolePolicy",
            "iam:GetInstanceProfile",
            "iam:GetRolePolicy",
            "iam:ListRolePolicies",
            "iam:PassRole",
            "iam:PutRolePolicy",
            "iam:RemoveRoleFromInstanceProfile"
        ],
        "Resource": "*"
    }
}

```
-->