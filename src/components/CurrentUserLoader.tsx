import { useEffect } from 'react';
import { isEmpty } from 'lodash';

import useAuth from '../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  currentUserDataSelector,
  getCurrentUserData,
} from '../store/reducers/auth';

// Loads the logged in user's data. This is kept out of App, so that auth and
// user data changes don't re-render App and the cookie consent provider in it.
// HDS cookie consent 6.0.2 fails to open the banner if its provider re-renders
// before the consent settings have been initialized.
const CurrentUserLoader = () => {
  const dispatch = useAppDispatch();

  const { getApiToken } = useAuth();

  const apiToken = getApiToken();

  const currentUser = useAppSelector(currentUserDataSelector);

  useEffect(() => {
    if (isEmpty(currentUser) && apiToken) {
      dispatch(getCurrentUserData(apiToken));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiToken, currentUser]);

  return null;
};

export default CurrentUserLoader;
