# Licensed to Datalayer (http://datalayer.io) under one or more
# contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership. Datalayer licenses this file
# to you under the Apache License, Version 2.0 (the 
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

FROM datalayer/spark-k8s-driver:2.2.0-0.5.0

# Kubectl

ADD dist/kubectl /usr/local/bin
RUN chmod +x /usr/local/bin/kubectl

# Zeppelin Distribution

ADD dist/zeppelin-0.8.0-SNAPSHOT.tar.gz /opt
RUN mv /opt/zeppelin-0.8.0-SNAPSHOT /opt/zeppelin

ADD dist/local-repo.tar.gz /opt/zeppelin

ADD conf/zeppelin-site.xml /opt/zeppelin/conf
ADD conf/interpreter.json.template /opt/zeppelin/conf

ADD conf/log4j.properties /opt/zeppelin/conf
RUN sed -i s/INFO/DEBUG/ /opt/zeppelin/conf/log4j.properties

RUN rm -fr /opt/zeppelin/notebook
COPY notebook /opt/zeppelin/notebook

ADD shell/datalayer-zeppelin.sh /opt/zeppelin/bin

# Benchmarks

ADD lib/spark-benchmarks-dfsio-0.1.0-with-dependencies.jar /lib

# Hadoop Distribution

ADD dist/hadoop-2.7.3.tar.gz /opt
RUN mv /opt/hadoop-2.7.3 /opt/hadoop
ENV PATH=${PATH}:/opt/hadoop/bin

# HDFS Locality

ADD lib/pod-cidr-namenode-topology-plugin-0.1-SNAPSHOT-jar-with-dependencies.jar /lib
COPY hdfs-k8s-locality /etc/hdfs-k8s-locality

# 

WORKDIR /opt/zeppelin

ENTRYPOINT bin/datalayer-zeppelin.sh
