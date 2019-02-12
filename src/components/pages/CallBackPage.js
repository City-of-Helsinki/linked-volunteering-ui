import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import axios from 'axios';
import userManager from '../../utils/userManager';

const { REACT_APP_SSO_URL, REACT_APP_OPEN_ID_API_TOKENS_SCOPE } = process.env;

const CallBackPage = ({ history, setApiAccessToken }) => (
  <CallbackComponent
    userManager={userManager}
    successCallback={async () => {
      const user = await userManager.getUser();
      const accessToken = user.access_token;
      const userAuth = await axios.get(`${REACT_APP_SSO_URL}/api-tokens/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        scope: REACT_APP_OPEN_ID_API_TOKENS_SCOPE
      });

      setApiAccessToken(userAuth.data[REACT_APP_OPEN_ID_API_TOKENS_SCOPE]);

      history.push('/');
    }}
    errorCallback={error => {
      console.error(error);
    }}
  >
    <div>
      <p>Uudelleen ohjataan takaisin sivustolle...</p>
      <a href="/">Jatka sivustolle</a>
    </div>
  </CallbackComponent>
);

export default CallBackPage;
