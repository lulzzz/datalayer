export JUPYTERHUB_API_TOKEN=d587ce42bc34407687901bbc723dcb0f
export JUPYTERHUB_SERVICE_URL=http://127.0.0.1:9999
export JUPYTERHUB_SERVICE_PREFIX=/services/shared-notebook
export JUPYTERHUB_SERVICE_NAME=shared-notebook
export JUPYTERHUB_CLIENT_ID=a-client-id

jupyterhub-singleuser \
    --group='shared'
