---
title: JupyterLab Dev
---

## JupyterLab Dev

[JupyterLab Docs for Dev](https://jupyterlab.readthedocs.io/en/latest/developer/repo.html).

[TypeScript Doc](http://jupyterlab.github.io/jupyterlab/index.html).

[Phosphor.js Datagrid](http://phosphorjs.github.io/examples/datagrid).

```bash
git clone https://github.com/jupyterlab/jupyterlab.git
cd jupyterlab
pip install -e .
# Use `jlpm` or globally installed `yarn`
yarn install
jupyter lab build
```

```bash
# Build the core mode assets (optional).
yarn run build:core
# Builds the source files into javascript files in lib folder.
yarn run build
jupyter lab build
jupyter lab --dev-mode --watch --browser chromium-browser
```

Building consists of:

+ Populating the staging/ directory using template files
+ Handling any locally installed packages
+ Ensuring all installed assets are available
+ Bundling the assets
+ Copying the bundled assets to the static directory

Note that building will always use the latest JavaScript packages that meet the dependency requirements of JupyterLab itself and any installed extensions. If you wish to run JupyterLab with the set of pinned requirements that was shipped with the Python package, you can launch as jupyter lab –core-mode.

```bash
# At times, it may be necessary to clean your local repo with the command yarn run clean:slate.
# This will clean the repository, and re-install and rebuild.
yarn run clean:slate
# Deletes the lib directory.
yarn run clean 
```

```bash
yarn run build:test
yarn test
```

```bash
# Build more accurate sourcemaps that show the original Typescript code when debugging.
# However, it takes a bit longer to build the sources, so is used only to build for production by default.
yarn run build:dev:prod
```

```bash
# cd docs
yarn run docs
open ./docs/index.html
open ./docs/api/index.html
```

```bash
ls /home/datalayer/opt/miniconda3/share/jupyter/lab
extensions  schemas  settings  staging  static  themes
```

```bash
# Link all extensions in packages.
yarn run link
# Link geojson-extension only.
jupyter labextension link packages/geojson-extension
# After making changes to the source packages, the jupyter packages must be rebuilt.
# Rebuild the source.
cd $DLAHOME/repos/jupyterlab
jupyter lab build
```

```bash
# You may also watch the jupyter-renderers directory for changes and automatically rebuild.
# In one terminal tab, watch the jupyter-renderers directory.
yarn watch
# In another terminal tab, run jupyterlab with the watch flag.
jupyter lab --watch
```
