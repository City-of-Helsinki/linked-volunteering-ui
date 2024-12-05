import { LoginProviderProps } from 'hds-react';

const {
  REACT_APP_OIDC_API_TOKENS_URL,
  REACT_APP_OIDC_CLIENT_ID,
  REACT_APP_OIDC_AUTHORITY,
  REACT_APP_OIDC_API_SCOPE,
} = process.env;

const getRedirectUri = (ext: string) => {
  const { protocol, hostname, port } = window.location;
  const portPart = port ? `:${port}` : '';

  return `${protocol}//${hostname}${portPart}/${ext}`;
};

const providerProperties: LoginProviderProps = {
  userManagerSettings: {
    authority: REACT_APP_OIDC_AUTHORITY,
    client_id: REACT_APP_OIDC_CLIENT_ID,
    scope: 'openid profile email',
    redirect_uri: getRedirectUri('callback'),
    silent_redirect_uri: getRedirectUri('silent_renew.html'),
    post_logout_redirect_uri: getRedirectUri('logged_out'),
    response_type: 'code',
  },
  apiTokensClientSettings: {
    url: `${REACT_APP_OIDC_API_TOKENS_URL}`,
    queryProps: {
      grantType: 'urn:ietf:params:oauth:grant-type:uma-ticket',
      permission: '#access',
    },
    audiences: [`${REACT_APP_OIDC_API_SCOPE}`],
  },
  debug: false,
};

export default providerProperties;
