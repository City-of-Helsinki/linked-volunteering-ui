import axios from 'axios';
import userManager from '../utils/userManager';

const { REACT_APP_API_URL, REACT_APP_SSO_URL, REACT_APP_OPEN_ID_API_TOKENS_SCOPE } = process.env;

const getUserAuth = async (user) => {
  const accessToken = user.access_token;

  return axios.get(`${REACT_APP_SSO_URL}/api-tokens/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    scope: REACT_APP_OPEN_ID_API_TOKENS_SCOPE,
  });
};

const getApiAccessToken = async () => {
  const user = await userManager.getUser();
  if (!user) return null;

  const userAuth = await getUserAuth(user);
  const apiAccessToken = userAuth.data[REACT_APP_OPEN_ID_API_TOKENS_SCOPE];

  return apiAccessToken;
};

const getCurrentUserData = async () => {
  const user = await userManager.getUser();
  if (!user) return null;

  const userAuth = await getUserAuth(user);
  const apiAccessToken = userAuth.data[REACT_APP_OPEN_ID_API_TOKENS_SCOPE];

  const userData = await axios.get(`${REACT_APP_API_URL}/v1/user/me/`, {
    headers: { Authorization: `Bearer ${apiAccessToken}` },
    scope: REACT_APP_OPEN_ID_API_TOKENS_SCOPE,
  });

  return userData.data;
};

export default {
  getUserAuth,
  getApiAccessToken,
  getCurrentUserData,
};
