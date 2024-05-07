import { createUserManager } from 'redux-oidc';

const { REACT_APP_SSO_URL, REACT_APP_OPEN_ID_API_TOKENS_SCOPE, REACT_APP_OPENID_CLIENT_ID } =
  process.env;

const getRedirectUri = (ext) => {
  const { protocol, hostname, port } = window.location;
  return `${protocol}//${hostname}${port ? `:${port}` : ''}/${ext}`;
};

const settings = {
  client_id: REACT_APP_OPENID_CLIENT_ID,
  authority: `${REACT_APP_SSO_URL}/openid/`,
  redirect_uri: getRedirectUri('callback'),
  post_logout_redirect_uri: getRedirectUri('logged_out'),
  loadUserInfo: true,
  response_type: 'id_token token',
  scope: `openid profile ${REACT_APP_OPEN_ID_API_TOKENS_SCOPE}`,
};

export default createUserManager(settings);
