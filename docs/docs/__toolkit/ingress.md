```
kubectl run nginx --image=nginx --port=80
kubectl run echoserver --image=gcr.io/google_containers/echoserver:1.4 --port=8080
kubectl get deployments
```

```
kubectl expose deployment nginx --target-port=80 --type=NodePort
kubectl expose deployment echoserver --target-port=8080 --type=NodePort
```

```
kubectl get service nginx
kubectl get service echoserver
```

# Load Balancer Service

```
#    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-1:<account number>:certificate/<certificate id>
cat << EOF | kubectl apply -f -
apiVersion: v1
kind: Service
metadata:
  name: nginx-svc
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 80
  selector:
    run: nginx
EOF
```

# Ingress 1

```
cat << EOF | kubectl apply -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
 name: fanout-ingress
spec:
 rules:
 - http:
     paths:
     - path: /
       backend:
         serviceName: nginx
         servicePort: 80
     - path: /echo
       backend:
         serviceName: echoserver
         servicePort: 8080
EOF
```

```
kubectl get ingress fanout-ingress
```

# Ingress Nginx

## Manual

```
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/namespace.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/default-backend.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/configmap.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/tcp-services-configmap.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/udp-services-configmap.yaml \
    | kubectl apply -f -
```

```
# Without RBAC
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/without-rbac.yaml \
    | kubectl apply -f -
```

```
# Install with RBAC roles
# Please check the RBAC document.
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/rbac.yaml \
    | kubectl apply -f -
curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/with-rbac.yaml \
    | kubectl apply -f -
```

```
# AWS
kubectl patch deployment -n ingress-nginx nginx-ingress-controller --type='json' \
  --patch="$(curl https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/patch-deployment.yaml)"
# For L4:
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/aws/service-l4.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/aws/patch-configmap-l4.yaml
# For L7:
# Change line of the file provider/aws/service-l7.yaml replacing the dummy id with a valid one # "arn:aws:acm:us-west-2:XXXXXXXX:certificate/XXXXXX-XXXXXXX-XXXXXXX-XXXXXXXX" Then execute:
kubectl apply -f provider/aws/service-l7.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/aws/patch-configmap-l7.yaml
# This example creates an ELB with just two listeners, one in port 80 and another in port 443
```

```
# RBAC
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/patch-service-without-rbac.yaml
```

```
# No RBAC
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/patch-service-with-rbac.yaml
```


```
kubectl get pods --all-namespaces -l app=ingress-nginx --watch
NAMESPACE       NAME                                       READY     STATUS    RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-8dcfb95b9-kvm9g   1/1       Running   0          7m
```

```
POD_NAMESPACE=ingress-nginx
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app=ingress-nginx -o jsonpath={.items[0].metadata.name})
kubectl exec -it $POD_NAME -n $POD_NAMESPACE -- /nginx-ingress-controller --version
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:    0.9.0
  Build:      git-6816630
  Repository: https://github.com/kubernetes/ingress-nginx
-------------------------------------------------------------------------------
```

## Helm

```
#  --set controller.scope.namespace=nginx-ingress
helm install stable/nginx-ingress \
  --name k8s-nginx \
  --set controller.stats.enabled=true \
  --set controller.scope.namespace=ingress-nginx
```

```
NAME:   k8s-nginx
LAST DEPLOYED: Sun Dec 31 17:49:01 2017
NAMESPACE: default
STATUS: DEPLOYED

RESOURCES:
==> v1/ConfigMap
NAME                                DATA  AGE
k8s-nginx-nginx-ingress-controller  1     1s

==> v1/Service
NAME                                        TYPE          CLUSTER-IP      EXTERNAL-IP  PORT(S)                     AGE
k8s-nginx-nginx-ingress-controller-metrics  ClusterIP     10.105.203.178  <none>       9913/TCP                    1s
k8s-nginx-nginx-ingress-controller          LoadBalancer  10.99.170.231   <pending>    80:32686/TCP,443:32271/TCP  1s
k8s-nginx-nginx-ingress-controller-stats    ClusterIP     10.109.250.74   <none>       18080/TCP                   1s
k8s-nginx-nginx-ingress-default-backend     ClusterIP     10.97.66.223    <none>       80/TCP                      1s

==> v1beta1/Deployment
NAME                                     DESIRED  CURRENT  UP-TO-DATE  AVAILABLE  AGE
k8s-nginx-nginx-ingress-controller       1        1        1           0          1s
k8s-nginx-nginx-ingress-default-backend  1        1        1           0          1s

==> v1/Pod(related)
NAME                                                      READY  STATUS             RESTARTS  AGE
k8s-nginx-nginx-ingress-controller-5d4979dd7-4fzdg        0/2    ContainerCreating  0         1s
k8s-nginx-nginx-ingress-default-backend-868998f7c6-dhqqb  0/1    ContainerCreating  0         1s

NOTES:
The nginx-ingress controller has been installed.
It may take a few minutes for the LoadBalancer IP to be available.
You can watch the status by running 'kubectl --namespace default get services -o wide -w k8s-nginx-nginx-ingress-controller'

An example Ingress that makes use of the controller:

  apiVersion: extensions/v1beta1
  kind: Ingress
  metadata:
    annotations:
      kubernetes.io/ingress.class: nginx
    name: example
    namespace: foo
  spec:
    rules:
      - host: www.example.com
        http:
          paths:
            - backend:
                serviceName: exampleService
                servicePort: 80
              path: /
    # This section is only required if TLS is to be enabled for the Ingress
    tls:
        - hosts:
            - www.example.com
          secretName: example-tls

If TLS is enabled for the Ingress, a Secret containing the certificate and key must also be provided:

  apiVersion: v1
  kind: Secret
  metadata:
    name: example-tls
    namespace: foo
  data:
    tls.crt: <base64 encoded cert>
    tls.key: <base64 encoded key>
  type: kubernetes.io/tls
```

```
kubectl get pods --all-namespaces -l app=nginx-ingress --watch
NAMESPACE       NAME                                       READY     STATUS    RESTARTS   AGE
ingress-nginx   nginx-ingress-controller-8dcfb95b9-kvm9g   1/1       Running   0          7m
```

```
POD_NAMESPACE=default
POD_NAME=$(kubectl get pods -n $POD_NAMESPACE -l app=nginx-ingress -o jsonpath={.items[0].metadata.name})
kubectl exec -it $POD_NAME -n $POD_NAMESPACE --container nginx-ingress-controller -- /nginx-ingress-controller --version
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:    0.9.0
  Build:      git-6816630
  Repository: https://github.com/kubernetes/ingress-nginx
-------------------------------------------------------------------------------
```

# Test

```
kubectl --namespace default get services -o wide -w k8s-nginx-nginx-ingress-controller
```

```
cat << EOF | kubectl create -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: nginx2
  namespace: default
spec:
  rules:
  - http:
      paths:
      - path: /
        backend:
          serviceName: k8s-dashboard-kubernetes-dashboard
          servicePort: 9090
EOF
```

```
cat << EOF | kubectl create -f -
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  annotations:
    kubernetes.io/ingress.class: nginx
  name: nginx-ingress-nginx
  namespace: default
spec:
  rules:
  - http:
      paths:
      - path: /
        backend:
          serviceName: nginx
          servicePort: 80
EOF
```
