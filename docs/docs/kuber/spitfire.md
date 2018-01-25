---
title: Spitfire
---

Install the `spitfire` chart.

```shell
helm install \
  --set spitfire.imagePullPolicy=IfNotPresent \
  spitfire \
  -n spitfire
```

You can set `spitfire.imagePullPolicy=Always` to ensure you have the latest fresh version (this may take some time as a complete new Docker image will be pulled).

Test the presence of the Hadoop configuration.

```shell
kubectl exec -it $(kubectl get pods -n default \
  -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}") \
  -- cat /etc/hdfs/conf/core-site.xml
```

This should print the Hadoop `core-site.xml` configuration file.

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://hdfs-hdfs-hdfs-nn:9000/</value>
    <description>NameNode URI</description>
  </property>
</configuration>
```

Forward the 8081 port and open the Spitfire home page on `http://localhost:8081` in your favorite browser.

```shell
echo http://localhost:8080
kubectl port-forward $(kubectl get pods -n default -l "app=spitfire" -o jsonpath="{.items[0].metadata.name}") 8080:8080
```

Or if you already run `kubectl proxy`.

```shell
echo http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire:8080/proxy
```

The Spark interpreter is set to launch the Spark Driver in `client` mode . In the `client` mode, you are free to set `spark.app.name` with the name you like but do not change `spark.kubernetes.driver.pod.name` propertiy.

If you want to run in `cluster` mode, you have to change the set the `spark.submit.deployMode` property with `cluster` value, remove the `spark.app.name` and `spark.kubernetes.driver.pod.name` properties (delete, not set to blank), and finally restart the Spark interpreter (see also screenshot below).

An service is created for the Spark UI but going via the proxy will not work.

```shell
# Fails as the Spark UI redirects to http://localhost:8001/jobs
http://localhost:8001/api/v1/namespaces/default/services/http:spitfire-spitfire-spark-ui:4040/proxy
```

You have to use a port forward to browse the Spark UI.

```shell
export DRIVER_POD=<you-driver-pod-name>
kubectl port-forward $DRIVER_POD 4040:4040 &
```

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

# Additional Documentation

> At the time being, the needed code is not integrated in the `master` branches of `apache-zeppelin` nor the `apache-spark-on-k8s/spark` repositories.
> You are welcome to already ty it out and send any feedback and question.

First things first, you have to choose the following modes in which you will run Zeppelin with Spark on Kubernetes:

+ The `Kubernetes modes`: Can be `in-cluster` (within a Pod) or `out-cluster` (from outside the Kubernetes cluster).
+ The `Spark deployment modes`: Can be `client` or `cluster`.

Only three combinations of these options are supported:

1. `in-cluster` with `spark-client` mode.
2. `in-cluster` with `spark-cluster` mode.
3. `out-cluster` with `spark-cluster` mode.

For now, to be able to test these combinations, you need to build specific branches (see hereafter) or to use third-party Helm charts or Docker images. The needed branches and related PR are listed here:

1. In-cluster client mode [see pull request #456](https://github.com/apache-spark-on-k8s/spark/pull/456)
2. Add support to run Spark interpreter on a Kubernetes cluster [see pull request #2637](https://github.com/apache/zeppelin/pull/2637)

## In-Cluster with Spark-Client

![In-Cluster with Spark-Client](/images/zeppelin/zeppelin_in-cluster_spark-client.svg "In-Cluster with Spark-Client")

Build a new Zeppelin based on [#456 In-cluster client mode](https://github.com/apache-spark-on-k8s/spark/pull/456).

Once done, deploy that new build in a Kubernetes Pod with the following interpreter settings:

+ `spark.master`: k8s://https://kubernetes:443
+ `spark.submit.deployMode`: client
+ `spark.kubernetes.driver.pod.name`: The name of the pod where your Zeppelin instance is running.
+ `spark.app.name`: Any name you want, without space nor special characters.
+ Other spark.k8s properties you need to make your spark working (see [Running Spark on Kubernetes](./running-on-kubernetes.html)) such as `spark.kubernetes.initcontainer.docker.image`, `spark.kubernetes.driver.docker.image`, `spark.kubernetes.executor.docker.image`...

## In-Cluster with Spark-Cluster

![In-Cluster with Spark-Cluster](/images/zeppelin/zeppelin_in-cluster_spark-cluster.svg "In-Cluster with Spark-Cluster")

Build a new Zeppelin Docker image based on [#2637 Spark interpreter on a Kubernetes](https://github.com/apache/zeppelin/pull/2637).

Once done, deploy that new build in a Kubernetes Pod with the following interpreter settings:

+ `spark.master`: k8s://https://kubernetes:443
+ `spark.submit.deployMode`: cluster
+ `spark.kubernetes.driver.pod.name`: Do not set this property.
+ `spark.app.name`: Any name you want, without space nor special characters.
+ Other spark.k8s properties you need to make your spark working (see [Running Spark on Kubernetes](./running-on-kubernetes.html)) such as `spark.kubernetes.initcontainer.docker.image`, `spark.kubernetes.driver.docker.image`, `spark.kubernetes.executor.docker.image`...

## Out-Cluster with Spark-Cluster

![Out-Cluster with Spark-Cluster](/images/zeppelin/zeppelin_out-cluster_spark-cluster.svg "Out-Cluster with Spark-Cluster")

Build a new Spark and their associated docker images based on [#2637 Spark interpreter on a Kubernetes](https://github.com/apache/zeppelin/pull/2637).

Once done, any vanilla Apache Zeppelin deployed in a Kubernetes Pod (your can use a Helm chart for this) will work out-of-the box with the following interpreter settings:

+ `spark.master`: k8s://https://ip-address-of-the-kube-api:6443 (port may depend on your setup)
+ `spark.submit.deployMode`: cluster
+ `spark.kubernetes.driver.pod.name`: Do not set this property.
+ `spark.app.name`: Any name you want, without space nor special characters.
+ Other spark.k8s properties you need to make your spark working (see [Running Spark on Kubernetes](./running-on-kubernetes.html)) such as `spark.kubernetes.initcontainer.docker.image`, `spark.kubernetes.driver.docker.image`, `spark.kubernetes.executor.docker.image`...

<!--

Run `spitfire-scrap` (contains Apache Zeppelin with python and Firefox tuned for WEB Scraping) on a linux machine with this shell command:

```
docker \
  run \
  --name datalayer-spitfire \
  --hostname spitfire.datalayer.io.local \
  --privileged \
  --memory=15g \
  --cpus=8 \
  --shm-size=4g \
  -e DATALAYER_NODE_TYPE=f+m+s \
  -itP \
  -p 80:80 \
  -p 2222:22 \
  -p 1618:1618 \
  -p 4040:4040 \
  -p 8088:8088 \
  -p 50070:50070 \
  datalayer/spitfire-scrap:latest
```

Open [http://localhost:80](http://localhost:80) in your favorite browser.

For configuration persistence, you can add to the command volumes from your local drive (ensure you have feeded them with the correct configuration):

```
  -v /etc/datalayer:/etc/datalayer \
  -v /var/datalayer:/var/datalayer \
```

-->