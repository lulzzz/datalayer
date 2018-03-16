# Dashboard

## Info

```
# kubectl will handle authentication with Kubernetes and create an API proxy with the address localhost:8080.
# Therefore, no changes in the configuration are required.
kubectl proxy --port=8080
```

```
# Backend server parameters.
[ '--heapster-host=',
  '--tls-cert-file=',
  '--tls-key-file=',
  '--auto-generate-certificates=false',
  '--insecure-port=9091',
  '--apiserver-host=http://localhost:8080' ]
```

```
# Another way to connect to real cluster while developing dashboard is to override default values used by our build pipeline.
# In order to do that we have introduced two environment variables KUBE_DASHBOARD_APISERVER_HOST and KUBE_DASHBOARD_KUBECONFIG that will be used over default ones when defined.
export KUBE_DASHBOARD_APISERVER_HOST="http://<APISERVER_IP>:<APISERVER_PORT>"
# or
export KUBE_DASHBOARD_KUBECONFIG="<KUBECONFIG_FILE_PATH>"
# NOTE: Environment variable KUBE_DASHBOARD_KUBECONFIG has higher priority than KUBE_DASHBOARD_APISERVER_HOST.
```

Serving Dashboard for Development

```
cd /src/k8s/dashboard
echo http://localhost:9090
gulp serve
```

## Compile

+ Stylesheets are implemented with SASS and compiled to CSS with libsass.
+ JavaScript is implemented in ES6. It is compiled with Babel for development and the Google-Closure-Compiler for production.
+ Go is used for the implementation of the backend. The source code gets compiled into the single binary `dashboard`.

## Run

+ Frontend is served by BrowserSync. It enables features like live reloading when HTML/CSS/JS change and even synchronize scrolls, clicks and form inputs across multiple devices.
+ Backend is served by the `dashboard` binary.
+ File watchers listen for source code changes (CSS, JS, GO) and automatically recompile. All changes are instantly reflected, e.g. by automatic process restarts or browser refreshes. The build artifacts are created in a hidden folder (.tmp).
+ After successful execution of gulp local-up-cluster and gulp serve, the following processes should be running (respective ports are given in parentheses):
 + BrowserSync (9090) ---> Dashboard backend (9091) ---> Kubernetes API server (8080)
