import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

const CallBackPage = () => (
  <CallbackComponent
    userManager={userManager}
    successCallback={() => {
      console.log('successCallback');
    }}
    errorCallback={error => {
      console.error(error);
    }}
  >
    <div>Redirecting...</div>
  </CallbackComponent>
);

export default CallBackPage;
