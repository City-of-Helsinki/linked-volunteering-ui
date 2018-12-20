import { createUserManager } from 'redux-oidc';

const { REACT_APP_OPENID_CLIENT_ID, REACT_APP_OPENID_AUTHORITY } = process.env;

const getRedirectUri = () => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}/callback`;
};

const settings = {
  client_id: REACT_APP_OPENID_CLIENT_ID,
  authority: REACT_APP_OPENID_AUTHORITY,
  redirect_uri: getRedirectUri(),
  post_logout_redirect_uri: getRedirectUri(),
  loadUserInfo: true,
  response_type: 'id_token token',
  scope: 'openid profile https://api.hel.fi/auth/projects'
};

export default createUserManager(settings);
