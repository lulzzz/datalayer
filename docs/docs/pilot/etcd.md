---
title: Etcd
---

Install the `etcd` chart.

```
helm install etcd \
  --set StorageClass=gp2 \
  -n kuber-etcd
```

Test the health of your etcd cluster (following examaple for a 3 nodes cluster)

```
for i in {0..2}; do kubectl exec kuber-etcd-etcd-$i --namespace=default -- sh -c 'etcdctl cluster-health'; done
```

The above command should give you output like this one.

```
member 9e4964f31e4a910b is healthy: got healthy result from http://kuber-etcd-etcd-0.kuber-etcd-etcd:2379
member d7388f72617bd4e8 is healthy: got healthy result from http://kuber-etcd-etcd-1.kuber-etcd-etcd:2379
member eec49009934c162b is healthy: got healthy result from http://kuber-etcd-etcd-2.kuber-etcd-etcd:2379
cluster is healthy
member 9e4964f31e4a910b is healthy: got healthy result from http://kuber-etcd-etcd-0.kuber-etcd-etcd:2379
member d7388f72617bd4e8 is healthy: got healthy result from http://kuber-etcd-etcd-1.kuber-etcd-etcd:2379
member eec49009934c162b is healthy: got healthy result from http://kuber-etcd-etcd-2.kuber-etcd-etcd:2379
cluster is healthy
member 9e4964f31e4a910b is healthy: got healthy result from http://kuber-etcd-etcd-0.kuber-etcd-etcd:2379
member d7388f72617bd4e8 is healthy: got healthy result from http://kuber-etcd-etcd-1.kuber-etcd-etcd:2379
member eec49009934c162b is healthy: got healthy result from http://kuber-etcd-etcd-2.kuber-etcd-etcd:2379
cluster is healthy
```
