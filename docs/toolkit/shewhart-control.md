## Shewhart Control Chart

[Shewhart chart](http://en.wikipedia.org/wiki/Control_chart) or Control Chart is 
a method to detect abnormal events among a time series. Events must only be numbers.

## Test

If you want to check the improvements the spark library can introduce, you can find a test `ShewhartControlTest` in
`src/test/scala/io/datalayer/shewhartcontrol` that tests 40,000,000 events.

If you want to change the number of workers in you spark context, you have to set the following lines

```scala
val sc = SparkContextManager.getSparkContext(8)
```

where `8` indicates the number of workers.

```scala
val measures = sc.parallelize(Array[Double](5, 5, 5, 5, 5, 5, 5, 5, 19))
val cc = new ShewartControl()
cc.setStdLimit(5.0)
cc.computeLimit(measures)
cc summary(measures)
```
