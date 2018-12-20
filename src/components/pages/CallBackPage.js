import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

const CallBackPage = ({ intl, history }) => (
  <CallbackComponent
    userManager={userManager}
    successCallback={() => {
      console.log('successCallback');
      history.push('/');
    }}
    errorCallback={error => {
      console.error(error);
    }}
  >
    <div>Redirecting...</div>
  </CallbackComponent>
);

export default CallBackPage;
