---
title: K8S Dashboard
---

## Install

```bash
# Install with HTTPS.
kubectl create -f $DLAHOME/manifests/k8s/k8s-dashboard/k8s-dashboard-ssl.yaml
kubectl proxy
open http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login
```

```bash
# Install with HTTP and Authorization Header.
kubectl create -f $DLAHOME/manifests/k8s/k8s-dashboard/k8s-dashboard-auth-header.yaml
kubectl proxy
open http://localhost:8001/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/#!/login
```

```bash
# Get a Token to Authenticate.
kubectl get secret -n kube-system 
kubectl describe secret default-token-frx5g -n kube-system
```

```bash
openssl genrsa -out ca.key 2048
openssl req -x509 -new -nodes -key ca.key -subj "/CN=${COMMON_NAME}" -days 3650 -out ca.crt
kubectl create secret tls issuer-key --cert=ca.crt --key=ca.key --namespace default
kubectl create secret generic kubernetes-dashboard-certs --from-file=$HOME/certs -n kube-system
```

## K8S Proxy

```
kubectl proxy --port=8080
```

## Server Parameters

```bash
[ '--heapster-host=',
  '--tls-cert-file=',
  '--tls-key-file=',
  '--auto-generate-certificates=false',
  '--insecure-port=9091',
  '--apiserver-host=http://localhost:8080' ]
```

Another way to connect to real cluster while developing dashboard is to override default values used by our build pipeline.

In order to do that we have introduced two environment variables KUBE_DASHBOARD_APISERVER_HOST and KUBE_DASHBOARD_KUBECONFIG that will be used over default ones when defined.

```bash
export KUBE_DASHBOARD_APISERVER_HOST="http://<APISERVER_IP>:<APISERVER_PORT>"
```

or

```bash
export KUBE_DASHBOARD_KUBECONFIG="<KUBECONFIG_FILE_PATH>"
```

NOTE: Environment variable KUBE_DASHBOARD_KUBECONFIG has higher priority than KUBE_DASHBOARD_APISERVER_HOST.

## Serving Dashboard for Development

```bash
cd $DLAHOME/repos/k8s-dashboard
echo http://localhost:9090
gulp serve
```

## Compile

Stylesheets are implemented with SASS and compiled to CSS with libsass.

JavaScript is implemented in ES6. It is compiled with Babel for development and the Google-Closure-Compiler for production.

Go is used for the implementation of the backend. The source code gets compiled into the single binary `dashboard`.

## Run

Frontend is served by BrowserSync. It enables features like live reloading when HTML/CSS/JS change and even synchronize scrolls, clicks and form inputs across multiple devices.

Backend is served by the `dashboard` binary.

File watchers listen for source code changes (CSS, JS, GO) and automatically recompile. All changes are instantly reflected, e.g. by automatic process restarts or browser refreshes. The build artifacts are created in a hidden folder (.tmp).

After successful execution of gulp local-up-cluster and gulp serve, the following processes should be running (respective ports are given in parentheses):

+ BrowserSync (9090) ---> Dashboard backend (9091) ---> Kubernetes API server (8080)

## Delete

```bash
kubectl -n kube-system delete $(kubectl -n kube-system get pod -o name | grep dashboard)
```

## Auth

if you disabled insecure port and enabled `kube_api_anonymous_auth: true` and enabled webhooks

```
kubelet_authentication_token_webhook: true
kubelet_authorization_mode_webhook: true
```

you can access dashboard with masterip:6443/ui
if no you can use kubectl proxy to get access to it
more you can read here:
https://github.com/kubernetes/dashboard/wiki/Accessing-Dashboard---1.7.X-and-above
