export JUPYTERHUB_API_TOKEN=d587ce42bc34407687901bbc723dcb0f
export JUPYTERHUB_SERVICE_URL=http://localhost:10102
export JUPYTERHUB_SERVICE_PREFIX=/services/whoami-oauth/
export JUPYTERHUB_CLIENT_ID=service-whoami-oauth
export JUPYTERHUB_OAUTH_CALLBACK_URL=/services/whoami-oauth/oauth_callback

python whoami-oauth.py --url=http://localhost:8081/hub/api
