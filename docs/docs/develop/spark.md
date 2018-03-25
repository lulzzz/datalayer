---
title: Apache Spark
---

## Repositories and Automated Build

**Apache Spark**

Source: https://github.com/apache/spark

Docs: https://spark.apache.org/docs/latest/running-on-kubernetes.html

Automated build (Write `K8S` in the PR name).
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-spark-integration
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution
+ Example
 + https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution/729/consoleFull
+ Build Command
 + mvn -T 1C clean install -DskipTests -Phadoop-2.7 -Dhadoop.version=2.9.0 -Pkubernetes
 + mvn -T 1C clean package -DskipTests -DzincPort=3427 -Phadoop-2.7 -Pkubernetes -Pkinesis-asl -Phive -Phive-thriftserve
 
**Apache Spark K8S Fork**

Source: https://github.com/apache-spark-on-k8s/spark

Docs: https://apache-spark-on-k8s.github.io/userdocs/running-on-kubernetes.html

Automated Build:
+ http://spark-jenkins.pepperdata.org:8080/view/upstream%20spark/
+ http://spark-jenkins.pepperdata.org:8080/job/PR-spark-integration-test
+ http://spark-jenkins.pepperdata.org:8080/job/PR-spark-integration-test/1361/consoleFull
+ Build Command
 + ./build/mvn -B -Dmaven.repo.local=/home/jenkins/.m2/pr_intg_test_repo clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite
 + ./build/mvn -B clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite

**Test Grid**

```
https://k8s-testgrid.appspot.com/sig-big-data
https://k8s-testgrid.appspot.com/sig-big-data#spark-periodic-default-gke
```

## Create the Datalayer Branch

Create the `spark-datalayer` branch.

```
cd $DLAHOME/repos/spark
git checkout branch-2.2-kubernetes
datalayer spark-merge
git push -f origin datalayer
```

## Build Full Distribution

```
datalayer spark-mvn clean
datalayer spark-build-dist
```

## Build and Push Docker Images

```
# To Docker Hub
datalayer spark-docker-build-push
```

```
# To local registry
datalayer spark-docker-push-local
```

## Setup Minikube

See [Minikube Howto](./minikube).

## Deploy Shuffle Service

```
kubectl delete -f $DLAHOME/specs/spark/spark-shuffle-service.yaml
kubectl create -f $DLAHOME/specs/spark/spark-shuffle-service.yaml
```

## Deploy Resource Staging Server

```
kubectl delete -f $DLAHOME/specs/spark/spark-resource-staging-server.yaml
kubectl create -f $DLAHOME/specs/spark/spark-resource-staging-server.yaml
```

```
kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'
RSS_POD=$(kubectl get pods -n default -l "spark-resource-staging-server-instance=default" -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $RSS_POD -- bash
kubectl port-forward $RSS_POD 10000:10000
```

```
minikube service spark-resource-staging-service
```

## Cluster Info

```
APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}')
echo -e """
APISERVER=$APISERVER
RESOURCESTAGINGSERVER=$RESOURCESTAGINGSERVER
"""
```

```
export APISERVER=https://192.168.99.100:8443
export RESOURCESTAGINGSERVER=10.98.123.170
```

## Incremental and Push to Local Registry

```
cd $DLAHOME/repos/spark/resource-managers/kubernetes/core
datalayer spark-mvn install -DskipTests
cp $DLAHOME/repos/spark/resource-managers/kubernetes/core/target/spark-kubernetes_2.11-2.2.0-k8s-0.5.0.jar /opt/spark/jars/spark-kubernetes_2.11-2.2.0-k8s-0.5.0.jar
datalayer spark-docker-build
datalayer spark-docker-push-local
```

## Integration Tests

```
datalayer spark-integration-test-pre
datalayer spark-integration-test-run
```

```
datalayer spark-integration-test
```

```
$DLAHOME/repos/spark-integration/dev/dev-run-integration-tests.sh \
  --spark-tgz $DLAHOME/packages/spark-2.2.0-k8s-0.5.0.tgz \
  --image-repo localhost:5000 \
  --image-tag 2.2.0
```

## IDE

```
-Dscala.usejavacp=true
```

**Shell**

```
+ `org.apache.spark.repl.Main` (use -D for additional properties)
```

```
--conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name= --conf spark.submit.deployMode=client --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.97.96.231:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=2 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --class org.apache.spark.repl.Main --name "Spark shell" --jars file:///d/hbase-common-1.4.0.jar spark-shell
```

**Submit**

```
+ `org.apache.spark.deploy.SparkSubmit` (use --conf for additional properties)
+ `org.apache.spark.deploy.SparkSubmit` --class org.apache.spark.examples.SparkPi local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 10
```

```
# Client Mode
--conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name= --conf spark.submit.deployMode=client --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.97.96.231:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=2 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --name "Spark Sumit" --jars file:///d/hbase-common-1.4.0.jar --class org.apache.spark.examples.SparkPi local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 10
```

```
# Cluster Mode
--conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name= --conf spark.submit.deployMode=cluster --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.97.96.231:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=2 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --name "spark-submit" --class org.apache.spark.examples.SparkPi local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 10
```

## Pods

**Option 1**

```
kubectl delete -f $DLAHOME/specs/spark/spark-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl delete pod $POD_NAME --grace-period 0 --force
kubectl get pods
```

```
kubectl apply -f $DLAHOME/specs/spark/spark-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME bash
```

**Option 2 (Quicker)**

```
kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark-driver:2.2.0 --restart=Never -- bash
kubectl attach -it spark-pod
```

**Executor**

```
kubectl delete pod spark-exec-1 --grace-period 0 --force; kubectl delete pod spark-exec-2 --grace-period 0 --force
```

## Shell

```
spark.kubernetes.driver.pod.name
```

```
APP_NAME=spark-shell-client-mode-in-cluster
APISERVER=https://kubernetes:443
RESOURCESTAGINGSERVER=10.97.96.231
datalayer spark-spl-shell
```

```
#  --conf spark.kubernetes.driver.pod.name="$HOSTNAME" \
APP_NAME=spark-shell-client-mode-out-cluster
APISERVER=https://192.168.99.100:8443
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}')
datalayer spark-spl-shell
```

## Submit

```
APP_NAME=spark-submit-client-mode-in-cluster
APISERVER=https://kubernetes:443
RESOURCESTAGINGSERVER=10.97.96.231
datalayer spark-spl-submit
```

```
APP_NAME=spark-submit-client-mode-out-cluster
# APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
APISERVER=https://192.168.99.100:8443
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}')
datalayer spark-spl-submit
```

**Submit in Cluster Mode**

```
APP_NAME=spark-submit-cluster-mode-in-cluster
APISERVER=https://kubernetes:443
RESOURCESTAGINGSERVER=10.97.96.231
datalayer spark-spl-submit
```

```
APP_NAME=spark-submit-cluster-mode-out-cluster
APISERVER=https://192.168.99.100:8443
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}')
datalayer spark-spl-submit
```

## Benchmarks

```
#  --class com.bbva.spark.benchmarks.dfsio.TestDFSIO \
#  /src/benchmarks/spark-benchmarks/dfsio/target/scala-2.11/spark-benchmarks-dfsio-0.1.0-with-dependencies.jar \
#    write --numFiles 10 --fileSize 1GB --outputDir hdfs://hadoop-k8s-hadoop-k8s-hdfs-nn:9000/benchmarks/DFSIO
```

## Contributions

<table class="bodyTable table table-striped table-hover" border="1">

  <tbody>

  <tr class="a">
    <td style="text-align: center;"><b>DESCRIPTION</b></td>
    <td style="text-align: center;"><b>JIRA</b></td>
    <td style="text-align: center;"><b>REPOSITORY</b></td>
    <td style="text-align: center;"><b>DOC</b></td>
    <td style="text-align: center;"><b>PR</b></td>
    <td style="text-align: center;"><b>STATUS</b></td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Client Mode</td>
    <td><a href="https://issues.apache.org/jira/browse/SPARK-23146">SPARK-23146</a></td>
    <td>
      <a href="https://github.com/datalayer-contrib/spark/tree/k8s-client-mode dev">datalayer-contrib:k8s-client-mode</a>
      <br/>
      <a href="https://github.com/datalayer-contrib/spark/tree/client-mode-datalayer-dev">datalayer-contrib:client-mode-datalayer-dev</a>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/userdocs/pull/25">[WIP] Describe Spark submit in relation with client-mode (+ hadoop and dependencies)</a></td>
    <td>
      <a href="https://github.com/apache/spark/pull/20451">datalayer-contrib:k8s-client-mode</a>
      <br/>
      <a href="https://github.com/apache-spark-on-k8s/spark/pull/456">#456</a>
    </td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Refactor Kubernetes code for configuring driver/executor pods to use consistent and cleaner abstraction
      <br/>
      https://issues.apache.org/jira/browse/SPARK-22839
      <br/>
      https://docs.google.com/document/d/1XPLh3E2JJ7yeJSDLZWXh_lUcjZ1P0dy9QeUEyxIlfak/edit
      <br/>
      Initial framework for pod construction architecture refactor. https://github.com/mccheah/spark/pull/1
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Refactor Steps Orchestrator based on the Chain Pattern
      <br/>
      https://github.com/apache-spark-on-k8s/spark/issues/604
      <br/>
      Example: Include and exclude driver and executor steps (with etcd example)
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [INTEGRATION_TESTS] Random failure of tests (java.net.ConnectException)
      <br/>
      https://github.com/apache-spark-on-k8s/spark/issues/571
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Use a pre-installed Minikube instance for integration tests.
      <br/>
      https://github.com/apache-spark-on-k8s/spark/pull/521
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Application names should support whitespaces and special characters
      <br/>
      https://github.com/apache-spark-on-k8s/spark/issues/551
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [ShuffleService] Need for spark.local.dir?
      <br/>
      https://github.com/apache-spark-on-k8s/spark/issues/549
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Spark UI
      <br/>
      When Spark runs, it gives you a useful user interface to manage and monitor your jobs and configuration (` echo http://localhost:4040`).
      <br/>
      This can be enhanced with a specific tab for Kubernetes
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>Docker Logging Handler</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/docker-logging-handler">datalayer-contrib:spark/docker-logging-handler</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/576">#576</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>Disable ssl test for staging server if current classpath contains the jetty shaded classes</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/jetty-sslcontext">datalayer-contrib:spark/jetty-sslcontext</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/issues/463">#463</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/573">#573</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Develop and build Kubernetes modules in isolation without the other Spark modules</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/kubernetes-parent">datalayer-contrib:spark/kubernetes-parent</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/570">#570</a></td>
    <td>OPEN</td>
  </tr>

  <tr class="a">
    <td>Add libc6-compat in spark-bash to allow parquet</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark/tree/libc6-compat">datalayer-contrib:spark/libc6-compat</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/issues/504">#504</a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/spark/pull/550">#550</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>Add documentation for Zeppelin with Spark on Kubernetes</td>
    <td></td>
    <td><a href="https://github.com/datalayer-contrib/spark-docs/tree/zeppelin">datalayer-contrib:spark-docs/zeppelin</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache-spark-on-k8s/userdocs/pull/21">#21</a></td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [WIP] [SPARK-19552] [BUILD] Upgrade Netty version to 4.1.8 final https://github.com/apache/spark/pull/16888
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>

  </tbody>

</table>
