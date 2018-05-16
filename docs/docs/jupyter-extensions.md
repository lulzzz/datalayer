---
title: Jupyter Extensions
---

# Extensions

`nbextension` - A notebook extension. A single JS file, or directory of JavaScript, Cascading StyleSheets, etc. that contain at minimum a JavaScript module packaged as an AMD modules that exports a function `load_ipython_extension`.

`server extension` - An importable Python module that implements `load_jupyter_server_extension`.

`bundler extension` - An importable Python module with generated File -> Download as / Deploy as menu item. trigger that implements bundle.

```bash
jupyter nbextension list
jupyter serverextension list
jupyter bundlerextension list
```

```bash
# Pizza Extension
pip install pizzabutton
jupyter serverextension enable --py pizzabutton --sys-prefix
jupyter nbextension install --py pizzabutton --sys-prefix
jupyter nbextension enable --py pizzabutton --sys-prefix
```
