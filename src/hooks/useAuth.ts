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
  const { isAuthenticated, getUser, logout, login } = useOidcClient();
  const { isRenewing, getStoredApiTokens } = useApiTokens();

  const [error, tokens] = getStoredApiTokens();

  const signalListener = useCallback(
    (signal?: Signal) => isApiTokensUpdatedSignal(signal) || isApiTokensRemovedSignal(signal),
    [],
  );

  const getApiToken = useCallback(() => {
    if (error || isRenewing()) {
      return undefined;
    }

    return tokens ? tokens[`${process.env.REACT_APP_OIDC_API_SCOPE}`] : undefined;
  }, [error, isRenewing, tokens]);

  useSignalListener(signalListener);

  return {
    authenticated: isAuthenticated(),
    user: getUser(),
    getApiToken,
    login,
    logout,
  };
};

export default useAuth;
