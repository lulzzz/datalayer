---
title: Amazon AWS S3
redirect_from:
- "/docs/pilot-s3-storage"
---

To access S3 from the Spark Driver or Executors, you have to give additional properties to Spark when you submit your Job or launch your REPL.

| Key                            | Value             |
| ------------------------------ | ------------------|
| spark.hadoop.fs.s3a.access.key | `your-aws-key`    |
| spark.hadoop.fs.s3a.secret.key | `your-aws-secret` |
| spark.jars                     | http://central.maven.org/maven2/org/apache/hadoop/hadoop-aws/2.9.0/hadoop-aws-2.9.0.jar,http://central.maven.org/maven2/com/amazonaws/aws-java-sdk-bundle/1.11.199/aws-java-sdk-bundle-1.11.199.jar |

Change the version of `hadoop-aws` jar and its `aws-java-sdk-bundle` transitive dependency to map your Hadoop cluster version (list the [Maven Central Repository](https://mvnrepository.com/artifact/org.apache.hadoop/hadoop-aws) for details).
