import axios from 'axios';
import userManager from '../utils/userManager';

const { REACT_APP_SSO_URL, REACT_APP_OPEN_ID_API_TOKENS_SCOPE } = process.env;

export default {
  getApiAccessToken: async () => {
    const user = await userManager.getUser();
    if (!user) return null;

    const accessToken = user.access_token;

    const userAuth = await axios.get(`${REACT_APP_SSO_URL}/api-tokens/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      scope: REACT_APP_OPEN_ID_API_TOKENS_SCOPE
    });

    return userAuth.data[REACT_APP_OPEN_ID_API_TOKENS_SCOPE];
  }
};
