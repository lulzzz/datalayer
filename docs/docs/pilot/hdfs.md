---
title: HDFS
---

Install the `HDFS` chart.

```
helm install \
  --set persistence.nameNode.enabled=true \
  --set persistence.nameNode.storageClass=gp2 \
  --set persistence.dataNode.enabled=true \
  --set persistence.dataNode.storageClass=gp2 \
  --set hdfs.dataNode.replicas=3 \
  hdfs \
  -n hdfs
```

This will launch one Hadoop Namenode and 3 Hadoop Datanodes.

If you list the pods with `kubectl get pods -l app=hdfs`, you should see the running Hadoop pods.

```
NAME                              READY     STATUS    RESTARTS   AGE
hdfs-hdfs-hdfs-nn-0   1/1       Running   0          5s
hdfs-hdfs-hdfs-dn-0   1/1       Running   0          5s
hdfs-hdfs-hdfs-dn-1   1/1       Running   0          5s
hdfs-hdfs-hdfs-dn-2   1/1       Running   0          5s
```

Helm should also list the chart you have just deployed. Type `helm ls hdfs` which will return:

```
NAME         	REVISION	UPDATED                 	STATUS  	CHART                     	NAMESPACE
hdfs   	1       	Mon Nov 20 14:23:52 2017	DEPLOYED	hdfs-1.0.0          	default  
```

Check the sanity of your cluster with `dfsadmin` and create a `/tmp` folder.

```
kubectl exec -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfsadmin -report
kubectl exec -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfs -mkdir /tmp
kubectl exec -it hdfs-hdfs-hdfs-nn-0 -- hdfs dfs -ls /
kubectl exec -n default -it hdfs-hdfs-hdfs-nn-0 -- bash
```

To access the Namenode user interface: `kubectl port-forward hdfs-hdfs-hdfs-nn-0 50070:50070` and open in your browser `http://localhost:50070`.

If you want to scale the number of Datanodes, you just need to upgrade.

```
helm upgrade \
  --set hdfs.dataNode.replicas=6 \
  hdfs \
  hdfs
```
