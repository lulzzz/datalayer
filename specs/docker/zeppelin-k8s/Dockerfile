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

ADD dist/zeppelin-0.8.0-SNAPSHOT.tar.gz /opt
ADD conf/interpreter.json /opt/zeppelin-0.8.0-SNAPSHOT/conf
ADD conf/log4j.properties /opt/zeppelin-0.8.0-SNAPSHOT/conf

ADD https://storage.googleapis.com/kubernetes-release/release/v1.8.2/bin/linux/amd64/kubectl /usr/local/bin

RUN chmod +x /usr/local/bin/kubectl && sed -i s/INFO/DEBUG/ /opt/zeppelin-0.8.0-SNAPSHOT/conf/log4j.properties

WORKDIR /opt/zeppelin-0.8.0-SNAPSHOT

ENTRYPOINT bin/zeppelin.sh
