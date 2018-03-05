---
title: Release Plan
---

Here is our `Release Plan` which may evolve at any time (no commitment.

You can track the progress on our [Twitter account](https://twitter.com/datalayerio) or on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 1.0.0 Alexandria

+ Scratchpad Sidebar: Editor + Variables List + Number of Spark Executors
+ Microsoft Auth: Contacts + Screenshot to OneNote
+ Rename ws* to spitfire*
+ Commit Notebook
+ Spark Cold Start: Interpreter Start Timeout + First Run after Node Restart
+ Per-User Interpreter Settings

## 1.1.0 Mystic

+ HDFS State
+ Allow to Scale Up/Down Cluster Size to a certain extent based on Configuration and License Limits
+ HDFS Pods View and Volumes View
+ Horizontal + Vertical Layout Toggle for Note Editor
+ Scrollable Paragraph List on Note Editor
+ Do not Change Past Reservations
+ Delete Reservations
+ User Reservation History and Analysis View
+ Budget View
+ Reconnecting WebSocket
+ Create, Search and Reuse Snippets
+ Reservation Color per User in Calendar View
+ KuberDog on micro instance or Docker to create, manage and monitor (sleep/wakeup) the Cluster
+ Notify Cluster up/down via UI Message and Email
+ Run only on Active Reservations
+ Define Home Page in Settings
+ README View
+ RELEASE_NOTES View
+ Integrate kuber.sh into Kuber binary [seed, join, scale, pause, hibernate, delete]
+ kuber create --name my-kuber --num-workers 3 --cloud aws --auth twitter - apps hdfs,spark,spitfire,kuber-ui (parameter description http://docs.datalayer.io/docs/kuber 
+ Automatically clone the repo you give on the notebook with --repo...)

## 1.2.0 Atlas

+ Dataset View
+ Dataset Wrangle
+ Workspace View
+ Notes Permissions View
+ Golang check for SSL on HTTP request
+ Ensure HDFS Locality
+ Better manage the spitfire shared secret
+ Publish to User Timeline
+ Publish, Search and Load Book in Library
+ Ensure cloud resource are fully cleaned on deletion
+ Sudio local Docker connecting to Remote Cluster
+ Resource Reservation per User + Reports
+ Solr Application
+ HBase Application
+ Library
+ datalayer-contrib kubicorn branch (for AWS EIP address)
```
vendor/github.com/kris-nova/kubicorn/cloud/amazon/public/resources/launchconfiguration.go 			
            logger.Debug("Attempting to lookup master IP for node registration..")
 			input := &ec2.DescribeInstancesInput{
 				Filters: []*ec2.Filter{
					{
						Name:   S("tag:Cost"),
						Values: []*string{S("kuber")},
					},
 					{
 						Name:   S("tag:Name"),
 						Values: []*string{S(fmt.Sprintf("%s.master", immutable.Name))},
```

## 2.0.0 Terminator

+ IPFS Application
+ Etcd Application
+ Import / Export Notes and Notebooks (Zeppelin + Jupyter formats)
+ Enable SSL on Load Balancers
+ Workspace Functions
+ Join AWS VPC
+ Join Local Nodes

## 2.1.0 Sylvidra

+ Github Auth
+ Support Jupyter ipywidgets
+ Support R htmlwidgets
+ Support React.js application packages
+ SSH from Plane to Pods
+ Reservatio no-show-up + terminate-on-no-activity

## 2.3.0

+ Datalayer.ai Widgets
+ Notes as a REST

## 2.4.0

+ Integrate Airflow
+ Visual Scheduler
+ HDFS Locality

## 2.5.0

+ Publish to Twitter
+ Publish to OneNote
+ Follow User
+ User Timeline
+ Microsoft Auth

## 2.6.0

+ Tensorflow Application
+ Kerberos HDFS

## 2.7.0

+ Notes PR with Diff
+ Kuber UI Secrets

## 3.0.0

+ Notes Authorization
+ HDFS Treemap View

## 3.1.0

+ Reuse K8S IAM and RBAC
+ JWT Security

## 3.2.0

+ Cost Compensation
+ Notes Metrics (Resource Usage, Time)

## 4.0.0

+ Master HA
+ Multi K8S Cluster
+ Multi Clusters
+ Multi Notebooks
+ Multi Datasets
+ Multiple HDFS with cluster-id
+ Support Azure

## 5.0.0

+ Apps Market
+ Test lower case viper.BindPFlag("microsoftredirect", serverCmd.PersistentFlags().Lookup("microsoft-redirect"))? 
+ Reuse as much as possible of k8s-dashboard source code
+ Benchmark Performance
+ Revisit this.xxx = window['xxx']
+ Support IPython Kernels
+ Jupyter Application
+ R (RStudio, Shiny and Sparklyr) Application
