---
title: Datalayer Spitfire
---

Run `spitfire-scrap` (which Apache Zeppelin with python and firefox for WEB Scraping) on a linux machine with this shell command:

```
docker \
  run \
  --name datalayer-spitfire \
  --hostname spitfire.datalayer.io.local \
  --privileged \
  --memory=15g \
  --cpus=8 \
  --shm-size=4g \
  -e DATALAYER_NODE_TYPE=f+m+s \
  -itP \
  -p 80:80 \
  -p 2222:22 \
  -p 1618:1618 \
  -p 4040:4040 \
  -p 8088:8088 \
  -p 50070:50070 \
  datalayer/spitfire-scrap:latest
```

Open [http://localhost:80](http://localhost:80) in your favorite browser.

For configuration persistence, you can add to the command volumes from your local drive (ensure you have feeded them with the correct configuration):

```
  -v /etc/datalayer:/etc/datalayer \
  -v /var/datalayer:/var/datalayer \
```
