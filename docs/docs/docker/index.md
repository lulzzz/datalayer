---
title: Docker images
---

# Deploy with Helm on a Kubernetes cluster

Clone the `datalayer` repository

```
git clone https://github.com/datalayer/datalayer.git
```

Deploy Hadoop chart.

```
helm install $(datalayer/specs/charts/incubator/hadoop-k8s/tools/calc_resources.sh 50) \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  datalayer/incubator/specs/charts/hadoop-k8s \
  -n hadoop-k8s
```

Deploy Spark chart.

```
helm install datalayer/specs/charts/incubator/spark-k8s -n spark-k8s
```

Deploy Zeppelin chart.

```
helm install --set hadoop.useConfigMap=true,hadoop.configMapName=hadoop-k8s-hadoop-k8s datalayer/specs/charts/incubator/zeppelin-k8s -n zeppelin-k8s
```

You will need to set in the `spark` interpreter property `spark.kubernetes.driver.pod.name` with the name of pod where you run zeppelin.

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")
