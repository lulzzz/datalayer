# Helm

```
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.7.2-linux-amd64.tar.gz
tar xvfz helm-v2.7.2-linux-amd64.tar.gz
mv linux-amd64/helm /usr/local/bin
```

```bash
# Set up a ServiceAccount for use by Tiller, the server side component of helm.
kubectl --namespace kube-system create serviceaccount tiller
# Azure AKS: If you’re on Azure AKS, you should now skip directly to step 3.**
# Give the ServiceAccount RBAC full permissions to manage the cluster.
# While most clusters have RBAC enabled and you need this line, you must skip this step if your kubernetes cluster does not have RBAC enabled (for example, if you are using Azure AKS).
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
# Set up Helm on the cluster.
helm init --service-account tiller
# You can verify that you have the correct version and that it installed properly by running:
helm version
# Ensure that tiller is secure from access inside the cluster:
kubectl --namespace=kube-system patch deployment tiller-deploy --type=json --patch='[{"op": "add", "path": "/spec/template/spec/containers/0/command", "value": ["/tiller", "--listen=localhost:44134"]}]'
```

```bash
# --wait
helm init --canary-image --upgrade
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'      
helm init --service-account tiller --upgrade
kubectl rollout status -w deployment/tiller-deploy --namespace=kube-system
helm repo list
helm ls -a
```

```bash
helm install charts/hello-dla -n hello-dla
kubectl get po
kubectl get svc
helm ls
helm status hello-dla
helm delete hello-dla --purge
```

```
helm install --dry-run
helm template
```

```
helm package .
helm serve --repo-path .
```

```
helm repo rm datalayer
helm repo add datalayer http://helm-charts.datalayer.io
```

```
helm reset
```
