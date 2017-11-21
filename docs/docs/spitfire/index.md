---
title: Spitfire Standalone
---

Run on a linux machine with this shell command:

```
docker \
    run \
    --name datalayer-spitfire \
    --hostname spitfire.datalayer.io.local \
    --memory=4g \
    --cpus=2 \
    --shm-size=2g \
    -e DATALAYER_NODE_TYPE=f+m+s \
    -itP \
    -p 1618:1618 \
    -p 4040:4040 \
    -p 8088:8088 \
    -p 50070:50070 \
    datalayer/spitfire:latest
```

Open [http://localhost:1618](http://localhost:1618) in your favorite browser.