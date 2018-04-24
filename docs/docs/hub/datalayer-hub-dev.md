---
title: Datalayer Hub Development
---

## JupyterLab

```bash
cd $DLAHOME/repos/jupterlab
yarn run add:sibling $DLAHOME/repos/datalayer-cluster
yarn run add:sibling $DLAHOME/repos/datalayer-connectors
yarn run add:sibling $DLAHOME/repos/datalayer-datasets
yarn run add:sibling $DLAHOME/repos/datalayer-iam
yarn run add:sibling $DLAHOME/repos/datalayer-kernels
yarn run add:sibling $DLAHOME/repos/datalayer-library
yarn run add:sibling $DLAHOME/repos/datalayer-social
yarn run add:sibling $DLAHOME/repos/datalayer-zeppelin
```

```bash
cd $DLAHOME/repos/jupterlab
jupyter lab --dev-mode --watch --browser chromium-browser
```
