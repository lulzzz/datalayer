[![Datalayer](http://datalayer.io/enterprise/img/logo-datalayer-horizontal.png)](http://datalayer.io)

# Kubernetes

## Config

```
export KUBECONFIG=~/.kube/config
export KUBECONFIG=~/.kube/admin.conf
export KUBECONFIG=/etc/kubernetes/admin.conf
```

```
kubectl config view
```

## API

```
kubectl proxy
echo http://localhost:8001/swagger-ui
curl http://localhost:8001/api
curl -s http://localhost:8001/api/v1/nodes
curl -s http://kuberenetes:8001/api/v1/nodes
curl -s http://localhost:8001/api/v1/nodes | jq '.items[] .metadata.labels'
```

```
APISERVER=$(kubectl config view | grep server | cut -f 2- -d ":" | tr -d " ")
```

## InCluster

```
/var/run/secrets/kubernetes.io/serviceaccount/token
```

# Node

```
# Taint master to host pods.
# This will remove the node-role.kubernetes.io/master taint from any nodes that have it, including the master node, 
# meaning that the scheduler will then be able to schedule pods everywhere
kubectl taint nodes --all node-role.kubernetes.io/master-
```

```
# Marking a node as unschedulable will prevent new pods from being scheduled to that node, but will not affect any existing pods on the node. This is useful as a preparatory step before a node reboot, etc. For example, to mark a node unschedulable, run this command:
kubectl cordon $NODENAME
kubectl uncordon $NODENAME
```

# Proxy

```
kubectl proxy --port=8080
http://localhost:8080/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/overview?namespace=default
```

```
echo $KUBERNETES_SERVICE_HOST
echo $KUBERNETES_SERVICE_PORT
```

```
https://github.com/liyinan926/spark-operator
+ Spark Operator is typically deployed and run using manifest/spark-operator.yaml through a Kubernetes Deployment.
+ However, users can still run it outside a Kubernetes cluster and make it talk to the Kubernetes API server of a cluster by specifying path to kubeconfig, which can be done using the --kubeconfig flag.
```

```
Two important things I needed (my bad), I was using a kubectl-proxy sidecar container and using --master=k8s://http://127.0.0.beta.kubernetes.io.1:8001, now I have no sidecar and I am using --master k8s://$KUBERNETES_SERVICE_HOST:$KUBERNETES_SERVICE_PORT.
```

## Registy

```
minikube stop
minikube delete
CHANGE_MINIKUBE_NONE_USER=true minikube start --kubernetes-version v1.8.0 --cpus 8 --memory 8192 --insecure-registry localhost:5000
cd /sdk/specs/k8s
kubectl create -f registry/kube-registry.yaml
minikube ssh
curl http://localhost:5000
kubectl port-forward --namespace kube-system $(kubectl get po -n kube-system | grep kube-registry-v0 | awk '{print $1;}') 5000:5000
curl http://localhost:5000
```

## Kubectl

```
echo "source <(kubectl completion bash)" >> ~/.bashrc
```

```
kubectl get pods
kubectl get pods --all-namespaces
kubectl get pods -o wide
kubectl get pods -o yaml
kubectl get pods -w
watch kubectl get pods --all-namespaces
kubectl delete pods <pod> --grace-period=0 --force
```

```
kubectl apply -f pod.yaml
```

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's `metadata.name`
    name: default
    # Reference to upper's `metadata.namespace`
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
```

```
echo "
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's `metadata.name`
    name: default
    # Reference to upper's `metadata.namespace`
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
" | kubectl create -f -
```

```
curl http://... | kubectl apply -f -
```

```
kubectl rollout status -w deployment/tiller-deploy --namespace=kube-system
```

```
kubectl get pods -a --all-namespaces -o json  | jq -r '.items[] | select(.status.phase != "Running" or ([ .status.conditions[] | select(.type == "Ready" and .status == "False") ] | length ) == 1 ) | .metadata.namespace + "/" + .metadata.name'
kubectl get po --field-selector=status.phase==Running -l app=k8s-watcher
```

# Execute

```
kubectl exec -it <pod> -- <cmd> <args>
```

# Copy

```
kubectl cp <file-spec-src> <file-spec-dest>
# POD in a specific container
kubectl cp <file-spec-src> <file-spec-dest> -c <specific-container>
#  Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace
kubectl cp /tmp/foo <some-namespace>/<some-pod>:/tmp/bar
# Copy /tmp/foo from a remote pod to /tmp/bar locally
kubectl cp <some-namespace>/<some-pod>:/tmp/foo /tmp/bar
```

# Run

```
kubectl run nginx --image=nginx --port=80
kubectl run echoserver --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl get deployments
```

## Nodes

```
kubectl get nodes
kubectl describe nodes
```

## Logs

```
kubectl logs -f <pod>
```

## CIDR

```
kubectl get nodes -o json | grep -i podCIDR
```

## DNS

```
kubectl run -it busybox --image=busybox --restart=Never -- sh
cat /etc/resolv.conf
nslookup kubernetes.default
nslookup datalayer.io
```

```
/ # cat /etc/resolv.conf
nameserver 10.96.0.10
search default.svc.cluster.local svc.cluster.local cluster.local us-west-2.compute.internal
options ndots:5
/ # nslookup kubernetes.default
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes.default
Address 1: 10.96.0.1 kubernetes.default.svc.cluster.local
/ # nslookup datalayer.io
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      datalayer.io
Address 1: 40.114.91.190
```

```
kubectl apply -f k8s/dns-cm.yaml
kubectl create -f k8s/dns-dla-test.yaml
kubectl get pods dla-dns-test -w
kubectl exec dla-dns-test cat /etc/resolv.conf
kubectl exec -it dla-dns-test -- nslookup kubernetes.default
kubectl create -f k8s/dla-dns-test-2.yaml
kubectl get pods dla-dns-test-2 -w
kubectl exec dla-dns-test-2 cat /etc/resolv.conf
kubectl exec -it dla-dns-test-2 -- nslookup kubernetes.default
  Server:    10.0.0.10
  Address 1: 10.0.0.10
  Name:      kubernetes.default
  Address 1: 10.0.0.1
```

```
kubectl exec -it dla-dns-test-2 -- nslookup dla-dns-test
```

```
vi /etc/kubernetes/addons/kube-dns-cm.yaml
apiVersion: v1
kind: ConfigMap 
metadata:
  name: kube-dns
  namespace: kube-system
data:
#  stubDomains: |
#    {“acme.local”: [“1.2.3.4”]}
  upstreamNameservers: |
    [“8.8.8.8”, “8.8.4.4”]
```
    
```
kubectl patch configmap/kube-dns -p '{"dnsPolicy": "ClusterFirstWithHostNet"}' --namespace=kube-system
kubectl patch deployment kube-dns -p '{"spec": {"dnsPolicy": "ClusterFirstWithHostNet"}}' --namespace=kube-system
kubectl patch deployment kube-dns -p '{"spec": {"template": {"dnsPolicy": "ClusterFirstWithHostNet"}}}' --namespace=kube-system
```

# RBAC

```
# Temp workaround to give all rights...
kubectl create clusterrolebinding add-on-cluster-admin \
  --clusterrole=cluster-admin \
  --serviceaccount=kube-system:default
```

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
  namespace: default
EOF
```

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: dla-rbac
subjects:
  - kind: ServiceAccount
    # Reference to upper's `metadata.name`
    name: default
    # Reference to upper's `metadata.namespace`
    namespace: default
roleRef:
  kind: ClusterRole
  name: cluster-admin
  apiGroup: rbac.authorization.k8s.io
EOF
```

```
kubectl auth can-i create pods
kubectl auth can-i create configmap
kubectl auth can-i create secrets
kubectl auth can-i list pods
kubectl auth can-i list configmap
kubectl auth can-i list secrets 
```

```
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=user@gmail.com
```

# Custom Resources Definition

```
kubectl get customresourcedefinitions
```

## Namespace

```
kubectl get ns
kubectl describe ns default
```

# Environment

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: envar-demo
  labels:
    purpose: demonstrate-envars
spec:
  containers:
  - name: envar-demo-container
    image: gcr.io/google-samples/node-hello:1.0
    env:
    - name: DEMO_GREETING
      value: "Hello from the environment"
EOF
```

```
kubectl get pods -l purpose=demonstrate-envars
kubectl exec -it envar-demo -- /bin/bash
```

# Labels

```
kubectl label nodes datalayer-001 hdfs-namenode-selector=hdfs-namenode-0
kubectl label nodes ip-10-0-100-40.eu-central-1.compute.internal kuber-role=node
```

## Secret

```
echo -n "A19fh68B001j" > /tmp/dla-secret.txt
kubectl create secret generic dla-secret --from-file=/tmp/dla-secret.txt
kubectl describe secrets dla-secret
kubectl delete secret dla-secret
```

```
echo -n "A19fh68B001j" > /tmp/aws-id-secret
kubectl create secret generic aws-id-secret --from-file=/tmp/aws-id-secret
kubectl describe secrets aws-id-secret
kubectl delete secret aws-id-secret
```

```
echo -n "A19fh68B001j" > /tmp/dla-secret.txt
kubectl create secret generic dla-secret --type="kubernetes.io/dla" --from-file=/tmp/dla-secret.txt --from-literal=apiUsername=dla --from-literal=apiPassword=dla --namespace=default
kubectl describe secrets dla-secret
```

```
kubectl create secret generic dla-secret --type="kubernetes.io/dla" --from-literal=apiAddress=tcp://localhost:5705 --from-literal=apiUsername=dla --from-literal=apiPassword=dla --namespace=default
```

## Volume

```
KUBE_FEATURE_GATES="PersistentLocalVolumes=true" NODE_LOCAL_SSDS=1 cluster/kube-up.sh
```

```
kubectl get sc
kubectl apply -f k8s/dla-vol-local.1.yaml
kubectl apply -f k8s/dla-vol-local.2.yaml
kubectl delete -f k8s/dla-vol-local.1.yaml
kubectl apply -f k8s/dla-vol-local-claim.yaml
kubectl describe pvc dla-vol-local-claim-1
kubectl describe pvc pvc-480952e7-f8e0-11e6-af8c-08002736b526
kubectl delete -f k8s/dla-vol-local-claim.yaml
```

```
kubectl describe sc standard
```

**AWS Static PVC**

```
## Watch out the availabilty zone
aws ec2 create-volume --region=us-west-2 --availability-zone=us-west-2a --size=10 --volume-type=gp2 --profile=kuber
aws ec2 describe-volumes --region=us-west-2 --profile=kuber
```

```
cat << EOF | kubectl apply -f -
kind: PersistentVolume
apiVersion: v1
metadata:
  name: test-pv
  labels:
    type: amazonEBS
spec:
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteMany
  awsElasticBlockStore:
    volumeID: vol-0afea076d67a639ba
    fsType: ext4
  persistentVolumeReclaimPolicy: Retain
  storageClassName: default
EOF
kubectl get pv
```

```
cat << EOF | kubectl apply -f -
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: test-pvc
  labels:
    type: amazonEBS
spec:
  accessModes:
    - ReadWriteMany
  resources:
    requests:
      storage: 10Gi
  storageClassName: default
  volumeName: test-pv
EOF
kubectl get pvc # Should be bound after a few seconds...
```

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: test-ebs
spec:
  containers:
  - image: busybox
    name: test-ebs
    command:
      - sleep
      - "3600"
    volumeMounts:
    - mountPath: /test-ebs
      name: test-volume
  volumes:
  - name: test-volume
    persistentVolumeClaim:
      claimName: test-pvc
EOF
kubectl get pods -w
kubectl exec -it test-ebs -- ls /test-ebs
```

**AWS Dynamic PVC**

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-dyn
  namespace: default
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: default
EOF
kubectl get pvc # Should be bound...
```

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Pod
metadata:
  name: test-ebs
spec:
  containers:
  - image: busybox
    name: test-ebs
    command:
      - sleep
      - "3600"
    volumeMounts:
    - mountPath: /test-ebs
      name: test-volume
  volumes:
  - name: test-volume
    persistentVolumeClaim:
      claimName: test-pvc
EOF
kubectl exec -it test-ebs -- ls /test-ebs
```

# Service

```
# --type= ClusterIP | NodePort | LoadBalancer
kubectl expose pod $POD --port=9090 --name=dashboard-ci-9090 --type=ClusterIP
kubectl expose pod $POD --port=9090 --target-port=80 --name=dashboard-np-9090 --type=NodePorte
kubectl expose pod $POD --port=9090 --target-port=9090 --name=dashboard-np-9090 --type=NodePort
kubectl expose pod $POD --port=9090 --target-port=9090 --name=dashboard-lb-9090 --type=LoadBalancer
kubectl expose pod $POD --target-port=9090 --name=dashboard-lb-9090 --type=LoadBalancer
helm delete k8s-dashboard --purge
```

```
metadata:
  name: xxx-lb
  annotations:
    "service.beta.kubernetes.io/aws-load-balancer-ssl-ports": "443"
    "service.beta.kubernetes.io/aws-load-balancer-ssl-cert": "arn:aws:acm:us-west-2:345579675507:certificate/ce5a63ee-e9e0-472b-a5d6-a28303fe1d6a"
```

```
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"
    service.beta.kubernetes.io/aws-load-balancer-proxy-protocol: "*"
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: "01:27:ae:27:54:fc:02:a3:1c:38:08:ba:61:95:8a:fa"
    service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: 3600
```

```
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-config
data:
  80: "default/explorer-kuber:9091"
```

```
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: spitfire-lb
  annotations:
#    service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
    service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: 3600
    service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: "kuber-role=spitfire"
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: spitfire
    release: spitfire
EOF
```

```
kubectl describe services spitfire-lb | grep Ingress
```

```
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: spitfire-lb
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: spitfire
    release: spitfire
EOF
```

```
echo http://localhost:8001/api/v1/namespaces/default/services/http:explorer-explorer:9091/proxy/#/
```

```
#    service.beta.kubernetes.io/aws-load-balancer-internal: "0.0.0.0/0"
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: explorer-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout: 3600
    service.beta.kubernetes.io/aws-load-balancer-additional-resource-tags: "kuber-role=explorer"
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 9091
  selector:
    app: explorer
    release: explorer
EOF
```

```
  cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: wabco-spark-ui-lb
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 4040
  selector:
    spark-role: driver
EOF
```

# Ingress

```
helm install \
  stable/nginx-ingress \
  -f nginx-ingress-values.yaml \
  -n nginx-ingress
```

```
  cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: coffee-rc
spec:
  replicas: 2
  template:
    metadata:
      labels:
        app: coffee
    spec:
      containers:
      - name: coffee
        image: nginxdemos/hello
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: coffee-svc
  labels:
    app: coffee
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
    app: coffee
EOF
```
    
```
  cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: tea-rc
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: tea
    spec:
      containers:
      - name: tea
        image: nginxdemos/hello
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: tea-svc
  labels:
    app: tea
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
    app: tea
EOF
```

```
  cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: cafe-ingress-nginx
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: cafe.example.com
    http:
      paths:
      - path: /tea
        backend:
          serviceName: tea-svc
          servicePort: 80
      - path: /coffee
        backend:
          serviceName: coffee-svc
          servicePort: 80
EOF
```

```
kubectl get ingress cafe-ingress-nginx
kubectl edit ingress cafe-ingress-nginx
kubectl replace -f 
```

```
k exec -it datalayer-ingress-nginx-ingress-controller-56dddfd79c-fp99g bash
vi /etc/nginx/nginx.conf
```

WebSocket

```
echo "
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: ws-example
spec:
  replicas: 3
  template:
    metadata:
      labels:
        app: wseg
    spec:
      containers:
      - name: websocketexample
        image: nicksardo/websocketexample
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
        env:
        - name: podname
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
---
apiVersion: v1
kind: Service
metadata:
  name: ws-example-svc
  labels:
    app: wseg
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
  selector:
    app: wseg
---

apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: ws-example-svc
spec:
  rules:
  - host: websocket.uswest2-01.rocket-science.io
    http:
      paths:
      - backend:
          serviceName: ws-example-svc
          servicePort: 80
" | kubectl create -f -

Using http://www.websocket.org/echo.html set ws://websocket.uswest2-01.rocket-science.io as test Location
```

```
kuber-app ingress
helm install --name kube-lego stable/kube-lego --set config.LEGO_EMAIL=eric@datalayer.io
```

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: example
  namespace: foo
  annotations:
    kubernetes.io/ingress.class: nginx
    # Add to generate certificates for this ingress
    kubernetes.io/tls-acme: 'true'
spec:
  rules:
    - host: www.example.com
      http:
        paths:
          - backend:
              serviceName: exampleService
              servicePort: 80
            path: /
  tls:
    # With this configuration kube-lego will generate a secret in namespace foo called `example-tls`
    # for the URL `www.example.com`
    - hosts:
        - "www.example.com"
      secretName: example-tls
```

# Dashboard

```
# Admin privileges
# IMPORTANT: Make sure that you know what you are doing before proceeding. Granting admin privileges to Dashboard's Service Account might be a security risk.
# You can grant full admin privileges to Dashboard's Service Account by creating below ClusterRoleBinding.
# Copy the YAML file based on chosen installation method and save as, i.e. dashboard-admin.yaml.
# Use kubectl create -f dashboard-admin.yaml to deploy it. Afterwards you can use Skip option on login page to access Dashboard.
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: kubernetes-dashboard
  labels:
    k8s-app: kubernetes-dashboard
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard
  namespace: kube-system
EOF
```

```
cat << EOF | kubectl apply -f -
# ------------------- Dashboard Secret ------------------- #
apiVersion: v1
kind: Secret
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard-certs
  namespace: kube-system
type: Opaque
---
# ------------------- Dashboard Service Account ------------------- #
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
---
# ------------------- Dashboard Role & Role Binding ------------------- #
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: kubernetes-dashboard-minimal
  namespace: kube-system
rules:
  # Allow Dashboard to create 'kubernetes-dashboard-key-holder' secret.
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["create"]
  # Allow Dashboard to create 'kubernetes-dashboard-settings' config map.
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["create"]
  # Allow Dashboard to get, update and delete Dashboard exclusive secrets.
- apiGroups: [""]
  resources: ["secrets"]
  resourceNames: ["kubernetes-dashboard-key-holder", "kubernetes-dashboard-certs"]
  verbs: ["get", "update", "delete"]
  # Allow Dashboard to get and update 'kubernetes-dashboard-settings' config map.
- apiGroups: [""]
  resources: ["configmaps"]
  resourceNames: ["kubernetes-dashboard-settings"]
  verbs: ["get", "update"]
  # Allow Dashboard to get metrics from heapster.
- apiGroups: [""]
  resources: ["services"]
  resourceNames: ["heapster"]
  verbs: ["proxy"]
- apiGroups: [""]
  resources: ["services/proxy"]
  resourceNames: ["heapster", "http:heapster:", "https:heapster:"]
  verbs: ["get"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: kubernetes-dashboard-minimal
  namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: kubernetes-dashboard-minimal
subjects:
- kind: ServiceAccount
  name: kubernetes-dashboard
  namespace: kube-system
---
# ------------------- Dashboard Deployment ------------------- #
kind: Deployment
apiVersion: apps/v1beta2
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      k8s-app: kubernetes-dashboard
  template:
    metadata:
      labels:
        k8s-app: kubernetes-dashboard
    spec:
      containers:
      - name: kubernetes-dashboard
        image: gcr.io/google_containers/kubernetes-dashboard-amd64:v1.8.1
        ports:
        - containerPort: 8443
          protocol: TCP
        args:
          - --auto-generate-certificates
          # Uncomment the following line to manually specify Kubernetes API server Host
          # If not specified, Dashboard will attempt to auto discover the API server and connect
          # to it. Uncomment only if the default does not work.
          # - --apiserver-host=http://my-address:port
        volumeMounts:
        - name: kubernetes-dashboard-certs
          mountPath: /certs
          # Create on-disk volume to store exec logs
        - mountPath: /tmp
          name: tmp-volume
        livenessProbe:
          httpGet:
            scheme: HTTPS
            path: /
            port: 8443
          initialDelaySeconds: 30
          timeoutSeconds: 30
      volumes:
      - name: kubernetes-dashboard-certs
        secret:
          secretName: kubernetes-dashboard-certs
      - name: tmp-volume
        emptyDir: {}
      serviceAccountName: kubernetes-dashboard
      # Comment the following tolerations if Dashboard must not be deployed on master
      tolerations:
      - key: node-role.kubernetes.io/master
        effect: NoSchedule
---
# ------------------- Dashboard Service ------------------- #
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  ports:
    - port: 443
      targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
EOF
```

```
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system
EOF
```

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system
EOF
```

```
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
echo http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/.
kubectl proxy
# Copy the token and paste it into Enter token field on log in screen. 
```

**Deprecated***

```
kubectl create serviceaccount --namespace default default
kubectl create clusterrolebinding default-cluster-rule --clusterrole=cluster-admin --serviceaccount=default:default
kubectl patch deploy --namespace default kubernetes-dashboard-kubernetes-dashboard -p '{"spec":{"template":{"spec":{"serviceAccount":"default"}}}}'
kubectl apply -f k8s/k8s-dashboard-ctl.yaml
kubectl apply -f k8s/k8s-dashboard-svc.yaml
kubectl apply -f k8s/k8s-dashboard-auth.yaml
kubectl describe rc kubernetes-dashboard --namespace=kube-system
```

```
# appname: "dla-nginx-dash", Container image: "nginx:stable-alpine" , Number of pods: 1, Service: none
# running pod in the name like "dla-nginx-dash-786442954-w20fj" -> Click on it and et its IP address (Node: IP: 10.192.3.3) and its node (Node: kube-node-2)
# point your browser to http://localhost
# you should also visit the "View logs" and check that you see some traffic.
# if you do not reach the nginx frontpage, login on the kube-master, and then run "curl http://10.192.3.3"
```

```
# Edit kubernetes-dashboard service.
kubectl -n kube-system edit service kubernetes-dashboard
# You should see yaml representation of the service. Change type: ClusterIP to type: NodePort and save file. If it's already changed go to next step.
# Please edit the object below. Lines beginning with a '#' will be ignored, and an empty file will abort the edit.
# If an error occurs while saving this file will be reopened with the relevant failures.
apiVersion: v1
...
  name: kubernetes-dashboard
  namespace: kube-system
  resourceVersion: "343478"
  selfLink: /api/v1/namespaces/kube-system/services/kubernetes-dashboard-head
  uid: 8e48f478-993d-11e7-87e0-901b0e532516
spec:
  clusterIP: 10.100.124.90
  externalTrafficPolicy: Cluster
  ports:
  - port: 443
    protocol: TCP
    targetPort: 8443
  selector:
    k8s-app: kubernetes-dashboard
  sessionAffinity: None
  type: ClusterIP
status:
  loadBalancer: {}
# Next we need to check port on which Dashboard was exposed.
kubectl -n kube-system get service kubernetes-dashboard
# NAME                   CLUSTER-IP       EXTERNAL-IP   PORT(S)        AGE
# kubernetes-dashboard   10.100.124.90   <nodes>       443:31707/TCP   21h
# Dashboard has been exposed on port 31707 (HTTPS). Now you can access it from your browser at: https://<master-ip>:31707.
# master-ip can be found by executing kubectl cluster-info.
# Usually it is either 127.0.0.1 or IP of your machine, assuming that your cluster is running directly on the machine, on which these commands are executed.
# In case you are trying to expose Dashboard using NodePort on a multi-node cluster, then you have to find out IP of the node on which Dashboard is running to access it.
# Instead of accessing https://<master-ip>:<nodePort> you should access https://<node-ip>:<nodePort>.
```

## Microservices

```
kubectl create namespace sock-shop
kubectl apply -n sock-shop -f "https://github.com/microservices-demo/microservices-demo/blob/master/deploy/kubernetes/complete-demo.yaml?raw=true"
kubectl -n sock-shop get svc front-end
http://<ip>:30001
kubectl delete namespace sock-shop
```

## Simple 1

```
kubectl version
kubectl cluster-info
kubectl cluster-info dump
kubectl get nodes
kubectl describe nodes
kubectl get pods
kubectl describe pods
kubectl get pods -o wide --show-all --all-namespaces

kubectl run -it busybox --image=busybox --restart=Never -- sh

kubectl run dla-bash --image=datalayer/bash:centos-7
kubectl run dla-bash --image=datalayer/bash:centos-7 --command /bin/bash
kubectl expose deployment dla-bash
kubectl exec -it dla-bash -- /bin/bash

kubectl run dla-echo --image=gcr.io/google_containers/echoserver:1.7 --port=8080
kubectl get deployments
kubectl describe pods dla-echo

kubectl get pods -w
watch kubectl get pods

kubectl logs dla-echo-2335152361-b5b0f
kubectl logs dla-echo-2335152361-b5b0f -f
kubectl logs dla-echo-2335152361-b5b0f -p

kubectl exec -it dla-echo-2335152361-b5b0f -- /bin/bash
kubectl exec dla-echo-2335152361-b5b0f -- /bin/ls -l
kubectl exec dla-echo-2335152361-b5b0f -- printenv | grep SERVICE

kubectl expose deployment dla-echo --type=NodePort
kubectl get svc dla-echo
kubectl get svc --all-namespaces
kubectl describe svc dla-echo

kubectl get replicasets
kubectl describe replicasets

kubectl expose deployment dla-echo --type=LoadBalancer --name=dla-echo-pub
kubectl get svc dla-echo-pub
kubectl describe svc dla-echo-pub

kubectl set image deployment dla-echo dla-echo=gcr.io/google_containers/echoserver:1.8
kubectl scale deployment dla-echo --replicas=10
kubectl scale deployment dla-echo --replicas=0
kubectl delete deployment dla-echo --grace-period=0 --force
```

## Simple 2

```
kubectl run hello-nodejs --image=hello-nodejs:v1 --port=8080
kubectl get deployments
kubectl get pods
kubectl expose deployment hello-nodejs --type=NodePort
kubectl get services
curl $(minikube service hello-nodejs --url)
```

## Simple 3

```
kubectl run dla-nginx --image=nginx:stable-alpine
kubectl get deployment
kubectl get pods --output=wide
kubectl run -i -t --rm cli --image=tutum/curl --restart=Never curl http://localhost

kubectl logs -f dla-nginx-3905153451-4bg00
kubectl exec -it dla-nginx-3905153451-4bg00 -c dla-nginx -- /bin/bash
kubectl exec dla-nginx-3905153451-4bg00 -- /bin/ls -l

kubectl run dla-nginx --image=nginx:alpine --replicas=2 --port=80 --record
kubectl expose deployment dla-nginx --type=LoadBalancer --port=80

kubectl get pods -o wide
kubectl get services
kubectl logs -f dla-nginx-858393261-21dsv
kubectl logs -f dla-nginx-858393261-h3xw9

kubectl scale --replicas=2 deployment/dla-nginx
watch kubectl get pods
kubectl get pods
kubectl scale --replicas=10 deployment/dla-nginx
kubectl get pods

kubectl set image deployment/dla-nginx dla-nginx=datalayer/spitfire
watch kubectl get pods
kubectl logs -f dla-nginx-1570827950-wz79h
```

# Simple 4

```
kubectl apply -f def/simple.yaml
kubectl apply -R -f def/
kubectl get -f https://k8s.io/docs/tutorials/object-management-kubectl/simple_deployment.yaml -o yaml
```

# Scheduling

Run one nginx on your cluster
Identify on which node it runs
Go on the shell (for kubeadm: docker exec -it kube-node-1 bash) (for minikube: minikube ssh) and get the ouput of "docker ps"
Search for nginx
Stop the container (for ex: docker stop 6598a01726a8)
Watch the output of "docker ps" or "watch docker ps" and see it coming back after some seconds, being rescheduled by the master

# Re-scheduling

Launch one nginx pod like before
Node down on which of the node it runs
Stop one of the nodes (fox ex: docker stop kube-node-1)
Watch the pod being rescheduled to the other node (in this ex kube-node-2) and note down the time it takes.

# KBE - Kubernetes By Example

- [pods](/pods/)
- [labels](/labels/)
- [replication controllers](/rcs/)
- [deployments](/deployments/)
- [services](/services/)
- [service discovery](/sd/)
- [health checks](/healthz/)
- [environment variables](/envs/)
- [namespaces](/ns/)
- [volumes](/volumes/)
- [secrets](/secrets/)
- [logging](/logging/)
- [jobs](/jobs/)
- [nodes](/nodes/)

## Inspiration

+ Minikube 1
+ Minikube 2
+ Minikube 3
+ OReilly Cookbook
+ Spark
+ Kelsey Hightower
+ Arschles @ Ignite2017
+ Advanced application patterns with Azure Container Service - https://classroom.udacity.com/courses/ud615
+ AskCarter @ IO16
+ Best practices for orchestrating the Cloud with Kubernetes
+ A Technical Overview of Kubernetes - Brendan Burns @ CoreOS Fest 2015
+ Advanced application patterns with Azure Container Service @ Ignite2017
+ Containers as infrastructure - Getting started with Azure Container Instances - Sean McKenna @ Ignite2017
+ From source to production - The latest in open source container - Brendan Burns @ Ignite2017
+ GopherCon 2015 - Betting the Company on Go and Winning - Kelsey Hightower
+ Managing Containers at Scale with CoreOS and Kubernetes - Kelsey Hightower
+ Modernizing application delivery and agility with containers - Brendan Burns @ Ignite2017
+ Running reliable scalable Cloud-native Apps with Kubernetes - Brendan Burns @ MicrosoftMechanics
+ Kubeless
+ Minikube + Amazon + Kubeadm
+ Spark
+ Kelsey Hightower
+ Video Arschles @ Ignite2017
+ Amazon 1
+ Azure 1
+ Azure 2

# Rollout and Rollback

cat <<EOF > dla-nginx-new.yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    run: dla-nginx
  name: dla-nginx
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      run: dla-nginx
  template:
    metadata:
      labels:
        run: dla-nginx
    spec:
      containers:
      - image: nginx:1.13.1-alpine
        name: dla-nginx
        ports:
        - containerPort: 80
          protocol: TCP
EOF
kubectl apply -f dla-nginx-new.yaml
kubectl get rs
kubectl describe deployments/dla-nginx
cat <<EOF > dla-nginx-new.yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    run: dla-nginx
  name: dla-nginx
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      run: dla-nginx
  template:
    metadata:
      labels:
        run: dla-nginx
    spec:
      containers:
      - image: nginx:1.12.0-alpine
        name: dla-nginx
        ports:
        - containerPort: 80
          protocol: TCP
EOF
kubectl apply -f dla-nginx-new.yaml
curl -v 10.192.2.8 2>&1 | grep "Server"
cat <<EOF > dla-nginx-typo.yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    run: dla-nginx
  name: dla-nginx
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      run: dla-nginx
  template:
    metadata:
      labels:
        run: dla-nginx
    spec:
      containers:
      - image: nginx:1.12.30-alpine
        name: dla-nginx
        ports:
        - containerPort: 80
          protocol: TCP
EOF
kubectl apply -f ./dla-nginx-typo.yaml
kubectl get pods -o wide
kubectl describe deployments/dla-nginx
kubectl rollout history deployments/dla-nginx
kubectl rollout undo deployment/dla-nginx
kubectl rollout history deployment/dla-nginx

cat <<EOF > busybox-ping-localhost.yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-ping-localhost
spec:
  containers:
  - name: busybox
    image: busybox
    args:
    - ping
    - localhost
EOF

kubectl create -f ./busybox-ping-localhost.yaml
watch kubectl get pods
kubectl get pods -w
kubectl logs -f busybox-ping-localhost
kubectl delete pod busybox-ping-localhost
docker run busybox ping -c1 datalayer.io
cat <<EOF > busybox-ping-googleyahoo.yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-ping-google
spec:
  containers:
  - name: busybox
    image: busybox
    args:
    - ping
    - google.com
---
apiVersion: v1
kind: Pod
metadata:
  name: busybox-ping-yahoo
spec:
  containers:
  - name: busybox
    image: busybox
    args:
    - ping
    - yahoo.com
EOF
kubectl create -f ./busybox-ping-googleyahoo.yaml
watch kubectl get pods
kubectl delete pod busybox-ping-google
cat <<EOF > busybox-ping-googleyahoo-onepod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-ping-googleyahoo-onepod
spec:
  containers:
  - name: busybox-ping-google
    image: busybox
    args:
    - ping
    - google.com
  - name: busybox-ping-yahoo
    image: busybox
    args:
    - ping
    - yahoo.com
EOF
kubectl logs -f busybox-ping-googleyahoo-onepod -c busybox-ping-yahoo
Mount an empty volume
First of all, you can mount an empty directory using "emptydir".
apiVersion: v1
kind: Pod
metadata:
  name: redis
spec:
  containers:
  - name: redis
    image: redis
    volumeMounts:
    - name: redis-persistent-storage
      mountPath: /data/redis
  volumes:
  - name: redis-persistent-storage
    emptyDir: {}
Go on the shell of the node, find the docker container running it, and then go inside via "docker exec -it $CTID bash", and go to "cd /data/redis", it should be empty.
Mount a volume from the host
apiVersion: v1
kind: Pod
metadata:
  name: redis-volume-slashbin
spec:
  containers:
  - name: redis
    image: redis
    volumeMounts:
    - name: slashbin
      mountPath: /tmp/bin
  volumes:
  - name: slashbin
    hostPath:
      # directory location on host
      path: /bin
Go on the shell of the node, find the docker container running it, and then go inside via "docker exec -it $CTID bash", and do an "ls /tmp/bin", it should contain some binaries.
Now go back to the node, and create a file in /bin:
docker exec -it kube-node-2 bash
root@kube-node-2:/# cd /bin/
root@kube-node-2:/bin# touch file
root@kube-node-2:/bin#
You should be able to see that file in the running container in /tmp/bin/file.
Use an environment variable
For example, run a busybox script which outputs the FOO env variable with docker:
cat Dockerfile
FROM busybox
ADD run.sh run.sh
RUN chmod +x run.sh
CMD ./run.sh
where the run.sh is:
cat run.sh
while true; do
  sleep 1
  if [ -z "$FOO" ]; then
    echo "FOO is empty"
  else
    echo "FOO is $FOO"
  fi
done
Build it and push it to the docker hub:
docker build -t zoobab/envvars:latest .
And then push it (if you build it inside minikube (minikube ssh), you won't need to push it to a registry):
docker push zoobab/envvars:latest
The push refers to a repository [docker.io/zoobab/envvars]
7cfba17afe7f: Layer already exists 
3a1dff9afffd: Layer already exists 
latest: digest: sha256:1866e3131d611f8bd7ef5dd5c252ac773f594c40e06158d457ab48cc1b1f76d7 size: 734
You can quickly test it locally without passing any env var:
docker run zoobab/envvars
FOO is empty
FOO is empty
FOO is empty
[...]
And passing a env var for FOO:
docker run -e FOO=BAR zoobab/envvars
FOO is BAR
FOO is BAR
[...]
Now we can deploy a pod with this container by passing the env variable:
cat <<EOF > busybox-envvars.yaml
apiVersion: v1
kind: Pod
metadata:
  name: busybox-envvars
spec:
  containers:
  - name: busybox-envvars
    image: zoobab/envvars
    env:
     - name: FOO
       value: hellofromk8s
EOF
kubectl logs -f busybox-envvars
FOO is hellofromk8s
FOO is hellofromk8s
FOO is hellofromk8s
FOO is hellofromk8s
FOO is hellofromk8s
FOO is hellofromk8s
Mount a volume from the host bis
Let's create a directory called "www" with an index.html in there containing "<h1>Hello from Brussels!</h1>":
mkdir www
cd www
echo "<h1>Hello from Brussels!</h1>" > index.html
Now let's expose that on http://localhost:4000 via the busybox http server
docker run -p4000:80 -v $PWD/www:/www  busybox httpd -f -h /www -v
Visit the url http://localhost:4000 to check that it works fine.
Now login to the nodes (kube-node-2 and kube-node-1) and create this /www directory with the index.html inside, which should contain the name of the node "<h1>Hello from kube-node-1</h1>".
Now deploy this container in the cluster:
cat <<EOF > busybox-httpd-volume-hostpath.yaml 
apiVersion: v1
kind: Pod
metadata:
  name: busybox-httpd-volume-hostpath
spec:
  containers:
    - name: busybox-httpd-volume-hostpath
      image: busybox
      args:
        - httpd
        - -f
        - -h
        - /www
        - -v
      volumeMounts:
        - name: www
          mountPath: /www
  volumes:
    - name: www
      hostPath:
        path: /www
EOF
Deploy it, and then get the IP address via:
kubectl get pods -o wide | grep "httpd"
busybox-httpd-volume-hostpath   1/1       Running            0          2m        10.192.3.11   kube-node-2
Note down the IP address $IPADDR and the $NODE on which it runs.
Visit the http://$IPADDR and check on which node you arrive ("Hello from kube-node-1") for example:
curl 10.192.3.11
hello from node2
Now shutdown the kube-node-2 via:
docker stop kube-node-2
Wait 30 secs and notice that the "busybox-httpd-volume-hostpath" has been rescheduled to the kube-node-1.
watch kubectl get pods -o wide
Custom nginx.conf via ConfigMap
Explain how to run nginx with a custom nginx.conf config file that lists the root filesystem of the container.
First create a working directory named "conf.d" with a file named "default.conf":
mkdir conf.d
cd conf.d
cat <<EOF > default.conf
server {
    listen       80;
    server_name  localhost;

    location / {
        return 200 'Kubernetes is hot, time for a beer!\n';
    }
}
EOF
You can first try what it gives by simply running it on your laptop with docker:
docker run -p9000:80 -d -v $PWD/conf.d:/etc/nginx/conf.d nginx:alpine
Check that it runs by pointing your browser to http://localhost:9000. You should obtain a page like this one:
curl http://localhost:9000
Kubernetes is hot, time for a beer!
Now we have to create a configmap file to load the config in kubernetes:
kubectl create configmap dla-nginx-v1 --from-file=conf.d
configmap "dla-nginx-v1" created
kubectl describe configmaps/dla-nginx-v1
Name:        dla-nginx-v1
Namespace:    default
Labels:        <none>
Annotations:    <none>
default.conf:    125 bytes
Then create a yaml file that refers to this configmap named "dla-nginx-configmap.yaml":
cat <<EOF > dla-nginx-configmap.yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    run: dla-nginx
  name: dla-nginx
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      run: dla-nginx
  template:
    metadata:
      labels:
        run: dla-nginx
    spec:
      containers:
      - image: nginx:alpine
        name: dla-nginx
        ports:
        - containerPort: 80
          protocol: TCP
        volumeMounts:
        - name: config-volume
          mountPath: /etc/nginx/conf.d
      volumes:
       - name: config-volume
         configMap:
           name: dla-nginx-v1
EOF
Load it:
kubectl create -f ./dla-nginx-configmap.yaml
You should get two pods starting with "dla-nginx":
kubectld get pods -o wide
NAME                        READY     STATUS             RESTARTS   AGE       IP            NODE
dla-nginx-3217887688-018r0   1/1       Running            0          13s       10.192.2.8    kube-node-1
dla-nginx-3217887688-c060h   1/1       Running            0          13s       10.192.3.16   kube-node-2
Check curl over the 2 ip addresses:
curl http://10.192.2.8
Kubernetes is hot, time for a beer!
curl http://10.192.3.16
Kubernetes is hot, time for a beer!
You can also check that the file has been mounted properly by getting an interactive shell on one of the pod:
kubectl exec -it dla-nginx-3217887688-018r0 /bin/sh
/ # mount | grep nginx
/dev/mapper/docker-251:2-1441971-d7ae4c5ab80804dd03cfd9e9c19d0bc4e308664a43f712493a0e5387cf39d6d6 on /etc/nginx/conf.d type xfs (rw,relatime,nouuid,attr2,inode64,logbsize=64k,sunit=128,swidth=128,noquota)
/ # cd /etc/nginx/conf.d/
/etc/nginx/conf.d # ls
nginx.conf
/etc/nginx/conf.d # ls -al
total 4
drwxrwxrwx    3 root     root            77 Jun 20 19:28 .
drwxr-xr-x    1 root     root          4096 May 30 17:16 ..
drwxr-xr-x    2 root     root            24 Jun 20 19:28 ..6986_20_06_19_28_16.520312211
lrwxrwxrwx    1 root     root            31 Jun 20 19:28 ..data -> ..6986_20_06_19_28_16.520312211
lrwxrwxrwx    1 root     root            17 Jun 20 19:28 nginx.conf -> ..data/nginx.conf
/etc/nginx/conf.d #
