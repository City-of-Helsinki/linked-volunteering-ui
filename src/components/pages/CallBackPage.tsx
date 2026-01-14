import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCallbackHandler, OidcClientError } from 'hds-react';

function CallBackPage() {
  const navigate = useNavigate();

  const onSuccess = async () => {
    navigate('/');
  };

  const onError = (error: OidcClientError | undefined) => {
    // eslint-disable-next-line no-console
    console.error(error);

    navigate('/');
  };

  return (
    <LoginCallbackHandler onSuccess={onSuccess} onError={onError}>
      <div>
        <p>Uudelleen ohjataan takaisin sivustolle...</p>
        <a href="/">Jatka sivustolle</a>
      </div>
    </LoginCallbackHandler>
  );
}

export default CallBackPage;
