import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const getCurrentUserData = async (apiAccessToken: string | undefined) => {
  const userData = await axios.get(`${REACT_APP_API_URL}/v1/user/me/`, {
    headers: { Authorization: `Bearer ${apiAccessToken}` },
  });

  return userData.data;
};

export default {
  getCurrentUserData,
};
