---
title: Python
---

## PyPI

```bash
# arbitrary working directory name
root-dir/   
  setup.py
  setup.cfg
  LICENSE.txt
  README.md
  mypackage/
    __init__.py
    foo.py
    bar.py
    baz.py
```

```bash
# Upload your package to PyPI Test.
python setup.py register -r pypitest
python setup.py sdist upload -r pypitest
```

```bash
# Upload to PyPI Live.
python setup.py register -r pypi
python setup.py sdist upload -r pypi
```
