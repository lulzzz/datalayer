## Sugar

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

### ---

PYSPARK_PYTHON 	/usr/bin/python3
zeppelin.spark.unSupportedVersionCheck 	true
zeppelin.spark.useHiveContext 	false
zeppelin.spark.useIPython 	false
spark.hadoop.fs.s3a.access.key	AKIAIA4KFGNITE4FW47Q
spark.hadoop.fs.s3a.endpoint	s3.eu-central-1.amazonaws.com
spark.hadoop.fs.s3a.impl	org.apache.hadoop.fs.s3a.S3AFileSystem
spark.hadoop.fs.s3a.secret.key	K31+4mDWsvl8U5QGTOYnNhXgOx9Lv9H7lyIMxRK8

## Hadoop

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

### ---

hdfs dfs -ls adl://datalayer.azuredatalakestore.net/mysampledirectory/hosts

### ---

List(1,2,3).toDS
  .repartition(1)
  .write
  .option("nullValue", "")
  .option("separator", ",")
  .option("header", "true")
  .mode("overwrite")
  .csv("adl://datalayer.azuredatalakestore.net/ds.csv")

### ---

def s3_img(path: String): String = {
  import java.io.ByteArrayOutputStream
  import java.io.InputStream
  import java.io.PrintStream
  import org.apache.hadoop.io.IOUtils
  val in = s3.open(new Path(path))
  val bdla = new ByteArrayOutputStream()
  val ps = new PrintStream(bdla)
  IOUtils.copyBytes(in, ps, 4096, false)
  new String(java.util.Base64.getEncoder().encode(bdla.toByteArray()))
}

### ---

def exportCsv(ds: Dataset[_], path: String, comment: String = ""): Unit = {
  ds
  .withColumn("Comment", lit(comment))
  .repartition(1)
  .write
  .option("nullValue", "")
  .option("separator", ",")
  .option("header", "true")
  .mode("overwrite")
  .csv(path)
}

### ---

// Create random data similar to the Calcite query.
val df = sqlContext
  .range(1 << 20)
  .select(
    $"id".as("employee_id"),
    (rand(6321782L) * 4 + 1).cast("int").as("department_id"),
    when(rand(981293L) >= 0.5, "M").otherwise("F").as("gender"),
    (rand(7123L) * 3 + 1).cast("int").as("education_level")
  )
df.registerTempTable("employee")

### ---

(1 to 1000)
  .toList
  .toDS
  .map(i => i*2)
  .repartition(100)
  .map(i => {println(s"------------ $i"); i;})
  .collect
  .foreach(println)

### ---

val (startValues, counts) = df1.select("Odo").rdd.map { r => r.getAs[Int]("Odo") }.histogram(10)
val zippedValues = startValues.zip(counts)
case class HistRow(startPoint:Double,count:Long)
val rowRDD = zippedValues.map( value => HistRow(value._1,value._2))
z.show(spark.createDataFrame(rowRDD))

val startValues = Array(1.0, 100.0, 1000.0, 10000.0, 100000.0, 9999999999.0)
val counts = df1.select("Odo").rdd.map { r => r.getAs[Int]("Odo") }.histogram(startValues, false)
val zippedValues = startValues.zip(counts)
case class HistRow(startPoint:Double,count:Long)
val rowRDD = zippedValues.map( value => HistRow(value._1,value._2))
z.show(spark.createDataFrame(rowRDD))

### ---

val aggs = truckStats.describe(truckStats.drop("did_ym").columns:_*)
z.show(aggs)
val maxs = aggs
    .filter($"summary"==="max")
    .first
    .getValuesMap[Double](aggs.drop("summary").columns)

### ---

```
io.datalayer:datalayer-droids:1.0.0-SNAPSHOT
org.apache.bahir:spark-streaming-twitter_2.11:2.1.0
edu.stanford.nlp:stanford-corenlp:3.6.0
/packages/models/stanford-corenlp-3.6.0-models.jar
/packages/models/gate-EN-twitter.model
org.apache.tika:tika-core:1.13
```
### ---

df2.writeStream().outputMode("complete").queryName("foo").option("truncate","false").format("console").start();

### ---

val ds = sparkSession.readStream()
                .format("kafka")
                .option("kafka.bootstrap.servers",bootstrapServers))
                .option("subscribe", topicName)
                .option("checkpointLocation", hdfsCheckPointDir)
                .load();

val ds1 = ds.select($"value")
val query = ds1.writeStream.outputMode("append").format("console").start()
query.awaitTermination()

### ---

%pyspark

import pandas as pd
bank = pd.read_csv('bank.csv', sep=';')
z.show(bank)

### ---

%spark
 print(s"""
 %network {
     "nodes" : [
         {"id" : 1},
         {"id" : 2}
     ],
     "edges" : [{"source" : 2, "target" : 1, "id" : 1}]
 }
 """)

---

Weird output for SparkR
https://issues.apache.org/jira/browse/ZEPPELIN-1717

This is my source code and output

{code}
%spark.r

df <- as.DataFrame(faithful)
head(df)
{code}

Output
{code}
1 function (x, df1, df2, ncp, log = FALSE)<br />
2 {<br />
3     if (missing(ncp))<br />
4         .Call(C_df, x, df1, df2, log)<br />
5     else .Call(C_dnf, x, df1, df2, ncp, log)
6 }
{code}

The output in spark-shell is
{code}
> head(df)
  eruptions waiting
1     3.600      79
2     1.800      54
3     3.333      74
4     2.283      62
5     4.533      85
6     2.883      55
{code}

---

Thanks for the interest on helium framework.
It's still got long ways to go. If you want to try, you can build master branch with '-Pexamples' flag.

You'll see Helium launcher icon when you create either Java.util.Date object, or table result in paragraph.

I.e. Try '%spark new java.util.date' or try print any table output.

Helium still needs a lot of design considerations, so any feedback would be really appreciated.

Thanks,

---

%angular
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.0.0-rc.3/dist/leaflet.js"></script>
<div id="mapid" style="height:500px;"></div>
<script type="text/javascript">
var Leaflet = L.noConflict();
    var map = Leaflet.map('mapid', {center: [40,-97], zoom: 4});
    var tiles = Leaflet.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);
    var states = [{
        "type": "Feature",
        "properties": {"party": "Republican"},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-104.05, 48.99],
                [-97.22,  48.98],
                [-96.58,  45.94],
                [-104.03, 45.94],
                [-104.05, 48.99]
            ]]
        }
        },{
            "type": "Feature",
            "properties": {"party": "Democrat"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-109.05, 41.00],
                    [-102.06, 40.99],
                    [-102.03, 36.99],
                    [-109.04, 36.99],
                    [-109.05, 41.00]
                ]]
            }

        }
    ];

var poly = Leaflet.geoJson(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
    }}
}).addTo(map);
</script>

---

4. Interpreter can share data through resource pool. You can think resource pool as a distributed map across all interpreters. Although every interpreter can access the resource pool, few interpreters expose API to user and let user directly access the resource pool.

SparkInterpreter, PysparkInterpreter, SparkRInterpreter are interpreters that expose resource pool API to user. You can access resource pool via z.get(), z.put() api. Check [1].

i---

Is there a way to bind a python variable with the Angular display system.

Let's imagine a python script making complex queries based on an Angular client allowing some filters. With the current implementation, how is it possible to trigger a python call from Angular client, then, bind the result into the Angular view?

It currently works when using the Scala interpreter.

Python is used a lot by scientist so, why can't we have an interface allowing supporting that use case.

Isn't there a solution around DynamicForms? No date, and complex type support for now, why?

---

    ```python
    import matplotlib.pyplot as plt

    x = [1,2,3,4,5]
    y = [6,7,8,9,0]

    plt.plot(x, y, marker="o")
    z.show(plt, height="200px")
    plt.close()
    ```
---


https://github.com/bustios/zeppelin-notebooks

---

plt.figure()
plt.contourf(np.random.random(100, 100))
z.show(plt, fmt='png')
plt.close

---

https://github.com/hortonworks-gallery/zeppelin-notebooks

---

https://github.com/lockwobr/zeppelin-examples

---

Zeppeln 0.7.0 (SNAPSHOT) stores table result of paragraph into the resource pool.
This resource pool can be accessed across different interpreter processes.

This notebook demonstrates how to create dataframe in spark interpreter from the table result of previous interpreter (shell)

%sh
# create table result
echo -e "%table val\n1\n2\n3"

%spark
val ic = z.getInterpreterContext
val pool = ic.getResourcePool

// read table result of previous paragraph
val previousParagraphTableResult = pool.get(ic.getNoteId, "20160728-211141_218492817", org.apache.zeppelin.resource.WellKnownResourceName.ZeppelinTableResult.toString).get

---

%angular
<video id="media" width="800" controls>
  <source src="/assets/notebooks/packt/v-0/0.ogg" type="video/ogg"/>
  Your browser does not support the video tag...
</video>
<br/>
<a href="/assets/notebooks/packt/v-0/0.ogg" target="_blank">Download Video</a>
<style>
.past-main {
  position: fixed;
  z-index: 9999;
  right: 10px;
  top: 100px;
  width: 600px;
}
</style>
<script type="text/javascript">
  var mainpos = $('#media').offset().top;
  $(window).on('scroll', function() {
    var stop = Math.round($(window).scrollTop());
    if (stop > mainpos) {
      $('#media').addClass('past-main');
    }
    else if (stop < 20) {
      $('#media').removeClass('past-main');
    }
});
</script>

---

%angular
<audio id="media" width="800" controls>
  <source src="/assets/notebooks/packt/v-1.1/1-1.mp3" type="audio/mp3"/>
  Your browser does not support the audio tag...
</audio>
<br/>
<a href="/assets/notebooks/packt/v-1.1/1-1.mp3" target="_blank">Download Audio</a>
<style>
.past-main {
  position: fixed;
  z-index: 9999;
  right: 10px;
  top: 150px;
}
</style>
<script type="text/javascript">
  var mainpos = $('#media').offset().top;
  $(window).on('scroll', function() {
    var stop = Math.round($(window).scrollTop());
    if (stop > mainpos) {
      $('#media').addClass('past-main');
    }
    else if (stop < 20) {
      $('#media').removeClass('past-main');
    }
});
</script>
---

http://stackoverflow.com/questions/35719142/zeppelin-scala-dataframe-to-python

If I have a Scala paragraph with a DataFrame, can I share and use that with python. (As I understand it pyspark uses py4j)

I tried this:

Scala paragraph:

x.printSchema
z.put("xtable", x )

Python paragraph:

%pyspark

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns

the_data = z.get("xtable")

print the_data

sns.set()
g = sns.PairGrid(data=the_data,
                 x_vars=dependent_var,
                 y_vars=sensor_measure_columns_names +  operational_settings_columns_names,
                 hue="UnitNumber", size=3, aspect=2.5)
g = g.map(plt.plot, alpha=0.5)
g = g.set(xlim=(300,0))
g = g.add_legend()

Error :

Traceback (most recent call last):
  File "/tmp/zeppelin_pyspark.py", line 222, in <module>
    eval(compiledCode)
  File "<string>", line 15, in <module>
  File "/usr/local/lib/python2.7/dist-packages/seaborn/axisgrid.py", line 1223, in __init__
    hue_names = utils.categorical_order(data[hue], hue_order)
TypeError: 'JavaObject' object has no attribute '__getitem__'

Solution:

%pyspark

import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns

import StringIO
def show(p):
    img = StringIO.StringIO()
    p.savefig(img, format='svg')
    img.seek(0)
    print "%html <div style='width:600px'>" + img.buf + "</div>"

df = sqlContext.table("fd").select()
df.printSchema
pdf = df.toPandas()

g = sns.pairplot(data=pdf,
                 x_vars=["setting1","setting2"],
                 y_vars=["s4", "s3",
                         "s9", "s8",
                         "s13", "s6"],
                 hue="id", aspect=2)
show(g)

---

%pyspark

import os
import matplotlib
matplotlib.use('Agg')
os.system("export DISPLAY=:0")

import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import matplotlib.pyplot as plt
import StringIO
def show(p):
img = StringIO.StringIO()
p.savefig(img, format='svg')
img.seek(0)
print "%html <div style='width:600px'>" + img.buf + "</div>"

# Example data
people = ('Tom', 'Dick', 'Harry', 'Slim', 'Jim')
y_pos = np.arange(len(people))
performance = 3 + 10 * np.random.rand(len(people))
error = np.random.rand(len(people))
plt.barh(y_pos, performance, xerr=error, align='center', alpha=0.4)
plt.yticks(y_pos, people)
plt.xlabel('Performance')
plt.title('How fast do you want to go today?')
show(plt)

---

ZEPPELIN-683 new NotebookRepo storage: P2P using IPFS or BitTorrent protocol

https://issues.apache.org/jira/browse/ZEPPELIN-683
https://github.com/apache/zeppelin/pull/989

---

https://issues.apache.org/jira/browse/ZEPPELIN-946

https://github.com/apache/zeppelin/pull/986

Thanks once again @prabhjyotsingh. I really appreciate your work. The activeDirectoryRealm.principalSuffix works now. I do have some concerns about the number of ldap calls made and the amount of data pulled back.

It looks like the app:
1) makes ldap bindRequest as null@mydomain.com and fails.
2) makes ldap bindRequest as username@mydomain.com and succeeds.
3) makes a bindRequest as activeDirectoryRealm.systemUsername@mydomain.com and succeeds
4) does a searchRequest for the wholeSubTree

Step 4 pulls back about 5mb of data, which is a lot. Could add quite a lot of load to AD, if lots of users are simultaneously using the UI... I can limit the result set by more fully qualifying the activeDirectoryRealm.searchBase, however, then it seems to miss the group data. Seems like there should really just be only be a couple lightweight calls.
1) bind the username
2) pull back the group memberships for username (if step one was a success).

Not sure if there's a more concise way to make these queries in java. I can do it via command line the following way: ldapsearch -xLLL -h ldapServer -b "dc=company,dc=com" -D "CN=LDAP Bind,OU=Special,Accounts,DC=company,DC=com" -W uid=randerson. This returns everything about the uid: randerson, including all group memberships. The total size of the data is 60k...

In addition, my groups / roles are still not mapped to my username, regardless of if the app searches the whole tree or not. I'm not sure why. Perhaps I've missed something along the way.

Here's my shiro.ini:

[main]
activeDirectoryRealm = org.apache.zeppelin.server.ActiveDirectoryGroupRealm
activeDirectoryRealm.systemUsername = username
ub
activeDirectoryRealm.searchBase = dc=company,dc=com
activeDirectoryRealm.url = ldap://server:389
activeDirectoryRealm.groupRolesMap = "cn=g.acl.ops.bigdata,ou=unix groups,ou=groups,ou=accounts,cn=users,dc=company,dc=com":"admin"
activeDirectoryRealm.authorizationCachingEnabled=false
activeDirectoryRealm.principalSuffix=@DOMAIN.COM
shiro.loginUrl = /api/login
sessionManager = org.apache.shiro.web.session.mgt.DefaultWebSessionManager
securityManager.sessionManager = $sessionManager
securityManager.sessionManager.globalSessionTimeout = 86400000
shiro.loginUrl = /api/login

[roles]
admin = *

[urls]
/api/version = anon
/** = authc

---

You can go to Interpreter menu on Zeppelin GUI, and set 'args' property of one of your spark interpreter setting, like

-i [path to your xxxx.scala]

that will pre-load scala script when interpreter starts.

---

https://cwiki.apache.org/confluence/display/ZEPPELIN/Cluster+Manager+Proposal

---

I can confirm, using release 0.5.6 and external Spark 1.5.1 cdh 5.5, I must add to zeppelin-env.sh ```ZEPPELIN_INTP_JAVA_OPTS="-Dspark.yarn.isPython=true"``` with master `yarn-client`

---

gradient-descent
+ bi = buying intention
+ n  = number of pages
+ bi' = [ bi + | n - bi | x gamma ]
 +    = [ 3 + | 4 - 3 | x 0.1 ]
 +    = 4

---

https://www.zeppelinhub.com/viewer/notebooks/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Nvcm5lYWRvdWcvWmVwcGVsaW4tTm90ZWJvb2tzL21hc3Rlci9BdXRvLUNvbXBsZXRlLU11bHRpU2VsZWN0L25vdGUuanNvbg

---

Packages mentioned in spark-defaults.conf are not picked by the SPARK-R interpreter through zeppelin. However, when I run SPARK-R interpreter through the command line, it picks all the specified package dependencies.

For example ->

df <- read.df(sqlContext, "hdfs://192.168.2.145:9000/user/train.csv", "com.databricks.spark.csv", header = "true")

This statements throws a ClassNotFoundException in zeppelin (java.lang.ClassNotFoundException: Failed to find data source: com.databricks.spark.csv), even though the same code in Scala works on the default spark interpreter

---

 <audio controls>
   <source src="/assets/packt/v-1.1/1.mp3" type="audio/mp3"/> ???
   Your browser does not support the audio tag...
 </audio>

---

 %angular
 <video id="video" width="800" controls>
   <source src="/assets/packt/v-1.1/1.ogg" type="video/ogg"/>
   Your browser does not support the video tag...
 </video>
 <style>
 .past-main {
   position: fixed;
   z-index: 9999;
   right: 10px;
   top: 100px;
   width: 600px;
 }
 </style>
 <script type="text/javascript">
   var mainpos = $('#video').offset().top;
   $(window).on('scroll', function() {
     var stop = Math.round($(window).scrollTop());
     if (stop > mainpos) {
       $('#video').addClass('past-main');
     }
     else if (stop < 20) {
       $('#video').removeClass('past-main');
     }
 });
 </script>

---

https://github.com/apache/incubator-zeppelin/pull/869

[ZEPPELIN-502] Python interpreter group

---

https://gist.github.com/andershammar/9070e0f6916a0fbda7a5


Thank you,
and one comment it may help,

I added p.clf() in the show function for clear the figure, because of without those clear function, figures are overlapped.
@gdshen95
gdshen95 commented 23 days ago

just a comment for Python3 users
import io instead of import StringIO
and use img.getvalue() in the following code
print("%html <div style='width:600px'>" + img.getvalue() + "</div>")

---

%pyspark
print("Hello "+z.select("day", [("1","mon"),
                                ("2","tue"),
                                ("3","wed"),
                                ("4","thurs"),
                                ("5","fri"),
                                ("6","sat"),
                                ("7","sun")]))

---

map

+ https://github.com/apache/incubator-zeppelin/pull/728
+ https://github.com/apache/incubator-zeppelin/pull/152

---

synchronized (interpreterSettings) { 	synchronized (interpreterSettings) {
InterpreterSetting intpsetting = interpreterSettings.get(id); 	InterpreterSetting intpsetting = interpreterSettings.get(id);
if (intpsetting != null) { 	if (intpsetting != null) {
	+
	+ for (Interpreter intp : intpsetting.getInterpreterGroup()) {
	+ for (Job job : intp.getScheduler().getJobsRunning()) {
	+ job.abort();
	+ job.setStatus(Status.ABORT);
	+ logger.info("Job " + job.getJobName() + " aborted ");
	+ }
	+
	+ for (Job job : intp.getScheduler().getJobsWaiting()) {
	+ job.abort();
	+ job.setStatus(Status.ABORT);
	+ logger.info("Job " + job.getJobName() + " aborted ");
	+ }
	+ }
	+
	+
intpsetting.getInterpreterGroup().close(); 	intpsetting.getInterpreterGroup().close();
intpsetting.getInterpreterGroup().destroy(); 	intpsetting.getInterpreterGroup().destroy();

---

Helium

https://cwiki.apache.org/confluence/display/ZEPPELIN/Helium+proposal

Helium umbrella
+ https://issues.apache.org/jira/browse/ZEPPELIN-533
 + https://github.com/apache/incubator-zeppelin/pull/836

Sub-Tasks

1. https://issues.apache.org/jira/browse/ZEPPELIN-546 Load interpreter from maven repository 	Sub-task 	Resolved 	Mina Lee

2. https://issues.apache.org/jira/browse/ZEPPELIN-551 Add 'paragraph' scope for angular object 	Sub-task 	Resolved 	Lee moon soo

3. https://issues.apache.org/jira/browse/ZEPPELIN-553 Provide OutputStream from InterpreterContext 	Sub-task 	Resolved 	Lee moon soo

4. https://issues.apache.org/jira/browse/ZEPPELIN-619 Shared resource pool that user application can exchange data across interpreter processes 	Sub-task 	Resolved 	Lee moon soo

5. https://issues.apache.org/jira/browse/ZEPPELIN-713 Release resource automatically from resource pool when paragraph / notebook deletion from ResourcePool 	Sub-task 	Resolved 	Lee moon soo

6. https://issues.apache.org/jira/browse/ZEPPELIN-732 Packaged user code that runs on interpreter process 	Sub-task 	Open 	Eric Charles
 + https://github.com/apache/zeppelin/pull/836

7. https://issues.apache.org/jira/browse/ZEPPELIN-1003 High level api for visualization package 	Sub-task 	Open 	Lee moon soo

+ https://issues.apache.org/jira/browse/ZEPPELIN-804 Refactoring registration mechanism on Interpreters
 + https://github.com/apache/zeppelin/pull/835

[ZEPPELIN-732] Helium Application
https://github.com/apache/zeppelin/pull/836

---

ZEPPELIN-xxx Spark module does not run tests
ZEPPELIN-513 Dedicated interpreter session per notebook #703
ZEPPELIN-xxx Notebook Authorization #681
ZEPPELIN-xxx Support Scala Interpreters
ZEPPELIN-446 Zeppelin should work in a Kerberos enabled cluster
ZEPPELIN-616 Zeppelin should use Note or Notebook term consistently
ZEPPELIN-682 New interpreter for Apache Beam (incubating)/DataFlow
ZEPPELIN-684 DataMining - create Notebooks \w example of analytics for public datasets
ZEPPELIN-515 Hadoop libraries in ${HADOOP_HOME}/share folder not included in CLASSPATH
ZEPPELIN-xxx Zeppelin CSS and Javascript extension
ZEPPELIN-xxx Configure with zeppelin-core and zeppelin-site xml

---

https://github.com/zeppelin-project/helium-packages

---

looks like this is ok now. returns an error as expected

%r thisIsAnError
Still wondering why this shows "ERROR" in the paragraph result (the built in zeppelin error message in upper left of paragraph near play button)

%r foo <- 1
+ `htmlwidgets`
+ `mplot` https://cran.r-project.org/web/packages/mplot/index.html
+ `Base64enc`
+ `IRkernel/repr` https://github.com/IRkernel/repr
+ `shiny` widgets
+ Right, `%r print("<h1>title</h1")` does not work at the time being. I didn't debug but I see what's going on and at first sight, it+ is not straightforward to make it work. I will try to apply some html encoding... and if it does not work, I will fallback to the `%text` magic keyword which btw is not supported atm.
+ reject any R with install.*()
+ z.R.showDFAsTable(fooDF)
+ We have the recent Dedicated interpreter session per notebook https://github.com/apache/incubator-zeppelin/pull/703. For now, this is not really addressed. I will look at the impacts in case of separated session...

```
%r
a <- "<h1>Hello</h1>"
print(a)
z.R.show(a)
z.R.show(a, "html")
z.R.show(a, "angular")
z.R.console(a)
b <- "name\tsize\nfoo\t1\n"
# show the built in Zeppelin table display with table, graphs, etc
z.R.show(b, "table")
# current implementation still applies (maybe?)
print("%html <h1>Hello</h1>")
# console debugging ignores zeppelin display rules
z.R.console("%html <h1>Hello</h1>")
mtcars
```
ex
`[1] <h1>Hello</h1>`
**Hello**
**Hello**
**Hello**
`<h1>Hello</h1>`
<table>
<tr><td>name</td><td>size</td></tr>
<tr><td>foo</td><td>1</td></tr>
</table>
**Hello**
`%html <h1>Hello</h1>`
                 mpg cyl  disp  hp drat    wt  qsec vs am gear carb
Mazda RX4           21.0   6 160.0 110 3.90 2.620 16.46  0  1    4    4
Mazda RX4 Wag       21.0   6 160.0 110 3.90 2.875 17.02  0  1    4    4
Datsun 710          22.8   4 108.0  93 3.85 2.320 18.61  1  1    4    1
Hornet 4 Drive      21.4   6 258.0 110 3.08 3.215 19.44  1  0    3    1
Hornet Sportabout   18.7   8 360.0 175 3.15 3.440 17.02  0  0    3    2
Valiant             18.1   6 225.0 105 2.76 3.460 20.22  1  0    3    1
-->


```

### Is there a relevant Jira issue?
**[ZEPPELIN-697]**

### How should this be tested?
* `git fetch origin pull/745/head:AngularObjectReplaceDynamicFormVar`
* `git checkout AngularObjectReplaceDynamicFormVar`
* `mvn clean package -DskipTests`
* `bin/zeppelin-daemon.sh restart`
* Create a new note
* In the first paragraph, put the following code

```html
%angular

<form class="form-inline">
  <div class="form-group">
    <label for="superheroId">Super Hero: </label>
    <input type="text" class="form-control" id="superheroId" placeholder="Superhero name ..." ng-model="superhero"></input>
  </div>
  <button type="submit" class="btn btn-primary" ng-click="z.angularBind('superhero', superhero, {paragraph: 'PUT_HERE_PARAGRAPH_ID'})"> Bind</button>
    <button type="submit" class="btn btn-primary" ng-click="z.angularUnbind('superhero', {paragraph: 'PUT_HERE_PARAGRAPH_ID'})"> Unbind</button>
</form>
```
* Create a second paragraph with the following code:
```scala
z.getInterpreterContext().getParagraphId()
```
* Execute the second paragraph to retrieve its paragraph id
* In the first paragraph, replace the text PUT_HERE_PARAGRAPH_ID by the correct paragraph id
* Update the second paragraph content to

```
%md

#### Super Hero of the day: &nbsp; **${superhero}**
```
* Now put **SpiderMan** in the input text of the first paragraph and click alternatively on **Bind** and **Unbind**

### Screenshots (if appropriate)
![angularjsreplacedynamicform](https://cloud.githubusercontent.com/assets/1532977/13290082/9cf3fbee-db12-11e5-913c-b4b8ba6a368a.gif)

### Questions:

---

https://docs.cloud.databricks.com/docs/latest/featured_notebooks/Wikipedia%20Clickstream%20Data.html

---

Hello,
My name is Paul and I'm a computer science master student at University of
Sao Paulo, Brazil. I am interested in developing the notebooks with Helium.
I have developed an example [0][1] using Google maps and a public dataset
of Uber [2].

Currently, I'm working with Machine Learning for my master's project, so
I'm familiar with classification, clustering and other methods of ML.

I would appreciate that you evaluate my proposal. It is shared in a google
doc [3].

Best regards,
Paul Bustios

[0] https://github.com/pbustios/zeppelin-map
[1] https://youtu.be/gwLHFROu7Pw
[2] https://github.com/fivethirtyeight/uber-tlc-foil-response
[3] GSoC 2016 Proposal
<https://docs.google.com/document/d/1DUrNO_EukR-irnPyFjabQIc_IMRdEWIFDxgYTFMIZBo/edit?usp=sharing>

---

Salut Eric,

Sans façon, c'est avec plaisir.

1. hovers : oui, une intro pourrait aussi être bien mais cela dépend de qui utilise.
Je ne sais pas qui est ton public cible. Si des data scientists au sens large, ils seront plus ou moins à l'aise,  Les autres auront plus de mal à s'y retrouver et auront besoin d'une intro.
2. feedback : je pensais à un simple form. J'y vois deux moments où l'user envoie des feedbacks.
  - pendant la session : il clique sur le bouton "send feedback" et a un pop-up avec le form
  - à la fin d'une session : le popup s'ouvre automatiquement pour collecter un feedback éventuel.

Je viens de jouer un peu avec Notes :

3. Le caret de l'éditeur est trop light, un peu plus foncé serait mieux car à moins de travailler dans le noir, on le voit mal
4. Quand je crée une nouvelle note rien ne se passe ?
5. Général : j'ai l'impression que les possibles cas d'utilisation sont très nombreux et on aurait besoin d'une notion de workspace :
- où sont mes datasets et comment puis-je les gérer ? Ici il y a des possibilités d'intégration avec des supports divers (buckets AWS, etc). Le stockage en soi est un très large débat. Comment vas-tu le payer, le gérer, etc ?
Par exemple, je pense aux normes de protection qu'il faudra respecter pour certains utilisateurs (cryptage, etc).

- où sont mes pièces de code et comment puis-je les intégrer dans mes notes ?  Il est important de réutiliser son code après avoir joué et validé.
Cela me permet de construire un workflow et ici je pense au scénario typique d'un projet DS :

  - Préparation des données : puisqu'on y passe énormément de temps (cleaning, tidying, etc), des exemples dans ce domaine vont être utiles
  - Visualisation et exploration : les possibilités de plotting de Notes sont à considérer sous cet aspect. Je pense notamment au fait qu'on doit plotter un certain nombre de fois jusqu'à ce qu'on trouve quelque chose d'intéressant et là on garde pour intégrer dans un récit ou narrative à communiquer ("vous voyez là il y a un outlier, c'est ce type de client qui ...").
  - Modélisation : ici aussi on va jouer avec des modèes (quoique l'expérience permet de reduire le playtime) et il faudra pouvoir garder les plus intéressants afin de les intégrer dans un récit aussi.
  - Support de communication : markdown et présentation pourront intégrer ce qu'on a sauvé précédemment.

En général il me semble qu'il serait intéressant de prévoir une manière de structurer toutes ces notes dans un workflow qui puisse s'intégrer dans un cadre méthodologique (ex: crisp-dm, etc).

J'aime de plus en plus :-)

A+

Alexis


2015-04-06 7:27 GMT+02:00 Eric Charles <eric@datalayer.io>:

    Hello Alexis,

    Un grand merci pour ton feedback.

    1.- Je vais mettre les hovers et voir ce que cela donne. Une chose qui va aider est également un peu plus d'infos sur la home page une fois authentifié.

    2. Pour le canal de feedback, tu penses à une application tierce genre "user voice", à un formulaire, à un chat... ?

    Thx, Eric

---

Hi Chris,

there are several ways to load dependencies to Zeppelin 0.5.5.
Using %dep is one of them.
If you want do it by setting spark.jars.packages property, proper way of doing it is editing your SPARK_HOME/conf/spark-default.conf
and adding below line.(I assume that you set SPARK_HOME in ZEPPELIN_HOME/conf/zeppelin-env.sh)

spark.jars.packages   org.apache.avro:avro:1.8.0,org.joda:joda-convert:1.8.1

The reason you can import avro dependency is that spark assembly already includes avro dependencies, not because you added it in Zeppelin interpreter setting.

You can add dependencies via GUI with the latest master branch(0.6.0-incubating-SNAPSHOT) which is experimental at the moment.
Please let me know it answers your question.

Regards,

---

https://cwiki.apache.org/confluence/display/ZEPPELIN/Cluster+Manager+Proposal

---

The below code snippet helped. I could see the tooltip now.

cy2.on('mouseover', 'node', function(event) {
    var node = event.cyTarget;
    node.qtip({
         content: 'hello',
         show: {
            event: event.type,
            ready: true
         },
         hide: {
            event: 'mouseout unfocus'
         }
    }, event);
});


I have the below headers in the beginning of my paragraph


<script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/2.6.1/cytoscape.min.js"></script>

<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.css">

<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.js"></script>
<script src="http://cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min.js"></script>

<script src="http://40.221.94.235/cytoscape-qtip.js"></script>

Hope this helps

regards
Bala

On 19 February 2016 at 01:59, Corneau Damien <corneadoug@gmail.com> wrote:
- hide quoted text -

    I took a shot at it, and improved the code to make sure things would go well.
    However, I couldn't make it work.
    All the libraries are included and both qtip and cytoscape are working fine,
    However cytoscape.js-qtip is not doing anything, even using `cytoscape-qtip` in the console would throw an error

    Here is my code in case:

    %angular

    <div id="cy"></div>

    <style>
        body {
            font-family: helvetica;
            font-size: 14px;
            width: 100%;
             height: 1000px;
        }

        #cy {
            width: 100%;
            height: 400px;
            z-index: 999;
        }

        h1 {
            opacity: 0.5;
            font-size: 1em;
        }
    </style>

    <script>


        //
        // LOADING THE COMPONENT
        //

        // Include the component css
        if (!jQuery("link[href$='jquery.qtip.css']").length) {
            var fileref=document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", '//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.css');
            if (typeof fileref!="undefined")
                document.getElementsByTagName("head")[0].appendChild(fileref);
        }

        // Remove some CSS from Zeppelin so that the component renders well
        var id = document.getElementById("cy").parentElement.getAttribute('id');
        document.getElementById(id).style.overflow = "visible";

        // Load the js and render the component after
        jQuery.when(
            // Load the js
            jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.min.js', function( data, textStatus, jqxhr ) {
                console.log( jqxhr.status ); // 200
                console.log( "Qtip Load was performed." );
            }),
            jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/cytoscape/2.6.3/cytoscape.js', function( data, textStatus, jqxhr ) {
                    console.log( jqxhr.status ); // 200
                    console.log( "Cytoscape Load was performed." );
            }),
            jQuery.getScript('//cdn.rawgit.com/cytoscape/cytoscape.js-qtip/master/cytoscape-qtip.js', function( data, textStatus, jqxhr ) {
                        console.log( jqxhr.status ); // 200
                        console.log( "CytoscapeQtip Load was performed." );
            }),
            jQuery("#cy").ready,
            jQuery.Deferred(function( deferred ){
                jQuery( deferred.resolve );
            })
        ).done(function(){
            var cy = window.cy = cytoscape({
                container: document.getElementById('cy'),
                ready: function(){
                    console.log('ready yes');
                },
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#666',
                            'label': 'data(name)'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 1,
                            'line-color': '#aaa',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle'
                        }
                    }
                ],
                elements: {
                    nodes: [
                        { data: { id: 'j', name: 'Jerry' } },
                        { data: { id: 'e', name: 'Elaine' } },
                        { data: { id: 'k', name: 'Kramer' } },
                        { data: { id: 'g', name: 'George' } }
                    ],
                    edges: [
                        { data: { source: 'j', target: 'e' } },
                        { data: { source: 'j', target: 'k' } },
                        { data: { source: 'j', target: 'g' } },
                        { data: { source: 'e', target: 'j' } },
                        { data: { source: 'e', target: 'k' } },
                        { data: { source: 'k', target: 'j' } },
                        { data: { source: 'k', target: 'e' } },
                        { data: { source: 'k', target: 'g' } },
                        { data: { source: 'g', target: 'j' } }
                    ]
                },
            });
            // just use the regular qtip api but on cy elements
            cy.elements().qtip({
            content: function(){ return 'Example qTip on ele ' + this.id() },
             position: {
                my: 'top center',
                at: 'bottom center'
             },
             style: {
                classes: 'qtip-bootstrap',
                tip: {
                    width: 16,
                    height: 8
                }
            }
          });
    });
    </script>

    On Thu, Feb 18, 2016 at 9:50 AM, moon soo Lee <moon@apache.org> wrote:

        I tried a little more to make the qtip work, but no luck so for.
        Please share once you made it work.

        Thanks,
        moon


        On Thu, Feb 18, 2016 at 2:11 AM Balachandar R.A. <balachandar.ra@gmail.com> wrote:

            Hi moon,
            Thanks for the effort. I will check that. Initially, I just copied the example demo code in a plain notepad and saved it as .html. When I opened this file in the browser, I could see the tooltip exactly as explained in the github sources.

            Now, when I ported this code in zeppelin, i could not see it working. Perhaps, if you can replicate what I have done, you may observe few more information. Nevertheless, I will come back to you once I see the error in my side.

            Thanks
            Bala

            On 18 February 2016 at 14:29, moon soo Lee <moon@apache.org> wrote:

                With proper cytoscape-qtip address, i'm getting following error.

                Uncaught TypeError: cy.elements(...).qtip is not a function

                You can also see error in Developer console in your browser, when you run zeppelin-web in devmode.

                (see Run the application in dev mode https://github.com/apache/incubator-zeppelin/blob/master/zeppelin-web/README.md#configured-environment for devmode)

                Thanks,
                moon


                On Thu, Feb 18, 2016 at 12:34 AM Balachandar R.A. <balachandar.ra@gmail.com> wrote:

                    Hi moon,

                    My bad. Here is the link  https://github.com/cytoscape/cytoscape.js-qtip.

                    The whole cytoscape-qtip project is hosted here and you can find the js file in the below link

                     https://github.com/cytoscape/cytoscape.js-qtip/blob/master/cytoscape-qtip.js

                    regards
                    Bala


                    Thanks

                    On 18 February 2016 at 13:47, moon soo Lee <moon@apache.org> wrote:

                        Hi Bala,

                        The file http://40.221.94.235/cytoscape-qtip.js looks like not accessible. Could you check if it is correct address?

                        Thanks,
                        moon

                        On Wed, Feb 17, 2016 at 10:10 PM Balachandar R.A. <balachandar.ra@gmail.com> wrote:

                            I am trying reciprocate the example seen in the link https://github.com/cytoscape/cytoscape.js-qtip which is tooltip GUI extension for cytoscape, As a standalone code, this works. But, when I port this code in zeppelin paragraph, I do not see the tooltip.  Here is the code I tested. Any hint will be highly appreciated. Thanks







                            %angular

                            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">



                            <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.css">



                            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

                            <script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.js"></script>

                            <script src="http://cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min.js"></script>

                            <script src="http://40.221.94.235/cytoscape-qtip.js"></script>

                            <div id="cy">



                                    <style>

                                                                            body {

                                                                                            font-family: helvetica;

                                                                                            font-size: 14px;

                                                                                            width: 100%;

                                                                                            height: 1000px;

                                                                            }

                                                                            #cy {

                                                                                            width: 100%;

                                                                                            height: 1000px;

                                                                                            position: absolute;

                                                                                            left: 0;

                                                                                            top: 0;

                                                                                            z-index: 999;

                                                                            }

                                                                            h1 {

                                                                                            opacity: 0.5;

                                                                                            font-size: 1em;

                                                                            }

                                                            </style>



                                                            <script>

                                                                            $(function(){

                                                                                            var cy = window.cy = cytoscape({

                                                                                                            container: document.getElementById('cy'),

                                                                                                            ready: function(){

                                                                                                            },

                                                                                                            style: [ // the stylesheet for the graph

                                                    {

                                                      selector: 'node',

                                                      style: {

                                                        'background-color': '#666',

                                                        'label': 'data(name)'

                                                      }

                                                    },



                                                    {

                                                      selector: 'edge',

                                                      style: {

                                                        'width': 1,

                                                        'line-color': '#aaa',

                                                        'target-arrow-color': '#ccc',

                                                        'target-arrow-shape': 'triangle'

                                                      }

                                                    }

                                                  ],

                                                                                                            elements: {

                                                                                                                            nodes: [

                                                                                                                                            { data: { id: 'j', name: 'Jerry' } },

                                                                                                                                            { data: { id: 'e', name: 'Elaine' } },

                                                                                                                                            { data: { id: 'k', name: 'Kramer' } },

                                                                                                                                            { data: { id: 'g', name: 'George' } }

                                                                                                                            ],

                                                                                                                            edges: [

                                                                                                                                            { data: { source: 'j', target: 'e' } },

                                                                                                                                            { data: { source: 'j', target: 'k' } },

                                                                                                                                            { data: { source: 'j', target: 'g' } },

                                                                                                                                            { data: { source: 'e', target: 'j' } },

                                                                                                                                            { data: { source: 'e', target: 'k' } },

                                                                                                                                            { data: { source: 'k', target: 'j' } },

                                                                                                                                            { data: { source: 'k', target: 'e' } },

                                                                                                                                            { data: { source: 'k', target: 'g' } },

                                                                                                                                            { data: { source: 'g', target: 'j' } }

                                                                                                                            ]

                                                                                                            },

                                                                                            });

                                                                                            // just use the regular qtip api but on cy elements

                                                                                            cy.elements().qtip({



                                                                                                            content: function(){ return 'Example qTip on ele ' + this.id() },

                                                                                                            position: {

                                                                                                                            my: 'top center',

                                                                                                                            at: 'bottom center'

                                                                                                            },

                                                                                            style: {

                                                                                                                            classes: 'qtip-bootstrap',

                                                                                                                            tip: {

                                                                                                                                            width: 16,

                                                                                                                                            height: 8

                                                                                                                            }

                                                                                                            }

                                                                                            });





                                                                            });

                                                            </script>



                            regards

                            Bala





---

Adding the jar to SPARK_SUBMIT_OPTIONS is one approach.

But you can try out %dep also.

Regards,
Sourav

On Wed, Feb 24, 2016 at 1:54 PM, Felipe Almeida <falmeida1988@gmail.com> wrote:
- hide quoted text -

    There's z.load("maven-package") but I myself have had no luck with it (I get weird errors).

    I generally add the extra packages I need in the following file: /usr/lib/zeppelin/conf/zeppelin-env.sh

    I change the last line (that begins with export SPARK_SUBMIT_OPTIONS... ) to this:

    export SPARK_SUBMIT_OPTIONS="$SPARK_SUBMIT_OPTIONS --packages org.apache.spark:spark-streaming-kinesis-asl_2.10:1.6.0"

    (I'm using Kinesis - you add whatever maven jars you need for you own project)

    Don't forget to restart the Spark interpreter for the changes to take effect.

    FA
    http://queirozf.com
    “Every time you stay out late; every time you sleep in; every time you miss a workout; every time you don’t give 100% – You make it that much easier for me to beat you.” - Unknown author

    On 24 February 2016 at 21:32, Vinayak Agrawal <vinayakagrawal88@gmail.com> wrote:

        Hi All,
        I am trying the tutorial for spark-streaming following the link
        Tutorial with Streaming Data
        https://zeppelin.incubator.apache.org/docs/0.5.5-incubating/tutorial/tutorial.html

        But I keep getting this error while importing twitter class:
        import org.apache.spark.streaming._
        <console>:39: error: object twitter is not a member of package org.apache.spark.streaming import org.apache.spark.streaming.twitter._

        I would assume that perhaps something needs to be added in Spark Path?
        any help is appreciated..

        Thanks
        -
        Vinayak Agrawal


        "To Strive, To Seek, To Find and Not to Yield!"
        ~Lord Alfred Tennyson

---

https://issues.apache.org/jira/browse/ZEPPELIN-582 Sparkling Water(H2O) interpreter for H2O

---

Thank you for verifying. Glad to help :)

On Tue, Feb 23, 2016 at 3:51 AM Ian Maloney <rachmaninovquartet@gmail.com> wrote:
- hide quoted text -

    Hi Mina,

    I added your changes and they got the pyspark interpreter working! Thanks so much for your help!

    Ian


    On Sunday, February 21, 2016, mina lee <minalee@apache.org> wrote:

        Hi Ian, sorry for late reply.
        I was able to reproduce the same error with spark 1.4.1 & hadoop 2.6.0. Turned out it was bug from Zeppelin.
        After some search, I realized that `spark.yarn.isPython` property is introduced since 1.5.0. I just made a PR(https://github.com/apache/incubator-zeppelin/pull/736) to fix it. It will be really appreciated if you can try it and see if it works. Thank you for reporting bug!

        Regard,
        Mina

        On Thu, Feb 18, 2016 at 2:39 AM, Ian Maloney <rachmaninovquartet@gmail.com> wrote:

            Hi Mina,

            Thanks for the response. I recloned the master from github and built using:
            mvn clean package -DskipTests -Pspark-1.4 -Phadoop-2.6 -Pyarn -Ppyspark

            I did that locally then scped to a node in a cluster running HDP 2.3 (spark 1.4.1 & hadoop 2.7.1).

            I added the two config files from below and started the Zeppelin daemon. Inspecting the spark.yarn.isPython config in the spark UI, showed it to be "true".

            The pyspark interpreter gives the same error as before. Are there any other configs I should check? I'm beginning to wonder if it's related to something in Hortonworks' distribution of spark or yarn.



            On Tuesday, February 16, 2016, mina lee <minalee@apache.org> wrote:

                Hi Ian,

                The log stack looks quite similar with https://issues.apache.org/jira/browse/ZEPPELIN-572 which has fixed since v0.5.6
                This happens when pyspark.zip and py4j-*.zip are not distributed to yarn worker nodes.

                If you are building from source code can you please double check that you pulled the latest master?
                And also to be sure can you confirm that if you can see spark.yarn.isPython set to be true in Spark UI(Yarn's ApplicationMaster UI) > Environment > Spark Properties?

                On Sat, Feb 13, 2016 at 1:04 AM, Ian Maloney <rachmaninovquartet@gmail.com> wrote:

                    Hi,

                    I've been trying unsuccessfully to configure the pyspark interpreter on Zeppelin. I can use pyspark from the CLI and can use the Spark interpreter from Zeppelin without issue. Here are the lines which aren't commented out in my zeppelin-env.sh file:

                    export MASTER=yarn-client

                    export ZEPPELIN_PORT=8090

                    export ZEPPELIN_JAVA_OPTS="-Dhdp.version=2.3.2.0-2950 -Dspark.yarn.queue=default"

                    export SPARK_HOME=/usr/hdp/current/spark-client/

                    export HADOOP_CONF_DIR=/etc/hadoop/conf

                    export PYSPARK_PYTHON=/usr/bin/python

                    export PYTHONPATH=${SPARK_HOME}/python:${SPARK_HOME}/python/build:$PYTHONPATH

                    Running a simple pyspark script in the interpreter gives this error:

                      1.  Py4JJavaError: An error occurred while calling z:org.apache.spark.api.python.PythonRDD.runJob.
                      2.  : org.apache.spark.SparkException: Job aborted due to stage failure: Task 0 in stage 1.0 failed 4 times, most recent failure: Lost task 0.3 in stage 1.0 (TID 5, some_yarn_node.networkname): org.apache.spark.SparkException:
                      3.  Error from python worker:
                      4.    /usr/bin/python: No module named pyspark
                      5.  PYTHONPATH was:
                      6.    /app/hadoop/yarn/local/usercache/my_username/filecache/4121/spark-assembly-1.4.1.2.3.2.0-2950-hadoop2.7.1.2.3.2.0-2950.jar

                    More details can be found here:
                    https://community.hortonworks.com/questions/16436/cants-get-pyspark-interpreter-to-work-on-zeppelin.html

                    Thanks,

                    Ian

---

I set the env variable SPARK_SUBMIT_OPTS="--jar sparkling-water-assembly-jar-path" in the conf/Zeppelin-env.sh made SparklingWater available in Zeppelin.

---

I took a shot at it, and improved the code to make sure things would go well.
However, I couldn't make it work.
All the libraries are included and both qtip and cytoscape are working fine,
However cytoscape.js-qtip is not doing anything, even using `cytoscape-qtip` in the console would throw an error

Here is my code in case:

%angular

<div id="cy"></div>

<style>
    body {
        font-family: helvetica;
        font-size: 14px;
        width: 100%;
         height: 1000px;
    }

    #cy {
        width: 100%;
        height: 400px;
        z-index: 999;
    }

    h1 {
        opacity: 0.5;
        font-size: 1em;
    }
</style>

<script>


    //
    // LOADING THE COMPONENT
    //

    // Include the component css
    if (!jQuery("link[href$='jquery.qtip.css']").length) {
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", '//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.css');
        if (typeof fileref!="undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    }

    // Remove some CSS from Zeppelin so that the component renders well
    var id = document.getElementById("cy").parentElement.getAttribute('id');
    document.getElementById(id).style.overflow = "visible";

    // Load the js and render the component after
    jQuery.when(
        // Load the js
        jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/basic/jquery.qtip.min.js', function( data, textStatus, jqxhr ) {
            console.log( jqxhr.status ); // 200
            console.log( "Qtip Load was performed." );
        }),
        jQuery.getScript('//cdnjs.cloudflare.com/ajax/libs/cytoscape/2.6.3/cytoscape.js', function( data, textStatus, jqxhr ) {
                console.log( jqxhr.status ); // 200
                console.log( "Cytoscape Load was performed." );
        }),
        jQuery.getScript('//cdn.rawgit.com/cytoscape/cytoscape.js-qtip/master/cytoscape-qtip.js', function( data, textStatus, jqxhr ) {
                    console.log( jqxhr.status ); // 200
                    console.log( "CytoscapeQtip Load was performed." );
        }),
        jQuery("#cy").ready,
        jQuery.Deferred(function( deferred ){
            jQuery( deferred.resolve );
        })
    ).done(function(){
        var cy = window.cy = cytoscape({
            container: document.getElementById('cy'),
            ready: function(){
                console.log('ready yes');
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(name)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 1,
                        'line-color': '#aaa',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            elements: {
                nodes: [
                    { data: { id: 'j', name: 'Jerry' } },
                    { data: { id: 'e', name: 'Elaine' } },
                    { data: { id: 'k', name: 'Kramer' } },
                    { data: { id: 'g', name: 'George' } }
                ],
                edges: [
                    { data: { source: 'j', target: 'e' } },
                    { data: { source: 'j', target: 'k' } },
                    { data: { source: 'j', target: 'g' } },
                    { data: { source: 'e', target: 'j' } },
                    { data: { source: 'e', target: 'k' } },
                    { data: { source: 'k', target: 'j' } },
                    { data: { source: 'k', target: 'e' } },
                    { data: { source: 'k', target: 'g' } },
                    { data: { source: 'g', target: 'j' } }
                ]
            },
        });
        // just use the regular qtip api but on cy elements
        cy.elements().qtip({
        content: function(){ return 'Example qTip on ele ' + this.id() },
         position: {
            my: 'top center',
            at: 'bottom center'
         },
         style: {
            classes: 'qtip-bootstrap',
            tip: {
                width: 16,
                height: 8
            }
        }
      });
});
</script>

On Thu, Feb 18, 2016 at 9:50 AM, moon soo Lee <moon@apache.org> wrote:

    I tried a little more to make the qtip work, but no luck so for.
    Please share once you made it work.

    Thanks,
    moon


    On Thu, Feb 18, 2016 at 2:11 AM Balachandar R.A. <balachandar.ra@gmail.com> wrote:

        Hi moon,
        Thanks for the effort. I will check that. Initially, I just copied the example demo code in a plain notepad and saved it as .html. When I opened this file in the browser, I could see the tooltip exactly as explained in the github sources.

        Now, when I ported this code in zeppelin, i could not see it working. Perhaps, if you can replicate what I have done, you may observe few more information. Nevertheless, I will come back to you once I see the error in my side.

        Thanks
        Bala

        On 18 February 2016 at 14:29, moon soo Lee <moon@apache.org> wrote:

            With proper cytoscape-qtip address, i'm getting following error.

            Uncaught TypeError: cy.elements(...).qtip is not a function

            You can also see error in Developer console in your browser, when you run zeppelin-web in devmode.

            (see Run the application in dev mode https://github.com/apache/incubator-zeppelin/blob/master/zeppelin-web/README.md#configured-environment for devmode)

            Thanks,
            moon


            On Thu, Feb 18, 2016 at 12:34 AM Balachandar R.A. <balachandar.ra@gmail.com> wrote:

                Hi moon,

                My bad. Here is the link  https://github.com/cytoscape/cytoscape.js-qtip.

                The whole cytoscape-qtip project is hosted here and you can find the js file in the below link

                 https://github.com/cytoscape/cytoscape.js-qtip/blob/master/cytoscape-qtip.js

                regards
                Bala


                Thanks

                On 18 February 2016 at 13:47, moon soo Lee <moon@apache.org> wrote:

                    Hi Bala,

                    The file http://40.221.94.235/cytoscape-qtip.js looks like not accessible. Could you check if it is correct address?

                    Thanks,
                    moon

                    On Wed, Feb 17, 2016 at 10:10 PM Balachandar R.A. <balachandar.ra@gmail.com> wrote:

                        I am trying reciprocate the example seen in the link https://github.com/cytoscape/cytoscape.js-qtip which is tooltip GUI extension for cytoscape, As a standalone code, this works. But, when I port this code in zeppelin paragraph, I do not see the tooltip.  Here is the code I tested. Any hint will be highly appreciated. Thanks







                        %angular

                        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">



                        <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.css">



                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

                        <script src="http://cdnjs.cloudflare.com/ajax/libs/qtip2/2.2.0/jquery.qtip.js"></script>

                        <script src="http://cytoscape.github.io/cytoscape.js/api/cytoscape.js-latest/cytoscape.min.js"></script>

                        <script src="http://40.221.94.235/cytoscape-qtip.js"></script>

                        <div id="cy">



                                <style>

                                                                        body {

                                                                                        font-family: helvetica;

                                                                                        font-size: 14px;

                                                                                        width: 100%;

                                                                                        height: 1000px;

                                                                        }

                                                                        #cy {

                                                                                        width: 100%;

                                                                                        height: 1000px;

                                                                                        position: absolute;

                                                                                        left: 0;

                                                                                        top: 0;

                                                                                        z-index: 999;

                                                                        }

                                                                        h1 {

                                                                                        opacity: 0.5;

                                                                                        font-size: 1em;

                                                                        }

                                                        </style>



                                                        <script>

                                                                        $(function(){

                                                                                        var cy = window.cy = cytoscape({

                                                                                                        container: document.getElementById('cy'),

                                                                                                        ready: function(){

                                                                                                        },

                                                                                                        style: [ // the stylesheet for the graph

                                                {

                                                  selector: 'node',

                                                  style: {

                                                    'background-color': '#666',

                                                    'label': 'data(name)'

                                                  }

                                                },



                                                {

                                                  selector: 'edge',

                                                  style: {

                                                    'width': 1,

                                                    'line-color': '#aaa',

                                                    'target-arrow-color': '#ccc',

                                                    'target-arrow-shape': 'triangle'

                                                  }

                                                }

                                              ],

                                                                                                        elements: {

                                                                                                                        nodes: [

                                                                                                                                        { data: { id: 'j', name: 'Jerry' } },

                                                                                                                                        { data: { id: 'e', name: 'Elaine' } },

                                                                                                                                        { data: { id: 'k', name: 'Kramer' } },

                                                                                                                                        { data: { id: 'g', name: 'George' } }

                                                                                                                        ],

                                                                                                                        edges: [

                                                                                                                                        { data: { source: 'j', target: 'e' } },

                                                                                                                                        { data: { source: 'j', target: 'k' } },

                                                                                                                                        { data: { source: 'j', target: 'g' } },

                                                                                                                                        { data: { source: 'e', target: 'j' } },

                                                                                                                                        { data: { source: 'e', target: 'k' } },

                                                                                                                                        { data: { source: 'k', target: 'j' } },

                                                                                                                                        { data: { source: 'k', target: 'e' } },

                                                                                                                                        { data: { source: 'k', target: 'g' } },

                                                                                                                                        { data: { source: 'g', target: 'j' } }

                                                                                                                        ]

                                                                                                        },

                                                                                        });

                                                                                        // just use the regular qtip api but on cy elements

                                                                                        cy.elements().qtip({



                                                                                                        content: function(){ return 'Example qTip on ele ' + this.id() },

                                                                                                        position: {

                                                                                                                        my: 'top center',

                                                                                                                        at: 'bottom center'

                                                                                                        },

                                                                                        style: {

                                                                                                                        classes: 'qtip-bootstrap',

                                                                                                                        tip: {

                                                                                                                                        width: 16,

                                                                                                                                        height: 8

                                                                                                                        }

                                                                                                        }

                                                                                        });





                                                                        });

                                                        </script>



                        regards

                        Bala






---

After the call to ssc.stop, you will probably see output printed into Zeppelin; you should see output every time a window closes.

FA

FA
http://queirozf.com
“Every time you stay out late; every time you sleep in; every time you miss a workout; every time you don’t give 100% – You make it that much easier for me to beat you.” - Unknown author

On 15 February 2016 at 23:31, Felipe Almeida <falmeida1988@gmail.com> wrote:
- hide quoted text -

    Yes there is. I do it every day. It's very useful to try things out to see if things are behaving according to plan.

    Create the spark streaming context from the sc SparkContext (I'm using @transient for everything (because I run stuff outside of any enclosing scope, like an object) stuff gets "sucked up" into the context and has to be serialized, which causes lots of errors)

    @transient val ssc = new StreamingContext(sc,windowDuration)


    Here is an example of stuff you can do (I'm consuming Kinesis streams, you might use something else)

    @transient val streams = (0 until 1).map { i =>
      KinesisUtils.createStream(ssc, appName, streamName, endpointUrl, regionName,
        InitialPositionInStream.LATEST, windowDuration, StorageLevel.MEMORY_ONLY)
    }

    @transient val events = ssc
    .union(streams)
    .map(byteArray => new String(byteArray))
    .map(str => Funcs.parseLogEvent(str))
    .filter(tryLogEvent => tryLogEvent.isSuccess)
    .map(tryLogEvent => tryLogEvent.get)
    .filter(logEvent => logEvent.DataType == "Event" && logEvent.RequestType != "UIInputError" && logEvent.RequestType != "UIEmptyInput")


    You need an action like print() otherwise nothing happens, you probably know that

    events.print(10)


    Now you start the context:

    ssc.start()


    Now you need to wait for as long as it takes for a window to "close", and then you stop the streaming context, but not the underlying SparkContext, otherwise you need to restart the interpreter:

    ssc.stop(stopSparkContext=false, stopGracefully=true)


    Everything should work I guess. Let me know if you run into other problems.

    FA


    FA
    http://queirozf.com
    “Every time you stay out late; every time you sleep in; every time you miss a workout; every time you don’t give 100% – You make it that much easier for me to beat you.” - Unknown author

    On 15 February 2016 at 23:15, Michael Gummelt <mgummelt@mesosphere.io> wrote:

        Hi,

        I've seen this JIRA regarding Spark Streaming: https://issues.apache.org/jira/browse/ZEPPELIN-274, but I have a more basic question.  Is there a way to iterate on a Spark Streaming job in Zeppelin without restarting the interpreter?  Specifically, I'd like to start a streaming job, see some results, rewrite the job, then start it again.  Spark has some limitations that make this difficult: http://spark.apache.org/docs/latest/streaming-programming-guide.html#points-to-remember

        But I'm wondering if there's a workaround.  Thanks.

        --
        Michael Gummelt
        Software Engineer
        Mesosphere

---

// para #1
val temp = norm_featured_2f.select("norm_2f_features").rdd.map(r=>r(0).asInstanceOf[DenseVector].toArray).collect()
z.put("norm_featured_2f",temp)

// para #2
%pyspark
import matplotlib as matplt
matplt.use('Agg')
import matplotlib.pyplot as plt; plt.rcdefaults()
import StringIO

def show(p)
img = StringIO.StringIO()
p.savefig(img, format='svg')
img.seek(0)
print "%html <div style='width:700px'>" +img.buf + "</div>"

data = z.get('norm_featured_2f')
x=[]
y=[]
print ("SAMPLE")
for i in range(0,9):
    x.append(data[i][0])
    y.append(data[i][1])

plt.clf()
plt.suptitle('title', fontsize=30, fontweight='bold')
plt.plot(x,y,'bo')
plt.grid(True)
show(plt)

---

val rdd = sc.parallelize(List(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), 20)
def a(index: Int, iter: Iterator[(Int)] ): Iterator[String] = {
  iter.toList.map(x => "[part: " +  index + ", val: " + x + "]").iterator
}
rdd.mapPartitionsWithIndex(a).toDF.write.parquet("swift://virdata-factstore-frankfurt-fra02.lambada/lambada/test1")

---

%pyspark
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5, 6, 7, 8]
y = [20, 21, 20.5, 20.81, 21.0, 21.48, 22.0, 21.89]

import StringIO
def show(p):
  img = StringIO.StringIO()
  p.savefig(img, format='svg')
  img.seek(0)
  print "%html " + img.buf

---

%r
require(rCharts)
data(economics, package = 'ggplot2')
econ <- transform(economics, date = as.character(date))
m1 <- mPlot(x = 'date', y = c('psavert', 'uempmed'), type = 'Line', data = econ)
m1$set(pointSize = 0, lineWidth = 1)
m1$show('inline',include_assets=TRUE, cdn=TRUE)

%r
{"resultWidth": "700px", "resultHeight": "600px"}
library(googleVis)
Motion=gvisMotionChart(Fruits,  idvar="Fruit", timevar="Year")
print(Motion, tag = 'chart')

%r
{"imageWidth": "700px", "resultWidth": "800px"}
data(iris)
plot(iris, col = heat.colors(3))
plot(iris, col = heat.colors(2))

---

%spark.knitr echo=F

print("This notebook is here to guide you through some rZeppelin features.")
print("rZeppelin brings to Zeppelin the most powerful data visualization and exploration tool ever created, along with 5000+ statistics packages released by leading academics and technology companies, and the fastest in-memory vectorized data operations available.")
print("rZeppelin allows the creation of seamless Spark ML pipelines that combine R, scala, and Python code.")
print("This notebook shows how you can use the two R interfaces, the repl and knitr.  It shows some examples of how Zeppelin's built-in charting can easily display R data.frames.  And it shows increasingly sophisticated R visualizations, from simple B&W static base-R histograms, through interactive tools using rCharts and googleVis")

%spark.r 2 + 2
# The %spark.r interpreter is a simple REPL

%spark.r
# When R returns a data.frame, it will be displayed using Zeppelin's built-in interactive visualizations.
data(faithful)
faith <- createDataFrame(sqlContext, faithful)
registerTempTable(faith, "faithful")
ed <- sql(sqlContext, "SELECT * from faithful")
SparkR:::head(ed)


%spark.r
# Use the ZeppelinContext to make an R variable available to scala or python
.z.put("anRvariable", "Hello, world!")

%spark
val faithful = sqlContext.sql("SELECT * from faithful")
faithful.printSchema()

%spark
z.put("aScalaVariable", "Hello from Scala")
z.get("anRvariable")

%spark.knitr echo=F
ascala <- .z.get("aScalaVariable")
print(ascala)

%spark.r ed <- rnorm(100)

%spark.knitr echo=F
hist(ed)
print("If a histogram showed, that means that the knitr and r interpreters are sharing the same R environment.")

%spark.r data.frame(coming = rnorm(100), going = rnorm(100), grp = factor(sample(size = 100, letters, replace = T)), size = runif(100))

%spark.r
data(mtcars)
mtcars

%spark.r data(iris)
plot(iris, col = heat.colors(3)

%spark.knitr echo=F,results='asis',message=F,warning=F
library(googleVis)
Motion=gvisMotionChart(Fruits,
                       idvar="Fruit",
                       timevar="Year")
.z.show.googleVis(Motion)

%spark.knitr results='asis',echo=F,warning=F,message=F
require(rCharts)
data(economics, package = 'ggplot2')
econ <- transform(economics, date = as.character(date))
m1 <- mPlot(x = 'date', y = c('psavert', 'uempmed'), type = 'Line',
  data = econ)
m1$set(pointSize = 0, lineWidth = 1)
m1$show('inline',include_assets=TRUE, cdn=TRUE)

library(googleVis)
Geo=gvisGeoChart(EXports, locationvar = "Country", colorvar="Profit", options=list(Projection = "kavrayskiy-vii"))
.z.show.googleVis(geo)


.z.show.googleVis <- function(widget) print(widget, tag = 'chart')
.z.show.rCharts <- function(widget) widget$show('inline', include_assets=TRUE, cdn=TRUE)

.z.setProgress <- function(progress)  SparkR:::callJMethod(.rContext, "setProgress", progress %% 100)
.z.incrementProgress <- function(increment = 1) SparkR:::callJMethod(.rContext, "incrementProgress", increment)


---

df <- read.df(sqlContext, "/dataset/R/cars.csv", source = "com.databricks.spark.csv", inferSchema = "true")
printSchema(df)
registerTempTable(df, "df")
SparkR::head(df)

---

You can cast type and access the value. Like

objFrmPy.asInstanceOf[java.util.ArrayList[Any]].get(1)

Hope this helps,

Best,
moon

    Hi,

    I am having issues in accessing elements in python list from scala note. Accessing simple string is working.

    Any help?


    What I have is:

    //Using Zeppelin 0.5.6

    In first note:

    %pyspark

    obj1=[1,"ss",6,1]

    z.put("obj1", obj1)



    In second note (default scala):

    val objFrmPy=z.get("obj1")

    objFrmPy.getClass.getSimpleName  // output shows that it is ArrayList



    //errors

    objFrmPy(1)       //error: Object does not take parameters

    objFrmPy.get(1)  //error: value get is not a member of Object


---

import demo._
val ssc = new StreamingContext(sc, Seconds(2))
val tweet = TwitterUtils.createStream(ssc, getTwitterAuth())
val filtered = Tweets.filter(isEnglish).window(Seconds(60))
filtered.foreachRDD(rdd => registerRDDAsTable(rdd, "tweets"))
ssc.star()

---

https://github.com/vgmartinez/incubator-zeppelin/blob/generic_jdbc_docs/docs/interpreter/jdbc.md

---


My spark based map tasks needs to access third party jar files. I found below options to submit third party jar files to spark interpreter

1. export SPARK_SUBMIT_OPTIONS=<all the jar files with comma seprated> in conf/zeppelin-env.sh

2. include the statement spark.jars  <all the jar files with comma separated> in <spark>?conf/spark-defaults.conf

3. use the z.load("the location of jar file in the local filesystem") in zepelin notebook

I could test the first two and they both works fine. The third one does not work. Here is the snippet i use

%dep
z.reset()
z.load("file:///home/bala/Projects/pocv8.new/mapreduce/build/libs/mapreduce.jar")

Further, the import of class belongs to the above jar file is working when I use the statement import com.....  in zeppelin notebook. However, I get the class not found exception in the executor for the same class.

Any clue here would help greatly

---

Another problem that we might face is during the bad bandwidth connection the script loading might take time. So we run up into a issue were the sankey code that you are stated might start executing even before the library is loaded.
Make a ajax call and wrap your code inside the promise to ensure that ur code is executed after the library is loaded

I have made changes in my repo were i create a util class.
Would love to contribute back

On Fri, Jan 22, 2016 at 2:33 PM, Suraj <suraj14_05@yahoo.co.in> wrote:
- hide quoted text -

    That resolves it. Thanks Anthony and Corneau!

    Sent from Yahoo Mail on Android

        On Thu, 21 Jan, 2016 at 9:06 PM, Anthony Corbacho
        <anthonycorbacho@apache.org> wrote:

        Hi,

        The problem is that you try to load a js file from raw githubusercontent, and it will not work because of the mime of the content, if you look closer to the response you get, you will notice that the file mime is plain text instead of js. You should use cdn.rawgit instead.

        cdn.rawgit.com/tamc/Sankey/master/js/sankey.js
        On Jan 22, 2016 12:22 AM, "Suraj" <suraj14_05@yahoo.co.in> wrote:

            Yes, problem seems to be with loading .js src files. However, if I provide hosted links like
            https://raw.githubusercontent.com/tamc/Sankey/master/js/sankey.js , it's still failing.

            Accessing of local files works in standalone html/js. Isn't there a way to access local js src from Zeppelin note?


            Sent from Yahoo Mail on Android

                On Thu, 21 Jan, 2016 at 8:08 PM, Corneau Damien
                <corneadoug@gmail.com> wrote:

                Hi,
                I don't think the file path for the .js files can be reached this way. You would need to point to a hosted file.
                On Jan 21, 2016 7:52 PM, "Suraj" <suraj14_05@yahoo.co.in> wrote:

                    Hi



                    I am trying to use Sankey diagram from http://github.com/tamc/Sankey/tarball/master  in Zeppelin note; however it is not showing any visual. The example used is ‘tamc-Sankey-c6c6909/examples/simple.html’ from the above tar (same is shown below). I am running it with %angular. The example works standalone (in .html without Zeppelin note). The js src & css (in the script below) are from tar link provided above.
                    Any suggestions on how to make it work? Thanks a lot.

                    Regards,
                    Suraj

                    %angular
                    <script src="file:///media/zeppelin/tamc-Sankey-c6c6909/ext/raphael.js" type="text/javascript"></script>
                    <script src="file:///media/zeppelin/tamc-Sankey-c6c6909/ext/jquery.js" type="text/javascript"></script>
                    <script src="file:///media/zeppelin/tamc-Sankey-c6c6909/js/sankey.js" type="text/javascript"></script>
                    <link rel="stylesheet" href="file:///media/zeppelin/tamc-Sankey-c6c6909/examples/css/style.css" />
                    <script type='text/javascript'>
                            $(document).ready(function() {
                            var sankey = new Sankey();

                            sankey.stack(0,["Top","Bottom"]);
                            sankey.stack(1,["Merge"]);
                            sankey.stack(2,["Good","Bad"]);

                            sankey.setData([["Top",100,"Merge"],["Bottom",50,"Merge"],["Merge",70,"Good"],["Merge",80,"Bad"]]);
                            sankey.draw();
                            });
                    </script>
                    <h1 style='width:1000px; text-align: center; margin-bottom: 0'>A very simple Sankey Diagram</h1>
                    <div style='width:1000px; text-align: center; margin-top: 0'>Move your mouse over the diagram to show values</div>
                    <div id='sankey' style="width:1000px;height:1000px">

                    </div>


---

1. export SPARK_SUBMIT_OPTIONS=<all the jar files with comma seprated> in conf/zeppelin-env.sh

2. include the statement spark.jars  <all the jar files with comma separated> in <spark>?conf/spark-defaults.conf

3. use the z.load("the location of jar file in the local filesystem") in zepelin notebook

---

You can go to Interpreter menu on Zeppelin GUI, and set 'args' property of one of your spark interpreter setting, like

-i [path to your xxxx.scala]

that will pre-load scala script when interpreter starts.

---

from pyspark import SparkContext
from pyspark.sql import SQLContext
from pyspark.sql.types import *

sc = SparkContext( 'spark://headnodehost:7077', 'pyspark')

sqlContext = SQLContext(sc)

hvacText = sc.textFile("wasb://spark1old@corporater625ysy4.blob.core.windows.net/HdiSamples/SensorSampleData/hvac/HVAC.csv")
hvacSchema = StructType([StructField("date", StringType(), False),StructField("time", StringType(), False),StructField("targettemp", IntegerType(), False),StructField("actualtemp", IntegerType(), False),StructField("buildingID", StringType(), False)])
hvac = hvacText.map(lambda s: s.split(",")).filter(lambda s: s[0] != "Date").map(lambda s:(str(s[0]), str(s[1]), int(s[2]), int(s[3]), str(s[6]) ))
hvacdf = sqlContext.createDataFrame(hvac,hvacSchema)
hvacdf.registerAsTable("hvac")
data = sqlContext.sql("select buildingID, (targettemp - actualtemp) as temp_diff, date from hvac where date = \"6/1/13\"")
data.show()

buildingID temp_diff date
4          8         6/1/13
3          2         6/1/13
7          -10       6/1/13
12         3         6/1/13
7          9         6/1/13
7          5         6/1/13
3          11        6/1/13
8          -7        6/1/13
17         14        6/1/13
16         -3        6/1/13
8          -8        6/1/13
1          -1        6/1/13
12         11        6/1/13
3          14        6/1/13
6          -4        6/1/13
1          4         6/1/13
19         4         6/1/13
19         12        6/1/13
9          -9        6/1/13

---

val hvacText = sc.textFile("wasb://spark1old@corporater625ysy4.blob.core.windows.net/HdiSamples/SensorSampleData/hvac/HVAC.csv")

case class Hvac(date: String, time: String, targettemp: Integer, actualtemp: Integer, buildingID: String)
val hvac = hvacText.map(s => s.split(",")).filter(s => s(0) != "Date").map(
    s => Hvac(s(0),
            s(1),
            s(2).toInt,
            s(3).toInt,
            s(6)
        )
).toDF()
hvac.registerTempTable("hvac")

---

https://github.com/apache/incubator-zeppelin/pull/631
https://github.com/apache/incubator-zeppelin/pull/609
https://github.com/apache/incubator-zeppelin/pull/590

---

spark.yarn.isPython

---

Angular intereter not working properly  for the following code

%angular
<!DOCTYPE html>
<html>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="myCtrl">

First Name: <input type="text" ng-model="firstName"><br>
Last Name: <input type="text" ng-model="lastName"><br>
<br>
Full Name: {{firstName + " " + lastName}}

</div>

<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
</script>

</body>

---

def isGreaterThan10(i: Int): Boolean = {
    i > 10
}
val greaterThan10 = udf[Boolean, Int](isGreaterThan10)
sqlc.udf.register("ISGREATERTHAN10", isGreaterThan10 _)

case class Record(key: Int, value: String)
val df = sc.parallelize((1 to 20).map(i => Record(i, s"val_$i"))).toDF
df.registerTempTable("records")

sqlc.sql("select key from records").collect().foreach(println)
println
sqlc.sql("select key from records where ISGREATERTHAN10(key)").collect().foreach(println)
println
val count = sqlContext.sql("select COUNT(*) from records").collect().head.getLong(0)
println(s"COUNT(*): $count")

import sqlContext.implicits._
case class Record(key: Int, value: String)
val rdd = sc.parallelize((1 to 20).map(i => Record(i, s"val_$i")))
val df = rdd.toDF()
df.registerTempTable("records")
println(sqlc.sql("select count(*) from records").collect().head.getLong(0))
sqlc.sql("select first(key) from records").collect().foreach(println)

---

zeppelin-server

<dependency>
  <groupId>org.apache.commons</groupId>
  <artifactId>commons-exec</artifactId>
</dependency>

---

z.show(sc.parallelize(Array(1, 2, 3, 4, 5)))
sc.parallelize(Array(1, 2, 3, 4, 5)).toDF

%pyspark
rdd = sc.parallelize(["1", "2", "3"])
Data = Row('first')
df = sqlContext.createDataFrame(rdd.map(lambda d: Data(d)))
z.show(df)

---

{code}
%angular
<div on-click='myFunc("param1", "param2")'>Click me</div>
{code}

{code}
%spark
z.angularBingFunction("myFunc", { args: Seq[Object] =>
   // on click div element
})

z.angularUnbindFunction("myFunc")

---

Actually I would say yes and no.  Yes means the jar will be fetched by executor and added to classpath, No means it would not be added to classpath of driver. That means you can not invoke the class in the jar explicitly. But you can call them indirectly. like following (or if the jar is only dependency, won't be called directly )

>>> rdd.map(e=>{Class.forName("com.zjffdu.tutorial.spark.java.MyStack"); e}).collect()

On Sat, Dec 19, 2015 at 5:47 AM, Jim Lohse <jim@megalearningllc.com> wrote:

    I am going to say no, but have not actually tested this. Just going on this line in the docs:

    http://spark.apache.org/docs/latest/configuration.html

    spark.driver.extraClassPath 	(none) 	Extra classpath entries to prepend to the classpath of the driver.
    Note: In client mode, this config must not be set through the SparkConf directly in your application, because the driver JVM has already started at that point. Instead, please set this through the --driver-class-path command line option or in your default properties file.

    On 12/17/2015 07:53 AM, amarouni wrote:
>     Hello guys,
>
>     Do you know if the method SparkContext.addJar("file:///...") can be used
>     on a running context (an already started spark-shell) ?
>     And if so, does it add the jar to the class-path of the Spark workers
>     (Yarn containers in case of yarn-client) ?
>
>     Thanks,

---

3. Add spark configuration(~/conf/spark-defaults.conf) below two properties.

    spark.yarn.principal
    spark.yarn.keytab


---

df.select(concat(col("String_Column"), lit("00:00:000")))

---

http://zeppelin.incubator.apache.org/docs/0.6.0-incubating-SNAPSHOT/storage/storage.html#Git

---

Carburant

In [ ]:

def tryIntUDF(s: String): Option[Int] = {

  if (s == null) None

  else if (s.trim.isEmpty) None

  else {

    try {

      Some(s.toInt)

    } catch {

      case _: Throwable => None

    }

  }

}

val tryInt = udf[Option[Int], String]((s) => tryIntUDF(s))

sqlc.udf.register("TRYINT", tryIntUDF _)

tryIntUDF: (s: String)Option[Int]
tryInt: org.apache.spark.sql.UserDefinedFunction = UserDefinedFunction(<function1>,IntegerType)
res12: org.apache.spark.sql.UserDefinedFunction = UserDefinedFunction(<function1>,IntegerType)

Out[19]:
UserDefinedFunction(<function1>,IntegerType)
In [ ]:

val carburantSelect = s"""

case when TRYINT(CENERGY) = 1 then 1 else 0 end as CARBURANT_ESSENCE,

case when TRYINT(CENERGY) = 2 then 1 else 0 end as CARBURANT_DIESEL

"""

val dummy = true

carburantSelect: String =
"
case when TRYINT(CENERGY) = 1 then 1 else 0 end as CARBURANT_ESSENCE,
case when TRYINT(CENERGY) = 2 then 1 else 0 end as CARBURANT_DIESEL
"
dummy: Boolean = true

Out[70]:
true
Model Year
In [ ]:

val yearCutoff = 1992

yearCutoff: Int = 1992

Out[21]:
1992
In [ ]:

val modelYearSelect = s"""

case when DLIVRAI < $yearCutoff then NULL

     when NLISTAN = 'L' then 1990

     when NLISTAN = 'M' then 1991

     when NLISTAN = 'N' then 1992

     when NLISTAN = 'P' then 1993

     when NLISTAN = 'R' then 1994

     when NLISTAN = 'S' then 1995

     when NLISTAN = 'T' then 1996

     when NLISTAN = 'V' then 1997

     when NLISTAN = 'W' then 1998

     when NLISTAN = 'X' then 1999

     when NLISTAN = 'Y' then 2000

     when NLISTAN = '1' then 2001

     when NLISTAN = '2' then 2002

     when NLISTAN = '3' then 2003

     when NLISTAN = '4' then 2004

     when NLISTAN = '5' then 2005

     when NLISTAN = '6' then 2006

     when NLISTAN = '7' then 2007

     when NLISTAN = '8' then 2008

     when NLISTAN = '9' then 2009

     when NLISTAN = 'A' then 2010

     when NLISTAN = 'B' then 2011

     when NLISTAN = 'C' then 2012

     when NLISTAN = 'D' then 2013

     when NLISTAN = 'E' then 2014

     when NLISTAN = 'F' then 2015

     when NLISTAN = 'G' then 2016

     when NLISTAN = 'H' then 2017

     when NLISTAN = 'J' then 2018

     when NLISTAN = 'K' then 2019

     else NULL as PRODUCTION_YEAR

"""

val dummy = true

modelYearSelect: String =
"
case when DLIVRAI < 1992 then NULL
     when NLISTAN = 'L' then 1990
     when NLISTAN = 'M' then 1991
     when NLISTAN = 'N' then 1992
     when NLISTAN = 'P' then 1993
     when NLISTAN = 'R' then 1994
     when NLISTAN = 'S' then 1995
     when NLISTAN = 'T' then 1996
     when NLISTAN = 'V' then 1997
     when NLISTAN = 'W' then 1998
     when NLISTAN = 'X' then 1999
     when NLISTAN = 'Y' then 2000
     when NLISTAN = '1' then 2001
     when NLISTAN = '2' then 2002
     when NLISTAN = '3' then 2003
     when NLISTAN = '4' then 2004
     when NLISTAN = '5' then 2005
     when NLISTAN = '6' then 2006
     when NLISTAN = '7' then 2007
     when NLISTAN = '8' then 2008
     when NLISTAN = '9' then 2009
     when NLISTAN = 'A' then 2010
     when NLISTAN =...

Out[25]:
true
Environment Code
In [ ]:

val codeEnvironmentSelect = {

  scopedVehicutDf

    .select("CENVIRX")

    .filter("CENVIRX is not NULL")

    .distinct

    .rdd.map(_.getString(0))

    .map(codEnv => s"case when CENVIRX = '$codEnv' then 1 else 0 end as CODE_ENVIRONMENT_$codEnv")

    .collect.mkString(", ")

}

val dummy = true

codeEnvironmentSelect: String = case when CENVIRX = '0' then 1 else 0 end as CODE_ENVIRONMENT_0, case when CENVIRX = '3' then 1 else 0 end as CODE_ENVIRONMENT_3, case when CENVIRX = '4' then 1 else 0 end as CODE_ENVIRONMENT_4, case when CENVIRX = '5' then 1 else 0 end as CODE_ENVIRONMENT_5, case when CENVIRX = '6' then 1 else 0 end as CODE_ENVIRONMENT_6, case when CENVIRX = 'E' then 1 else 0 end as CODE_ENVIRONMENT_E
dummy: Boolean = true

Out[27]:
true
Genre Vehicule
In [ ]:

val genreVehiculeSelect = {

  scopedVehicutDf

    .select("CCARKIN")

    .filter("CCARKIN is not NULL")

    .distinct

    .rdd.map(_.getString(0))

    .map(genrVeh => s"case when CCARKIN = '$genrVeh' then 1 else 0 end as GENRE_VEHICULE_$genrVeh")

    .collect.mkString(", ")

}

val dummy = true

genreVehiculeSelect: String = case when CCARKIN = 'MT' then 1 else 0 end as GENRE_VEHICULE_MT, case when CCARKIN = 'TL' then 1 else 0 end as GENRE_VEHICULE_TL, case when CCARKIN = 'AA' then 1 else 0 end as GENRE_VEHICULE_AA, case when CCARKIN = 'AB' then 1 else 0 end as GENRE_VEHICULE_AB, case when CCARKIN = 'AC' then 1 else 0 end as GENRE_VEHICULE_AC, case when CCARKIN = 'AD' then 1 else 0 end as GENRE_VEHICULE_AD, case when CCARKIN = 'AE' then 1 else 0 end as GENRE_VEHICULE_AE, case when CCARKIN = 'AF' then 1 else 0 end as GENRE_VEHICULE_AF, case when CCARKIN = 'TR' then 1 else 0 end as GENRE_VEHICULE_TR, case when CCARKIN = 'AR' then 1 else 0 end as GENRE_VEHICULE_AR, case when CCARKIN = 'AZ' then 1 else 0 end as GENRE_VEHICULE_AZ, case when CCARKIN = 'BA' then 1 else 0 end as GENRE_...

Out[29]:
true
Model Year
In [ ]:

def from2DigitYearUDF(s: String): Option[Int] = {

  if (s == null) None

  else if (s.trim.isEmpty) None

  else if (s.head == '0' || s.head == '1' || s.head == '2') Some(2000 + s.toInt)

  else Some(1900 + s.toInt)

}

val from2DigitYear = udf[Option[Int], String]((s) => from2DigitYearUDF(s))

sqlc.udf.register("FROM2DIGITYEAR", from2DigitYearUDF _)

from2DigitYearUDF: (s: String)Option[Int]
from2DigitYear: org.apache.spark.sql.UserDefinedFunction = UserDefinedFunction(<function1>,IntegerType)
res20: org.apache.spark.sql.UserDefinedFunction = UserDefinedFunction(<function1>,IntegerType)

Out[34]:
UserDefinedFunction(<function1>,IntegerType)
In [ ]:

val modelYearMode = {

  val freqs = {

    scopedVehicutDf

      .filter("CANNMOD is not NULL")

      .withColumn("CANNMOD",from2DigitYear(scopedVehicutDf("CANNMOD")))

      .groupBy("CANNMOD").count

      .rdd.map(r => (r.getInt(0), r.getInt(0))).sortBy(_._1)

      .collect

  }

  val total = freqs.map(_._2).reduce(_ + _)

  freqs.foldLeft((-1, 0))((stored, freq) => if (stored._2 >= total/2) stored else (freq._1, stored._2 + freq._2))._1

}

modelYearMode: Int = 1993

Out[42]:
1993
In [ ]:

val modelYearSelect = s"""

case when CANNMOD is NULL then $modelYearMode else FROM2DIGITYEAR(CANNMOD) end as MODEL_YEAR,

case when CANNMOD is NULL then 1 else 0 end as MODEL_YEAR_MISSING

"""

val dummy = true

modelYearSelect: String =
"
case when CANNMOD is NULL then 1993 else FROM2DIGITYEAR(CANNMOD) end as MODEL_YEAR,
case when CANNMOD is NULL then 1 else 0 end as MODEL_YEAR_MISSING
"
dummy: Boolean = true

Out[44]:
true
Dieteren Car
In [ ]:

val dieterenCarSelect = s"""

case when FORIGIN = false then 0 else 1 end as DIETEREN_CAR

"""

val dummy = true

dieterenCarSelect: String =
"
case when FORIGIN = false then 0 else 1 end as DIETEREN_CAR
"
dummy: Boolean = true

Out[47]:
true
Cylinder Volume
In [ ]:

val cylinderVolumeMean = scopedVehicutDf.agg(mean("QCYLIND")).first.getDouble(0)

cylinderVolumeMean: Double = 1728.0986190932836

Out[56]:
1728.0986190932836
In [ ]:

val cylinderVolumeSelect = s"""

case when QCYLIND is NULL then $cylinderVolumeMean else QCYLIND end as CYLINDER_VOLUME,

case when QCYLIND is NULL then 1 else 0 end as CYLINDER_VOLUME_MISSING

"""

val dummy = true

cylinderVolumeSelect: String =
"
case when QCYLIND is NULL then 1728.0986190932836 else QCYLIND end as CYLINDER_VOLUME,
case when QCYLIND is NULL then 1 else 0 end as CYLINDER_VOLUME_MISSING
"
dummy: Boolean = true

Out[57]:
true
kW Power
In [ ]:

val kwPowerMean = scopedVehicutDf.agg(mean("QCARKWS")).first.getDouble(0)

kwPowerMean: Double = 77.71624226686015

Out[58]:
77.71624226686015
In [ ]:

val kwPowerSelect = s"""

case when QCARKWS is NULL then $kwPowerMean else QCARKWS end as KW_POWER,

case when QCARKWS is NULL then 1 else 0 end as KW_POWER_MISSING

"""

val dummy = true

kwPowerSelect: String =
"
case when QCARKWS is NULL then 77.71624226686015 else QCARKWS end as KW_POWER,
case when QCARKWS is NULL then 1 else 0 end as KW_POWER_MISSING
"
dummy: Boolean = true

Out[59]:
true
Max Weight
In [ ]:

val maxWeightMean = scopedVehicutDf.agg(mean("QMAXWGT")).first.getDouble(0)

maxWeightMean: Double = 1461.6384158661504

Out[73]:
1461.6384158661504
In [ ]:

val maxWeightSelect = s"""

case when QMAXWGT is NULL then $maxWeightMean else QMAXWGT end as MAX_WEIGHT,

case when QMAXWGT is NULL then 1 else 0 end as MAX_WEIGHT_MISSING

"""

val dummy = true

maxWeightSelect: String =
"
case when QMAXWGT is NULL then 1461.6384158661504 else QMAXWGT end as MAX_WEIGHT,
case when QMAXWGT is NULL then 1 else 0 end as MAX_WEIGHT_MISSING
"
dummy: Boolean = true

Out[74]:
true
Bringing It All Together
In [ ]:

val carPropertiesDf = sqlc.sql(s"""

  select tp.NCLIPRO,

         tp.CTYPLIE,

         tp.NCHASSI,

         tp.DSTART,

         tp.DEND,

         $modelSelect,

         $carTypeSelect,

         $referenceModelSelect,

         $carburantSelect,

         $modelYearSelect,

         $codeEnvironmentSelect,

         $genreVehiculeSelect,

         $modelYearSelect,

         $dieterenCarSelect,

         $cylinderVolumeSelect,

         $kwPowerSelect,

         $maxWeightSelect

  from CUSTOMER_TOUCHPOINTS as tp

  left outer join SCOPED_VEHICUT as veh

  on (tp.NCHASSI = veh.NCHASSI)

""")

carPropertiesDf.registerTempTable("CAR_PROPERTIES")

carPropertiesDf: org.apache.spark.sql.DataFrame = [NCLIPRO: bigint, CTYPLIE: string, NCHASSI: string, DSTART: timestamp, DEND: timestamp, MODEL_A7: int, MODEL_A8: int, MODEL_A9: int, MODEL_4A: int, MODEL_4B: int, MODEL_4C: int, MODEL_4D: int, MODEL_AA: int, MODEL_AB: int, MODEL_4E: int, MODEL_AC: int, MODEL_4F: int, MODEL_4G: int, MODEL_4H: int, MODEL_H6: int, MODEL_H7: int, MODEL_NF: int, MODEL_H8: int, MODEL_4L: int, MODEL_4M: int, MODEL_H9: int, MODEL_AJ: int, MODEL_NH: int, MODEL_50: int, MODEL_NJ: int, MODEL_AM: int, MODEL_51: int, MODEL_52: int, MODEL_54: int, MODEL_4S: int, MODEL_5C: int, MODEL_BA: int, MODEL_5E: int, MODEL_5F: int, MODEL_5G: int, MODEL_BE: int, MODEL_BF: int, MODEL_5J: int, MODEL_5K: int, MODEL_5L: int, MODEL_V6: int, MODEL_5M: int, MODEL_BK: int, MODEL_V7: int,...

Out[75]:
Write Table
In [ ]:

carPropertiesDf.toJSON.saveAsTextFile(s"$featurePath/json/FEATURES_CAR_CONFIGURATION")

Out[76]:

End Of Notebook

---

+ df.agg(min("DINTERV"))
+ df.select("lkj", "lkj").distinct.count

---

SPARK_SUBMIT_OPTIONS="--driver-java-options -Xmx20g" ZEPPELIN_NOTEBOOK_DIR=/notebook ./bin/zeppelin.sh

---

%spark

// display calender
println("""
%angular
<input type="text" id="calendar" size="20" ng-model="calendar"></input>

<script>
$("#calendar").datepicker({
    dateFormat: 'yy-mm-dd'
});
</script>
""")


// z.angularUnbind("calendar") // clear previously binded value

// bind value
z.angularBind("calendar", "15-11-21")

%spark

// watch date change
z.angularWatch("calendar", (before:Object, after:Object, context:org.apache.zeppelin.interpreter.InterpreterContext) => {
    // on calendar change, run 3rd paragraph. Paragraph index starts from 0
    z.run(2, context)
})

%spark

// retrieve value
print("Selected Date = " + z.angular("calendar").toString)

---

Zeppelin Tutorial

We will assume you have Zeppelin installed already. If that's not the case, see Install.

Zeppelin's current main backend processing engine is Apache Spark. If you're new to the system, you might want to start by getting an idea of how it processes data to get the most out of Zeppelin.


Tutorial with Local File
Data Refine

Before you start Zeppelin tutorial, you will need to download bank.zip.

First, to transform data from csv format into RDD of Bank objects, run following script. This will also remove header using filter function.

val bankText = sc.textFile("yourPath/bank/bank-full.csv")

case class Bank(age:Integer, job:String, marital : String, education : String, balance : Integer)

// split each line, filter out header (starts with "age"), and map it into Bank case class
val bank = bankText.map(s=>s.split(";")).filter(s=>s(0)!="\"age\"").map(
    s=>Bank(s(0).toInt,
            s(1).replaceAll("\"", ""),
            s(2).replaceAll("\"", ""),
            s(3).replaceAll("\"", ""),
            s(5).replaceAll("\"", "").toInt
        )
)

// convert to DataFrame and create temporal table
bank.toDF().registerTempTable("bank")


Data Retrieval

Suppose we want to see age distribution from bank. To do this, run:

%sql select age, count(1) from bank where age < 30 group by age order by age

You can make input box for setting age condition by replacing 30 with ${maxAge=30}.

%sql select age, count(1) from bank where age < ${maxAge=30} group by age order by age

Now we want to see age distribution with certain marital status and add combo box to select marital status. Run:

%sql select age, count(1) from bank where marital="${marital=single,single|divorced|married}" group by age order by age


Tutorial with Streaming Data
Data Refine

Since this tutorial is based on Twitter's sample tweet stream, you must configure authentication with a Twitter account. To do this, take a look at Twitter Credential Setup. After you get API keys, you should fill out credential related values(apiKey, apiSecret, accessToken, accessTokenSecret) with your API keys on following script.

This will create a RDD of Tweet objects and register these stream data as a table:

import org.apache.spark.streaming._
import org.apache.spark.streaming.twitter._
import org.apache.spark.storage.StorageLevel
import scala.io.Source
import scala.collection.mutable.HashMap
import java.io.File
import org.apache.log4j.Logger
import org.apache.log4j.Level
import sys.process.stringSeqToProcess

/** Configures the Oauth Credentials for accessing Twitter */
def configureTwitterCredentials(apiKey: String, apiSecret: String, accessToken: String, accessTokenSecret: String) {
  val configs = new HashMap[String, String] ++= Seq(
    "apiKey" -> apiKey, "apiSecret" -> apiSecret, "accessToken" -> accessToken, "accessTokenSecret" -> accessTokenSecret)
  println("Configuring Twitter OAuth")
  configs.foreach{ case(key, value) =>
    if (value.trim.isEmpty) {
      throw new Exception("Error setting authentication - value for " + key + " not set")
    }
    val fullKey = "twitter4j.oauth." + key.replace("api", "consumer")
    System.setProperty(fullKey, value.trim)
    println("\tProperty " + fullKey + " set as [" + value.trim + "]")
  }
  println()
}

// Configure Twitter credentials
val apiKey = "xxxxxxxxxxxxxxxxxxxxxxxxx"
val apiSecret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
val accessToken = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
val accessTokenSecret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
configureTwitterCredentials(apiKey, apiSecret, accessToken, accessTokenSecret)

import org.apache.spark.streaming.twitter._
val ssc = new StreamingContext(sc, Seconds(2))
val tweets = TwitterUtils.createStream(ssc, None)
val twt = tweets.window(Seconds(60))

case class Tweet(createdAt:Long, text:String)
twt.map(status=>
  Tweet(status.getCreatedAt().getTime()/1000, status.getText())
).foreachRDD(rdd=>
  // Below line works only in spark 1.3.0.
  // For spark 1.1.x and spark 1.2.x,
  // use rdd.registerTempTable("tweets") instead.
  rdd.toDF().registerAsTable("tweets")
)

twt.print

ssc.start()


Data Retrieval

For each following script, every time you click run button you will see different result since it is based on real-time data.

Let's begin by extracting maximum 10 tweets which contain the word "girl".

%sql select * from tweets where text like '%girl%' limit 10

This time suppose we want to see how many tweets have been created per sec during last 60 sec. To do this, run:

%sql select createdAt, count(1) from tweets group by createdAt order by createdAt

You can make user-defined function and use it in Spark SQL. Let's try it by making function named sentiment. This function will return one of the three attitudes(positive, negative, neutral) towards the parameter.

def sentiment(s:String) : String = {
    val positive = Array("like", "love", "good", "great", "happy", "cool", "the", "one", "that")
    val negative = Array("hate", "bad", "stupid", "is")

    var st = 0;

    val words = s.split(" ")
    positive.foreach(p =>
        words.foreach(w =>
            if(p==w) st = st+1
        )
    )

    negative.foreach(p=>
        words.foreach(w=>
            if(p==w) st = st-1
        )
    )
    if(st>0)
        "positivie"
    else if(st<0)
        "negative"
    else
        "neutral"
}

// Below line works only in spark 1.3.0.
// For spark 1.1.x and spark 1.2.x,
// use sqlc.registerFunction("sentiment", sentiment _) instead.
sqlc.udf.register("sentiment", sentiment _)

To check how people think about girls using sentiment function we've made above, run this:

%sql select sentiment(text), count(1) from tweets where text like '%girl%' group by sentiment(text)

---

Hi Jeff,

Can you use "Array" instead of "List", that works for me.

On 19 November 2015 at 13:13, Jeff Steinmetz <jeffrey.steinmetz@gmail.com> wrote:
- hide quoted text -

    Any thoughts on why the example below only displays the first item in the list, “lisa”, followed by an empty object, then stops?
    or specifically:

    lisa
    {}


    The two notebook paragraphs (first %spark, then %angular) are:

    %spark

    val friends = List("lisa","jeff","mary","sun")
    z.angularBind("friends", friends)


    %angular

    <div ng-repeat="f in friends">
      <div>{{f}}</div>
    </div>

---

clark pdf to note

---

clark spark-csv on yarn

---

https://github.com/apache/incubator-zeppelin/pull/27 Ability to create rich gui inside of Notebook by Leemoonsoo · Pull Request #27 · apache_incubator-zeppelin
https://github.com/apache/incubator-zeppelin/pull/80 Add Scala utility functions for display
https://github.com/apache/incubator-zeppelin/pull/312 Line chart with focus

---

There're couple of ways to add external jar when Zeppelin (0.6.0-SNAPSHOT) uses spark-submit command.

1. Using %dep interpreter, as Vinay mentioned.
     %dep z.load("group:artifact:version")
     %spark import ....
2. By adding spark.files property at SPARK_HOME/conf/spark-defaults.conf
     spark.files  /path/to/my.jar
3. By exporting SPARK_SUBMIT_OPTIONS env variable in ZEPPELIN_HOME/conf/zeppelin-env.sh
     eg) cd
         export SPARK_SUBMIT_OPTIONS="--packages group:artifact:version"
     note) does not work for pyspark yet. https://issues.apache.org/jira/browse/ZEPPELIN-339

export SPARK_SUBMIT_OPTIONS="--packages org.apache.spark:spark-streaming-kinesis-asl_2.10:1.5.0"

into conf/zeppelin-env.sh might help.

On Wed, Oct 21, 2015 at 12:55 AM Vinay Shukla <vinayshukla@gmail.com> wrote:
- hide quoted text -
Saurav,
Agree this would be a useful feature. Right now Zeppelin can import dependencies from Maven with %dep interpreter. But this does not understand spark-packages.
-Vinay
On Tue, Oct 20, 2015 at 6:54 AM, Sourav Mazumder <sourav.mazumder00@gmail.com> wrote:
Looks like right now there is no way one can pass additional jar files to spark_submit from Zeppelin.The same works fine if I am not using spark_submit option (by not specifying spark_home).
When I checked the code interpreter.sh I found that for the class path it only passes the zeppelin-spark*.jar available in zeppelin_home/interpreter/spark directory.
I suggest to put this as a bug/enhancement. The solution should be pretty easy by making some small changes in interpreter.sh (I've done the same and could make it work with some external_lib folder under zeppelin_home/interpreter/spark directory).
Regards,
Sourav

---

export MESOS_NATIVE_LIBRARY=/usr/local/lib/libmesos.so
export SPARK_HOME="/opt/spark-1.4.0-hadoop2.4"
export MASTER=mesos://zk://m-0.mesos.private:2181/mesos
export MASTER=mesos://zk://zookeeper-0:2181,zookeeper-1:2181,zookeeper-2:2181/mesos

---

z.load("<path>/RedshiftJDBC41-1.1.2.0002.jar")
import org.apache.spark.sql.SQLContext
val host = sys.env("REDSHIFT_HOST")
val port = sys.env("REDSHIFT_PORT")
val username = sys.env("REDSHIFT_USERNAME")
val password = sys.env("REDSHIFT_PASSWORD")
val database = sys.env("REDSHIFT_DATABASE")
val url= List("jdbc:redshift://", host, ":", port, "/", database).mkString

val sqlSC = new SQLContext(sc)
val sql = "<query>"

val options = Map(
  "driver" -> "com.amazon.redshift.jdbc41.Driver",
  "user" -> username,
  "password" -> password,
  "url" -> url,
  "numPartitions" -> "5",
  "dbTable" -> List("(", sql, ") as dbTable").mkString
)

val result = sqlSC.read.format("jdbc").options(options).load()
result.show()

---

%angular

<div id="chart-013" style="height: 400px; width: 80%"></div>
<script type="text/javascript">
function plotChart() {
    $('#chart-013').highcharts(
        {"series":[{"data":[{"x":0,"y":10},{"x":1,"y":20},{"x":2,"y":3},{"x":3,"y":4},{"x":4,"y":5}],"type":"pie"}],"exporting":{"filename":"chart"},"yAxis":[{"title":{"text":""}}],"plotOptions":{},"credits":{"href":"","text":""},"chart":{"zoomType":"xy"},"title":{"text":""},"xAxis":[{"title":{"text":""}}]}
    );
}

function loadLib(url) {
    console.log('Loading library at: ' + url);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = function() { console.log('Loaded library at: ' + url); }
    script.onerror = function(err) { alert(err); }
    document.getElementsByTagName('head')[0].appendChild(script);
}

// Load each script only once!
if (!window.jQuery) {
    loadLib("http://code.jquery.com/jquery-1.8.2.min.js");
}

if (!window.Highcharts) {
    loadLib("http://code.highcharts.com/4.0.4/highcharts.js");
    loadLib("http://code.highcharts.com/4.0.4/modules/exporting.js");
    loadLib("http://code.highcharts.com/4.0.4/highcharts-more.js");
}

plotChart();
</script>

Hi Chad,

So with that Angular code I posted you can then create an Angular variable called “locations” and set it from a separate Scala paragraph, like so:

case class Loc(desc: String, lat: Double, lon: Double)
val locations = Array(Loc(“Test”, 24.4, 49.8))
z.angularBind(“locations”, locations)

The locations value would be an array of a case class. In my example, I’m expecting the fields “desc”, “lat”, and “lon” (see lines 23-24) but you can use whatever you want. Obviously you would set that based on some Spark or other query.

Let me know if that works or not!

Thanks,
Silvio

---

+ %dataset load [from] [to]
+ val csv = sqlContext.read.format("com.databricks.spark.csv").option("header", "true").load("/dataset/titanic/test.csv")
+ csv.show
+ version + spark-csv notes
+ MASTER=yarn-client
+ HADOOP_CONF_DIR=/dla/sdk/conf/hadoop
+ SPARK_JAR=/dla/sdk/ext/lib/spark-1.6.0-bin-scala-2.11-hadoop2.6.0_2.11.jar
+ %dataset ls [path]
+ userguide in menu
+ toDF util function pour python
  print z.get("banks")
  print z.get("banks").collect()[0]
  print z.get("banks").collect()[1]
  print z.get("banks").collect()[2]
  print z.get("banks").collect()[3]
 donne
  [age: int, job: string, marital: string, education: string, balance: int]
  [58,management,married,tertiary,2143]
  [44,technician,single,secondary,29]
  [33,entrepreneur,married,secondary,2]
  [47,blue-collar,married,unknown,1506]

---

spark.dynamicAllocation.initialExecutors 45
spark.dynamicAllocation.maxExecutors 60
spark.dynamicAllocation.minExecutors 5
spark.dynamicAllocation.schedulerBacklogTimeout 600

---

spark.cores.max: 24
spark.executor.memory 22g
val textFile = sc.textFile("hdfs://somefile.txt")

val f = (s: String) => s
textFile.map(f).count
//works fine
//res145: Long = 407


def f(s:String) = {
    s+s
}
textFile.map(f).count

---

You can pass variable from between spark and pyspark in this way.

%spark
z.put("var1", myVar)

%pyspark
myVar = z.get("var1")
The other way (pyspark->spark) also works.
For SparkSQL, one possible way to use variable is
%spark
z.show(sqlContext.sql(s"select .... ${myVar}"))

---

%pyspark

import StringIO
def show(p):
  img = StringIO.StringIO()
  p.savefig(img, format='svg')
  img.seek(0)
  print "%html " + img.buf

%pyspark
import matplotlib.pyplot as plt

x = [1,2,3,4]
y = [20, 21, 20.5, 20.8]

plt.plot(x, y, linestyle="dashed", marker="o", color="green")
%pyspark
show(plt)

---

%pyspark

print "Hello PySpark!"
def NUM_SAMPLES = 1000

def sample(p):
    x, y = random(), random()
    return 1 if x*x + y*y < 1 else 0

count = sc.parallelize(xrange(0, NUM_SAMPLES)).map(sample).reduce(lambda a, b: a + b)
print "Pi is roughly %f" % (4.0 * count / NUM_SAMPLES)

friends = ['john', 'pat', 'gary', 'michael']
for i, name in enumerate(friends):
    print "iteration {iteration} is {name}".format(iteration=i, name=name)

---

import datalayer.dna._
import datalayer.connector._
import org.apache.spark.rdd.RDD

// Describing CSV format
val descr = new CSVFileDescriptor("../../dataset/simple/", "data.csv").setLabelColumn(0).setIsHeader(false).setSeparator(" ")
// Connect to file
val file = new FileConnector[Double, Int](dnaType = RDD, descr, sc = sc)
// Mutate to DataR so we can use R
val dataR = new Mutator(file.dataDna).toDataR

println("%html ")
println(dataR.plot())
println(dataR.plot("plot(volcano)"))
println(dataR.plot("plot((-4:5)^2, main = \"Quadratic\")"))
println(dataR.plot("plot(data, main = \"This is some Data\")"))
println(dataR.plot("boxplot(data, main = \"This is a BoxPlot\")"))

---

%svg
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="480" height="543.03003" viewBox="0 0 257.002 297.5" xml:space="preserve">
 <g transform="matrix(0.8526811,0,0,0.8526811,18.930632,21.913299)">
  <polygon points="8.003,218.496 0,222.998 0,74.497 8.003,78.999 8.003,218.496 "/>
  <polygon points="128.501,287.998 128.501,297.5 0,222.998 8.003,218.496 128.501,287.998 "/>
  <polygon points="249.004,218.496 257.002,222.998 128.501,297.5 128.501,287.998 249.004,218.496 "/>
  <polygon points="249.004,78.999 257.002,74.497 257.002,222.998 249.004,218.496 249.004,78.999 "/>
  <polygon points="128.501,9.497 128.501,0 257.002,74.497 249.004,78.999 128.501,9.497 "/>
  <polygon points="8.003,78.999 0,74.497 128.501,0 128.501,9.497 8.003,78.999 "/>
 </g>
</svg>

---

You can pass variable from between spark and pyspark in this way.

%spark
z.put("var1", myVar)

%pyspark
myVar = z.get("var1")
The other way (pyspark->spark) also works.
For SparkSQL, one possible way to use variable is

%spark
z.show(sqlContext.sql(s"select .... ${myVar}"))

---

wasb://datalayer-spark-1@corporater625ysy4.blob.core.windows.net/HdiSamples/SensorSampleData/hvac/HVAC.csv

---

val hvacText = sc.textFile("wasb://datalayer-spark-1@corporater625ysy4.blob.core.windows.net/HdiSamples/SensorSampleData/hvac/HVAC.csv")

case class Hvac(date: String, time: String, targettemp: Integer, actualtemp: Integer, buildingID: String)
val hvac = hvacText.map(s => s.split(",")).filter(s => s(0) != "Date").map(
    s => Hvac(s(0),
            s(1),
            s(2).toInt,
            s(3).toInt,
            s(6)
        )
).toDF()
hvac.registerTempTable("hvac")

%sql
select buildingID, date, targettemp, (targettemp - actualtemp) as temp_diff
from hvac
where targettemp > "${Temp = 65,65|75|85}"

%sql
select buildingID, (targettemp - actualtemp) as temp_diff, date
from hvac
where date = "6/1/13"

---

val gson = new com.google.gson.Gson()
val bubbles = sqlContext.sql(s"""select *, case when mag < 6 then 1.7 else ((mag - 6) * 3)+1.7 end as mag_adjusted,  case when depth <= 100 then cast(depth/10 as int) when depth <= 1000 then cast(depth/100 as int) *10  else 100 end  as depth_cat from eq where date >= "2005" and mag >3 """).map{r=>
Map(
"name" -> r(0).toString,
"radius" -> r(7).toString.toDouble,
"mag" -> r(5).toString.toDouble,
"date" -> r(1).toString,
"latitude" -> r(2).toString.toDouble,
"longitude" -> r(3).toString.toDouble,
"fillKey" -> r(8).toString,
"depth" -> r(4).toString
)
}.collect.map(s=>scala.collection.JavaConversions.mapAsJavaMap(s))
val bubblesJson = gson.toJson(bubbles)


println(s"""%html
<!-- script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script -->
<script src="http://datamaps.github.io/scripts/topojson.js"></script>
<script src="http://datamaps.github.io/scripts/0.4.0/datamaps.all.js"></script>
<div id="worldMap" style="position: relative; width: 1200px; height: 1000px;"></div>
<script>
setTimeout(function(){
var map = new Datamap({
element: document.getElementById('worldMap'),
geographyConfig: {
popupOnHover: false,
highlightOnHover: false
},
fills: {
defaultFill: '#ABDDA4',
'0': '#393b79',
'1': '#5254a3',
'2': '#6b6ecf',
'3': '#9c9ede',
'4': '#637939',
'5': '#8ca252',
'6': '#b5cf6b',
'7': '#cedb9c',
'8': '#8c6d31',
'9': '#bd9e39',
'10': '#e7ba52',
'20': '#e7cb94',
'30': '#843c39',
'40': '#ad494a',
'50': '#d6616b',
'60': '#e7969c',
'70': '#7b4173',
'80': '#a55194',
'90': '#ce6dbd',
'100': '#de9ed6'
},
bubblesConfig: {
borderWidth: 0,
fillOpacity: 0.75
}
});

map.bubbles(${bubblesJson}, {
popupTemplate: function(geo, data) {
return '<div class="hoverinfo">Magnitude: ' + data.mag + '<br/>  Exploded on: ' + data.date + ' <br/> Depth: ' + data.depth + '<br/> Depth Category: ' + data.fillKey +  '</div>'
}
});

}, 2000)
</script>
""")

---

val x1=Vector(0,1,2,3,4)
z.angularBind("x1", x1.toArray)

println("%angular x1={{x1}}")

You can also access this variable in JS, by printing javascript like

%angular
<script>
var controllerElement = document.querySelector('[ng-app=zeppelinWebApp]');
var scope = angular.element(controllerElement).scope().compiledScope;
console.log("x1=%o", scope.x1)
<script>

---

<!-- place this in an %angular paragraph -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.css" />
<div id="map" style="height: 800px; width: 100%"></div>

<script type="text/javascript">
function initMap() {
    var map = L.map('map').setView([30.00, -30.00], 3);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 12,
        minZoom: 3
    }).addTo(map);

    var geoMarkers = L.layerGroup().addTo(map);

    var el = angular.element($('#map').parent('.ng-scope'));
    angular.element(el).ready(function() {
        window.locationWatcher = el.scope().compiledScope.$watch('locations', function(newValue, oldValue) {
            geoMarkers.clearLayers();
            angular.forEach(newValue, function(loc) {
                var marker = L.marker([ loc.lat, loc.lon ])
                  .bindPopup(loc.desc)
                  .addTo(geoMarkers);
            });
        })
    });
}

if (window.locationWatcher) {
    // clear existing watcher otherwise we'll have duplicates
    window.locationWatcher();
}

// ensure we only load the script once, seems to cause issues otherwise
if (window.L) {
    initMap();
} else {
    console.log('Loading Leaflet library');
    var sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.5/leaflet.js';
    sc.onload = initMap;
    sc.onerror = function(err) { alert(err); }
    document.getElementsByTagName('head')[0].appendChild(sc);
}
</script>

---

import com.google.common.io.Files

 def plotter():Unit= {
        val x1=Vector(0, 1, 2, 3, 4)
        val y1=Vector(0, 1, 2, 3, 4)
        val x2=Vector(0, 1, 2, 3, 4)
        val y2=Vector(0, 1, 4, 9, 16)
        val text1 = com.google.common.io.Files.toString(new java.io.File("/Users/dcorneau/Downloads/file1.html"), com.google.common.base.Charsets.UTF_8)
        val text2 = com.google.common.io.Files.toString(new java.io.File("/Users/dcorneau/Downloads/file2.html"), com.google.common.base.Charsets.UTF_8)

        // Removing data set object from HTML and add them in the scala
        var data = "{label:\"Data Set 1\", x:[" + x1(0) +","+x1(1) +","+x1(2) +","+ x1(3) +","+ x1(4) + "], y: ["+ y1(0) +","+y1(1) +","+y1(2) +","+ y1(3) +","+ y1(4) + "]},"
        data += "{label: \"Data Set 2\", x: ["+ x2(0) +","+x2(1) +","+x2(2) +","+ x2(3) +","+ x2(4) + "], y: ["+ y2(0) +","+y2(1) +","+y2(2) +","+ y2(3) +","+ y2(4) + "]}"

        // Here it is important to have a space between %html and the text1
        println("%html "+ text1 + data + text2)
 }


plotter()

Show file1.html
<style> #myViz { font: 10px sans-serif; } .axis path, .axis line { fill: none; stroke: #000; shape-rendering: crispEdges; } .grid path, .grid line { fill: none; stroke: rgba(0, 0, 0, 0.25); shape-rendering: crispEdges; } .x.axis path { display: none; } .line { fill: none; stroke-width: 2.5px; } </style> <div id="myViz"></div> <script>
var data = [

Show File2.html
]; var xy_chart = d3_xy_chart() .width(960) .height(500) .xlabel("X Axis") .ylabel("Y Axis"); var svg = d3.select("#myViz").append("svg") .datum(data) .style("width", 960) .style("height", 500) .call(xy_chart); function d3_xy_chart() { var width = 640, height = 480, xlabel = "X Axis Label", ylabel = "Y Axis Label"; function chart(selection) { selection.each(function(datasets) { // // Create the plot. // var margin = {top: 20, right: 80, bottom: 30, left: 50}, innerwidth = width - margin.left - margin.right, innerheight = height - margin.top - margin.bottom; var x_scale = d3.scale.linear() .range([0, innerwidth]) .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), d3.max(datasets, function(d) { return d3.max(d.x); }) ]); var y_scale = d3.scale.linear() .range([innerheight, 0]) .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }), d3.max(datasets, function(d) { return d3.max(d.y); }) ]); var color_scale = d3.scale.category10() .domain(d3.range(datasets.length)); var x_axis = d3.svg.axis() .scale(x_scale) .orient("bottom"); var y_axis = d3.svg.axis() .scale(y_scale) .orient("left"); var x_grid = d3.svg.axis() .scale(x_scale) .orient("bottom") .tickSize(-innerheight) .tickFormat(""); var y_grid = d3.svg.axis() .scale(y_scale) .orient("left") .tickSize(-innerwidth) .tickFormat(""); var draw_line = d3.svg.line() .interpolate("basis") .x(function(d) { return x_scale(d[0]); }) .y(function(d) { return y_scale(d[1]); }); var svg = d3.select(this) .attr("width", width) .attr("height", height) .append("g") .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); svg.append("g") .attr("class", "x grid") .attr("transform", "translate(0," + innerheight + ")") .call(x_grid); svg.append("g") .attr("class", "y grid") .call(y_grid); svg.append("g") .attr("class", "x axis") .attr("transform", "translate(0," + innerheight + ")") .call(x_axis) .append("text") .attr("dy", "-.71em") .attr("x", innerwidth) .style("text-anchor", "end") .text(xlabel); svg.append("g") .attr("class", "y axis") .call(y_axis) .append("text") .attr("transform", "rotate(-90)") .attr("y", 6) .attr("dy", "0.71em") .style("text-anchor", "end") .text(ylabel); var data_lines = svg.selectAll(".d3_xy_chart_line") .data(datasets.map(function(d) {return d3.zip(d.x, d.y);})) .enter().append("g") .attr("class", ".d3_xy_chart_line"); data_lines.append("path") .attr("class", "line") .attr("d", function(d) {return draw_line(d); }) .attr("stroke", function(_, i) {return color_scale(i);}) ; data_lines.append("text") .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) .attr("transform", function(d) { return ( "translate(" + x_scale(d.final[0]) + "," + y_scale(d.final[1]) + ")" ); }) .attr("x", 3) .attr("dy", ".35em") .attr("fill", function(_, i) { return color_scale(i); }) .text(function(d) { return d.name; }); }); } chart.width = function(value) { if (!arguments.length) return width; width = value; return chart; }; chart.height = function(value) { if (!arguments.length) return height; height = value; return chart; }; chart.xlabel = function(value) { if(!arguments.length) return xlabel ; xlabel = value ; return chart ; }; chart.ylabel = function(value) { if(!arguments.length) return ylabel ; ylabel = value ; return chart ; }; return chart; } </script>

---

.Default limit for fetched data
For this we can take the same approach as the one taken by showRdd():
  val defaultMaxLimit = 10000
  def displayAsTable(maxLimit: Long, columnsLabel: String*) {...}
  def displayAsTable(columnsLabel: String*) {
      displayAsTable(defaultMaxLimit, columnsLabel)
  }
The above solution works, but I propose another approach. In my last commit, the displayAsTable() method also works for plain Scala collection so I suggest to remove the support from RDD. If the end-user want to use displayAsTable(), they must convert their RDD first to a Scala collection. In some way, we force the end-user to call either collect() or take(n) explicitly.
Example:
rdd
.map(...)
.filter(...)
.take(30) // User responsibility
.displayAsTable(...)
This way, we put the responsibility of collecting data explicitly on the end-user, no surprise, what do you think ?
    Normalize the showRDD() and displayAsTable() code
I had a look into the ZeppelinContext code and basically it is dealing with Scala code in Java. What we can do is:
a. either put the displayAsTable() method inside this ZeppelinContext class and code everything in Java but then we loose the power of Scala implicit conversion. We'll need to do:
val collection = rdd.map(...).filter(...).take(10)
z.displayAsTable(collection,"Header1","Header2",...)
b. or we port the code of ZeppelinContext in Scala directly so that both displayAsTable() and showRDD() are written directly in Scala. It would make sense because lots of the code in this class is dealing already with Scala code and it would avoid us converting back and forth between Java and Scala:
I volunteer to port this class from Java to Scala (with unit tests of course). What do you think

### ---
