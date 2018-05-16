---
title: Docker Files
---

Datalayer ships Docker images available on [Dockerhub](https://hub.docker.com/u/datalayer). You can customize your own images based the Docker files available in the [Datalayer docker-files repository](https://github.com/datalayer/docker-files).

## K8S Sidecar

To access the Kubernetes API [from a Pod](https://kubernetes.io/docs/concepts/cluster-administration/proxies) one of the solution is to run `kubectl proxy` in a so-called sidecar container within the Pod.

To do this, you need to package `kubectl` in a container. It is useful when service accounts are being used for accessing the API. Since all containers in a Pod share the same network namespace, containers will be able to reach the API on localhost.

This example contains a [Dockerfile](Dockerfile) and [Makefile](Makefile) for packaging up `kubectl` into a container and pushing the resulting container image on the Docker Hub Registry. You can modify the Makefile to push to a different registry if needed.

Assuming that you have checked out the Kubernetes source code and setup your environment to be able to build it. The typical build step of this kubectl container will be:

```shell
make tag
make build
make push
```

Usage:

```shell
# make kubectl   # will build kubectl 
make tag       # will suggest a tag.
make container # will build a container - you must supply a tag.
make push      # will push the container - you must supply a tag.
```

Test with:

```yaml
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: kubectl-sidecar
spec:
  containers:
  - name: sidecar
    image: docker.io/datalayer/k8s-sidecar:v1.8.2
    args:
     - proxy
     - "-p"
     - "8001"
  - name: bb
    image: busybox
    args:
    - sleep
    - "10000"
    env:
    - name: PILOTNETES_SERVICE_HOST
      value: 127.0.0.1
    - name: PILOTNETES_SERVICE_PORT
      value: "8001"
    volumeMounts:
    - name: test-volume
      mountPath: /mount/test-volume
  volumes:
  - name: test-volume
    emptyDir: {}
EOF
```

```shell
kubectl exec -it kubectl-sidecar -c bb -- sh
wget -O - ${PILOTNETES_SERVICE_HOST}:${PILOTNETES_SERVICE_PORT}/api/v1/pods
wget -O - 127.0.01:8001/api/v1/pods
```
