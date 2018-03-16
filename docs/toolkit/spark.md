# Spark

## Dev

+ Refactor Steps Orchestrator based on the Chain Pattern  https://github.com/apache-spark-on-k8s/spark/issues/604
+ Include and exclude driver and executor steps (with etcd example)
+ spark-k8s-ui
+ [INTEGRATION_TESTS] Random failure of tests (java.net.ConnectException) https://github.com/apache-spark-on-k8s/spark/issues/571
+ Application names should support whitespaces and special characters https://github.com/apache-spark-on-k8s/spark/issues/551
+ [ShuffleService] Need for spark.local.dir ? https://github.com/apache-spark-on-k8s/spark/issues/549
+ Use a pre-installed Minikube instance for integration tests. https://github.com/apache-spark-on-k8s/spark/pull/521
+ Upgrade Netty version to 4.1.8 final https://github.com/apache/spark/pull/16888

## Spark K8S Fork

https://apache-spark-on-k8s.github.io/userdocs/running-on-kubernetes.html

http://spark-k8s-jenkins.pepperdata.org:8080/job/PR-spark-k8s-integration-test
http://spark-k8s-jenkins.pepperdata.org:8080/job/PR-spark-k8s-integration-test/1361/consoleFull

./build/mvn -B -Dmaven.repo.local=/home/jenkins/.m2/pr_intg_test_repo clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite

http://spark-k8s-jenkins.pepperdata.org:8080/view/upstream%20spark/

```
./build/mvn -B clean integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite
```

```
./build/mvn -B integration-test -Pkubernetes -Pkubernetes-integration-tests -pl resource-managers/kubernetes/integration-tests -am -Dtest=none -DwildcardSuites=org.apache.spark.deploy.k8s.integrationtest.KubernetesSuite
```

## Apache Spark

PR with `[K8S]` on the name

https://dist.apache.org/repos/dist/dev/spark/v2.3.0-rc5-docs/_site/running-on-kubernetes.html

https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-spark-integration/

https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution

https://amplab.cs.berkeley.edu/jenkins/job/testing-k8s-prb-make-spark-distribution/729/consoleFull

```
mvn -T 1C clean package -DskipTests -DzincPort=3427 -Phadoop-2.7 -Pkubernetes -Pkinesis-asl -Phive -Phive-thriftserve
```

```
mvn -T 1C clean install -DskipTests -Phadoop-2.7 -Dhadoop.version=2.9.0 -Pkubernetes
```

## Build

```
cd /src/k8s/spark-k8s
# datalayer-spark-k8s-merge
datalayer-spark-k8s-mvn install -DskipTests
datalayer-spark-k8s-build-dist
datalayer-spark-k8s-docker-create
```

```
datalayer-spark-k8s-docker-build-push
```

```
cd /src/k8s/spark-k8s/resource-managers/kubernetes/core
# datalayer-spark-k8s-mvn clean -DskipTests
datalayer-spark-k8s-mvn install -DskipTests
cp /src/k8s/spark-k8s/resource-managers/kubernetes/core/target/spark-kubernetes_2.11-2.2.0-k8s-0.5.0.jar /opt/spark/jars/spark-kubernetes_2.11-2.2.0-k8s-0.5.0.jar
datalayer-spark-k8s-docker-build; datalayer-spark-k8s-docker-push-local
```

## Registry

```
docker push localhost:5000/spark-k8s-driver:2.2.0
docker push localhost:5000/spark-k8s-executor:2.2.0
```

## Resource Staging Server

```
cd /sdk/specs/k8s
kubectl delete -f spark/spark-k8s-resource-staging-server.yaml
kubectl create -f spark/spark-k8s-resource-staging-server.yaml
```

```
kubectl get svc spark-k8s-resource-staging-service -o jsonpath='{.spec.clusterIP}'
RSS_POD=$(kubectl get pods -n default -l "spark-k8s-resource-staging-server-instance=default" -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $RSS_POD -- bash
kubectl port-forward $RSS_POD 10000:10000
```

```
minikube service spark-k8s-resource-staging-service
```

## Shuffle Service

```
cd /sdk/specs/k8s
kubectl delete -f spark/spark-shuffle-service.yaml
kubectl create -f spark/spark-shuffle-service.yaml
k get pods
```

## Info

```
APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
RESOURCESTAGINGSERVER=$(kubectl get svc spark-k8s-resource-staging-service -o jsonpath='{.spec.clusterIP}')
echo -e """
APISERVER=$APISERVER
RESOURCESTAGINGSERVER=$RESOURCESTAGINGSERVER
"""
```

## Conf

```
spark.dynamicAllocation.minExecutors 5
```

```
        "spark.kubernetes.driver.pod.name": {
          "name": "spark.kubernetes.driver.pod.name",
          "value": "SPARK_KUBERNETES_DRIVER_POD_NAME",
          "type": "textarea"
        },
```

## Base Pod 1

```
kubectl delete -f spark/spark-k8s-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-k8s-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl delete pod $POD_NAME --grace-period 0 --force
kubectl get pods
```

```
kubectl apply -f spark/spark-k8s-base.yaml
export POD_NAME=$(kubectl get pods -n default -l spark-k8s-base=base -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD_NAME bash
```

## Base Pod 2 (quicker)

```
kubectl delete pod spark-k8s-pod --grace-period 0 --force; kubectl run --image-pull-policy=Always -it spark-k8s-pod --image-pull-policy=Always --image=localhost:5000/spark-k8s-driver:2.2.0 --restart=Never -- bash
```

```
kubectl attach -it spark-k8s-pod
```

## Spark Shell Client Mode

`org.apache.spark.repl.Main` (use -D)

`org.apache.spark.deploy.SparkSubmit` (use --conf)

```
-Dscala.usejavacp=true
```

```
--conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name= --conf spark.submit.deployMode=client --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.97.96.231:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=2 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --class org.apache.spark.repl.Main --name "Spark shell" --jars file:///d/hbase-common-1.4.0.jar spark-shell
```

```
kubectl delete pod spark-exec-1 --grace-period 0 --force; kubectl delete pod spark-exec-2 --grace-period 0 --force
```

```
(1 to 1000).toDS.map(i => {
  println(org.apache.hadoop.hbase.HConstants.DEFAULT_MASTER_PORT)
  org.apache.hadoop.hbase.HConstants.DEFAULT_MASTER_PORT
  }).collect
(1 to 100).toDS.map(_*2).collect
List(1,2,3).toDS.map(i => {
  import org.apache.hadoop.hbase.FAKE
  i*2
  }).collect
```

```
# spark-shell client-mode in-cluster
APISERVER=https://kubernetes:443
RESOURCESTAGINGSERVER=10.97.96.231
/opt/spark/bin/spark-shell \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.kubernetes.resourceStagingServer.uri=http://"$RESOURCESTAGINGSERVER":10000 \
  --conf spark.submit.deployMode=client \
  --conf spark.executor.instances=2 \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.kubernetes.driver.pod.name="$HOSTNAME" \
  --conf spark.kubernetes.namespace=default \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --jars http://central.maven.org/maven2/org/apache/hbase/hbase-common/1.4.0/hbase-common-1.4.0.jar
```

```
# spark-shell client-mode out-cluster
#  --conf spark.kubernetes.driver.pod.name="$HOSTNAME" \
# APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
APISERVER=https://192.168.99.100:8443
RESOURCESTAGINGSERVER=$(kubectl get svc spark-k8s-resource-staging-service -o jsonpath='{.spec.clusterIP}')
/opt/spark/bin/spark-shell \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.kubernetes.resourceStagingServer.uri=http://"$RESOURCESTAGINGSERVER":10000 \
  --conf spark.submit.deployMode=client \
  --conf spark.kubernetes.namespace=default \
  --conf spark.app.name="$APP_NAME" \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.executor.instances=2 \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --jars http://central.maven.org/maven2/org/apache/hbase/hbase-common/1.4.0/hbase-common-1.4.0.jar
```

## Spark Submit Client Mode

`org.apache.spark.deploy.SparkSubmit` --class org.apache.spark.examples.SparkPi local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 10

```
-Dscala.usejavacp=true
```

```
--conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name= --conf spark.submit.deployMode=client --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.97.96.231:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=2 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --name "Spark Sumit" --jars file:///d/hbase-common-1.4.0.jar --class org.apache.spark.examples.SparkPi local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 10
```

```
APP_NAME=spark-submit-client-mode-in-cluster
APISERVER=https://kubernetes:443
RESOURCESTAGINGSERVER=10.97.96.231
/opt/spark/bin/spark-submit \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.kubernetes.resourceStagingServer.uri=http://"$RESOURCESTAGINGSERVER":10000 \
  --conf spark.submit.deployMode=client \
  --conf spark.app.name="$APP_NAME" \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.executor.instances=2 \
  --conf spark.kubernetes.namespace=default \
  --conf spark.kubernetes.driver.pod.name="$HOSTNAME" \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --class org.apache.spark.examples.SparkPi \
  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
  10
#  local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar \
#  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
```

```
APP_NAME=spark-submit-client-mode-out-cluster
# APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
APISERVER=https://192.168.99.100:8443
RESOURCESTAGINGSERVER=$(kubectl get svc spark-k8s-resource-staging-service -o jsonpath='{.spec.clusterIP}')
/opt/spark/bin/spark-submit \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.kubernetes.resourceStagingServer.uri=http://"$RESOURCESTAGINGSERVER":10000 \
  --conf spark.submit.deployMode=client \
  --conf spark.app.name="$APP_NAME" \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.executor.instances=2 \
  --conf spark.kubernetes.namespace=default \
  --conf spark.kubernetes.driver.pod.name=spark-submit-client-mode-out-cluster \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --class org.apache.spark.examples.SparkPi \
  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
  10
#  local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar \
#  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
```

## Spark Submit Cluster Mode

```
-Dscala.usejavacp=true
```

```
--conf spark.master=k8s://https://192.168.99.100:8443 --conf spark.local.dir=/tmp/spark-local --conf spark.sql.catalogImplementation=in-memory --conf spark.app.name= --conf spark.submit.deployMode=cluster --conf spark.kubernetes.shuffle.namespace=default --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 --conf spark.kubernetes.namespace=default --conf spark.kubernetes.resourceStagingServer.uri=http://10.97.96.231:10000 --conf spark.kubernetes.shuffle.labels=app=spark-shuffle-service,spark-version=2.2.0 --conf spark.shuffle.service.enabled=false --conf spark.executor.instances=2 --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 --conf spark.dynamicAllocation.enabled=false --name "spark-submit" --class org.apache.spark.examples.SparkPi local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 10
```

```
#  --class com.bbva.spark.benchmarks.dfsio.TestDFSIO \
#  /src/benchmarks/spark-benchmarks/dfsio/target/scala-2.11/spark-benchmarks-dfsio-0.1.0-with-dependencies.jar \
#    write --numFiles 10 --fileSize 1GB --outputDir hdfs://hadoop-k8s-hadoop-k8s-hdfs-nn:9000/benchmarks/DFSIO
```

```
APP_NAME=spark-submit-cluster-mode-in-cluster
APISERVER=https://kubernetes:443
RESOURCESTAGINGSERVER=10.97.96.231
/opt/spark/bin/spark-submit \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.kubernetes.resourceStagingServer.uri=http://"$RESOURCESTAGINGSERVER":10000 \
  --conf spark.submit.deployMode=cluster \
  --conf spark.kubernetes.namespace=default \
  --conf spark.app.name="$APP_NAME" \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.executor.instances=2 \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --class org.apache.spark.examples.SparkPi \
  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
  10
#  local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar \
#  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
```

```
APP_NAME=spark-submit-cluster-mode-out-cluster
# APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
APISERVER=https://192.168.99.100:8443
RESOURCESTAGINGSERVER=$(kubectl get svc spark-k8s-resource-staging-service -o jsonpath='{.spec.clusterIP}')
/opt/spark/bin/spark-submit \
  --conf spark.master=k8s://"$APISERVER" \
  --conf spark.kubernetes.resourceStagingServer.uri=http://"$RESOURCESTAGINGSERVER":10000 \
  --conf spark.submit.deployMode=cluster \
  --conf spark.kubernetes.namespace=default \
  --conf spark.app.name="$APP_NAME" \
  --conf spark.sql.catalogImplementation=in-memory \
  --conf spark.executor.instances=2 \
  --conf spark.kubernetes.initcontainer.docker.image=localhost:5000/spark-k8s-init:2.2.0 \
  --conf spark.kubernetes.driver.docker.image=localhost:5000/spark-k8s-driver:2.2.0 \
  --conf spark.kubernetes.executor.docker.image=localhost:5000/spark-k8s-executor:2.2.0 \
  --conf spark.kubernetes.docker.image.pullPolicy=Always \
  --conf spark.dynamicAllocation.enabled=false \
  --conf spark.shuffle.service.enabled=false \
  --conf spark.kubernetes.shuffle.namespace=default \
  --conf spark.kubernetes.shuffle.labels="app=spark-shuffle-service,spark-version=2.2.0" \
  --conf spark.local.dir=/tmp/spark-local \
  --class org.apache.spark.examples.SparkPi \
  local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar \
  10
#  local:///opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar \
#  http://dl.bintray.com/palantir/releases/org/apache/spark/spark-examples_2.11/2.1.0-palantir1-58-g7f02e95/spark-examples_2.11-2.1.0-palantir1-58-g7f02e95.jar \
```

# UI

When Spark runs, it gives you a useful user interface to manage and monitor your jobs and configuration.

```
echo http://localhost:4040
```

# Shell

HADOOP_CONF_DIR= MASTER=local spark-shell

spark-shell --master yarn-client --driver-memory 1g --executor-memory 1g --executor-cores 1

$ spark-shell
$ datalayer-spark-shell

$ hdfs dfs -put /dataset/donut/donut.csv /donut.csv
$ hdfs dfs -ls /
$ spark-shell
scala> val data = sc.textFile("/dataset/donut/donut.csv")
scala> data.first


scala> sc.parallelize(1 to 1000).count() # should return 1000

# Sugar

scala> rdd.map(x=>x+1).reduce(x=>x+x)
scala> rdd.map(_+1).reduce((acc,x)=>acc+x)
scala> rdd.map(_+1).reduce(_+_)

## PI

```
val NUM_SAMPLES = 10000000
val count = sc.parallelize(1 to NUM_SAMPLES).map{i =>
  val x = Math.random()
  val y = Math.random()
  if (x*x + y*y < 1) 1 else 0
}.reduce(_ + _)
println("PI is roughly " + 4.0 * count / NUM_SAMPLES)
```

$ cd $SPARK_HOME
$ ./bin/run-example org.apache.spark.examples.SparkPi 2

$ cd $SPARK_HOME
$ ./bin/spark-submit --class org.apache.spark.examples.SparkPi --master yarn-client --driver-memory 1g --executor-memory 1g --executor-cores 1 ./lib/spark-examples*.jar
$ ./bin/spark-submit --class org.apache.spark.examples.SparkPi --master yarn-cluster --driver-memory 1g --executor-memory 1g --executor-cores 1 ./lib/spark-examples*.jar


```
val NUM_SAMPLES = 1000000
val count = sc.parallelize(1 to NUM_SAMPLES).map{i =>
    val x = Math.random()
    val y = Math.random()
    if (x*x + y*y < 1) 1 else 0 
  }.reduce(_ + _)
println("Pi is roughly " + 4.0 * count / NUM_SAMPLES)
```

## Word Count

```
hdfs dfs -mkdir /dataset
hdfs dfs -mkdir /dataset/gutenberg
hdfs dfs -ls /
hdfs dfs -put /dataset/gutenberg/pg20417.txt /tmp
hdfs dfs -ls /word
```

$ spark-shell

```
val file = sc.textFile("hdfs:///tmp/pg20417.txt")
file.count()
val the = file.filter(line => line.contains("the"))
the.count()
the.filter(line => line.contains("that")).count()
the.filter(line => line.contains("that")).collect()
the.cache()
```

## Scala

```
spark-class -cp "$SPARK_HOME/lib/*:./target/t4f-data-spark-core-1.0.0-SNAPSHOT.jar" Simple --master yarn-client
datalayer-spark-scala -cp "$SPARK_HOME/lib/*" $Datalayer_SRC_HOME/t4f-data.git/spark/core/src/main/scala/Simple.scala
```

STANDALONE APPLICATION                                                      |

This application reads a csv file, extracts the column names and
computes the mean and standard deviation of the first column.

```
$ mvn package; $SPARK_HOME/bin/spark-submit  \
  ./target/t4f-data-spark-core-1.0.0-SNAPSHOT.jar \
  --class "io.datalayer.spark.core.mean.SimpleMean" \
  --master yarn-client
```
```
$ mvn package; $SPARK_HOME/bin/spark-submit  \
  ./target/t4f-data-spark-core-1.0.0-SNAPSHOT.jar \
  --class "io.datalayer.spark.core.count.SimpleCount" \
  --master yarn-client
```

import breeze.linalg._
import breeze.stats.distributions._
val x = DenseMatrix.fill(10,10)(Gaussian(0,1).draw())

## Filter

val file = spark.textFile("...")
val errors = file.filter(line => line.contains("ERROR"))
// Count all the errors
errors.count()
// Count errors mentioning MySQL
errors.filter(line => line.contains("MySQL")).count()
// Fetch the MySQL errors as an array of strings
errors.filter(line => line.contains("MySQL")).collect()

## SQL

case class Record(key: Int, value: String)
import org.apache.spark.sql.SQLContext
val sqlContext = new SQLContext(sc)
import sqlContext.implicits._
val df = sc.parallelize((1 to 100).map(i => Record(i, s"val_$i"))).toDF
df.registerTempTable("records")
sqlContext.sql("SELECT * FROM records").collect().foreach(println)
val count = sqlContext.sql("SELECT COUNT(*) FROM records").collect().head.getLong(0)
println(s"COUNT(*): $count")

# Security

Get a Ticket

```
kinit eric@DATALAYER.IO
```

Put data into HDFS.

```
HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos datalayer-hdfs dfs -put README.md /tmp
HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos datalayer-hdfs dfs -ls /tmp
```

Launch Spark Shell

```
SPARK_JAVA_OPTS="-Dhdp.version=2.3.4.0-3485 -Dspark.yarn.am.extraJavaOptions=\"-Dhdp.version=2.3.4.0-3485\"" MASTER=yarn-client HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos ./bin/spark-shell
```

Launch Spark Shell with Proxy User.

```
SPARK_JAVA_OPTS="-Dhdp.version=2.3.4.0-3485 -Dspark.yarn.am.extraJavaOptions=\"-Dhdp.version=2.3.4.0-3485\"" MASTER=yarn-client HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos ./bin/spark-shell --proxy-user eric2
```

Launch Datalayer CLI.

```
DATALAYER_HADOOP=yarn-client DATALAYER_HADOOP_STATUS=started HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos datalayer-cli
```

Launch analysis.

```
val f = sc.textFile("/tmp/README.md")
val a = f.filter(line => line.contains("a")).count()
val b = f.filter(line => line.contains("b")).count()
println("Lines with a: %s, Lines with b: %s".format(a, b))
f.filter(line => line.contains("a")).saveAsTextFile("/tmp/a.md")
```

Read results.

```
HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos datalayer-hdfs dfs -ls /tmp/a.md
```

```
val NUM_SAMPLES = 1000
val count = sc.parallelize(1 to NUM_SAMPLES).map { i =>  val x = Math.random(); val y = Math.random(); if (x * x + y * y < 1) 1 else 0; }.reduce(_ + _)
println("Pi is roughly " + 4.0 * count / NUM_SAMPLES)
```

# Options

The available options are:

```
spark-shell --master <master-url>
```

```
+ local
+ local[4]
+ yarn-client
+ yarn-cluster
+ spark://host:port
+ mesos://host:port
```

To run from Eclipse with yarn-client mode, set the following environment variables

```
+ MASTER=yarn-client
+ SPARK_JAR=$DATALAYER_HOME/ext/lib/spark-assembly-1.3.0-hadoop2.6.0_2.11.jar
+ HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop
```

## Spark Local

```
HADOOP_CONF_DIR= MASTER=local spark-shell
```

## Spark on YARN

```
  def addPath(s: String) {
    val f = new File(s)
    val u = f.toURI.toURL
    val urlClassLoader = ClassLoader.getSystemClassLoader.asInstanceOf[URLClassLoader]
    val urlClass = classOf[URLClassLoader]
    val method = urlClass.getDeclaredMethod("addURL", (classOf[URL]))
    method.setAccessible(true)
    method.invoke(urlClassLoader, u)
  }
  addPath("/sdk/conf/hadoop")
```

```
# --jars file:///d/hbase-common-1.4.0.jar 
org.apache.spark.deploy.SparkSubmit
-cp /opt/spark/conf/:/opt/spark/jars/*:/sdk/conf/hadoop/
-Dscala.usejavacp=true
--master yarn --class org.apache.spark.repl.Main --name Spark shell spark-shell
```

```
SPARK_HOME=/opt/spark HADOOP_CONF_DIR=/sdk/conf/hadoop /opt/spark/bin/spark-submit --master yarn --deploy-mode client --jars /d/hbase-common-1.4.0.jar --class org.apache.spark.examples.SparkPi /opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 100000
```

```
SPARK_HOME=/opt/spark HADOOP_CONF_DIR=/sdk/conf/hadoop /opt/spark/bin/spark-submit --master yarn --deploy-mode cluster --jars /d/hbase-common-1.4.0.jar --class org.apache.spark.examples.SparkPi /opt/spark/examples/jars/spark-examples_2.11-2.2.0-k8s-0.5.0.jar 100000
```

```
SPARK_HOME=/opt/spark HADOOP_CONF_DIR=/sdk/conf/hadoop /opt/spark/bin/spark-shell --master yarn --jars /d/hbase-common-1.4.0.jar
```

```
datalay+  7709  7314  0 13:58 pts/19   00:00:00 bash /opt/spark/bin/spark-shell --master yarn --jars /d/hbase-common-1.4.0.jar

datalay+  7713  7709 99 13:58 pts/19   00:01:26 /opt/jdk/bin/java -cp /opt/spark/conf/:/opt/spark/jars/*:/sdk/conf/hadoop/ -Dscala.usejavacp=true -Xmx1g org.apache.spark.deploy.SparkSubmit --master yarn --class org.apache.spark.repl.Main --name Spark shell --jars /d/hbase-common-1.4.0.jar spark-shell

datalay+  7877  7875  0 13:59 ?        00:00:00 /bin/bash -c /opt/jdk/bin/java -server -Xmx512m -Djava.io.tmpdir=/src/lab/sdk/var/data/hadoop/hadoop-common-tmp/nm-local-dir/usercache/datalayer/appcache/application_1515847110186_0008/container_1515847110186_0008_01_000001/tmp -Dspark.yarn.app.container.log.dir=/home/datalayer/opt/hadoop-2.9.0/logs/userlogs/application_1515847110186_0008/container_1515847110186_0008_01_000001 org.apache.spark.deploy.yarn.ExecutorLauncher --arg '192.168.1.7:45272' --properties-file /src/lab/sdk/var/data/hadoop/hadoop-common-tmp/nm-local-dir/usercache/datalayer/appcache/application_1515847110186_0008/container_1515847110186_0008_01_000001/__spark_conf__/__spark_conf__.properties 1> /home/datalayer/opt/hadoop-2.9.0/logs/userlogs/application_1515847110186_0008/container_1515847110186_0008_01_000001/stdout 2> /home/datalayer/opt/hadoop-2.9.0/logs/userlogs/application_1515847110186_0008/container_1515847110186_0008_01_000001/stderr

datalay+  7882  7877 80 13:59 ?        00:00:19 /opt/jdk/bin/java -server -Xmx512m -Djava.io.tmpdir=/src/lab/sdk/var/data/hadoop/hadoop-common-tmp/nm-local-dir/usercache/datalayer/appcache/application_1515847110186_0008/container_1515847110186_0008_01_000001/tmp -Dspark.yarn.app.container.log.dir=/home/datalayer/opt/hadoop-2.9.0/logs/userlogs/application_1515847110186_0008/container_1515847110186_0008_01_000001 org.apache.spark.deploy.yarn.ExecutorLauncher --arg 192.168.1.7:45272 --properties-file /src/lab/sdk/var/data/hadoop/hadoo
```

There are two deploy modes that can be used to launch Spark applications on YARN. 

1. In yarn-client mode, the driver runs in the client process, and the application master is only used for requesting resources from YARN.

$ spark-shell --master yarn-client --driver-memory 1g --executor-memory 1g --executor-cores 1

2. In yarn-cluster mode, the Spark driver runs inside an application master process which is managed by YARN on the cluster, and the client can go away after initiating the application. 

$ spark-shell --master yarn-cluster

## Spark Standalone

$ $SPARK_HOME/sbin/start-master.sh -m 4G
+ see SPARK_PUBLIC_DNS master hostname (port 7077) in the log file
$ $SPARK_HOME/bin/spark-class org.apache.spark.deploy.worker.Worker spark://$SPARK_PUBLIC_DNS:7077 -m 2G
$ $SPARK_HOME/bin/spark-shell --master spark://$SPARK_PUBLIC_DNS:7077

## Hadop

Configure $SPARK_HOME/conf/spark-defaults.conf

```
spark.driver.extraJavaOptions -Dhdp.version=2.4.2.0-258
spark.yarn.am.extraJavaOptions -Dhdp.version=2.4.2.0-258
spark.hadoop.yarn.timeline-service.enabled       false
# spark.master                     spark://master:7077
# spark.eventLog.enabled           true
# spark.eventLog.dir               hdfs://namenode:8021/directory
# spark.serializer                 org.apache.spark.serializer.KryoSerializer
# spark.driver.memory              5g
# spark.executor.extraJavaOptions  -XX:+PrintGCDetails -Dkey=value -Dnumbers="one two three"
```

Put some data in HDFS.

```
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -mkdir /dataset
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -chown 777 /dataset
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -put /dataset/* /dataset
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -put README.md /tmp
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /tmp
```

Launch Spark REPL.

```
HADOOP_USER_NAME=hdfs SPARK_JAVA_OPTS="-Dhdp.version=2.3.4.0-3485 -Dspark.yarn.am.extraJavaOptions=\"-Dhdp.version=2.3.4.0-3485\"" MASTER=yarn-client HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple ./bin/spark-shell
```

Launch Spark Shell with Proxy User.

```
HADOOP_USER_NAME=hdfs SPARK_JAVA_OPTS="-Dhdp.version=2.3.4.0-3485 -Dspark.yarn.am.extraJavaOptions=\"-Dhdp.version=2.3.4.0-3485\"" MASTER=yarn-client HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple ./bin/spark-shell --proxy-user eric2
```

Launch Datalayer CLI.

```
HADOOP_USER_NAME=hdfs DATALAYER_HADOOP=yarn-client DATALAYER_HADOOP_STATUS=started HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-cli
```

Put SPARK_JAR

```
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -mkdir /apps
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -mkdir /apps/datalayer
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -put $DATALAYER_HOME/ext/lib/spark-1.6.1-bin-scala-2.11_hadoop-2.7.2.jar /apps/datalayer
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /apps/datalayer
DATALAYER_SPARK_ASSEMBLY_JAR=hdfs://master.dla.io:8020/apps/datalayer/spark-1.6.1-bin-scala-2.11_hadoop-2.7.2.jar HADOOP_USER_NAME=hdfs DATALAYER_HADOOP=yarn-client DATALAYER_HADOOP_STATUS=started HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-cli
```

Put the datasets

```
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -put /dataset /
HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /dataset
```

Process the data:

```
val f = sc.textFile("/tmp/README.md")
val a = f.filter(line => line.contains("a")).count()
val b = f.filter(line => line.contains("b")).count()
println("Lines with a: %s, Lines with b: %s".format(a, b))
f.filter(line => line.contains("a")).saveAsTextFile("/tmp/a.md")
```

Read the result:

```
HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /tmp/a.md
```

```
val NUM_SAMPLES = 1000
val count = sc.parallelize(1 to NUM_SAMPLES).map { i =>  val x = Math.random(); val y = Math.random(); if (x * x + y * y < 1) 1 else 0; }.reduce(_ + _)
println("Pi is roughly " + 4.0 * count / NUM_SAMPLES)
```

## Spark on Mesos

(to be detailed)

# Setup

```
$ mvn clean install -DskipTests
$ export T4F_SPARK_MLLIB_JAR=$PWD/target/t4f-data-spark-mllib-1.0.0-SNAPSHOT.jar
$ wget https://raw.githubusercontent.com/aos-t4f/t4f-dataset/master/src/main/resources/donut/donut.csv
$ hadoop dfs -put donut.csv /dataset/donut/donut.csv
```

# Deploy on cluster

+ Total yarn memory available for spark (yarn-conf). More memory for yarn means more memory for spark and hence more executors. To much allocated memory seems to lead to more job failure.

```
"yarn.nodemanager.resource.memory-mb", "30000"
```

+ It is useful to let at least one cpu per node at rest for system stuff.

```
"yarn.nodemanager.resource.cpu-vcores", "7"
```
      
+ spark.executor.instances
+ spark.executor.memory spark.executor.cores

+ Set memory per executor (it depends on the dataset, the cluster):

```
sparkConf.set("spark.executor.memory", "2048m")
```

+ Set Kryo serializer instead of java serializer. It is much faster! At least a factor 2.

```
sparkConf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
```

+ Set dynamic allocation. Executors are dynamically created and destroyed when needed. It improves time by launching executors directly if one is available and doesn't have to wait the stage to end.

```
sparkConf.set("spark.dynamicAllocation.enabled", "true")
```

Shuffling need to be activated for dynamic allocation.

```
sparkConf.set("spark.shuffle.service.enabled", "true")
```

but also in each nodeManager (yarn-conf):

```
"yarn.nodemanager.aux-services", "spark_shuffle"
"yarn.nodemanager.aux-services.spark_shuffle.class", "org.apache.spark.network.yarn.YarnShuffleService"
```

the following jar `spark-<version>-yarn-shuffle.jar` need to be available in each node and make it accessible by adding it to the class path (yarn-conf). On can find the jar in the lib/ spark folder.

```
"yarn.application.classpath", "/path/to/jar"
```

# Examples

```
val textFile = sc.textFile("hdfs://...")
val errors = textFile.filter(line => line.contains("ERROR"))
// Count all the errors*.md
errors.count()
// Count errors mentioning MySQL
errors.filter(line => line.contains("MySQL")).count()
// Fetch the MySQL errors as an array of strings
errors.filter(line => line.contains("MySQL")).collect()
```

```
errors.cache() 
```

```
val textFile = sc.textFile("hdfs://...")
val counts = textFile.flatMap(line => line.split(" "))
                 .map(word => (word, 1))
                 .reduceByKey(_ + _)
counts.saveAsTextFile("hdfs://...") 
```

```
val NUM_SAMPLES = 1000
val count = sc.parallelize(1 to NUM_SAMPLES).map { i =>  val x = Math.random(); val y = Math.random(); if (x * x + y * y < 1) 1 else 0; }.reduce(_ + _)
println("Pi is roughly " + 4.0 * count / NUM_SAMPLES)
```

```
val points = sc.textFile(...).map(parsePoint).cache()
var w = Vector.random(D) // current separating plane
for (i <- 1 to ITERATIONS) {
  val gradient = points.map(p =>
    (1 / (1 + exp(-p.y*(w dot p.x))) - 1) * p.y * p.x
  ).reduce(_ + _)
  w -= gradient
}*.md
println("Final separating plane: " + w)
```

# Preliminary Notes

Most classification algorithms are implemented with Stochastic Gradient Descent (SGD), 
a different algorithm than the one used in R (Iteratively Reweighted Least Squares).

SGD is sensitive to variable scaling and a number of parameters must be set: number
of iteration, increment, regularization term...

Variable scaling implies that data must be preprocessed to get comparable
ranges for each numeric features, for example in a [0,1] range or use mean/standard
deviation to renormalize. Thus Some knowledge about each feature distribution
must be known in advance to preprocess the data.

On the deployement mode, we choose to run with yarn-client. you can of course
replace '--master yarn-client' with e.g. '--master yarn-server'.

Note: What model.clearThreshold() means?

# PCA

```
$ $SPARK_HOME/bin/spark-submit \
    --class "io.datalayer.spark.mllib.pca.Pca" \
    --master yarn-client \
    --driver-memory 4g \
    --executor-memory 2g \
    --executor-cores 4 \
    $T4F_SPARK_MLLIB_JAR  \
    /dataset/donut/donut-2.csv
```

# Logistic Regression

With spark-submit

We can run a 100 iterations stochastic gradient descent for Logistic 
Regression on the cluster:

```
$ $SPARK_HOME/bin/spark-submit \
    --class "io.datalayer.spark.mllib.logreg.LogisticRegression" \
    --master yarn-client \
    --driver-memory 4g \
    --executor-memory 2g \
    --executor-cores 4 \
    $T4F_SPARK_MLLIB_JAR \*.md
    /dataset/donut/donut-2.csv color 100 0.001 \
    x y shape k k0 xx xy yy a b c bias
```

With spark-shell (todo does not work, to be fixed...)

```
val points = sc.textFile("hdfs://dataset/donut/donut.csv").map(parsePoint).cache()
var w = Vector.random(D) // current separating plane
for (i <- 1 to ITERATIONS) {
  val gradient = points.map(p =>
    (1 / (1 + exp(-p.y*(w dot p.x))) - 1) * p.y * p.x
  ).reduce(_ + _)
  w -= gradient
}
println("Final separating plane: " + w)
```

# Lasso

```
$ $SPARK_HOME/bin/spark-submit \
    --class "io.datalayer.spark.mllib.lasso.Lasso" \
    --master yarn-client \
    --driver-memory 4g \
    --executor-memory 2g \
    --executor-cores 4 \
    $T4F_SPARK_MLLIB_JAR  \
    /dataset/donut/donut-2.csv color 100 0.001 \
    x y shape k k0 xx xy yy a b c bias
```

# Ridge

```
$ $SPARK_HOME/bin/spark-submit \
    --class "io.datalayer.spark.mllib.ridge.Ridge" \
    --master yarn-client \
    --driver-memory 4g \
    --executor-memory 2g \
    --executor-cores 4 \
    $T4F_SPARK_MLLIB_JAR  \
    /dataset/donut/donut-2.csv color 100 0.001 \
    x y shape k k0 xx xy yy a b c bias
```

# Scaling

The most important concept in spark is the RDD for resisient distributed dataset
which is a fault-tolerant collection of elements that can be operated on in paral-
lel. It can be partionned between w*.mdorkers and remains in memory or is serialized
15to disk if resources are required.

In the scala api, the RDD support a number of operations similar to map and
reduce steps found in MapReduce. The code is expressed in functional style and
spark in in charge of optimizing the resulting combinations of map and reduce
steps. For example a function rescaling a sequence of Double would look like
(see section variable scaling for usage):

/* This method scales an RDD[Double], given a min and max */
def scale(x: RDD[Double], min: Double, max: Double): RDD[Double] = {
  x.map(elt => (elt - min)/ (max - min))
}

Chained map operations would be translated by spark in a simple map with
composed functions.

A number of optimization algorithms are sensible to variable variance, i.e. if
different variables have spaces in ranges very different from each other, it is
hard to converge. One solution is to scale the variables, with a simple linear
transformation. For example one can bound every variable in the range [0, 1]
with the transform:
0
x i − min(x)
x i =
max(x) − min(x)
Or centering on zero and setting standard deviation to 1:
0
x i =
x i − mean(x)
sd(x)

The first one has been implemented as a spark application (/model/model-86/1-
replicate/spark/variable-scaling). Two classes in the package (be.aos.apa.spark.scaling)
have a main method:

• EvaluateAndApply to compute the range (min,max) of selected features
from a dataset, store these values for latter use and normalize the dataset.

• Apply to use previously saved features ranges to normalize a new dataset.
In order to run these programs, the project has to be packaged (in $DATALAYER_REPO/model/model-
86/1-replicate/spark/variable-scaling:
sbt package

This creates the jar in target/scala-2.10/variable-scaling_2.10-0.1-SNAPSHOT.jar.
In order to get easier command-line calls, an environment variable (SCAL-
ING_JAR) points to this file.

# Evaluate and Apply Scaling

We set the environment variable $SPARK_PUBLIC_DNS to the spark dns.

The EvaluateAndApply scaling application is run on the training data (in csv
format):

$ # extract features names from first line (from test set)
$ FEATURES=‘head -1 $DATALAYER_REPO/algorithm/logistic-regression/data/donut/donut-test.csv | se
$ $SPARK_HOME/bin/spark-submit\
    --class "be.aos.apa.spark.scaling.EvaluateAndApply"\
    --master spark://$SPARK_PUBLIC_DNS:7077 $SCALING_JAR \
    $DATALAYER_REPO/algorithm/logistic-regression/data/donut/donut.csv \
    $DATALAYER_DATA/donut/scaled \
    $DATALAYER_DATA/donut/scale.csv \
    $FEATURES

$DATALAYER_REPO/algorithm/logistic-regression/data/donut/donut.csv is the train-ing set.

$DATALAYER_DATA/donut/scaled is the target directory to save the scaled trainaos
set, in a file named part-00000.

$DATALAYER_DATA/donut/scale.csv is the file where the scaling parameters (feature,
min, max) are saved:

$ cat $DATALAYER_DATA/donut/scale.csv
feature,min,max
x,0.0738831346388906,0.990028728265315
y,0.0135197141207755,0.993355110753328
shape,21.0,25.0
color,1.0,2.0
xx,0.00545871758406844,0.980156882790638
xy,0.0124828536260896,0.856172299272088
yy,1.82782669907495E-4,0.986754376059756
c,0.071506910079209,0.657855445853466
a,0.205612261211838,1.31043152942016
b,0.06189432159595,1.27370093893119

The remaining arguments are the fetures to be extracted and scaled (only these
features appear in the output file.

# Apply Scaling

In order to apply the previously computed scaling parameters on a test set:
$ $SPARK_HOME/bin/spark-submit\
  --class "be.aos.apa.spark.scaling.Apply"\
  --master spark://$SPARK_PUBLIC_DNS:7077 $SCALING_JAR \
  $DATALAYER_REPO/algorithm/logistic-regression/data/donut/donut-test.csv \
  $DATALAYER_DATA/donut/scale.csv \
  $DATALAYER_DATA/donut/scaled-test

$DATALAYER_REPO/algorithm/logistic-regression/data/donut/donut-test.csv is the test
set.
$DATALAYER_DATA/donut/scale.csv is the previously computed scaling parameters
(feature, min, max)
$DATALAYER_DATA/donut/scaled-test is the target directory to save the scaled test
set, in a file named part-00000.

# Validate Scaling

In order to check that scaling is working as expected, a test in R is run: check
that the variables are bounded between 0 and 1. We check that the minimum
(maximum) of each column is equal to 0 (1):

> trainfile <- paste(Sys.getenv("AOS_DATA"), "donut/scaled/part-00000", sep="/")
> sctr <- read.csv(trainfile,
colClasses=rep("numeric",10))
> minlist <- vector(’numeric’, 10)
> for (i in 1:10) { minlist[i] <- min(sctr[,i]) }
> maxlist <- vector(’numeric’, 10)
> for (i in 1:10) { maxlist[i] <- max(sctr[,i]) }
> minlist
[1] 0 0 0 0 0 0 0 0 0 0
> maxlist
[1] 1 1 1 1 1 1 1 1 1 1

# Evaluate and Apply

The evaluation of model-86 scaling parameters (min/max) and application of
this scale on the training set is done:

$ cd $DATALAYER_REPO/algorithm/variable-scaling/spark/variable-scaling
$ export SCALING_JAR=‘pwd‘/target/scala-2.10/variable-scaling_2.10-0.1-SNAPSHOT.jar
$ export NN=172.20.40.1:9000
$ spark-submit --class "be.ing.apa.spark.scaling.EvaluateAndApply" \
  --master yarn-cluster \
  $SCALING_JAR \
  "hdfs://$NN//dataset/AOS_MODEL86_TRAIN.csv" \
  "hdfs://$NN//dataset/train_scaled" \
  "hdfs://$NN//dataset/scale.csv" \
  sd_01 sd_03 totfinassets_finass_log prp_spe_04 \
  use_sai_06_log beh_11_log beh_spend_06_log \
  beh_chan_09 beh_cash_10_log sd_08_9 sd_13_1 target2

We note that the master is yarn-cluster and we use URIs in the form hdfs://172.20.40.1:9000/<path>
to identify locations on the HDFS. Here the NN variable is the NameNode URL.
After execution, the scales and scaled data are found in the HDFS at specifyed
locations (//dataset/scale.csv and //dataset/train_scaled).

# Variable Scaling

With the scaling parameters computed, we can apply the scale to the test set:

spark-submit --class "be.ing.apa.spark.scaling.Apply"\
  --master yarn-client\
  $SCALING_JAR \
  "hdfs://$NN//dataset/AOS_MODEL86_SEL.csv" \
  "hdfs://$NN//dataset/scale.csv" \
  "hdfs://$NN//dataset/test_scaled"

Resampling of the case/controls can be executed in a similar fashion:

$ cd $DATALAYER_REPO/algorithm/case-control-resampling/spark/case-control-resampling
$ SAMPLING_JAR=‘pwd‘/target/scala-2.10/case-control-resampling_2.10-0.1-SNAPSHOT.jar
$ NN=172.20.40.1:9000
$ spark-submit --class "be.ing.apa.spark.resampling.Main" \
  --master yarn-client \
  $SAMPLING_JAR \
  "hdfs://$NN//dataset/train_scaled" \
  "hdfs://$NN//dataset/train_scaled_resampled" \
  target2 1.0 0.2

# Resampling

We have observed that some algorithms do not converge easily when the num-
ber of positive case rate is very low (e.g. <2% like observed for model-86).

Modifying the case rate by resampling can be used to create new learning set
better suited for optimization algorithms. In the case of logistic regression, only
is only on the intercept parameter β 0 found with the resampled prevalence π
 ̃
should be corrected for the real prevalence π, the real intercept is:
β 0 ∗ = β 0 + ln
π
 ̃
π
− ln
1 − π
1 − π

We implemented a naive resampling method, where we know the training set
prevalence π, we choose a minimal resampled prevalence π. 

We keep the non-cases (controls) and replicate the set of cases m times. m is given by:
m =
M
1 + X − XM
(4)
where M = π π  ̃ is the prevalences ratio and X = n n 1 0 is the case to non-cases ratio.

SAMPLING_JAR=‘pwd‘/target/scala-2.10/case-control-resamplaos_2.10-0.1-SNAPSHOT.jar
SPARK_PUBLIC_DNS=‘hostname‘

$SPARK_HOME/bin/spark-submit --class "be.aos.apa.spark.resamplaos.Main" \
  --master spark://$SPARK_PUBLIC_DNS:7077 \
  $SAMPLING_JAR \
  $DATALAYER_DATA/train_scaled/part-00000 \
  $DATALAYER_DATA/train_scaled_resampled \
  target2 1.0 0.2
  $DATALAYER_DATA/train_scaled/part-00000 is a csv data file,

$DATALAYER_DATA/train_scaled_resampled is the output directory, with part-00000
as the output file.

target2 is the name of the target feature, 1.0 is the value of the target cases
and 0.2 is the minimum prevalence π
 ̃ we want in the output.

The realized resampled prevalence is given in the standard output (the cases
are repeated an integer number of times so the minimum required prevalence is
not reach exactly):

Cases = 2851
Controls = 183065

Sample prevalence = 0.015334882420017642
Mult = 13.042160645387584
co/ca = 64.21080322693791
mult = 17

New prevalence = 0.20933175543769328
231532
saving data in $DATALAYER_DATA/train-scaled-resampled

sd_01,sd_03,totfinassets_finass_log,prp_spe_04,use_sai_06_log,beh_11_log,beh_spend_06_log,
coalescing the231533 lines
sd_01,sd_03,totfinassets_finass_log,prp_spe_04,use_sai_06_log,beh_11_log,beh_spend_06_log,
saved data

