---
title: Release Plan
---

Here is our `Release Plan` which may evolve at any time (no commitment... just track the progress on our [Twitter account](https://twitter.com/datalayerio) or on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 1.1.0 Alexandria

+ Fix Spark cold start
+ HDFS Pods View and Volumes View
+ Integrate `kuber-app` into Kuber binary commands [seed, join, scale, pause, hibernate, delete]
+ README View
+ RELEASE_NOTES View
+ Define Home Page in Settings
+ Note Scratchpad View
+ History View
+ Clone Note

## 1.2.0 Mystic

+ Dataset View
+ Dataset Wrangle
+ Workspace View
+ Notes Permissions View
+ HDFS Locality
+ Publish to User Timeline

## 1.3.0 Atlas

+ Ensure cloud resource are fully cleaned on deletion
+ Sudio local Docker connecting to Remote Cluster
+ Solr Application
+ HBase Application
+ Library

## 1.4.0 Terminator

+ IPFS Application
+ Etcd Application
+ Import / Export Notes and Notebooks (Zeppelin + Jupyter formats)
+ Enable SSL on Load Balancers
+ Workspace Functions
+ Join AWS VPC
+ Join Local Nodes

## 1.5.0 Sylvidra

+ Github Auth
+ Support Jupyter ipywidgets
+ Support R htmlwidgets
+ Support React.js application packages
+ SSH from Plane to Pods

## 1.6.0

+ Datalayer.ai Widgets
+ Notes as a REST

## 1.7.0

+ Integrate Airflow
+ Visual Scheduler
+ HDFS Locality

## 1.8.0

+ Publish to Twitter
+ Publish to OneNote
+ Follow User
+ User Timeline
+ Microsoft Auth

## 1.9.0

+ Tensorflow Application
+ Kerberos HDFS

## 2.0.0

+ Notes PR with Diff
+ Kuber Board Secrets

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

<!--
+ datalayer-contrib kubicorn branch (for AWS EIP address)
vendor/github.com/kris-nova/kubicorn/cloud/amazon/public/resources/launchconfiguration.go 			
            logger.Debug("Attempting to lookup master IP for node registration..")
 			input := &ec2.DescribeInstancesInput{
 				Filters: []*ec2.Filter{
+					{
+						Name:   S("tag:Cost"),
+						Values: []*string{S("kuber")},
+					},
 					{
 						Name:   S("tag:Name"),
 						Values: []*string{S(fmt.Sprintf("%s.master", immutable.Name))},
+ kuber create --name my-kuber --num-workers 3 --cloud aws --auth twitter - apps hdfs,spark,spitfire,kuber-board
 + parameter description http://docs.datalayer.io/docs/kuber/ -> automatically clone the repo you give on the notebook with --repo...
+ Test lower case viper.BindPFlag("microsoftredirect", serverCmd.PersistentFlags().Lookup("microsoft-redirect"))? 
+ Reuse as much as possible of k8s-dashboard source code
+ Benchmark Performance
+ Golang check for SSL on HTTP request
+ Revisit this.xxx = window['xxx']
+ Support IPython Kernels
+ Jupyter Application
+ R (RStudio, Shiny and Sparklyr) Application
-->
