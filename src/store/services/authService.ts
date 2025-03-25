import { REACT_APP_API_URL } from '../../utils/environment';

const getCurrentUserData = async (apiAccessToken: string | undefined) => {
  const response = await fetch(`${REACT_APP_API_URL}/v1/user/me/`, {
    headers: {
      Authorization: `Bearer ${apiAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default {
  getCurrentUserData,
};
