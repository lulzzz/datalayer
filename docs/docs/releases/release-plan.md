---
title: Release Plan
---

Here after our `Release Plan` which may evolve at any time (no commitment... just track the features on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 0.2.0 Mystic

+ HDFS Pods View and Volumes View
+ Dataset View
+ Integrate `kuber-app` into Kuber binary
+ Notes Git History View

## 0.3.0 Alexandria

+ Multiple HDFS with cluster-id
+ Kerberos HDFS
+ IPFS Application
+ Etcd Application

## 1.0.0 Arcadia

+ Workspace View
+ Import / Export Notes and Notebooks (Zeppelin + Jupyter formats)
+ Enable SSL on Load Balancers
+ Workspace Functions

## 1.1.0 Atlas

+ Multi Notebooks
+ Multi Datasets
+ Ensure cloud resource are fully cleaned on deletion

## 1.2.0 Terminator

+ Multi Clusters
+ Join AWS VPC
+ Join Local Nodes

## 1.3.0

+ Github Auth
+ Support Jupyter ipywidgets
+ Support R htmlwidgets
+ Support React.js application packages
+ SSH from Plane to Pods

## 1.4.0

+ Datalayer.ai Widgets
+ Notes as a REST

## 1.5.0

+ Integrate Airflow
+ Visual Scheduler

## 1.6.0

+ Multi K8S Cluster
+ Publish to Twitter
+ Publish to OneNote
+ Follow User
+ User Timeline
+ Microsoft Auth

## 1.7.0

+ Tensorflow Application
+ HDFS Locality

## 1.8.0

+ Solr Application
+ HBase Application

## 2.0.0

+ Reuse K8S IAM and RBAC
+ JWT Security

## 2.1.0

+ Notes Authorization
+ HDFS Treemap View

## 2.2.0

+ Notes Diff
+ Kuber Board Secrets

## 2.3.0

+ Cost Compensation

## 2.4.0

+ Data Market

## 2.5.0

+ Apps Market
+ Support Azure

<!--
+ datalayer-contrib kubicorn branch (for AWS EIP address)
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
