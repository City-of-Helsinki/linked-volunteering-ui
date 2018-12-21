import { createUserManager } from 'redux-oidc';

const { REACT_APP_OPENID_CLIENT_ID, REACT_APP_OPENID_AUTHORITY } = process.env;

const getRedirectUri = ext => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}/${ext}`;
};

const settings = {
  client_id: REACT_APP_OPENID_CLIENT_ID,
  authority: REACT_APP_OPENID_AUTHORITY,
  redirect_uri: getRedirectUri('callback'),
  post_logout_redirect_uri: getRedirectUri('logged_out'),
  loadUserInfo: true,
  response_type: 'id_token token',
  scope: 'openid profile'
};

export default createUserManager(settings);
