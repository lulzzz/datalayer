---
title: Docker images
---

# Deploy with Helm Charts on a Kubernetes cluster

## Prerequisite

You must have an operational Kubernetes cluster with Helm available.

> PS: We have and outdated helm repo we need to update...
> If you still want to use this outdated repo, add --repo http://helm.datalayer.io to the kubectl command given here.

Just clone the `datalayer` repository and change to the `specs/charts/incubator` folder.

```
git clone https://github.com/datalayer/datalayer.git datalayer
cd datalayer/specs/charts/incubator
```

## Install the Apache Hadoop chart

```
helm install \
  -n hadoop-k8s \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  --set hdfs.dataNode.replicas=3 \
  hadoop-k8s
```

This will launch one Hadoop Namenode and one Hadoop Datanode. If you list the pods with `kubectl get pods -l app=hadoop-k8s`, you should see two running Hadoop pods:

```
NAME                              READY     STATUS    RESTARTS   AGE
hadoop-k8s-hadoop-k8s-hdfs-nn-0   1/1       Running   0          5s
hadoop-k8s-hadoop-k8s-hdfs-dn-0   1/1       Running   0          5s
hadoop-k8s-hadoop-k8s-hdfs-dn-1   1/1       Running   0          5s
hadoop-k8s-hadoop-k8s-hdfs-dn-2   1/1       Running   0          5s
```

Helm should also list the chart you have just deployed. Type `helm ls hadoop-k8s` which will return:

```
NAME         	REVISION	UPDATED                 	STATUS  	CHART                     	NAMESPACE
hadoop-k8s   	1       	Mon Nov 20 14:23:52 2017	DEPLOYED	hadoop-k8s-1.0.0          	default  
```

Check the sanity of your cluster:

```
kubectl exec -n default -it hadoop-k8s-hadoop-k8s-hdfs-nn-0 -- /usr/local/hadoop/bin/hdfs dfsadmin -report
kubectl exec -n default -it hadoop-k8s-hadoop-k8s-hdfs-nn-0 -- /usr/local/hadoop/bin/hdfs dfs -mkdir /tmp
kubectl exec -n default -it hadoop-k8s-hadoop-k8s-hdfs-nn-0 -- /usr/local/hadoop/bin/hdfs dfs -ls /
```

To access the Namenode user interface: `kubectl port-forward hadoop-k8s-hadoop-k8s-hdfs-nn-0 50070:50070` and open in your browser `http://localhost:50070`.

If you want to scale the number of Datanodes, you just need to upgrade with:

```
helm upgrade \
  --set hdfs.dataNode.replicas=6 \
  hadoop-k8s \
  hadoop-k8s
```

## Install the Apache Spark chart

You need the `Spark resource staging server` and the `Spark shuffle service`.

```
helm install spark-k8s -n spark-k8s
```

## Install the Apache Zeppelin chart

Install the `Zeppelin on K8s` chart:

```
helm install \
  --set hadoop.useConfigMap=true,hadoop.configMapName=hadoop-k8s-hadoop-k8s \
  zeppelin-k8s \
  -n zeppelin-k8s
```

Test the correct configuration of Hadoop:

```
kubectl exec -it $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") -- cat /usr/hadoop-2.7.3/etc/hadoop/core-site.xml
```

This should print the Hadoop `core-site.xml` configuration file:

```
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property>
        <name>fs.defaultFS</name>
        <value>hdfs://hadoop-k8s-hadoop-k8s-hdfs-nn:9000/</value>
        <description>NameNode URI</description>
    </property>
</configuration>
```

Open the Apache Zeppelin home page in your favorite browser.

```
kubectl port-forward $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") 8080:8080
xdg-open http://localhost:8080
```

If you want to run manual Spark jobs or debug the logs, open a shell in the pod:

```
kubectl exec -n default -it $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") -- bash
```

Before running any Spark paragraph, you will need to set in the interpreter page the `spark.kubernetes.driver.pod.name` property with the name of pod where you run zeppelin.

You should get the pod name with the following kubectl command and update the zeppelin interpeter page via the top right side menu `Interpeter` (see screenshot - Depending on your resources, you might also update the `spark.executor.instances`, `spark.executor.memory`... properties).

```
$ k get pods | grep zeppelin
zeppelin-k8s-zeppelin-798d74cfc5-tb4vp                1/1       Running   0          15m
```

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")
