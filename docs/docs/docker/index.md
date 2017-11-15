---
title: Docker images
---

# Deploy with Helm on a Kubernetes cluster

Install the Apache Hadoop chart.

```
helm install --repo http://helm.datalayer.io \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  hadoop-k8s \
  -n hadoop-k8s
```

Install the Apache Spark chart.

```
helm install --repo http://helm.datalayer.io spark-k8s -n spark-k8s
```

Install the Apache Zeppelin chart.

```
helm install \
  --repo http://helm.datalayer.io \
  --set hadoop.useConfigMap=true,hadoop.configMapName=hadoop-k8s-hadoop-k8s \
  zeppelin-k8s \
  -n zeppelin-k8s
```

Open Apache Zeppelin in your favorite browser.

```
xdg-open http://$(kubectl get svc zeppelin-k8s-zeppelin -o jsonpath='{.spec.clusterIP}'):8080
```

Before running any Spark paragraph, you will need to set in the interpreter page the `spark.kubernetes.driver.pod.name` property with the name of pod where you run zeppelin.

You should get the pod name with the following kubectl command and update the zeppelin interpeter page via the top right side menu `Interpeter` (see screenshot - Depending on your resources, you might also update the `spark.executor.instances`, `spark.executor.memory`... properties).

```
$ k get pods | grep zeppelin
zeppelin-k8s-zeppelin-798d74cfc5-tb4vp                1/1       Running   0          15m
```

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")
