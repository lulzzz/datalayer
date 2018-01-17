---
title: Spark
---

You need to install the Spark `Resource Staging Server` and the Spark `Shuffle Service`.

```
helm install spark-k8s \
  -n spark-k8s
```

If you list the pods with `kubectl get pods -l kuber=spark-k8s`, you should see the running Spark pods:

```
NAME                                                READY     STATUS    RESTARTS   AGE
spark-k8s-resource-staging-server-c5db88df9-n42gw   1/1       Running   0          15s
spark-k8s-shuffle-service-5r2h7                     1/1       Running   0          15s
spark-k8s-shuffle-service-9pxxc                     1/1       Running   0          15s
spark-k8s-shuffle-service-s2vk8                     1/1       Running   0          15s
```
