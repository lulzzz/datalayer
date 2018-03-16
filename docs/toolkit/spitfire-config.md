# Configuration

## Settings

Here are the settings that can be configured in the `datalayer-site.xml` located in `$SPITFIRE_HOME/conf` folder.

<table border="1"><tbody><tr><td>name</td><td>value</td><td>description</td></tr><tr><td><a name="datalayer.home">datalayer.home</a></td><td>/opt/datalayer-spitfire</td><td>
      The home folder of the Datalayer Spitfire distribution.
      ${datalayer.home}/bin should contain the executable scripts.
    </td></tr><tr><td><a name="datalayer.http.authentication.type">datalayer.http.authentication.type</a></td><td>simple</td><td>
      Defines authentication used for HTTP endpoint.
      Supported values are: simple | kerberos
    </td></tr><tr><td><a name="datalayer.http.keytab.path">datalayer.http.keytab.path</a></td><td>/etc/security/keytabs/spnego.keytab</td><td>
      The keytab path to use for HTTP SPNEGO authentication.
    </td></tr><tr><td><a name="datalayer.script.username">datalayer.script.username</a></td><td>datalayer</td><td>
      The linux username to be used when launching scripts such as ${datalayer.script.on-user-creation}.
    </td></tr><tr><td><a name="datalayer.script.on-user-creation">datalayer.script.on-user-creation</a></td><td>/dla/datalayer-spitfire/bin/datalayer-user-create</td><td>
      Script called by Spitfire on user creation.
      Parameters are:
      $1=username $2=uid $3=gid $4=ldap-hostname $5=ldap-port
    </td></tr><tr><td><a name="datalayer.linux.userid">datalayer.linux.userid</a></td><td>2000</td><td>
      The inital linux user id to use when creating a user.
    </td></tr><tr><td><a name="datalayer.linux.groupid">datalayer.linux.groupid</a></td><td>500</td><td>
      The inital linux group id to use when creating a user.
    </td></tr><tr><td><a name="datalayer.ldap.hostname">datalayer.ldap.hostname</a></td><td>local</td><td>
      The LDAP hostname to use when creating a user ('local' means you don't want to use LDAP).
    </td></tr><tr><td><a name="datalayer.ldap.port">datalayer.ldap.port</a></td><td>389</td><td>
      The LDAP port to use when creating a user.
    </td></tr><tr><td><a name="datalayer.hdp.version">datalayer.hdp.version</a></td><td>2.4.2.0-258</td><td>
      The Hortonworks HDP release number (you will find it listing the HDFS /hdp/apps folder (hdfs dfs -ls /hdp/apps).
      This is needed to add properties when launching a Spark REPL on that specific Hortonworks Hadoop deployment
      when working in YARN mode.
    </td></tr><tr><td><a name="datalayer.spark.home">datalayer.spark.home</a></td><td>/opt/spark-2.0.0-bin-hadoop2.7</td><td>
      Spark Home.
    </td></tr><tr><td><a name="datalayer.spark.master.mode">datalayer.spark.master.mode</a></td><td>local</td><td>
      The Master mode for Spark (e.g. local[*], yarn-client, mesos).
    </td></tr><tr><td><a name="datalayer.spark.yarn.jars">datalayer.spark.yarn.jars</a></td><td></td><td>
      The jars to be added in the Spark application classpath running on YARN.
    </td></tr><tr><td><a name="datalayer.spark.submit.deploy.mode">datalayer.spark.submit.deploy.mode</a></td><td>client</td><td>
      The Deploy Mode for Spark (client or server).
    </td></tr><tr><td><a name="datalayer.spark.executor.instances">datalayer.spark.executor.instances</a></td><td>3</td><td>
      The number of Spark executors.
    </td></tr><tr><td><a name="datalayer.spark.yarn.timeline-service.enabled">datalayer.spark.yarn.timeline-service.enabled</a></td><td>false</td><td>
    </td></tr><tr><td><a name="datalayer.hadoop.conf.dir">datalayer.hadoop.conf.dir</a></td><td>/etc/hadoop/conf</td><td>
      The Hadoop Configuration Directory.
    </td></tr><tr><td><a name="datalayer.hbase.conf.dir">datalayer.hbase.conf.dir</a></td><td>/etc/hbase/conf</td><td>
      The HBase Configuration Directory.
    </td></tr><tr><td><a name="datalayer.zookeeper.conf.dir">datalayer.zookeeper.conf.dir</a></td><td>/etc/zookeeper/conf</td><td>
      The Zookeeper Configuration Directory.
    </td></tr><tr><td><a name="datalayer.hadoop.keytab.path">datalayer.hadoop.keytab.path</a></td><td>/etc/security/keytabs/datalayer.keytab</td><td>
      The keytab to use for Kerberos clusters.
    </td></tr><tr><td><a name="datalayer.hadoop.keytab.principal">datalayer.hadoop.keytab.principal</a></td><td>datalayer@DATALAYER.IO</td><td>
      The keytab principal for Kerberos clusters.
    </td></tr><tr><td><a name="datalayer.persist.storage">datalayer.persist.storage</a></td><td>derby</td><td>
      The type of storage to use: derby | hbase
    </td></tr><tr><td><a name="datalayer.solr.conf.path">datalayer.solr.conf.path</a></td><td>/sdk/conf/solr/conf</td><td>
      The absolute directory path that contains the solr config to be uploaded to zookeeper.
    </td></tr></tbody></table>
    