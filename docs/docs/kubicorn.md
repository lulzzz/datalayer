[![Datalayer](http://datalayer.io/enterprise/img/logo-datalayer-horizontal.png)](http://datalayer.io)

# Build and Install

```
go get github.com/kubicorn/kubicorn
```

```
cd $GOPATH/src/github.com/kubicorn/kubicorn
make clean
make
make install
# go install github.com/kubicorn/kubicorn
kubicorn version
kubicorn
```

# Usage

```
cd ~/.datalayer/kubicorn
kubicorn create kuber -p aws
# vi _state/pilot-cluster.yaml
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxx
# kubicorn apply kuber -v 4 --aws-profile kuber
kubicorn apply kuber -v 4
watch kubectl get nodes; watch kubectl get pods --all-namespaces
```

```
ssh -i ~/.ssh/id_rsa ubuntu@<master>
sudo su
cat /var/lib/cloud/instance/scripts/part-001
cat /etc/kubicorn/cluster.json
cat /var/log/cloud-init.log
cat /var/log/cloud-init-output.log
cat /etc/kubicorn/kubeadm-config.yaml
cat /run/cloud-init/result.json 
```

```
systemctl restart kubelet
journalctl -fu kubelet
docker ps
```

```
mkdir ~/.kube
cp /etc/kubernetes/admin.conf ~/.kube/config
alias k=kubectl
# export KUBECONFIG=/etc/kubernetes/kubelet.conf
export KUBECONFIG=/etc/kubernetes/admin.conf
kubectl get pods --all-namespaces
kubectl get svc --all-namespaces
```

```
export AWS_ACCESS_KEY_ID=xxx
export AWS_SECRET_ACCESS_KEY=xxxx
cd ~/.datalayer/kubicorn
kubicorn delete kuber -v 4 --purge
```

# AWS IAM Cleanup

```
aws iam list-roles | grep Kubicorn
aws iam list-instance-profiles | grep Kubicorn
```

```
# Delete Master defined IAM objects
aws iam list-instance-profiles-for-role --role-name kuber-KubicornMasterRole
aws iam list-role-policies --role-name kuber-KubicornMasterRole
aws iam remove-role-from-instance-profile --instance-profile-name kuber-KubicornMasterInstanceProfile --role-name kuber-KubicornMasterRole
aws iam delete-role-policy --role-name kuber-KubicornMasterRole --policy-name MasterPolicy
aws iam delete-role --role-name kuber-KubicornMasterRole
aws iam delete-instance-profile --instance-profile-name kuber-KubicornMasterInstanceProfile
# Delete Worker defined IAM objects
aws iam list-instance-profiles-for-role --role-name kuber-KubicornNodeRole
aws iam list-role-policies --role-name kuber-KubicornNodeRole
aws iam remove-role-from-instance-profile --instance-profile-name kuber-KubicornNodeInstanceProfile --role-name kuber-KubicornNodeRole
aws iam delete-role-policy --role-name kuber-KubicornNodeRole --policy-name NodePolicy
aws iam delete-role --role-name kuber-KubicornNodeRole
aws iam delete-instance-profile --instance-profile-name kuber-KubicornNodeInstanceProfile
```

# Issues

```
journalctl -fu kubelet
-- Logs begin at Tue 2017-12-26 03:59:24 UTC. --
Dec 26 04:07:49 ip-10-0-100-98 kubelet[3531]: E1226 04:07:49.683946    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:49 ip-10-0-100-98 kubelet[3531]: E1226 04:07:49.685690    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:49 ip-10-0-100-98 kubelet[3531]: E1226 04:07:49.687386    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:49 ip-10-0-100-98 kubelet[3531]: E1226 04:07:49.689091    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:49 ip-10-0-100-98 kubelet[3531]: E1226 04:07:49.689105    3531 kubelet_node_status.go:375] Unable to update node status: update node status exceeds retry count
Dec 26 04:07:51 ip-10-0-100-98 kubelet[3531]: E1226 04:07:51.283328    3531 eviction_manager.go:238] eviction manager: unexpected err: failed to get node info: node "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:51 ip-10-0-100-98 kubelet[3531]: W1226 04:07:51.355267    3531 cni.go:171] Unable to update cni config: No networks found in /etc/cni/net.d
Dec 26 04:07:51 ip-10-0-100-98 kubelet[3531]: E1226 04:07:51.355597    3531 kubelet.go:2105] Container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:docker: network plugin is not ready: cni config uninitialized
Dec 26 04:07:56 ip-10-0-100-98 kubelet[3531]: W1226 04:07:56.356430    3531 cni.go:171] Unable to update cni config: No networks found in /etc/cni/net.d
Dec 26 04:07:56 ip-10-0-100-98 kubelet[3531]: E1226 04:07:56.356543    3531 kubelet.go:2105] Container runtime network not ready: NetworkReady=false reason:NetworkPluginNotReady message:docker: network plugin is not ready: cni config uninitialized
Dec 26 04:07:59 ip-10-0-100-98 kubelet[3531]: E1226 04:07:59.691063    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:59 ip-10-0-100-98 kubelet[3531]: E1226 04:07:59.692924    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:59 ip-10-0-100-98 kubelet[3531]: E1226 04:07:59.694614    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:59 ip-10-0-100-98 kubelet[3531]: E1226 04:07:59.696288    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:59 ip-10-0-100-98 kubelet[3531]: E1226 04:07:59.697971    3531 kubelet_node_status.go:383] Error updating node status, will retry: error getting node "ip-10-0-100-98.us-west-2.compute.internal": nodes "ip-10-0-100-98.us-west-2.compute.internal" not found
Dec 26 04:07:59 ip-10-0-100-98 kubelet[3531]: E1226 04:07:59.697986    3531 kubelet_node_status.go:375] Unable to update node status: update node status exceeds retry count
```

```
2017-12-27T14:17:50+01:00 [▶]  instanceprofile.Actual
2017-12-27T14:17:50+01:00 [▶]  instanceprofile.Render
2017-12-27T14:17:50+01:00 [▶]  instanceprofile.Expected kuber-KubicornMasterInstanceProfile
2017-12-27T14:17:50+01:00 [▶]  instanceprofile.Render
2017-12-27T14:17:50+01:00 [▶]  instanceprofile.Apply
2017-12-27T14:17:50+01:00 [▶]  Actual   : b68edaa4755377d4c893ebe631cbc714
2017-12-27T14:17:50+01:00 [▶]  Expected : c3bb9f2a0247aab267319ef8782b0018
2017-12-27T14:17:50+01:00 [▶]  Actual: &resources.InstanceProfile{Shared:resources.Shared{Identifier:"", Name:"kuber-KubicornMasterInstanceProfile", Tags:map[string]string{"Name":"kuber-KubicornMasterInstanceProfile", "KubernetesCluster":"kuber"}}, Role:(*resources.IAMRole)(nil), ServerPool:(*cluster.ServerPool)(0xc420426000)}
2017-12-27T14:17:50+01:00 [▶]  Expectd: &resources.InstanceProfile{Shared:resources.Shared{Identifier:"", Name:"kuber-KubicornMasterInstanceProfile", Tags:map[string]string{"Name":"kuber-KubicornMasterInstanceProfile", "KubernetesCluster":"kuber"}}, Role:(*resources.IAMRole)(0xc42030be00), ServerPool:(*cluster.ServerPool)(0xc420426000)}
2017-12-27T14:17:51+01:00 [▶]  CreateInstanceProfile error: EntityAlreadyExists: Instance Profile kuber-KubicornMasterInstanceProfile already exists.
	status code: 409, request id: 571bb9b4-eb08-11e7-bfc2-43249145fc04
2017-12-27T14:17:51+01:00 [▶]  Resetting TimeOut counter.
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x18 pc=0xbc3f7b]

goroutine 1 [running]:
github.com/kris-nova/kubicorn/cloud/amazon/public/resources.(*InstanceProfile).Apply(0xc4204a21c0, 0x1c01580, 0xc42030bd80, 0x1c01580, 0xc42030bdc0, 0xc42036a820, 0x0, 0x1c015c0, 0xc4201edaa0, 0x0, ...)
	/src/go/src/github.com/kris-nova/kubicorn/cloud/amazon/public/resources/instanceprofile.go:190 +0x41b
github.com/kris-nova/kubicorn/cloud.(*AtomicReconciler).Reconcile(0xc4201a4b00, 0xc42036b040, 0xc4202111e0, 0xc42036a820, 0x0, 0x0)
	/src/go/src/github.com/kris-nova/kubicorn/cloud/atomic_reconciler.go:120 +0x3c9
github.com/kris-nova/kubicorn/cmd.RunApply(0x1c52180, 0x591cd0, 0xc42053fca8)
	/src/go/src/github.com/kris-nova/kubicorn/cmd/apply.go:176 +0x835
github.com/kris-nova/kubicorn/cmd.ApplyCmd.func1(0xc420285200, 0xc420087bd0, 0x1, 0x5)
	/src/go/src/github.com/kris-nova/kubicorn/cmd/apply.go:62 +0x72
github.com/kris-nova/kubicorn/vendor/github.com/spf13/cobra.(*Command).execute(0xc420285200, 0xc420087b80, 0x5, 0x5, 0xc420285200, 0xc420087b80)
	/src/go/src/github.com/kris-nova/kubicorn/vendor/github.com/spf13/cobra/command.go:750 +0x2c1
github.com/kris-nova/kubicorn/vendor/github.com/spf13/cobra.(*Command).ExecuteC(0x1c4af20, 0xefe243, 0x131939d, 0x4)
	/src/go/src/github.com/kris-nova/kubicorn/vendor/github.com/spf13/cobra/command.go:831 +0x30e
github.com/kris-nova/kubicorn/vendor/github.com/spf13/cobra.(*Command).Execute(0x1c4af20, 0x0, 0x9ea)
	/src/go/src/github.com/kris-nova/kubicorn/vendor/github.com/spf13/cobra/command.go:784 +0x2b
github.com/kris-nova/kubicorn/cmd.Execute()
	/src/go/src/github.com/kris-nova/kubicorn/cmd/root.go:86 +0x31
main.main()
	/home/datalayer/src/k8s/kubicorn/main.go:22 +0x20
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
curl https://raw.githubusercontent.com/datalayer/pilot-master/_specs/aws/kuber-aws-master -o /usr/local/bin/kuber-aws-master
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
curl https://raw.githubusercontent.com/datalayer/pilot-master/_specs/aws/kuber-aws-join -o /usr/local/bin/kuber-aws-join 
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
