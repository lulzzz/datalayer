---
title: Docker images
---

# Deploy with Helm on a Kubernetes cluster

Add `datalayer` as `Helm` repository.

```
helm repo add datalayer https://raw.githubusercontent.com/datalayer/datalayer/master/specs/charts
```

Deploy Hadoop chart.

```
helm install $(datalayer/incubator/hadoop-k8s/tools/calc_resources.sh 50) \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  datalayer/incubator/hadoop-k8s \
  -n hadoop-k8s
```

Deploy Spark chart.

```
helm install datalayer/incubator/spark-k8s -n spark-k8s
```

Deploy Zeppelin chart.

```
helm install --set hadoop.useConfigMap=true,hadoop.configMapName=hadoop-k8s-hadoop-k8s datalayer/incubator/zeppelin-k8s -n zeppelin-k8s
```

You will need to set in the `spark` interpreter property `spark.kubernetes.driver.pod.name` with the name of pod where you run zeppelin.

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")
