[![Datalayer](http://datalayer.io/enterprise/img/logo-datalayer-horizontal.png)](http://datalayer.io)

# Helm

```
wget https://storage.googleapis.com/kubernetes-helm/helm-v2.7.2-linux-amd64.tar.gz
tar xvfz helm-v2.7.2-linux-amd64.tar.gz
mv linux-amd64/helm /usr/local/bin
```

```
# --wait
helm init --canary-image --upgrade
```

```
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'      
helm init --service-account tiller --upgrade
kubectl rollout status -w deployment/tiller-deploy --namespace=kube-system
helm repo list
helm ls -a
```

```
cd /sdk/specs
```

```
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
