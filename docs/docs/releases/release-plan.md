---
title: Release Plan
---

Here is our `Release Plan` which may evolve at any time (no commitment... just track the progress on our [Twitter account](https://twitter.com/datalayerio) or on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 1.0.0 Alexandria

+ Ingress to Kuber and Spitfire
+ Interpreter Settings Restart
+ Fix Move Paragraph Bug
+ Note Results Attributes (State...) and Actions (Cancel..)
+ Manage and Display PROGRESS Message while Note is Running
+ Horizontal + Vertical Layout Toggle for Note Editor
+ Interpreter Settings View
+ Fix Spark cold start (Timeout + First run after node restart)
+ Reconnecting WebSocket
+ Spitfire per-User Interpreter Settings
+ Home page with Cluster Status + Spark REPL (Variables + Number of Spark Executors) + Last Note + Reservations (jaugue + action if no reservation) + Cluster capacity (Current number of nodes in visual way) + Interpreter Status
+ Status Header (Cluster + Interpreter + Spark REPL)
+ Allow to scale up/down the cluster size to a certain extend based on configuration
+ Show PENDING State as soon as Note is Running
+ Add Progress Bar while Note is Running
+ Sidebar with Variables List, Scratchpad, Number of Spark Executors
+ Scratchpad Sidepanel
+ Do not Change Past Reservations
+ Delete Reservations
+ User Reservation History and Analysis View
+ History Views with Commit
+ Scrollable Paragraph List on Note Editor
+ Clone Note

## 1.1.0 Mystic

+ Create, Search and Reuse Snippets
+ Reservation Color per User in Calendar View
+ Kuber controller on micro instance to wakeup the Master
+ Notify Cluster up/down via UI Message and Email
+ Show Running Paragraphs in Footer
+ Run only on active Reservations
+ HDFS Pods View and Volumes View
+ Define Home Page in Settings
+ README View
+ RELEASE_NOTES View
+ Integrate `kuber-app` into Kuber binary [seed, join, scale, pause, hibernate, delete]
+ Dataset View
+ Dataset Wrangle
+ Workspace View
+ Notes Permissions View
+ Golang check for SSL on HTTP request
+ HDFS Locality
+ Publish to User Timeline
+ kuber create --name my-kuber --num-workers 3 --cloud aws --auth twitter - apps hdfs,spark,spitfire,kuber-board (parameter description http://docs.datalayer.io/docs/kuber -> automatically clone the repo you give on the notebook with --repo...)

## 1.2.0 Atlas

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

## 1.3.0 Terminator

+ IPFS Application
+ Etcd Application
+ Import / Export Notes and Notebooks (Zeppelin + Jupyter formats)
+ Enable SSL on Load Balancers
+ Workspace Functions
+ Join AWS VPC
+ Join Local Nodes

## 1.4.0 Sylvidra

+ Github Auth
+ Support Jupyter ipywidgets
+ Support R htmlwidgets
+ Support React.js application packages
+ SSH from Plane to Pods
+ Reservatio no-show-up + terminate-on-no-activity

## 1.5.0

+ Datalayer.ai Widgets
+ Notes as a REST

## 1.6.0

+ Integrate Airflow
+ Visual Scheduler
+ HDFS Locality

## 1.7.0

+ Publish to Twitter
+ Publish to OneNote
+ Follow User
+ User Timeline
+ Microsoft Auth

## 1.8.0

+ Tensorflow Application
+ Kerberos HDFS

## 2.0.0

+ Notes PR with Diff
+ Kuber UI Secrets

## 2.1.0

+ Notes Authorization
+ HDFS Treemap View

## 2.2.0

+ Reuse K8S IAM and RBAC
+ JWT Security

## 2.3.0

+ Cost Compensation
+ Notes Metrics (Resource Usage, Time)

## 2.4.0

+ Master HA
+ Multi K8S Cluster
+ Multi Clusters
+ Multi Notebooks
+ Multi Datasets
+ Multiple HDFS with cluster-id
+ Support Azure

## 3.0.0

+ Apps Market
+ Test lower case viper.BindPFlag("microsoftredirect", serverCmd.PersistentFlags().Lookup("microsoft-redirect"))? 
+ Reuse as much as possible of k8s-dashboard source code
+ Benchmark Performance
+ Revisit this.xxx = window['xxx']
+ Support IPython Kernels
+ Jupyter Application
+ R (RStudio, Shiny and Sparklyr) Application
