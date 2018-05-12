export JUPYTERHUB_API_TOKEN=d587ce42bc34407687901bbc723dcb0f
python cull_idle_servers.py --timeout=9 --url=http://127.0.0.1:8081/hub/api
