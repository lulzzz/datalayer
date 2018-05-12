# our user list
c.Authenticator.whitelist = [
    'minrk',
    'datalayer',
    'willingc',
]

# ellisonbg and willingc have access to a shared server:

c.JupyterHub.load_groups = {
    'shared': [
        'datalayer',
        'willingc',
    ]
}

c.HubOAuth.oauth_redirect_uri = 'http://localhost:9999/services/shared-notebook/oauth_callback'

# start the notebook server as a service
c.JupyterHub.services = [
    {
        'name': 'shared-notebook',
        'url': 'http://127.0.0.1:9999',
        'admin': True, 
        'api_token': 'd587ce42bc34407687901bbc723dcb0f',
        'oauth_redirect_uri': '/services/shared-notebook/oauth_callback',
    }
]
