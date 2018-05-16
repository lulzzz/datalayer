---
title: Datalayer Offering
---

We ship [Pilot](/docs/what-kuber) to create a Kubernetes cluster on Amazon AWS from scratch.

We also ship a [Data Explorer](/docs/what-explorer) for Data Scientists who are willing to get the best from Apache Spark and Hadoop.

The Explorer helps the Data Science project actors to collaborate and share their knowledge in a [Library](/docs/what-library) which exposes searchable higher level of abstraction such as `Datasets`, `Notes`, `Gists`, `Functions` and `Models`.

This is the overall architecture that sustain those goals is depicted here after. We fully support the usage of the exploration artifacts stored in the library into a [Alpha](/docs//why-exploration-to-alpha) environment.

![Architecture](/images/datalayer/architecture.svg "Architecture")

Like building a house, we need strong foundations and well organized layers that are secured (`IAM`, `RBAC`) and managed (`OPS`).

Pilot is the Datalayer offering to manage the stack.

```
+----------------------------------------------------------------+
|             DATALAYER BIG DATA SCIENCE PLATFORM                |
|----------------------------------------------------------------|
|    K    | 7 |                   ACCESS                         |
|    U    |   |                  Ingress                         |
|    B    |------------------------------------------------------|
|    E    | 6 |                    UI                            |
|    R    |   |          UI | CLI | JSApps | Widgets             |
|   CLI   |------------------------------------------------------|
|   SDK   | 5 |                  SPITIFIRE                       |
|   LIB   |   |         Spark | TensorFlow | Markdown | ...      |
|         |------------------------------------------------------|
|   OPS   | 4 |                    UTILS                         |
|         |   |       Kubeless | Batch | Kafka | Kubeflow        |
|  MONIT  |------------------------------------------------------|
|         | 3 |                   STORE                          |
| BACK/RES|   |       HBase | Solr | JanusGraph | Etcd           |
|         |------------------------------------------------------|
|  DIAG   | 2 |                 FILE-SYSTEM                      |
|         |   |             HDFS | IFPS | Minio                  |
|  IAM    |------------------------------------------------------|
|         | 1 |                K8S-CLUSTER                       |
|  RBAC   |   | Kubeadm | Kubicorn/Kubespray | Reshifter/ARK     |
|         |   |            Gitkube | Kubed-sh                    |
+----------------------------------------------------------------+
```

+ Layer 1 - Cluster - The Kubernetes cluster infrastructure - etcd / secrets <- config
+ Layer 2 - File System - The distributed file systems running on Kubernetes - ipfs / hdfs 
+ Layer 3 - Store - Various store to fit common storage patterns - hbase / solr <- library / datasets
+ Layer 4 - Utils - Middelware toolings to complement common use case such as `Functions`, `Scheduled Batch`, `Queuing`...
+ Layer 5 - Interpreter - REST endpoints to invoke and interpeter commands from upper layers - spitfire <- interpreters
+ Layer 6 - UI - The collaborative studio that Big Data Scientists will use to `Collect`, `Explore`, `Model` and `Serve`. - explorer <- ui + auth
