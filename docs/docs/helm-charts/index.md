---
title: Setup on K8S
---

## Prerequisite

You must have an operational Kubernetes cluster with Helm available.

> PS: We have and outdated helm repo we need to update...
> If you still want to use this outdated repo, add --repo http://helm.datalayer.io to the kubectl command given here.

Just clone the `datalayer` repository and change to the `specs/charts/incubator` folder.

```
git clone https://github.com/datalayer/datalayer.git datalayer
cd datalayer/specs/charts/incubator
```

## Install the HDFS chart

```
helm install \
  -n hdfs-k8s \
  --set persistence.nameNode.enabled=false \
  --set persistence.dataNode.enabled=false \
  --set hdfs.dataNode.replicas=3 \
  --set imagePullPolicy=IfNotPresent \
  hdfs-k8s
```

This will launch one Hadoop Namenode and three Hadoop Datanodes. If you list the pods with `kubectl get pods -l app=hdfs-k8s`, you should see two running Hadoop pods:

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

Check the sanity of your cluster and create a `/tmp` folder:

```
kubectl exec -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- hdfs dfsadmin -report
kubectl exec -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- hdfs dfs -mkdir /tmp
kubectl exec -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- hdfs dfs -ls /
```

To access the Namenode user interface: `kubectl port-forward hdfs-k8s-hdfs-k8s-hdfs-nn-0 50070:50070` and open in your browser `http://localhost:50070`.

If you want to scale the number of Datanodes, you just need to upgrade with:

```
helm upgrade \
  --set hdfs.dataNode.replicas=6 \
  hdfs-k8s \
  hdfs-k8s
```

**Very Experimental Option - Use HDFS with Locality**

Steps to be taken (adapt the ip addresses in function of your environement).

```
kubectl label nodes ip-10-0-0-131.us-west-2.compute.internal hdfs-namenode-selector=hdfs-namenode-0
kubectl label nodes ip-10-0-0-131.us-west-2.compute.internal hdfs-datanode-exclude=yes
```

```
helm install \
  hdfs-nn-k8s \
  -n hdfs-namenode
```

```
helm install \
  hdfs-dn-k8s \
  -n hdfs-datanode
```

```
kubectl exec -n default -it hdfs-namenode-0 -- hdfs dfsadmin -report
kubectl exec -n default -it hdfs-namenode-0 -- hdfs dfs -mkdir /tmp
kubectl exec -n default -it hdfs-namenode-0 -- hdfs dfs -ls /
kubectl exec -n default -it hdfs-namenode-0 -- hdfs dfs -cat /hosts
kubectl exec -n default -it hdfs-namenode-0 -- bash
```

```
helm install \
  --set hdfsK8s.useConfigMap=false \
  --set zeppelin.imagePullPolicy=Always \
  zeppelin-k8s-hdfs-locality \
  -n zeppelin-k8s-hdfs-locality
```

## Install the Apache Spark chart

You need the `Spark resource staging server` and the `Spark shuffle service`.

```
helm install spark-k8s \
  -n spark-k8s
```

## Install the Apache Zeppelin chart

Install the `Zeppelin on K8s` chart:

```
helm install \
  --set hdfsK8s.useConfigMap=true \
  --set hdfsK8s.configMapName=hdfs-k8s-hdfs-k8s \
  --set zeppelin.imagePullPolicy=IfNotPresent \
  zeppelin-k8s \
  -n zeppelin-k8s
```

You can set `zeppelin.imagePullPolicy=Always`, to ensure you have the latest fresh version (this may take time as a complete new Docker image will be pulled).

Test the correct configuration of Hadoop:

```
kubectl exec -it $(kubectl get pods -n default \
  -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") \
  -- cat /usr/hadoop/etc/hadoop/core-site.xml
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

Forward the 8080 port and open the Apache Zeppelin home page on `http://localhost:8080` in your favorite browser.

```
kubectl port-forward $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") 8080:8080
```

The Spark interpreter is set to launch the Spark Driver in `client` mode . In the `client` mode, you are free to set `spark.app.name` with the name you like but do not change `spark.kubernetes.driver.pod.name` propertiy.

If you want to run in `cluster` mode, you have to change the set the `spark.submit.deployMode` property with `cluster` value, remove the `spark.app.name` and `spark.kubernetes.driver.pod.name` properties (delete, not set to blank), and finally restart the Spark interpreter (see [Zeppelin documentation](https://zeppelin.apache.org/docs/latest/manual/interpreters.html) for more information on interpreters, see also screenshot below).

Of course, depending on your cluster resources, you might also update the `spark.executor.instances`, `spark.executor.memory`... properties.

If you want to run manual Spark jobs or debug the logs, open a shell in the pod:

```
kubectl exec -n default -it $(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}") -c zeppelin -- bash
```

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")

**Very Experimental Option - Use HDFS with Locality**

Install Zeppelin connecting to a HDS with locality enabled:

```
helm install \
  --set hdfsK8s.useConfigMap=false \
  --set zeppelin.imagePullPolicy=IfNotPresent \
  zeppelin-k8s-hdfs-locality \
  -n zeppelin-k8s-hdfs-locality
```
