import os
pjoin = os.path.join
runtime_dir = os.path.join('/srv/datalayerhub')

# --- Common ---
c.JupyterHub.confirm_no_ssl = False
c.ConfigurableHTTPProxy.auth_token = pjoin(runtime_dir, 'datalayerhub_auth_token')
c.JupyterHub.cookie_secret_file = pjoin(runtime_dir, 'datalayerhub_cookie_secret')
c.JupyterHub.db_url = pjoin(runtime_dir, 'datalayerhub.sqlite')
c.JupyterHub.extra_log_file = '/var/log/datalayerhub.log'

# --- Users ---
c.Authenticator.admin_users = {'datalayer'}
c.Authenticator.whitelist = set()

# --- Authenticator ---
c.JupyterHub.authenticator_class = 'ldapauthenticator.LDAPAuthenticator'
c.LDAPAuthenticator.server_address = 'localhost'
c.LDAPAuthenticator.bind_dn_template = [
    'cn={username},ou=Users,dc=datalayer,dc=io'
]

# --- Spawner ---
c.JupyterHub.spawner_class = 'dockerspawner.DockerSpawner'
c.DockerSpawner.image = 'datalayer/jupyterhub-singleuser:0.0.1'
c.DockerSpawner.default_url = '/lab'
from jupyter_client.localinterfaces import public_ips
c.JupyterHub.hub_ip = public_ips()[0]

# --- Services ---
c.JupyterHub.services = [
    {
        'name': 'cull-idle',
        'admin': True,
        'command': 'python {0}/sbin/hub/cull_idle_servers.py --timeout=3600'.format(os.environ['DLAHOME']).split(),
    }
]
