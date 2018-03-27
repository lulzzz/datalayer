---
title: Apache Zeppelin
---

## Multi User

+ https://issues.apache.org/jira/browse/ZEPPELIN-1337 Umbrella for multiple user support for zeppelin
+ https://issues.apache.org/jira/browse/ZEPPELIN-1338 User level interpreter setting
+ https://issues.apache.org/jira/browse/ZEPPELIN-1210 Run interpreter per user [https://github.com/apache/zeppelin/pull/1265]
+ https://issues.apache.org/jira/browse/ZEPPELIN-1339 Note management per user
+ https://issues.apache.org/jira/browse/ZEPPELIN-1340 Run Hadoop-based interpreter process on Kerberos as web front end user (Impersonation for interpreter)
+ https://issues.apache.org/jira/browse/ZEPPELIN-1236 Multi-user notebook with user controls support
+ https://issues.apache.org/jira/browse/ZEPPELIN-1000 Multiple simultaneous users on a single WEB server
+ https://issues.apache.org/jira/browse/ZEPPELIN-1320 Run zeppelin interpreter process as web front end user
+ https://issues.apache.org/jira/browse/ZEPPELIN-1377 Run remote  interpreter process in remote machine
+ https://issues.apache.org/jira/browse/ZEPPELIN-773  Multi-tenancy in Zeppelin
+ https://issues.apache.org/jira/browse/ZEPPELIN-446  Zeppelin should work in a Kerberos enabled cluster / Multi user Spark Kerberos cluster

## Misc

+ ZEPPELIN-1774 Export notebook as a pixel-perfect printable document i.e. export as a PDF
+ ZEPPELIN-1793 Import\export between Zeppelin and Jupyter notebook formats
+ ZEPPELIN-2089 Run spell as display system with backend interpreter

## Zeppelin on K8S

```
kubectl delete -f k8s/zeppelin-k8s.yaml
kubectl create -f k8s/zeppelin-k8s.yaml
kubectl get svc --selector=app=zeppelin-k8-svc -o jsonpath='{.items[0].spec.ports}'
```

```
export POD=$(kubectl get pods -n default -l "app=zeppelin-k8s" -o jsonpath="{.items[0].metadata.name}")
kubectl exec -it $POD -- bash
kubectl get svc spark-resource-staging-service -o jsonpath='{.spec.clusterIP}'
```

```
kubectl expose pod $HOSTNAME --port=$PORT --target-port=$PORT --name=zeppelin-interpreter-spark-$PORT
CALLBACK_HOST=$(kubectl get -o template svc zeppelin-interpreter-spark-$PORT --template={{.spec.clusterIP}})
```

## Driver Memory

```
interpreter.sh:       INTERPRETER_RUN_COMMAND+=' '` echo ${SPARK_SUBMIT} --driver-memory 60g --driver-java-options \"${JAVA_INTP_OPTS}\" --class ${ZEPPELIN_SERVER} --driver-class-path \"${ZEPPELIN_INTP_CLASSPATH_OVERRIDES}:${ZEPPELIN_INTP_CLASSPATH}\" ${SPARK_SUBMIT_OPTIONS} --proxy-user ${ZEPPELIN_IMPERSONATE_USER} ${SPARK_APP_JAR} ${PORT}`
interpreter.sh:       INTERPRETER_RUN_COMMAND+=' '` echo ${SPARK_SUBMIT} --driver-memory 40g --driver-java-options \"${JAVA_INTP_OPTS}\" --class ${ZEPPELIN_SERVER} --driver-class-path \"${ZEPPELIN_INTP_CLASSPATH_OVERRIDES}:${ZEPPELIN_INTP_CLASSPATH}\" ${SPARK_SUBMIT_OPTIONS} ${SPARK_APP_JAR} ${PORT}`
```

## Info

```
./bin/interpreter.sh -d /src/zeppelin/interpreter/md -p 40030 -l .//local-repo/2BXKBTJ9W
export ZEPPELIN_MEM="-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
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
  <tr class="b">
    <td>Add support to run Spark interpreter on a Kubernetes cluster</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-3020">ZEPPELIN-3020</a></td>
    <td><a href="https://github.com/banzaicloud/zeppelin/tree/spark-interpreter-k8s">banzaicloud:zeppelin/inject-services</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/zeppelin/pull/2637">#2637</a></td>
    <td>OPEN</td>
  </tr>
  <tr class="b">
    <td>Inject Services</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1354">ZEPPELIN-1354</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/inject-services">datalayer:spitfire/inject-services</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/1361">#1361</a></td>
    <td>OPEN</td>
  </tr>
  <tr class="b">
    <td>Support Spell as Display</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-2359">ZEPPELIN-2359</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/ZEPPELIN-2359">datalayer:spitfire/ZEPPELIN-2359</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/zeppelin/pull/2227">#1361</a></td>
    <td>OPEN</td>
  </tr>
  <tr class="b">
    <td>Note management per user</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1339">ZEPPELIN-1339</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/multiuser">datalayer:spitfire/multiuser</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/1390">#1390</a></td>
    <td>OPEN</td>
  </tr>
  <tr class="a">
    <td>Multiple simultaneous on a single WEB server</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1000">ZEPPELIN-1000</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/multiuser">datalayer:spitfire/multiuser</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/1390">#1390</a></td>
    <td>OPEN</td>
  </tr>
  <tr class="a">
    <td>Local or Remote Interpreter by Configuration</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1395"></a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/remote-interpreter-config">datalayer:spitfire/remote-interpreter-config</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/1385">#1385</a></td>
    <td>OPEN</td>
  </tr>
  <tr class="a">
    <td>Jersey instead of CXF for better JSON REST</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-903">ZEPPELIN-903</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/jersey2">datalayer:spitfire/jersey2</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/932">#932</a></td>
    <td>MERGED on 02 Jun 2017</td>
  </tr>
  <tr class="b">
    <td>commons-exec should be in compile scope of zeppelin-server</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-904">ZEPPELIN-904</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/commons-exec-compile-scope">datalayer:spitfire/commons-exec-compile-scope</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/931">#931</a></td>
    <td>MERGED on 04 Jun 2016</td>
  </tr>
  <tr class="a">
    <td>Upgrade to Jetty 9</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-798">ZEPPELIN-798</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/jetty9">zeppelin-k8s/jetty9</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/831">#831</a></td>
    <td>MERGED on 28 Apr 2016</td>
  </tr>
  <tr class="b">
    <td>Interpeter settings update is broken</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-725 ">ZEPPELIN-725 </a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/ZEPPELIN-725-Interpeter-settings-update-broken">datalayer:spitfire/ZEPPELIN-725...</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/768">#768</a></td>
    <td>MERGED on 09 Mar 2016</td>
  </tr>
  <tr class="a">
    <td>SparkR support</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-156">ZEPPELIN-156</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/rscala-z">datalayer:spitfire/rscala-z</a></td>
    <td><a href="../../spitfire/#r_interpreter">Documentation</a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/702">#702</a></td>
    <td>MERGED on 05 Apr 2016</td>
  </tr>
  <tr class="b">
    <td>Allow to prepend a CLASSPATH with a CLASSPATH_OVERRIDES environment variable</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-383">ZEPPELIN-383</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/ZEPPELIN-383-CLASSPATH_OVERRIDES">datalayer:spitfire/ZEPPELIN-383...</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/412">#412</a></td>
    <td>MERGED on 09 Nov 2015</td>
  </tr>
  <tr class="a">
    <td>Changing the context root of the GUI</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-337">ZEPPELIN-337</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/ZEPPELIN-337-Configurable-ContextPath">datalayer:spitfire/ZEPPELIN-337...</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/429">#429</a></td>
    <td>MERGED on 19 Nov 2015</td>
  </tr>
  <tr class="a">
    <td>Helium load.js should reside in subfolder</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-2235">ZEPPELIN-2235</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/ZEPPELIN-2235">datalayer:spitfire/ZEPPELIN-2235</a></td>
    <td><a href="https://github.com/apache/zeppelin/pull/2226">#2226</a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/429">#429</a></td>
    <td>NOT MERGED</td>
  </tr>
  </tbody>
</table>

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
  <tr class="a">
    <td>Pod-cidr to Podnode Mapping</td>
    <td><a href=""></a></td>
    <td><a href=""></a></td>
    <td>
      <a href="https://github.com/apache-spark-on-k8s/kubernetes-HDFS/issues/29">Understanding of PodCIDRToNodeMapping.resolve behavior</a><br/>
      <a href="https://github.com/apache-spark-on-k8s/kubernetes-HDFS/issues/30">Support multiple hdfs datanodes per k8s node?</a>
    </td>
    <td><a href=""></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="a">
    <td>Kerberos (SPNEGO) Support</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-193">ZEPPELIN-193</a></td>
    <td><a href=""></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="b">
    <td>Zeppelin should work in a Kerberos enabled cluster</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-446">ZEPPELIN-446</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/spark-multiuser-kerberos">datalayer:spitfire/spark-multiuser-kerberos</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="a">
    <td>Run zeppelin interpreter process as web front end user</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1320">ZEPPELIN-1320</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/"></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="b">
    <td>Summary function in R does not display proper output</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1230">ZEPPELIN-1230</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/"></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="a">
    <td>Run remote interpreter process in remote machine</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-1377">ZEPPELIN-1377</a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/"></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="b">
    <td>Add/Override Interpreter properties with value appended to the magic keywords in a paragraph</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-668">ZEPPELIN-668</a></td>
    <td><a href=""></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="b">
    <td>Content API</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-"></a></td>
    <td><a href="https://github.com/datalayer/spitfire/tree/content-api">datalayer:spitfire/content-api</a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>JIRA NOT YET OPENED</td>
  </tr>
  <tr class="b">
    <td>Add math formula support for Markdown interpreter</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-777">ZEPPELIN-777</a></td>
    <td><a href=""></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>PR NOT YET OPENED</td>
  </tr>
  <tr class="a">
    <td>Add zeppelin.war config in template zeppelin-site (sh and xml)</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-"></a></td>
    <td><a href=""></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>JIRA NOT YET OPENED</td>
  </tr>
  <tr class="b">
    <td>Make Zeppelin Embeddable</td>
    <td><a href="https://issues.apache.org/jira/browse/ZEPPELIN-"></a></td>
    <td><a href=""></a></td>
    <td><a href=""></a></td>
    <td><a href="https://github.com/apache/incubator-zeppelin/pull/"></a></td>
    <td>JIRA NOT YET OPENED</td>
  </tr>
  </tbody>
</table>
