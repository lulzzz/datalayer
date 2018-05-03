---
title: Python
---

## Conda

[Download](https://conda.io/miniconda.html).

[Packages](https://repo.continuum.io/pkgs/main/linux-64).

```bash
conda create --name datalayer
conda create -n datalayer python=3.6
conda create -n datalayer scipy
conda create -n datalayer python=3.6 scipy=0.15.0 astroid babel
conda install -n datalayer pip
```

```bash
source activate datalayer
conda info --envs
source deactivate
```

```bash
conda list
conda list --explicit
conda list --explicit > specs.txt
conda create --name datalayer2 --file specs.txt
```

```bash
conda create --name datalayer2 --clone datalayer
```

```bash
conda remove --name datalayer --all
```

```yaml
name: jupyterhub-tutorial
channels:
  - conda-forge
dependencies:
  - python = 3.6
  - jupyterhub == 0.7.2
  - notebook >= 5.0
  - ipykernel >= 4.3
  - jupyterlab = 0.26
  - pip:
    - oauthenticator
    - dockerspawner
- netifaces
```

```bash
conda env create -f environment.yml
```

## PyPI

```bash
pip3 install --upgrade --pre pyqt5
```

```bash
python setup.py sdist
```

```bash
# Arbitrary working directory name.
root-dir
  setup.py
  setup.cfg
  LICENSE.txt
  README.md
  mypackage
    __init__.py
    foo.py
    bar.py
    baz.py
```

```bash
# Upload to PyPI Test.
python setup.py register -r pypitest
python setup.py sdist upload -r pypitest
```

```bash
# Upload to PyPI Live.
python setup.py register -r pypi
python setup.py sdist upload -r pypi
```
