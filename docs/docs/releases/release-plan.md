---
title: Release Plan
---

Here is our `Release Plan` which may evolve at any time (no commitment.

You can track the progress on our [Twitter account](https://twitter.com/datalayerio) or on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 1.1.0 Alexandria

+ New Paragraph via Mouse-click (class=new-paragraph)
+ Vegas Vizualisation
+ Bokeh Vizualisation
+ Altair Vizualisation
+ Voyager2 Vizualisation
+ Dataset View
+ Spark Cold Start
 + Interpreter Start Timeout
 + First Run after Node Restart

## 1.2.0 Mystic

+ Allow to Scale Up/Down Cluster Size to a certain extent based on Configuration and License Limits
+ Horizontal + Vertical Layout Toggle for Note Editor
+ Scrollable Paragraph List on Note Editor
+ Chat Room with Connected Users
+ Comment on Note View
+ Activity View

## 1.3.0 Atlas

+ Notify Cluster up/down via Toastr
+ Current Connected Users View
+ Current Jobs View
+ Support Azure
+ Enhance Microsoft Auth
 + Contacts
 + Screenshot to OneNote

+ Notify when Permission is assigned
+ Reservations
  + Do not Change Past Reservations
  + Delete Reservations
  + User Reservation History and Analysis View
  + Reservation Color per User in Calendar View
  + Run only on Active Reservations for connected User

## 2.0.0 Terminator

+ Automatically Clone the Notebook Repository given as paraemeter --repo...)
+ Workspace View
+ Budget View
+ Fine Grained Permissions View
+ Golang check for SSL on HTTP request
+ Integrate `kuber.sh` into Kuber binary with Commands (seed, join, scale, pause, hibernate, delete)
  + kuber create --name my-kuber --num-workers 3 --cloud aws --auth twitter - apps [hdfs,spark,spitfire,explorer] (parameter description http://docs.datalayer.io/docs/kuber)

## 2.1.0 Sylvidra

+ Ensure HDFS Locality
+ Publish to User Timeline
+ Ensure cloud resource are fully cleaned on Deletion
+ Local Docker connecting to Remote Cluster
+ Publish, Search and Load Book in Library
  + Snippets
  + Create
  + Search
  + Reuse

+ Resource Reservation per User + Reports
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

## 2.3.0 Eliminator

+ Library
  + Solr Application
  + HBase Application

+ Define Home Page in Settings
+ Publish to Twitter
+ Publish to OneNote

## 2.4.0

+ Import / Export Notes and Notebooks (Zeppelin + Jupyter formats)
+ Suport Jupyterlab Widgets
+ Support Jupyter ipywidgets
+ Support IPython Kernels
+ Support R htmlwidgets
+ Support R (RStudio, Shiny and Sparklyr) Application
+ Support React.js application packages
+ SSH from UI to Pods

## 2.5.0

+ KuberDog on micro-instance or Docker to Create, Manage and Monitor (Sleep/Wakeup) the Cluster
+ Better Manage the Spitfire shared Secret
+ Reservatioms no-show-up + Terminate on no-activity
+ Datalayer.ai Widgets
+ Notes as a REST

## 2.6.0

+ Integrate Airflow
+ Scheduler View
+ IPFS Application
+ Etcd Application
+ HDFS Locality
+ Instance Type View

## 2.7.0

+ User Timeline
+ Follow User
+ README View
+ RELEASE_NOTES View
+ Tensorflow Application

## 3.0.0

+ Kerberos HDFS
+ Note Pull Request View
+ Kuber UI Secrets
+ Finer Grained Notes Permissions
+ HDFS Treemap View

## 3.1.0

+ Reuse K8S IAM and RBAC
+ Workspace Functions
+ Join AWS VPC
+ Join Local Nodes
+ Github Auth

## 3.2.0

+ Cost Compensation
+ Notes Metrics (Resource Usage, Time)
+ Master HA
+ Multi K8S Cluster

## 4.0.0

+ Multi Clusters
+ Multi Notebooks
+ Multi Datasets
+ Multiple HDFS with cluster-id

## 5.0.0

+ Apps Market
+ JWT Security
+ Test lower case viper.BindPFlag("microsoftredirect", serverCmd.PersistentFlags().Lookup("microsoft-redirect"))? 
+ Reuse as much as possible of k8s-dashboard source code

## 6.0.0

+ Benchmark Performance
+ Revisit `this.xxx = window['xxx']`
