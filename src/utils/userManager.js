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
  loadUserInfo: true
};

export default createUserManager(settings);
