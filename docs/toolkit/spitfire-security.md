# Security

We assume you have a Hadoop cluster named `DatalayerCluster`.

Start with a simple Cluster with the HDFS + YARN + MapReduce2 + Zookeeper services and define the custom core-site configuration properties:

> + `hadoop.proxyuser.datalayer.hosts` = `*`
> + `hadoop.proxyuser.datalayer.groups` = `*`

## Enable Kerberos

You have the option to Kerberize your Hadoop Cluster.

As prerequisite, you need to download the Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files from [the Oracle WEB Site](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) and place the jar files in the Java JCE folder. You can copy the jars from your local drive to the Docker container with: `scp -P 2222 *.jar root@localhost:/opt/java/jre/lib/security`.

Follow the steps described on the Hortonworks documentation website [Configuring Ambari and Hadoop for Kerberos](http://docs.hortonworks.com/HDPDocuments/Ambari-2.2.0.0/bk_Ambari_Security_Guide/content/ch_configuring_amb_hdp_for_kerberos.html) to enable Kerberos.

Tip: During the `Kerberization`, if for some reason HDFS does not go out of its safe mode, you can force it with:

```
kinit -kt /etc/security/keytabs/hdfs.headless.keytab hdfs-DatalayerCluster@DATALAYER.IO
hdfs dfsadmin -safemode leave
```

As part of the process, create the Kerberos admin user and an additional user.

```
sudo kadmin.local -q "addprinc admin/admin"
```

> Already done in the Docker image with password 'datalayer'.

Check Kerberos.

```
sudo kadmin.local -q "listprincs"
# sudo kadmin.local -p admin/admin
```

```
sudo kadmin.local -q "addprinc spitfire@DATALAYER.IO"
```

> Already done in the Docker image with password 'datalayer'.

Check the validity of the user your have created (get a Ticket and show it):

```
kinit spitfire@DATALAYER.IO
klist
kdestroy
```

## Tips

Kerberos correct working is sensible to name resolution to IP address.

Ensure the hostname of the Docker image resolves the same way in the image and in the host.

Check '/etc/hosts'.

Take care on encryption type in `/etc/krb5.conf`.

```
[libdefaults]
  default_realm = DATALAYER.IO
  rdns = false
  ticket_lifetime = 24h
  renew_lifetime = 7d
  dns_lookup_realm = false
  dns_lookup_kdc = false
  forwardable = true
  default_tkt_enctypes = des3-cbc-sha1 rc4-hmac des-cbc-crc des-cbc-md5
  default_tgs_enctypes = des3-cbc-sha1 rc4-hmac des-cbc-crc des-cbc-md5
  permitted_enctypes = aes128-cts-hmac-sha1-96 des-cbc-crc des-cbc-md5 des3-cbc-sha1 rc4-hmac
  allow_weak_crypto = true
```

## Validate Cluster

Check your Kerberos Cluster:

```
klist -kt /etc/security/keytabs/hdfs.headless.keytab
kinit -kt /etc/security/keytabs/hdfs.headless.keytab hdfs-DatalayerCluster@DATALAYER.IO
hdfs dfs -mkdir /user/spitfire
hdfs dfs -chown -R datalayer:hdfs /user/spitfire
hdfs dfs -ls /user
hdfs dfs -ls /user/spitfire
kinit -kt spitfire@DATALAYER.IO
klist
# 2.3.4.0-3845 depends on your HDP version...
yarn jar /usr/hdp/2.3.4.0-3845/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10
```

## SPNEGO Keytab

Create a user and export the Keytab to be used for the SPNEGO (not yet available on Spitfire):

```
sudo kadmin.local -q "addprinc -randkey HTTP/spitfire-ambari.datalayer.io.local@DATALAYER.IO"
sudo kadmin.local -q "xst -k /etc/security/keytabs/spnego.keytab HTTP/spitfire-ambari.datalayer.io.local@DATALAYER.IO"
sudo chmod 400 /etc/security/keytabs/spnego.keytab
```

> Already done in the Docker image.

Check the Keytab:

```
sudo klist -kt /etc/security/keytabs/spnego.keytab
```

## Proxy User Keytab

Create a user and export the Keytab to be used for the Proxy User:

```
sudo kadmin.local -q "addprinc -randkey datalayer@DATALAYER.IO"
sudo kadmin.local -q "xst -k /etc/security/keytabs/datalayer.keytab datalayer@DATALAYER.IO"
sudo chmod 400 /etc/security/keytabs/datalayer.keytab
```

> Alreay done in the Docker image.

Check the Keytab:

```
sudo klist -kt /etc/security/keytabs/datalayer.keytab
```

You are now ready to enable Spitfire to run on your Kerberos cluster configuring those properties in `datalayer-site.xml`:

> + `datalayer.hadoop.keytab.path` = `/etc/security/keytabs/datalayer.keytab`
> + `datalayer.hadoop.keytab.principal` = `datalayer@DATALAYER.IO`

> Already done in the Docker image.

Browse [http://localhost:8666](http://localhost:8666) to view the welcome page and test your Spark code on your Cluster (`yarn-client` mode).

Read more on the [Datalayer Spitfire Guide](../../spitfire) for other specific configuration to map your requirements.

## User Repository

The `datalayer.persist.storage` defines where users are stored.
 
The default configuration uses a JDBC connection as defined in `$SPITFIRE_HOME/conf/hibernate.cfg.xml` and `$SPITFIRE_HOME/conf/META-INF/persistence.xml`.

You will need to add the needed JDBC jars in `$SPITFIRE_HOME/conf/lib` folder.

## User Provisioning

On user creation, the script defined in `datalayer.script.on-user-creation` is invoked.

The parameters being passed to the script are: `username <uid> <gid> <ldap-hostname> <ldap-port>`.

## Kerberos

There are 2 facets in bringing Kerberos to Spitfire:

+ Submit Spark jobs on a Kerberized YARN cluster with a [Proxy user](https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/Superusers.html).
+ Authenticate a HTTP request initiated from a Browser with a TGT (Ticket-Granting-Ticket) via [SPNEGO](https://en.wikipedia.org/wiki/SPNEGO) protocol. 

[![kerberos](security/spitfire-kerberos.png)](security/spitfire-kerberos.png)

Follow the steps described on the Hortonworks documentation website [Configuring Ambari and Hadoop for Kerberos](http://docs.hortonworks.com/HDPDocuments/Ambari-2.2.0.0/bk_Ambari_Security_Guide/content/ch_configuring_amb_hdp_for_kerberos.html) to enable Kerberos.

As prerequisite, you need to download the Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy Files from [the Oracle WEB Site](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) and place the jar files in the Java JCE folder. You can copy the jars from your local drive to the Docker container with: `scp -P 2222 *.jar root@localhost:/opt/java/jre/lib/security`. This is applicable on the host where you will run Spitfire.

Tip: During the `Kerberization`, if for some reason HDFS does not go out of its safe mode, you can force it with:

```
kinit -kt /etc/security/keytabs/hdfs.headless.keytab hdfs-DatalayerCluster@DATALAYER.IO
hdfs dfsadmin -safemode leave
```

As part of the process, create the Kerberos admin user and an additional user.

```
sudo kadmin.local -q "addprinc admin/admin"
```

Check Kerberos.

```
sudo kadmin.local -q "listprincs"
# sudo kadmin.local -p admin/admin
```

```
sudo kadmin.local -q "addprinc spitfire@DATALAYER.IO"
```

Check the validity of the user your have created (get a Ticket and show it):

```
kinit spitfire@DATALAYER.IO
klist
kdestroy
```

Kerberos correct working is sensible to name resolution to IP address. Ensure the hostname of the Docker image resolves the same way in the image and in the host (Check '/etc/hosts').

Take care on encryption type in `/etc/krb5.conf`. For example, set `rdns = false` on Keberos server and clients.

```
[libdefaults]
  default_realm = DATALAYER.IO
  rdns = false
  ticket_lifetime = 24h
  renew_lifetime = 7d
  dns_lookup_realm = false
  dns_lookup_kdc = false
  forwardable = true
  default_tkt_enctypes = des3-cbc-sha1 rc4-hmac des-cbc-crc des-cbc-md5
  default_tgs_enctypes = des3-cbc-sha1 rc4-hmac des-cbc-crc des-cbc-md5
  permitted_enctypes = aes128-cts-hmac-sha1-96 des-cbc-crc des-cbc-md5 des3-cbc-sha1 rc4-hmac
  allow_weak_crypto = true
```

Finally, check your Kerberos Cluster is operational with simple commands, e.g.:

```
klist -kt /etc/security/keytabs/hdfs.headless.keytab
kinit -kt /etc/security/keytabs/hdfs.headless.keytab hdfs-DatalayerCluster@DATALAYER.IO
hdfs dfs -mkdir /user/spitfire
hdfs dfs -chown -R datalayer:hdfs /user/spitfire
hdfs dfs -ls /user
hdfs dfs -ls /user/spitfire
kinit -kt spitfire@DATALAYER.IO
klist
# 2.3.4.0-3845 depends on your HDP version...
yarn jar /usr/hdp/2.3.4.0-3845/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10
```

> Tip; Test with Docker: Follow the `Kerberos Quick Start` section on the [Datalayer Spitfire with Ambari Guide](../docker/spitfire-ambari)

### SPNEGO

[SPNEGO](https://en.wikipedia.org/wiki/SPNEGO) is supported as authentication middle for remote browsers having a Kerberos ticket-granting ticket (TGT).

The client running the browser with hava a TGT and the authentication is transmitted via the SPNEGO protocol.

Create a user and export the Keytab to be used for the SPNEGO (not yet available on Spitfire):

Ensure you have a JDK version lower than update_40 (JDK 1.8.40+ have a bug for SPNEGO and will not work).

```
sudo kadmin.local -q "addprinc -randkey HTTP/spitfire-ambari.datalayer.io.local@DATALAYER.IO"
sudo kadmin.local -q "xst -k /etc/security/keytabs/spnego.keytab HTTP/spitfire-ambari.datalayer.io.local@DATALAYER.IO"
sudo chmod 400 /etc/security/keytabs/spnego.keytab
```

(replace `spitfire-ambari.datalayer.io.local` with the hostname of the server running Spitfire).

Check the Keytab:

```
sudo klist -kt /etc/security/keytabs/spnego.keytab
```

Configure the following settings:

+ `datalayer.http.authentication.type` =  `kerberos`
+ `datalayer.http.keytab.path` = Path to the exported keytab

### Proxy User

You need a Hadoop YARN cluster with kerberos enabled with a `foo` user configured as proxy-user in the `core-site.xml`:

```
...
<property>
  <name>hadoop.proxyuser.foo.hosts</name>
  <value>*</value>
</property>
<property>
  <name>hadoop.proxyuser.foo.groups</name>
  <value>*</value>
</property>
...
```

Ensure `datalayer.master.mode` is set with `yarn-client` mode.

Create a user and export the Keytab to be used for the Proxy User:

```
sudo kadmin.local -q "addprinc -randkey datalayer@DATALAYER.IO"
sudo kadmin.local -q "xst -k /etc/security/keytabs/datalayer.keytab datalayer@DATALAYER.IO"
sudo chmod 400 /etc/security/keytabs/datalayer.keytab
```

Check the Keytab:

```
sudo klist -kt /etc/security/keytabs/datalayer.keytab
```

`foo` must also be a valid Kerberos user and you will need to export a keytab from the Kerberos server and make it available on the node running Spitfire.

```
sudo /usr/sbin/kadmin.local -q "xst -k foo.keytab foo@BAR.COM"
```

Copy `foo.keytab` on the Spitfire server and configure `datalayer-site.xml` accordingly (the path and the principal).

For each user being created in the Datalayer User database (during the signup process), the script defined by `datalayer.script.on-user-creation` is executed.

This allows for example to provision on each cluster node the user, as Hadoop YARN with Kerberos requires the `foo` linux user on each node.

The parameters being passed to the script are: `username <uid> <gid> <ldap-hostname> <ldap-port>`.

You are now ready to enable Spitfire to run on your Kerberos cluster configuring the following properties in `datalayer-site.xml`:

+ `datalayer.hadoop.conf.dir`: The `core-site.xml` of the Hadoop configuration must be set with `hadoop.security.authentication` value being `kerberos`, any other properties to access the Kerberos cluster must also be avaiable of cours.
+ `datalayer.hadoop.keytab.path` = e.g. `/etc/security/keytabs/foo.keytab`
+ `datalayer.hadoop.keytab.principal` = `e.g. foo@BAR.COM`
+ `datalayer.hadoop.keytab.path`
+ `datalayer.hadoop.keytab.principal`
+ `datalayer.script.on-user-creation`
+ `datalayer.linux.userid`
+ `datalayer.linux.groupid`
