---
title: Apache Spark
---

## Apache Spark

Source on `https://github.com/apache/spark`.

Docs on `https://spark.apache.org/docs/latest/running-on-kubernetes.html`.

Automated build (Write `K8S` in the PR name).
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-spark-integration
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution

Example
+ https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution/729/consoleFull

Build Command
+ `mvn -T 1C clean install -DskipTests -Phadoop-2.7 -Dhadoop.version=2.9.0 -Pkubernetes`
+ `mvn -T 1C clean package -DskipTests -DzincPort=3427 -Phadoop-2.7 -Pkubernetes -Pkinesis-asl -Phive -Phive-thriftserve`
 
## Apache Spark K8S Fork

Source on `https://github.com/apache-spark-on-k8s/spark`.

Docs on `https://apache-spark-on-k8s.github.io/userdocs/running-on-kubernetes.html`.

Automated Build:
+ http://spark-jenkins.pepperdata.org:8080/view/upstream%20spark/
+ http://spark-jenkins.pepperdata.org:8080/job/PR-spark-integration-test
+ http://spark-jenkins.pepperdata.org:8080/job/PR-spark-integration-test/1361/consoleFull

Build Command
+ `./build/mvn -B -Dmaven.repo.local=/home/jenkins/.m2/pr_intg_test_repo clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite`
+ `./build/mvn -B clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite`

## Datalayer Branch

Create the `datalayer` branch.

```
cd $DLAHOME/repos/spark
git checkout branch-2.2-kubernetes
datalayer spark-merge
git push -f origin datalayer
```

## Build Distribution

```
datalayer spark-build-dist
```

```
datalayer spark-build-dist-fork
```

## Minikube

Follow [Minikube Howto](./../minikube) to setup Minikube.

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

## Docker Images

```
# 2.2.0-fork Build and push to Docker Hub
datalayer spark-docker-build-push
```

```
# 2.2.0-fork Build and push to local registry
datalayer spark-docker-build-push-local
```

```
# 2.4.0
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 build
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 push
```

## Shuffle Service

```
kubectl delete -f $DLAHOME/manifests/spark/spark-shuffle-service.yaml
kubectl create -f $DLAHOME/manifests/spark/spark-shuffle-service.yaml
```

## Resource Staging Server

```
kubectl delete -f $DLAHOME/manifests/spark/spark-resource-staging-server.yaml
kubectl create -f $DLAHOME/manifests/spark/spark-resource-staging-server.yaml
```

```
kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'
```

```
RSS_POD=$(kubectl get pods -n default -l "spark-resource-staging-server-instance=default" -o jsonpath="{.items[0].metadata.name}")
echo $RSS_POD
kubectl exec -it $RSS_POD -- bash
```

```
minikube service spark-resource-staging-service
```

```
kubectl port-forward $RSS_POD 10000:10000
curl http://localhost:10000
```

## Incremental Build

```
# 2.2.0-fork
cd $DLAHOME/repos/spark/resource-managers/kubernetes/core
datalayer spark-mvn clean -DskipTests
datalayer spark-mvn install -DskipTests
cp $DLAHOME/repos/spark/resource-managers/kubernetes/core/target/spark-kubernetes_*.jar /opt/spark/jars
# datalayer spark-docker-build-push-local
```

```
# 2.4.0
cd $DLAHOME/repos/spark/resource-managers/kubernetes/core
datalayer spark-mvn clean -DskipTests
datalayer spark-mvn install -DskipTests
cp $DLAHOME/repos/spark/resource-managers/kubernetes/core/target/spark-kubernetes_*.jar /opt/spark/jars
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 build
cd /opt/spark; ./bin/docker-image-tool.sh -r localhost:5000 -t 2.4.0 push
```

## Integration Tests

```
# 2.2.0-fork
datalayer spark-integration-test
# datalayer spark-integration-test-pre
# datalayer spark-integration-test-run
```

```
kubectl apply -f $DLAHOME/repos/spark-integration/dev/spark-rbac.yaml
```

```
# 2.4.0
cd $DLAHOME/repos/spark-integration
./dev/dev-run-integration-tests.sh \
  --spark-tgz $DLAHOME/packages/spark-2.4.0-SNAPSHOT-bin-hdfs-2.9.0.tgz
```

```
cd $DLAHOME/repos/spark-integration
./dev/dev-run-integration-tests.sh \
  --spark-tgz $DLAHOME/packages/spark-2.4.0-SNAPSHOT-bin-hdfs-2.9.0.tgz \
  --image-repo localhost:5000 \
  --image-tag 2.4.0
```

## Test Grid

```
https://k8s-testgrid.appspot.com/sig-big-data
https://k8s-testgrid.appspot.com/sig-big-data#spark-periodic-default-gke
```

## IDE

```
-Dscala.usejavacp=true
```

```
# shell - use -D for additional properties
org.apache.spark.repl.Main
```

```
# submit - use --conf for additional properties
org.apache.spark.deploy.SparkSubmit
```

## Out-Cluster

```
APP_NAME=spark-shell-client-mode-out-cluster \
APISERVER=https://192.168.99.100:8443 \
DEPLOY_MODE=client \
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}') \
DRIVER_POD_NAME=spark-driver \
datalayer spark-spl-shell
```

```
APP_NAME=submit-cluster-mode-out-cluster \
APISERVER=https://192.168.99.100:8443 \
DEPLOY_MODE=cluster \
DRIVER_POD_NAME=spark-driver \
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}') \
datalayer spark-spl-submit
```

```
APP_NAME=submit-client-mode-out-cluster \
APISERVER=https://192.168.99.100:8443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER=$(kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}') \
datalayer spark-spl-submit
```

## In-Cluster

```
# 2.2.0-fork
kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark-driver:2.2.0 --restart=Never -- bash
```

```
# 2.4.0
kubectl delete pod spark-pod --grace-period 0 --force; kubectl run -it spark-pod --image-pull-policy=Always --image=localhost:5000/spark:2.4.0 --restart=Never -- sh
```

```
APP_NAME=shell-client-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER=10.102.217.130 \
datalayer spark-spl-shell
```

```
APP_NAME=submit-cluster-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=cluster \
DRIVER_POD_NAME=spark-driver \
RESOURCESTAGINGSERVER=10.102.217.130 \
datalayer spark-spl-submit
```

```
APP_NAME=submit-client-mode-in-cluster \
APISERVER=https://kubernetes:443 \
DEPLOY_MODE=client \
DRIVER_POD_NAME=$HOSTNAME \
RESOURCESTAGINGSERVER=10.102.217.130 \
datalayer spark-spl-submit
```

```
# option-1
kubectl delete -f $DLAHOME/manifests/spark/spark-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl delete pod $POD_NAME --grace-period 0 --force
kubectl apply -f $DLAHOME/manifests/spark/spark-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME bash
```

```
# option-2
kubectl attach -it spark-pod
kubectl delete pod spark-exec-1 --grace-period 0 --force; kubectl delete pod spark-exec-2 --grace-period 0 --force
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
    <td style="text-align: center;"><b>ISSUE</b></td>
    <td style="text-align: center;"><b>REPOSITORY</b></td>
    <td style="text-align: center;"><b>DOC</b></td>
    <td style="text-align: center;"><b>PR</b></td>
    <td style="text-align: center;"><b>STATUS</b></td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Client Mode</td>
    <td>
      <a href="https://issues.apache.org/jira/browse/SPARK-23146">SPARK-23146</a>
    </td>
    <td>
      Apache: <a href="https://github.com/datalayer-contrib/spark/tree/k8s-client-mode">datalayer-contrib:k8s-client-mode</a>
      <br/>
      <br/>
      Apache Fork: <a href="https://github.com/datalayer-contrib/spark/tree/client-mode-datalayer-dev">datalayer-contrib:client-mode-datalayer-dev</a>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/userdocs/pull/25">[WIP] Describe Spark submit in relation with client-mode (+ hadoop and dependencies)</a></td>
    <td>
      <a href="https://github.com/apache/spark/pull/20451">datalayer-contrib:k8s-client-mode</a>
      <br/>
      <br/>
      <a href="https://github.com/apache-spark-on-k8s/spark/pull/456">#456</a>
    </td>
    <td>OPEN</td>
  </tr>

  <!-- -->

  <tr class="a">
    <td>Integration Tests for Client Mode</td>
    <td><a href="https://issues.apache.org/jira/browse/SPARK-23146">SPARK-23146</a></td>
    <td>
      <a href="https://github.com/datalayer-contrib/spark-integration/tree/client-mode dev">datalayer-contrib:client-mode</a>
    </td>
    <td>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/spark-integration/pull/45">#45</a>
    </td>
    <td>OPEN</td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Refactor Kubernetes code for configuring driver/executor pods to use consistent and cleaner abstraction
    </td>
    <td>
      <a href="https://issues.apache.org/jira/browse/SPARK-22839">SPARK-22839</a>
    </td>
    <td>
      <a href="https://github.com/mccheah/spark/tree/spark-22839-incremental">mccheah:spark-22839-incremental</a>
    </td>
    <td>
      <a href="https://docs.google.com/document/d/1XPLh3E2JJ7yeJSDLZWXh_lUcjZ1P0dy9QeUEyxIlfak/edit">Initial framework for pod construction architecture refactor</a>
    </td>
    <td>
      <a href="https://github.com/apache/spark/pull/20910">#20910</a>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Refactor Steps Orchestrator based on the Chain Pattern
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/spark/issues/604">#604</a>
    </td>
    <td>
    </td>
    <td>
      Example: Include and exclude driver and executor steps (with etcd example)
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
    </td>
    <td>
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
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Use a pre-installed Minikube instance for integration tests.
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/spark/pull/521">#521</a>
    </td>
    <td>
    </td>
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Application names should support whitespaces and special characters
    </td>
    <td>
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
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      [ShuffleService] Need for spark.local.dir?
    </td>
    <td>
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
  </tr>

  <!-- -->
  
  <tr class="a">
    <td>
      Spark UI
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
      When Spark runs, it gives you a useful user interface to manage and monitor your jobs and configuration (` echo http://localhost:4040`).
      <br/>
      This can be enhanced with a specific tab for Kubernetes
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
      [WIP] [SPARK-19552] [BUILD] Upgrade Netty version to 4.1.8 final 
    </td>
    <td>
    </td>
    <td>
      https://github.com/apache/spark/pull/16888
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
