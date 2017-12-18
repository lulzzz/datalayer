---
title: Welcome
---

You can run Datalayer on Kubernetes with the provided and [Helm charts](/docs/helm-charts).

You will get the Datalayer Studio running natively on Spark Kubernetes.

## Datalayer Platform

Our first Datalayer Studio on K8S is just a start. We are building a new complete platform for Big Data Scientists.

Datalayer relies on open-source for this and contributes back via the [Datalayer Contrib](https://github.com/datalayer-contrib) Github repositories.

While the `contrib` path is the place to hack before being released in the Datalayer solutions, this is also an opportunity for developers to test those new functionalities as soon as possible.

We then assemble all those `contribs` with our open solutions to build an awesome Big Data Sicence platform.

Our Data Science Platform is designed to be `Simple` as `Collaborative` and to support `Multi Cloud`.

```
+---+--------------------------------------------------+---------+
|   |        DATALAYER BIG DATA SCIENCE PLATFORM       |         |
+---+--------------------------------------------------+---------+
| 7 |                        STUDIO                    |         |
|   |                  UI | CLI | JS-Apps              |         |
+---+--------------------------------------------------+         |
| 6 |                        KUBER                     |         |
|   |               UI | CLI | SDK | Widget            |         |
+---+--------------------------------------------------+         |
| 5 |                  INTERPRETER-REST                |  OPS    |
|   |         Spark | TensorFlow | ... | Markdown      |  Monit  |
+---+--------------------------------------------------+  Backup |
| 4 |                   CLUSTER-APPS                   |  Diag   |
|   |       Kubeless | Batch | Kafka | Kubeflow        |         |
+---+--------------------------------------------------+         |
| 3 |                      STORE                       |  IAM    |
|   |       HBase | Solr | JanusGraph | MongoDB        |  RBAC   |
+---+--------------------------------------------------+         |
| 2 |                    FILE-SYSTEM                   |         |
|   |                    HDFS | IFPS                   |         |
+---+--------------------------------------------------+         |
| 1 |                      CLUSTER                     |         |
|   |                  Kubeadm | Kubicorn              |         |
+---+--------------------------------------------------+---------+
```

Like building a house, we need strong foundations and well organized layers that are secured (`IAM`, `RBAC`) and managed (`OPS`).

### Layer 1 - Cluster

The Kubernetes cluster infrastructure.

### Layer 2 - File System

The distributed file systems running on Kubernetes.

### Layer 3 - Store

Various store to fit common storage patterns.

### Layer 4 - Middelware

Middelware toolings to complement common use case such as `Functions`, `Scheduled Batch`, `Queuing`...

### Layer 5 - Interpreter Rest

REST endpoints to invoke and interpeter commands from upper layers.

### Layer 6 - Kuber

Kuber is the Datalayer offering to manage the stack on a technical point-of-vude

### Layer 7

The collaborative studio that Big Data Scientists will use to `Collect`, `Explore`, `Model` and `Serve`.
