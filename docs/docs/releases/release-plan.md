---
title: Release Plan
---

Here after our `Release Plan` which may evolve at any time (no commitment... just track the features on the [Github issue page](https://github.com/datalayer/datalayer/issues)).

## 0.0.3 Mystic

+ HDFS Pods View and Volumes View
+ Dataset View
+ Define tags on created cloud resources
+ Notes Git History View
+ Ensure cloud resource are fully cleaned on deletion

## 0.0.4 Alexandria

+ Multiple HDFS with cluster-id
+ Kerberos HDFS
+ IPFS App
+ Etcd App

## 0.0.5 Arcadia

+ Workspace View
+ Enable SSL on Load Balancers
+ Workspace Functions

## 0.0.6 Atlas

+ Multi Notebooks
+ Multi Datasets

## 0.0.7 Waterloo

+ Multi Clusters

## 0.1.0

+ Github Auth
+ SSH from Plane to Pods
+ Join AWS VPC
+ Join Local Nodes

## 0.2.0

+ Datalayer.ai Widgets
+ Notes as a REST

## 0.3.0

+ Integrate Airflow
+ Visual Scheduler

## 0.4.0

+ Multi K8S Cluster
+ Publish to Twitter
+ Publish to OneNote
+ Follow User
+ User Timeline
+ Microsoft Auth

## 0.5.0

+ Tensorflow App
+ HDFS Locality

## 0.6.0

+ Solr App
+ HBase App

## 0.7.0

+ Reuse K8S IAM and RBAC
+ JWT Security

## 0.8.0

+ Notes Authorization
+ HDFS Treemap View

## 0.9.0

+ Notes Diff
+ Kuber Plane Secrets

## 1.0.0

+ Cost Compensation

## 1.1.0

+ Data Market

## 1.2.0

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
