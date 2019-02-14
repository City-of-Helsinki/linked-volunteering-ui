import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

const CallBackPage = ({ history, getApiAccessToken, getCurrentUserData }) => (
  <CallbackComponent
    userManager={userManager}
    successCallback={async () => {
      getApiAccessToken();
      getCurrentUserData();
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
