#!/usr/bin/env bash
# script to launch whoami-oauth service
set -euo pipefail

# the service needs to know:
# 1. API token
# if [[ -z "${JUPYTERHUB_API_TOKEN}" ]]; then
#     echo 'set API token with export JUPYTERHUB_API_TOKEN=$(openssl rand -hex 32)'
# fi
export JUPYTERHUB_API_TOKEN='0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# 2. oauth client ID
export JUPYTERHUB_CLIENT_ID="whoami-oauth-client-test"
# 3. what URL to run on
export JUPYTERHUB_SERVICE_PREFIX='/'
export JUPYTERHUB_SERVICE_URL='http://127.0.0.1:5555'
export JUPYTERHUB_OAUTH_CALLBACK_URL="$JUPYTERHUB_SERVICE_URL/oauth_callback"
# 4. where the Hub is
export JUPYTERHUB_HOST='http://127.0.0.1:8000'

# launch the service
exec python whoami-oauth.py
