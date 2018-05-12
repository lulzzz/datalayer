# --- Common ---
c.JupyterHub.cookie_secret = bytes.fromhex('c336ff8bc0f477928cfc73454821ee11182e90a49de57f81e0919e66851349c6')
c.JupyterHub.confirm_no_ssl = True
c.ConfigurableHTTPProxy.auth_token = '0bc02bede919e99a26de1e2a7a5aadfaf6228de836ec39a05a6c6942831d8fe5'

# --- Users ---
c.Authenticator.admin_users = {'datalayer', 'eric.umg.charles2@gmail.com'}
c.Authenticator.whitelist = set()

# --- Authenticator ---
c.JupyterHub.authenticator_class = 'ldapauthenticator.LDAPAuthenticator'
c.LDAPAuthenticator.server_address = 'localhost'
c.LDAPAuthenticator.bind_dn_template = [
    'uid={username},ou=Users,dc=datalayer,dc=io'
]

# --- Spawner ---
c.JupyterHub.spawner_class='sudospawner.SudoSpawner'
c.SudoSpawner.default_url = '/lab'
