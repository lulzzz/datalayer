---
title: Jupyter Notebook
---

## Notebook

[Notebook Docs](https://jupyter-notebook.readthedocs.io).

[Notebook Repository](https://github.com/jupyter/notebook).

```bash
source deactivate
conda remove --name jupyter --all
conda create --name jupyter python=3.6 notebook jupyter pip
source activate jupyter
pip install pyqt5
```

```bash
jupyter notebook
open http://localhost:8000
```

```bash
jupyter notebook list
```

## Config

```bash
jupyter notebook --generate-config
jupyter --runtime-dir
```

## Docker

```bash
docker run -it --rm -p 8888:8888 jupyter/scipy-notebook:8a1b90cbcba5
open http://localhost:8888
```

## Troubleshoot

```bash
jupyter troubleshoot
```

## Build

```bash
pip install -e .
npm run build
npm run build:watch
```
