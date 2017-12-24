---
title: Kuber
---

Kuber is plain Kubernetes, simple.

It will help you create and manage your K8S cluster.

## Kuber on Amazon AWS

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
curl https://raw.githubusercontent.com/datalayer/kuber/master/specs/aws/kuber-aws-join -o /usr/local/bin/kuber-aws-join 
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

## Kuber Server

The [datalayer/kuber](https://github.com/datalayer/kuber) repository contains the source code to run the REST server endpoints for `Kuber`.

Before running it, setup your environment with the needed AWS credentials in the `~/.aws/config` and `~/.aws/credentials`, for example:

~/.aws/config

```
[default]
region = us-west-2
```

~/.aws/credentials

```
[kuber-rest]
aws_access_key_id=...
aws_secret_access_key=...
```
