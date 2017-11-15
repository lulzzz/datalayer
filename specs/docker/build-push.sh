#!/usr/bin/env bash

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

# cd spark-k8s-base
# docker build -t datalayer/spark-k8s-base:2.2.0-0.5.0 .
# docker push datalayer/spark-k8s-base:2.2.0-0.5.0

# cd spark-k8s-driver
# docker build -t datalayer/spark-k8s-driver:2.2.0-0.5.0 .
# docker push datalayer/spark-k8s-driver:2.2.0-0.5.0

# cd spark-k8s-executor
# docker build -t datalayer/spark-k8s-executor:2.2.0-0.5.0 .
# docker push datalayer/spark-k8s-executor:2.2.0-0.5.0

# cd spark-k8s-init
# docker build -t datalayer/spark-k8s-init:2.2.0-0.5.0 .
# docker push datalayer/spark-k8s-init:2.2.0-0.5.0

# cd spark-k8s-resource-staging-server
# docker build -t datalayer/spark-k8s-resource-staging-server:2.2.0-0.5.0 .
# docker push datalayer/spark-k8s-resource-staging-server:2.2.0-0.5.0

# cd spark-k8s-shuffle-service
# docker build -t datalayer/spark-k8s-shuffle-service:2.2.0-0.5.0 .
# docker push datalayer/spark-k8s-shuffle-service:2.2.0-0.5.0

cd zeppelin-k8s
docker build -t datalayer/zeppelin-k8s:2.2.0-0.5.0 .
# docker push datalayer/zeppelin-k8s:2.2.0-0.5.0
