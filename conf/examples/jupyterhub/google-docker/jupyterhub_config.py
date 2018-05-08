# Configuration file for Jupyter Hub

c = get_config()

# spawn with Docker
#c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.image = 'jupyterhub/singleuser:0.9'
c.DockerSpawner.default_url = '/lab'
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

# The docker instances need access to the Hub, so the default loopback port doesn't work:
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

# OAuth with Google
from oauthenticator.google import GoogleOAuthenticator
class NormalizingGoogleAuthenticator(GoogleOAuthenticator):
    def normalize_username(self, username):
        username = username.lower().replace("@", "_")
        username = self.username_map.get(username, username)
        return username
c.JupyterHub.authenticator_class = NormalizingGoogleAuthenticator
# c.GoogleOAuthenticator.username_map = {'eric.umg.charles2@gmail.com': 'eric.umg.charles2_gmail.com'}

c.Authenticator.whitelist = whitelist = set()
c.Authenticator.admin_users = admin = set()

import os

join = os.path.join
here = os.path.dirname(__file__)
with open(join(here, 'userlist')) as f:
    for line in f:
        if not line:
            continue
        parts = line.split()
        name = parts[0]
        whitelist.add(name)
        if len(parts) > 1 and parts[1] == 'admin':
            admin.add(name)

c.GoogleOAuthenticator.oauth_callback_url = os.environ['OAUTH_CALLBACK_URL']

# ssl config
ssl = join(here, 'ssl')
keyfile = join(ssl, 'ssl.key')
certfile = join(ssl, 'ssl.cert')
if os.path.exists(keyfile):
    c.JupyterHub.ssl_key = keyfile
if os.path.exists(certfile):
    c.JupyterHub.ssl_cert = certfile
