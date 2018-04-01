# Hadoop

## Start/Stop

Shows how to start a Hadoop Servers from the JAVA code.

+ namenode                    http://localhost:50070
+ namenode-browser            http://localhost:50075/logs
+ secondary-namenode          http://localhost:50090
+ resource-manager            http://localhost:8088/cluster
+ application-status          http://localhost:8089/proxy/<app-id>
+ resource-node-manager       http://localhost:8042/node
+ mapreduce-jobhistory-server http://localhost:19888

```
curl -i "http://localhost:50070/webhdfs/v1/tmp?user.name=istvan&op=GETFILESTATUS"
HTTP/1.1 200 OK
Content-Type: application/json
Expires: Thu, 01-Jan-1970 00:00:00 GMT
Set-Cookie: hadoop.auth="u=istvan&p=istvan&t=simple&e=1370210454798&s=zKjRgOMQ1Q3NB1kXqHJ6GPa6TlY=";Path=/
Transfer-Encoding: chunked
Server: Jetty(6.1.26)
{"FileStatus":{"accessTime":0,"blockSize":0,"group":"supergroup","length":0,"modificationTime":1370174432465,"owner":"istvan","pathSuffix":"","permission":"755","replication":0,"type":"DIRECTORY"}}
```

PS: For MR-v1 (deprecated)

+ job-tracker  http://localhost:50030
+ task-tracker http://localhost:50060

This logs folder is needed for jetty to avoid 404 when user asks for /logs via the WEB UI.

## Build and Deploy Hadoop 3

datalayer-hadoop-build-deploy

## Build and Deploy Hadoop 1.x

ant clean package -Dforrest.home=$FORREST_HOME

## Build and Deploy Hadoop 2.x

svn checkout https://svn.apache.org/repos/asf/hadoop/common/trunk hadoop.svn
git clone https://github.com/apache/hadoop-common.git hadoop.git

INSTALL HADOOP 1

cd /opt/hadoop-1.2.1/bin
cp /t/data/nosql/hadoop/common/src/main/resources/io.datalayer/hadoop/h1/distributed/* ../conf
cp /t/data/nosql/hadoop/common/src/main/resources/io.datalayer/hadoop/h1/local/* ../conf
start-all.sh

FORMAT NAMENODE

rm -fr /var/data/hadoop-3.0.0-*
hadoop namenode -format AosCluster

START HADOOP

start-dfs.sh
start-yarn.sh

STOP HADOOP

stop-yarn.sh
stop-dfs.sh

JPS

+ NameNode
+ SecondaryNameNode
+ JobTracker
+ TaskTracker
+ DataNode

+ HdfsDataNode
+ HdfsNameNode
+ YarnResourceManager
+ YarnNodeManager
+ MapReduceJobHistory
+ HdfsNameNodeSecondary

WEB UI

+ hdfs namenode               http://localhost:50070
+ hdfs namenode explorer      http://localhost:50070/explorer.html
+ namenode-browser            http://localhost:50075
+ secondary-namenode          http://localhost:50090
+ resource-manager            http://localhost:8088
+ application-status          http://localhost:8089/proxy/<app-id>
+ resource-node-manager       http://localhost:8042
+ resource-manager-tracker    http://localhost:9999 ???
+ mapreduce-jobhistory-server http://localhost:19888

(+ mapreduce jobtracker       http://localhost:50030 (only for pre-hadoop2))
(+ mapreduce tasktracker(s)   http://localhost:50060)

# Web Site

mvn site; mvn site:stage -DstagingDirectory=/tmp/hadoop-site

# Remote Debugging

export HADOOP_OPTS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=8000"

Datalayer NOSQL HADOOP HDFS

# To Do

+ write/read sequence files

# Miscelaneous

+ nohup hadoop fsck / -files -blocks -locations
+ cat nohup.out | grep [your block name]

HADOOP APPEND

+ https://svn.apache.org/repos/asf/hadoop/common/branches/branch-0.20-append/ 
+ https://github.com/facebook/hadoop-20-append 
+ https://github.com/trendmicro/hbase/tree/security
+ https://github.com/trendmicro/hadoop-common  

# Paradigm

+ map:     (K1, V1)       -> list(K2, V2)
+ combine: (K2, list(V2)) -> list(K2, V2)
+ reduce:  (K2, list(V2)) -> list(K3, V3)

cat ~/wikipedia.txt | \
  sed -e 's/ /\n/g' | \
  grep . | \
  sort | \
  uniq -c > \
  ~/frequencies.txt

# HDP Version

VERSION=`hdp-select status hadoop-client | sed 's/hadoop-client - \([0-9]\.[0-9]\).*/\1/'`

# Apache Hadoop

export HADOOP_HOME=$DATALAYER_HOME/ext/hadoop-2.7.1
export PATH=$HADOOP_HOME/bin:$PATH

HADOOP_USER_NAME=hdfs hdfs dfs -mkdir /user/datalayer
HADOOP_USER_NAME=hdfs hdfs dfs -chown -R datalayer:hdfs /user/datalayer

yarn jar $HADOOP_HOME/pi*.jar pi 10 10

Diagnose with e.g.

+ http://localhost:8889/proxy/application_1389369627509_0001
+ http://localhost:8889/proxy/application_1389369627509_0001/mapreduce/job/job_1389369627509_0001

yarn jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar pi 100 100
yarn jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar pi -Dmapreduce.clientfactory.class.name=org.apache.hadoop.mapred.YarnClientFactory 16 10000

yarn jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar randomwriter randomwriter-out
yarn jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar randomwriter -Dmapreduce.randomwriter.bytespermap=10000 -Ddfs.blocksize=536870912 -Ddfs.block.size=536870912 randomwriter-output

yarn jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-*.jar wordcount /gutenberg /gutenberg-out-1

yarn jar $HADOOP_HOME/share/hadoop/yarn/hadoop-yarn-applications-distributedshell-*.jar org.apache.hadoop.yarn.applications.distributedshell.Client -jar $HADOOP_HOME/share/hadoop/yarn/hadoop-yarn-applications-distributedshell-3.0.0-SNAPSHOT.jar -shell_command ls -shell_args / -num_containers 1

# HDP

HDP_VERSION=`hdp-select status hadoop-client | sed 's/hadoop-client - //'`

HDP_MAJOR_VERSION=`hdp-select status hadoop-client | sed 's/hadoop-client - \([0-9]\.[0-9]\).*/\1/'`

HADOOP_USER_NAME=hdfs hdfs dfs -mkdir /user/datalayer
HADOOP_USER_NAME=hdfs hdfs dfs -chown -R datalayer:hdfs /user/datalayer

yarn jar $DATALAYER_HOME/ext/hadoop-2.7.1/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar pi -D hdp.version=2.4.2.0-258 10 10

sudo -u hdfs hdfs dfs -mkdir /user/hdfs/test
sudo -u hdfs yarn jar /usr/hdp/2.3.4.0-3485/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10
sudo -u yarn yarn jar /usr/hdp/2.3.4.0-3485/hadoop-mapreduce/hadoop-mapreduce-examples.jar pi 10 10

HADOOP_USER_NAME=hdfs HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-hdfs dfs -ls /user
HADOOP_USER_NAME=yarn HADOOP_CONF_DIR=$DATALAYER_HOME/conf-template/hdp-2.3-simple datalayer-yarn jar $DATALAYER_HOME/ext/hadoop-2.7.1/share/hadoop/mapreduce/hadoop-mapreduce-examples-2.7.1.jar pi -D hdp.version=2.4.2.0-258 10 10

HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos datalayer-hdfs dfs -ls /tmp
HADOOP_CONF_DIR=$DATALAYER_HOME/conf/hadoop/template/hdp-2.3-kerberos datalayer-hdfs dfs -ls /user

# Other

This directory contains data sets used in the examples.

The baseball data has a schema of:

name:chararray, team:chararray, position:bag{t:(p:chararray)}, bat:map[]

The possible keys in the bat map are: games, at_bats, hits, runs,
doubles, triples, home_runs, grand_slams, rbis, base_on_balls, ibbs, strikeouts,
sacrifice_hits, sacrifice_flies, hit_by_pitch, gdb, batting_average,
on_base_percentage, and slugging_percentage.

The baseball data was obtained at 
http://download.freebase.com/datadumps/2011-04-14/browse/baseball.tar.bz2

and was found via http://www.infochimps.com/

NYSE_daily data has a schema of:

exchange:chararray, symbol:chararray, date:chararray, open:float, high:float,
low:float, close:float, volume:int, adj_close:float

The NYSE_dividends data has a schema of

exchange:chararray, symbol:chararray, date:chararray, dividends:float

The NYSE data was obtained at 
http://www.infochimps.com/datasets/nyse-daily-1970-2010-open-close-high-low-and-volume

If using the EC2 command line APIs, you can do:
+ ec2-create-volume --snapshot snap-17f7f476 --z ZONE
+ ec2-attach-volume $VOLUME_NUMBER -i $INSTANCE_ID -d /dev/sdh, where $VOLUME_NUMBER is output by the create-volume step and the $INSTANCE_ID is the ID of the master node that was launched by the launch-cluster command

curl http://instance-data/latest/meta-data/public-ipv4

# Logs

yarn logs -applicationId <application-id>
