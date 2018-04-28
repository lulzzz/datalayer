---
title: JupyterLab Extensions
---

## JupyterLab Extensions

[JupyterLab Extensions](https://jupyterlab.readthedocs.io/en/latest/user/extensions.html).

[JupyterLab Extensions on Github](https://github.com/topics/jupyterlab-extension).

[JupyterLab Extensions on Github (2)](https://github.com/search?utf8=%E2%9C%93&q=topic%3Ajupyterlab-extension&type=Repositories).

```bash
jupyter labextension list
# The jupyter labextension install command builds the application, so you do not need to call build.
jupyter labextension install @jupyterlab/xkcd-extension
jupyter labextension disable @jupyterlab/xkcd-extension
jupyter labextension enable @jupyterlab/xkcd-extension
jupyter labextension uninstall @jupyterlab/xkcd-extension
```

```bash
jupyter labextension install $DLAHOME/repos/jupyterlab-xkcd --no-build
jupyter lab build
jupyter labextension uninstall @datalayer/jupyterlab-xkcd
```

```bash
jupyter labextension install @jupyterlab/google-drive
jupyter labextension install @jupyterlab/fasta-extension
jupyter labextension install @jupyterlab/geojson-extension
jupyter labextension install @jupyterlab/katex-extension
jupyter labextension install @jupyterlab/plotly-extension
# jupyter labextension install @jupyterlab/vega2-extension
jupyter labextension install jupyterlab-drawio
jupyter labextension install jupyterlab_voyager
```

```bash
cd $DLAHOME/repos/jupyterlab-git
pip install -e . --upgrade
jupyter serverextension enable --py jupyterlab_git --sys-prefix
jupyter labextension link
```

```bash
cd $DLAHOME/repos/jupyterlab-github
pip install jupyterlab_github
jupyter labextension install @jupyterlab/github --no-build
jupyter labextension install @jupyterlab/github@0.5.1 --no-build
```

```bash
cd $DLAHOME/repos/jupyterlab-latex
pip install jupyterlab_latex
jupyter serverextension enable --py jupyterlab_latex --sys-prefix
jupyter labextension install @jupyterlab/latex
jupyter labextension install $DLAHOME/repos/jupyterlab-latex
```
