---
title: Release Plan
---

Here after our `Release Plan` which may evolve at any time (no commitment... just track the features on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 0.2.0 Mystic

+ HDFS Pods View and Volumes View
+ Dataset View
+ Define tags on created cloud resources
+ Notes Git History View
+ Ensure cloud resource are fully cleaned on deletion

## 0.3.0 Alexandria

+ Multiple HDFS with cluster-id
+ Kerberos HDFS
+ IPFS App
+ Etcd App

## 1.0.0 Arcadia

+ Workspace View
+ Enable SSL on Load Balancers
+ Workspace Functions

## 1.1.0 Atlas

+ Multi Notebooks
+ Multi Datasets

## 1.2.0 Waterloo

+ Multi Clusters
+ Join AWS VPC
+ Join Local Nodes

## 1.3.0

+ Github Auth
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

+ Tensorflow App
+ HDFS Locality

## 1.8.0

+ Solr App
+ HBase App

## 2.0.0

+ Reuse K8S IAM and RBAC
+ JWT Security

## 2.1.0

+ Notes Authorization
+ HDFS Treemap View

## 2.2.0

+ Notes Diff
+ Kuber Plane Secrets

## 2.3.0

+ Cost Compensation

## 2.4.0

+ Data Market

## 2.5.0

+ Apps Market
+ Support Azure

<!--
+ kuber create --name my-kuber --num-workers 3 --cloud aws --auth twitter - apps hdfs,spark,spitfire,kuber-plane
 + parameter description http://docs.datalayer.io/docs/kuber/ -> automatically clone the repo you give on the notebook with --repo...
+ Test lower case viper.BindPFlag("microsoftredirect", serverCmd.PersistentFlags().Lookup("microsoft-redirect"))? !
+ Reuse as much as possible of k8s-dashboard source code
+ Benchmark Performance
+ Golang check for SSL on HTTP request
+ Revisit this.xxx = window['xxx']
+ Support IPython Kernels
-->
