# Spark Interpreter

Set `datalayer.master.mode` with `local` or `yarn`.

`datalayer.hadoop.conf.dir`, `datalayer.hbase.conf.dir` and `datalayer.zookeeper.conf.dir` allows you do define whered the Hadoop (HBase, Zookeeper) configurations reside.

To run on the Hortonworks distribution, configure `datalayer.hdp.version` with the version you are using.

```
HDP_VERSION=`hdp-select status hadoop-client | sed 's/hadoop-client - //'`
```

You can use a custom Spark assembly defining the `datalayer.spark.jar.url` property. Ensure Scala 2.11 and Spark 2.0.0 version compatibility. 
