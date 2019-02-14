import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

const CallBackPage = ({ history, getApiAccessToken, getCurrentUserType }) => (
  <CallbackComponent
    userManager={userManager}
    successCallback={async () => {
      getApiAccessToken();
      getCurrentUserType();
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
