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

## Install the Apache HDFS chart

```
helm install \
  -n hdfs-k8s \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  --set hdfs.dataNode.replicas=3 \
  hdfs-k8s
```

This will launch one Hadoop Namenode and one Hadoop Datanode. If you list the pods with `kubectl get pods -l app=hdfs-k8s`, you should see two running Hadoop pods:

```
NAME                              READY     STATUS    RESTARTS   AGE
hdfs-k8s-hdfs-k8s-hdfs-nn-0   1/1       Running   0          5s
hdfs-k8s-hdfs-k8s-hdfs-dn-0   1/1       Running   0          5s
hdfs-k8s-hdfs-k8s-hdfs-dn-1   1/1       Running   0          5s
hdfs-k8s-hdfs-k8s-hdfs-dn-2   1/1       Running   0          5s
```

Helm should also list the chart you have just deployed. Type `helm ls hdfs-k8s` which will return:

```
NAME         	REVISION	UPDATED                 	STATUS  	CHART                     	NAMESPACE
hdfs-k8s   	1       	Mon Nov 20 14:23:52 2017	DEPLOYED	hdfs-k8s-1.0.0          	default  
```

Check the sanity of your cluster:

```
kubectl exec -n default -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- /usr/local/hadoop/bin/hdfs dfsadmin -report
kubectl exec -n default -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- /usr/local/hadoop/bin/hdfs dfs -mkdir /tmp
kubectl exec -n default -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- /usr/local/hadoop/bin/hdfs dfs -ls /
```

To access the Namenode user interface: `kubectl port-forward hdfs-k8s-hdfs-k8s-hdfs-nn-0 50070:50070` and open in your browser `http://localhost:50070`.

If you want to scale the number of Datanodes, you just need to upgrade with:

```
helm upgrade \
  --set hdfs.dataNode.replicas=6 \
  hdfs-k8s \
  hdfs-k8s
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
  --set hdfsK8s.useConfigMap=true,hdfsK8s.configMapName=hdfs-k8s-hdfs-k8s \
  zeppelin-k8s \
  -n zeppelin-k8s
```

This will take some take to start as we are pulling `Always` the docker image to ensure you have the latest fresh version.

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
    <value>hdfs://hdfs-k8s-hdfs-k8s-hdfs-nn:9000/</value>
    <description>NameNode URI</description>
  </property>
</configuration>
```

Open the Apache Zeppelin home page in your favorite browser.

```
kubectl port-forward $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") 8080:8080
xdg-open http://localhost:8080
```

The Spark interpreter is set to launch the Spark Driver in `cluster` mode (for now, do not set `spark.app.name` nor `spark.kubernetes.driver.pod.name` properties for this to work).

If you want to run in `client` mode, you have to change the set the `spark.submit.deployMode` property with `client` value, `spark.kubernetes.driver.pod.name` with the name of the pod where Zeppelin is running, and finally restart the Spark interpreter (see [Zeppelin documentation](https://zeppelin.apache.org/docs/latest/manual/interpreters.html) for more information on interpreters).

You will get the pod name with the following kubectl command and you will update the zeppelin interpeter page via the top right side menu `Interpeter` (see screenshot below - Depending on your resources, you might also update the `spark.executor.instances`, `spark.executor.memory`... properties).

```
$ k get pods | grep zeppelin
zeppelin-k8s-zeppelin-798d74cfc5-tb4vp                1/1       Running   0          15m
```

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")

In the `client` mode, you are free to set `spark.app.name` with a name you like.

If you want to run manual Spark jobs or debug the logs, open a shell in the pod:

```
kubectl exec -n default -it $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") -- bash
```
