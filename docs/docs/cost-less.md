---
title: Cost-Less
redirect_from:
- "/docs/pilot-cost-hibernation"
---

You want to retrieve all the configuration and dataset you have created before pausing the cluster to avoid costs. Pilot offers this powerfull feature called `Resource Control`.

You can spare until 75% of your cloud costs with a correct allocation of resources. Contact us to know more.

![Scale Workers](/images/datalayer/scale-workers.png "Scale Workers")

First of all, you are free to use AWS normal instances or cheaper Spot requests instances. Once you decide to pause, simply set the number of workers to 0 (via the AWS management console or via Pilot UI). You can even stop the master and start it again when you need it as Pilot has assigned a fixed IP address from the available EIP (Elastic IP) pool.

Bump back the number of worker to the number you want, and by magic, the HDFS file system will reappear just like you left it a few days ago, but this time with brand new virtual machines. For you, as a user, you don't see the difference.

![AWS AutoScaling](/images/aws/aws-autoscaling.png "AWS AutoScaling")

## Future Plans

We will introduce `Cost Compensation` to build a Community of workers backed by beautiful Notebooks, Spark and HDFS.

+ The more cloud resource your share, the more quota you will have to run your data processing. 
+ And last but not least, we favor good analysts: the more `Stars` you get, the more quota you will have.

![Cost Compensation](/images/datalayer/cost-compensation.svg "Cost Compensation")
