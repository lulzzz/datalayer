# Draft

```
minikube start
kubectl cluster-info
helm init
kubectl -n kube-system get deploy tiller-deploy -w
minikube addons enable registry
minikube dashboard
```

```
draft init --auto-accept
draft logs
```

```
time="2017-12-28T07:32:42Z" level=info msg="server is now listening at 0.0.0.0:44135 (tls=false)" 
buildApp: buildImg error: Error response from daemon: client is newer than server (client API version: 1.29, server API version: 1.24)
```

```
DOCKER_API_VERSION=1.24
```

```
# draft.toml
[environments]
  [environments.development]
    name = "example-python"
    namespace = "default"
    wait = true
    watch = true
    watch_delay = 2
```

```
cd /src/k8s/draft/examples/example-python
draft create
draft up
```

```
draft connect
```

```
cd /src/k8s/draft/examples/example-python
curl http://localhost:41433
```

```
cat <<EOF > app.py
from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, Draft!\n"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
EOF
```

```
draft up
```

```
curl http://localhost:55196
```

```
helm delete draft --purge
```
