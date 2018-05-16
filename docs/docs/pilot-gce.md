
---
title: Google Cloud Storage
---

This is for use with the GCS connector https://cloud.google.com/dataproc/docs/concepts/connectors/cloud-storage.

You still need Hadoop configuration to enable gs:// URIs. I usually put those in core-site.xml, but I would assume that using Spark properties should also work.

```
--conf spark.hadoop.fs.gs.project.id=<GCP project ID>
--conf spark.hadoop.fs.gs.system.bucket=<GCP bucket to use for temporary data>
--conf spark.hadoop.agoogle.cloud.auth.service.account.enable=true
--conf spark.hadoop.google.cloud.auth.service.account.json.keyfile=/mnt/secrets/key.json
```

```
<?xml version="1.0" ?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>
<configuration>
  <property>
    <name>fs.gs.impl</name>
    <value>com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem</value>
  </property>
  <property>
    <name>fs.AbstractFileSystem.gs.impl</name>
    <value>com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem</value>
  </property>
  <property>
    <name>fs.gs.project.id</name>
    <value>${gs.project.id}</value>
  </property>
</configuration>
```
