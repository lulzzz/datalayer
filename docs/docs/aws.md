---
title: Amazon AWS
---

## Install

```bash
apk add --no-cache curl
apk -Uuv add groff less python py-pip
pip install awscli
# apk --purge -v del py-pip
# rm /var/cache/apk
```

## Credentials

```bash
aws configure
aws configure list
```

```bash
# vi ~/.aws/credentials
[default]
aws_access_key_id=xxx
aws_secret_access_key=xxxxxx

[datalayer]
aws_access_key_id=xxx
aws_secret_access_key=xxxxxx
```

```bash
# vi ~/.aws/config 
[default]
region=eu-central-1

[kuber]
region=eu-central-1
```

# IAM Certificates

```bash
openssl version
openssl genrsa 2048 > privatekey.pem
openssl req -new -key privatekey.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey privatekey.pem -out server.crt
aws iam list-server-certificates
```

```bash
aws acm import-certificate --certificate file://server.crt --private-key file://privatekey.pem --region eu-central-1
explorer arn:aws:acm:eu-central-1:345579675507:certificate/c920c5dd-184f-47a6-a62f-06c2be38655b
```

```
aws acm import-certificate --certificate file://server.crt --private-key file://privatekey.pem --region eu-central-1
```

## EC2

```
# master
Model	vCPU	CPU Credits / hour Mem (GiB)	 Storage
c3.4xlarge	16	30	2 x 160 <=
```

```
master: General Purpose
Model	vCPU	CPU Credits / hour Mem (GiB)	 Storage
t2.nano	1	3	0.5	EBS-Only
t2.micro	1	6	1	EBS-Only
t2.small	1	12	2	EBS-Only
t2.medium	2	24	4	EBS-Only
t2.large	2	36	8	EBS-Only
t2.xlarge	4	54	16	EBS-Only <=
t2.2xlarge	8	81	32	EBS-Only
```

```
worker: Memory Optimized
r4.2xlarge
Instance Type	vCPU	Memory (GiB)	 Storage (GB)	Networking Performance Physical Processor	Clock Speed (GHz)	Intel AVX†	Intel AVX2†	Intel Turbo	EBS OPT  Enhanced Networking 8 61 - Up to 10 Gigabit Intel Xeon E5-2686 v4 2.3 Yes Yes Yes Yes Yes
```

```
worker: Compute Optimized
Model	vCPU	Mem (GiB)	SSD Storage  (GB)
c3.large	2	3.75	2 x 16
c3.xlarge	4	7.5	2 x 40
c3.2xlarge	8	15	2 x 80
c3.4xlarge	16	30	2 x 160 <=
c3.8xlarge	32	60	2 x 320
```

```
Compute Optimized - Current Generation
c4.large	2	8	3.75	EBS Only	$0.1 per Hour
c4.xlarge	4	16	7.5	EBS Only	$0.199 per Hour
c4.2xlarge	8	31	15	EBS Only	$0.398 per Hour <???
c4.4xlarge	16	62	30	EBS Only	$0.796 per Hour
c4.8xlarge	36	132	60	EBS Only	$1.591 per Hour
```

```
Model 	vCPU 	Memory (GiB) 	Storage 	EBS Bandwidth
c5.large 	2 	4 	EBS Optimized 	Up to 2,250 Mbps
c5.xlarge 	4 	8 	EBS Optmized 	Up to 2,250 Mbps
c5.2xlarge 	8 	16 	EBS Optimized 	Up to 2,250 Mbps
c5.4xlarge 	16 	32 	EBS Optimized 	2,250 Mbps
c5.9xlarge 	36 	72 	EBS Optimized 	4,500 Mbps
c5.18xlarge 	72 	144 	EBS Optimized 	9,000 Mbps
```

```bash
INSTANCEID=`/usr/bin/curl -s http://169.254.169.254/latest/meta-data/instance-id`
echo $INSTANCEID
REGION=`curl http://169.254.169.254/latest/dynamic/instance-identity/document | grep region | awk -F\" '{print $4}'`
echo $REGION
```

```bash
# EIP
aws ec2 describe-instances --instance-ids ${INSTANCEID} --filter Name=tag:Cost,Values=kuber --region ${REGION}
# Check if instance has a public IP from Elastic pool assigned
aws ec2 describe-addresses --output text --region ${REGION} | grep ${INSTANCEID} | wc -l
```

```bash
# Autoscaling
export REGION=eu-central-1
aws autoscaling describe-auto-scaling-groups --region ${REGION} --auto-scaling-group-name kuber.node
aws autoscaling update-auto-scaling-group --auto-scaling-group-name kuber.node --min-size 0 --max-size 3 --desired-capacity 3 --region ${REGION}
```

```bash
ec2metadata
```

## EBS

When you boot an Amazon Linux EC2 instance it boots with a 8GB EBS volume. If you need more space you need to add additional drives. For this you need to use EBS volumes.

Before you start the process please have look at the current partition blocks loaded in your server. 
You can do so using the contents of partition file.

```bash
cat /proc/partitions
major minor  #blocks  name 
202        1    8388608 xvda1
```

Now you goto EBS volume manager in AWS console and create a new volume, make sure the zone is the same in which your EC2 instance is running. Once the volume is created you need to attach this to an instance. 

You can right click on the created volume and say attach. Select the instance then device will populate automatically, you can either leave it or change if you need specific device name.

Now check the partition file again. You can see a new device being added.

```bash
cat /proc/partitions
major minor  #blocks  name
202        1    8388608 xvda1
202      128   26214400 xvdb
```

The volume attached is not ready for use. It is like a new hard disk. You need to partition and format the same.  In our case we am going to use the full disk as one partition. So I am going to skip the fdisk setup and jumping right into formatting the volume.

```bash
sudo mkfs.ext4 /dev/xvdb
```

The format process can take few seconds just be patient. The drive is ready to use, and to do the same we need mount it.

```bash
sudo mkdir -m 000 /opt
echo "/dev/xvdb /opt auto noatime 0 0" | sudo tee -a /etc/fstab
sudo mount /opt
```
