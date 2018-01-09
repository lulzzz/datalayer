---
title: Setup on K8S
---

## Prerequisite

You must have an operational Kubernetes cluster with Helm available.

> PS: We have and outdated helm repo we need to update...
> If you still want to use this outdated repo, add --repo http://helm.datalayer.io to the kubectl command given here.

Just clone the Datalayer `helm-charts` repository and go to the `incubator` folder.

```
git clone https://github.com/datalayer/helm-charts.git helm-charts
cd helm-charts
```

## Dashboard

To ease the management, it is interesting to install the standard `Kubernetes Dashboard` with `Heapster` as monitoring tool.

```
# Temp workaround to relax roles...
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```

```
helm install -n heapster \
  --namespace kube-system \
  stable/heapster
```

Check `Heapster` is running.

```
export POD_NAME=$(kubectl get pods --namespace kube-system -l "app=heapster-heapster" -o jsonpath="{.items[0].metadata.name}")
echo http://127.0.0.1:8082
kubectl --namespace kube-system port-forward $POD_NAME 8082
```

Now you can install the `Dashboard`.

```
helm install k8s-dashboard \
  --namespace kube-system \
  --set=httpPort=3000,resources.limits.cpu=200m,rbac.create=true \
  -n k8s-dashboard
```

Browse the Dashboard UI with a proxy to the HTTP port.

```
export POD_NAME=$(kubectl get pods -n kube-system -l "app=kubernetes-dashboard,release=k8s-dashboard" -o jsonpath="{.items[0].metadata.name}")
echo http://127.0.0.1:9090
kubectl -n kube-system port-forward $POD_NAME 9090:9090
```

Or if you prefer, you can activate a full running proxy.

```
kubectl proxy
echo http://localhost:8001/api/v1/namespaces/kube-system/services/http:k8s-dashboard-kubernetes-dashboard:/proxy/#!/overview?namespace=_all
```

## Etcd

```
helm install etcd \
  --set StorageClass=gp2 \
  -n kuber-etcd
```

Test the health of your etcd cluster (following examaple for a 3 nodes cluster)

```
for i in {0..2}; do kubectl exec kuber-etcd-etcd-$i --namespace=default -- sh -c 'etcdctl cluster-health'; done
```

The above command should give you output like this one.

```
member 9e4964f31e4a910b is healthy: got healthy result from http://kuber-etcd-etcd-0.kuber-etcd-etcd:2379
member d7388f72617bd4e8 is healthy: got healthy result from http://kuber-etcd-etcd-1.kuber-etcd-etcd:2379
member eec49009934c162b is healthy: got healthy result from http://kuber-etcd-etcd-2.kuber-etcd-etcd:2379
cluster is healthy
member 9e4964f31e4a910b is healthy: got healthy result from http://kuber-etcd-etcd-0.kuber-etcd-etcd:2379
member d7388f72617bd4e8 is healthy: got healthy result from http://kuber-etcd-etcd-1.kuber-etcd-etcd:2379
member eec49009934c162b is healthy: got healthy result from http://kuber-etcd-etcd-2.kuber-etcd-etcd:2379
cluster is healthy
member 9e4964f31e4a910b is healthy: got healthy result from http://kuber-etcd-etcd-0.kuber-etcd-etcd:2379
member d7388f72617bd4e8 is healthy: got healthy result from http://kuber-etcd-etcd-1.kuber-etcd-etcd:2379
member eec49009934c162b is healthy: got healthy result from http://kuber-etcd-etcd-2.kuber-etcd-etcd:2379
cluster is healthy
```

## HDFS

Install the HDFS Helm chart.

```
helm install \
  --set persistence.nameNode.enabled=true \
  --set persistence.nameNode.storageClass=gp2 \
  --set persistence.dataNode.enabled=true \
  --set persistence.dataNode.storageClass=gp2 \
  --set hdfs.dataNode.replicas=3 \
  hdfs-k8s \
  -n hdfs-k8s
```

This will launch one Hadoop Namenode and 3 Hadoop Datanodes.

If you list the pods with `kubectl get pods -l app=hdfs-k8s`, you should see the running Hadoop pods.

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

Check the sanity of your cluster with `dfsadmin` and create a `/tmp` folder.

```
kubectl exec -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- hdfs dfsadmin -report
kubectl exec -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- hdfs dfs -mkdir /tmp
kubectl exec -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- hdfs dfs -ls /
kubectl exec -n default -it hdfs-k8s-hdfs-k8s-hdfs-nn-0 -- bash
```

To access the Namenode user interface: `kubectl port-forward hdfs-k8s-hdfs-k8s-hdfs-nn-0 50070:50070` and open in your browser `http://localhost:50070`.

If you want to scale the number of Datanodes, you just need to upgrade.

```
helm upgrade \
  --set hdfs.dataNode.replicas=6 \
  hdfs-k8s \
  hdfs-k8s
```

## Spark

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

## Spitfire

Install `Spitfire` chart.

```
helm install \
  --set spitfire.imagePullPolicy=IfNotPresent \
  spitfire \
  -n spitfire
```

You can set `spitfire.imagePullPolicy=Always` to ensure you have the latest fresh version (this may take some time as a complete new Docker image will be pulled).

Test the presence of the Hadoop configuration.

```
kubectl exec -it $(kubectl get pods -n default \
  -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}") \
  -- cat /etc/hdfs-k8s/conf/core-site.xml
```

This should print the Hadoop `core-site.xml` configuration file.

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

Forward the 8081 port and open the Spitfire home page on `http://localhost:8081` in your favorite browser.

```
echo http://localhost:8080
kubectl port-forward $(kubectl get pods -n default -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}") 8080:8080
```
Or if you already run `kubectl proxy`

```
echo http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:8080/proxy
```

Browse the Spark UI.

```
echo http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:4040/proxy
```

The Spark interpreter is set to launch the Spark Driver in `client` mode . In the `client` mode, you are free to set `spark.app.name` with the name you like but do not change `spark.kubernetes.driver.pod.name` propertiy.

If you want to run in `cluster` mode, you have to change the set the `spark.submit.deployMode` property with `cluster` value, remove the `spark.app.name` and `spark.kubernetes.driver.pod.name` properties (delete, not set to blank), and finally restart the Spark interpreter (see also screenshot below).

Of course, depending on your cluster resources, you might also update the `spark.executor.instances`, `spark.executor.memory`... properties.

![spark-interpreter-config](/images/docker/spark-interpreter-config.png "spark-interpreter-config")

If you want to run manual Spark jobs or debug the logs, open a shell in the pod:

```
export SPITFIRE_POD=$(kubectl get pods -n default -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}")
kubectl exec -n default -it $SPITFIRE_POD -c spitfire -- bash
```

To backup your notes.

```
export SPITFIRE_POD=$(kubectl get pods -n default -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}")
kubectl cp -n default -c spitfire $SPITFIRE_POD:/opt/spitfire/notebook .
```

To backup your the configuration.

```
export SPITFIRE_POD=$(kubectl get pods -n default -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}")
kubectl cp -n default -c spitfire $SPITFIRE_POD:/opt/spitfire/conf .
```

## AWS

Additionaly, you can expose the endpoint via a Load Balancer on AWS.

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: spitfire-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: spitfire
EOF
```
