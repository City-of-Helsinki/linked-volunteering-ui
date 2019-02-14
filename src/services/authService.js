import axios from 'axios';
import userManager from '../utils/userManager';

const { REACT_APP_API_URL, REACT_APP_SSO_URL, REACT_APP_OPEN_ID_API_TOKENS_SCOPE } = process.env;

const getUserAuth = async user => {
  const accessToken = user.access_token;

  return axios.get(`${REACT_APP_SSO_URL}/api-tokens/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    scope: REACT_APP_OPEN_ID_API_TOKENS_SCOPE
  });
};

const getApiAccessToken = async () => {
  const user = await userManager.getUser();
  if (!user) return null;

  const userAuth = await getUserAuth(user);
  const apiAccessToken = userAuth.data[REACT_APP_OPEN_ID_API_TOKENS_SCOPE];

  return apiAccessToken;
};

const getCurrentUserType = async () => {
  const user = await userManager.getUser();
  if (!user) return null;

  const userAuth = await getUserAuth(user);
  const apiAccessToken = userAuth.data[REACT_APP_OPEN_ID_API_TOKENS_SCOPE];

  const userType = await axios.get(`${REACT_APP_API_URL}/v1/user/me`, {
    headers: { Authorization: `Bearer ${apiAccessToken}` },
    scope: REACT_APP_OPEN_ID_API_TOKENS_SCOPE
  });

  const userTypes = {
    is_official: userType.data.is_official,
    is_contractor: userType.data.is_contractor
  };

  return userTypes;
};

export default {
  getUserAuth,
  getApiAccessToken,
  getCurrentUserType
};
