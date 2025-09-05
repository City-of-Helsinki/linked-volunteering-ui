import {
  isApiTokensRemovedSignal,
  isApiTokensUpdatedSignal,
  Signal,
  useApiTokens,
  useOidcClient,
  useSignalListener,
} from 'hds-react';
import { useCallback } from 'react';

const useAuth = () => {
  const { isAuthenticated, getUser, logout, login, getState } = useOidcClient();
  const { isRenewing, getStoredApiTokens } = useApiTokens();

  const [error, tokens] = getStoredApiTokens();

  const signalListener = useCallback(
    (signal?: Signal) =>
      isApiTokensUpdatedSignal(signal) || isApiTokensRemovedSignal(signal),
    []
  );

  const getApiToken = useCallback(() => {
    if (error || isRenewing()) {
      return undefined;
    }

    return tokens
      ? tokens[`${import.meta.env.REACT_APP_OIDC_API_SCOPE}`]
      : undefined;
  }, [error, isRenewing, tokens]);

  useSignalListener(signalListener);

  const loggingOut = getState() === 'LOGGING_OUT';

  console.log('errors: ', error);
  console.log('tokens: ', tokens);

  return {
    authenticated: isAuthenticated(),
    user: getUser(),
    getApiToken,
    login,
    logout,
    loggingOut,
  };
};

export default useAuth;
