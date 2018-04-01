[![Datalayer](http://datalayer.io/enterprise/img/logo-datalayer-horizontal.png)](http://datalayer.io)

[![](https://images.microbadger.com/badges/image/datalayer/spitfire.svg)](https://microbadger.com/images/datalayer/spitfire "Get your own image badge on microbadger.com")

# Docker

## Install

```
sudo su
```

```
mkdir /etc/docker
cat << EOF > /etc/docker/daemon.json
{
  "exec-opts": ["native.cgroupdriver=cgroupfs"]
}
EOF
cat << EOF_D > install-docker.sh
sudo apt-get -y remove docker docker-engine docker.io
sudo apt-get update
sudo apt-get -y install \
    linux-image-extra-$(uname -r) \
    linux-image-extra-virtual
sudo apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
sudo apt-get update
sudo apt-get -y install docker-ce
systemctl daemon-reload
systemctl restart docker
EOF_D
chmod +x install-docker.sh && ./install-docker.sh
systemctl status docker
journalctl -fu docker
journalctl -lxeu docker
```

## Registry

```
docker run -p 5000:5000 registry
```

## Datalayer

[Datalayer](http://datalayer.io) provides Docker images to easily work with Big Data Science. You can get one the images from [Docker Hub](https://hub.docker.com/u/datalayer).

## Configure

Configure with environment variables:

+ DOCKER_BACKGROUND_PROCESS = Run as background process (default is `true`)
+ DOCKER_SPARK_MASTER = MASTER for Spark (default is `local[*]`).
+ DOCKER_NOTEBOOK_DIR = Folder where the notes reside (default is `/notebook`).
+ DOCKER_WEB_PORT = The HTTP port (default is `8666`).
+ DOCKER_HADOOP_CONF_DIR = The folder for the Hadoop configuration file on the host (default is `/etc/hadoop/conf`).

 Example: `DOCKER_WEB_PORT=8667 ./start.sh`

 ## Build

Git clone `https://github.com/datalayer/datalayer-docker` and build the Docker image with the `build.sh` script in the `zeppelin-datalayer` folder.

## Selected Images

```
nginx:stable-alpine
gcr.io/google_containers/echoserver:1.8
```

```
docker build --rm -t datalayer/systemctl .
docker run \
  --privileged \
  -ti \
  --security-opt seccomp=unconfined \
  -p 80:80 \
  datalayer/systemctl
```

```
docker tag datalayer/spitfire-scrap:centos-7 datalayer/spitfire-scrap:latest
```

```
docker run --name dla-centos -it --rm centos:centos7 /bin/bash
docker run --name dla-centos centos:centos7 /bin/echo 'Hello world'
```

```
docker run --name dla-hello hello-world
docker run --name dla-nginx -p 8765:80 nginx:stable-alpine
docker run --name dla-centos centos:centos7 yum update
docker run --name dla-centos --mac-address=a8:20:66:40:97:3d --net=bridge --bip=192.168.101.54/24 centos:centos7 yum update
docker run --name dla-centos -it --dns=192.168.101.119 centos:centos7 /bin/bash
```

```
docker exec --name spitfire_bash -it datalayer/spitfire /bin/bash
docker exec -d spitfire_bash /bin/bash
```

```
# -v /sys/fs/cgroup:/sys/fs/cgroup \
# --dns-search datalayer.io.local \
docker \
  run \
  --name spitfire-scrap \
  --hostname spitfire-scrap.datalayer.io.local \
  --privileged \
  --memory=4g \
  --cpus=2 \
  --shm-size=2g \
  --rm \
  -e DATALAYER_NODE_TYPE=f+m+s \
  -v /etc/datalayer:/etc/datalayer \
  -v /var/datalayer:/var/datalayer \
  -ditP \
  -p 1618:1618 \
  -p 2222:22 \
  -p 4040:4040 \
  -p 8088:8088 \
  -p 50070:50070 \
  datalayer/spitfire-scrap:latest
```

```
# Detach with CTRL+P+Q
docker attach spitfire
```

## Squash

```
# Squash
docker save datalayer/bash:centos-7 -o img.tar
docker history datalayer/bash:centos-7
docker inspect datalayer/bash:centos-7 | grep -A 6 Layers

## Clean

# Delete all containers
docker rm -f $(docker ps -a -q)

# Delete all images
docker rmi $(docker images -q)
```

## Echo Server

```
Hostname: dla-echo-1606080534-dpqlb
Pod Information:
	-no pod information available-
Server values:
	server_version=nginx: 1.13.3 - lua: 10008
Request Information:
	client_address=10.2.2.0
	method=GET
	real path=/
	query=
	request_version=1.1
	request_uri=http://52.168.164.165:8080/
Request Headers:
	accept=text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
	accept-encoding=gzip, deflate
	accept-language=en-US,en;q=0.7,fr;q=0.3
	connection=keep-alive
	host=52.168.164.165:8080
	upgrade-insecure-requests=1
	user-agent=Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:56.0) Gecko/20100101 Firefox/56.0
Request Body:
	-no body in request-
```

# Dind for Kubernetes

```
dind-cluster.sh up
dind-cluster.sh down
```
