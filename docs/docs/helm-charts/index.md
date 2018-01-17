---
title: Helm Charts
---

You must have an operational Kubernetes cluster with Helm available.

For a release version, just add the Datalayer Helm chart repository.

```shell
helm repo add datalayer http://helm-charts.datalayer.io
```

For a snapshot version, clone the Datalayer `helm-charts` repository.

```shell
git clone https://github.com/datalayer/helm-charts.git helm-charts
cd helm-charts
```
