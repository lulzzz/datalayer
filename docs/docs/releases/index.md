---
title: Releases
---

The lastest official release is [Version 0.0.1](/docs/releases/v-0.0.1)

Here after our release plan which may evolve at any time (no commitment).

## 0.0.2 Mystic

+ Jupyter App
+ Ensure fixed IP address for K8S Master
+ Manage Spot Instances Status (Terminated...)
+ (re)Mount HDFS Volumes based on HDFS `cluster-id`
+ Format HDFS only if needed
+ Notes Tiles View
+ Manage HDFS with `cluster-id`
+ Integrate `deploy-charts.sh` in Kuber
+ Define pull timeout (--runtime-request-timeout 3m0s on kubelet service)

## 0.0.3 Alexandria

+ HDFS Pods View and Volumes View
+ Dataset View
+ Notes Git History View

## 0.0.4 Arcadia

+ Multiple HDFS with cluster-id
+ Kerberos HDFS
+ IPFS App
+ Etcd App

## 0.0.5 Atlas

+ Workspace View
+ Enable SSL on Load Balancers
+ Workspace Functions

## 0.0.6 Waterloo

+ Multi Notebooks
+ Multi Datasets

## 0.0.7

+ Multi Clusters

## 0.1.0

+ Github Auth
+ SSH from Plane
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
+ Test lower case viper.BindPFlag("microsoftredirect", serverCmd.PersistentFlags().Lookup("microsoft-redirect"))? !
+ Reuse as much as possible of k8s-dashboard source code
+ Benchmark Performance
+ Golang check for SSL on HTTP request
+ Revisit this.xxx = window['xxx']
+ Support IPython Kernels
-->
