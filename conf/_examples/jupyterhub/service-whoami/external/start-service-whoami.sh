export JUPYTERHUB_API_TOKEN=d587ce42bc34407687901bbc723dcb0f
export JUPYTERHUB_SERVICE_PREFIX=/services/whoami
export JUPYTERHUB_SERVICE_URL=http://localhost:10101

python whoami.py --url=http://localhost:8081/hub/api

