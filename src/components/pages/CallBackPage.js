import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import { useNavigate } from 'react-router';
import userManager from '../../utils/userManager';

function CallBackPage({ getApiAccessToken, getCurrentUserData }) {
  const navigate = useNavigate();
  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={async () => {
        getApiAccessToken();
        getCurrentUserData();
        navigate('/');
      }}
      errorCallback={(error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      }}
    >
      <div>
        <p>Uudelleen ohjataan takaisin sivustolle...</p>
        <a href="/">Jatka sivustolle</a>
      </div>
    </CallbackComponent>
  );
}

export default CallBackPage;
