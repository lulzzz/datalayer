c.HubOAuth.oauth_redirect_uri = 'http://localhost:10102/services/whoami-oauth/oauth_callback'

c.JupyterHub.services = [
    {
        'name': 'whoami',
        'url': 'http://localhost:10101',
        'api_token': 'd587ce42bc34407687901bbc723dcb0f',
    },
    {
        'name': 'whoami-oauth',
        'url': 'http://localhost:10102',
        'api_token': 'd587ce42bc34407687901bbc723dcb0f',
        'oauth_client_id': "service-whoami-oauth",
#        'oauth_redirect_uri': '/services/whoami-oauth/oauth_callback',
    },
]
