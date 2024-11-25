import React from 'react';
import { LoadingSpinner } from 'hds-react';
import useAuth from '../hooks/useAuth';

function Login() {
  const { login } = useAuth();

  login();

  return <LoadingSpinner />;
}

export default Login;
