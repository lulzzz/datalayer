---
title: Cost Hibernation
---

`Kuber` is particulary suited for exploration cases where you have to quickly spinup a Spark cluster with HDFS, scale it up and down and even put the number of worker to zero for a few days and stop the master.

Of course, you want to retrieve all the configuration and dataset you have created before pausing the cluster to avoid costs.

Kuber offers this powerfull feature that we call `Cost Hibernation`.

First of all, you are free to use AWS normal instances or cheaper Spot requests instances.

Once you decide to pause, simply set the number of workers to 0 (via the AWS management console or via Kuber Board).

You can even stop the master and start it again when you need it as Kuber has assigned a fixed IP address from the available EIP (Elastic IP) pool.

Bump back the number of worker to the number you want, and by magic, the HDFS file system will reappear just like you left it a few days ago, but this time with brand new virtual machines. For you, as a user, you don't see the difference.

![AWS AutoScaling](/images/aws/aws-autoscaling.png "AWS AutoScaling")