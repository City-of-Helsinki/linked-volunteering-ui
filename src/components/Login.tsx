import React from 'react';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './common/LoadingSpinner';

function Login() {
  const { login } = useAuth();

  login();

  // The login route has no locale, so the default language is used
  return (
    <IntlProvider locale="fi" messages={messages.fi}>
      <LoadingSpinner />
    </IntlProvider>
  );
}

export default Login;
