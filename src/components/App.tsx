import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useParams } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { isEmpty } from 'lodash';
import { LoadingSpinner } from 'hds-react';
import { HelmetProvider } from 'react-helmet-async';
import {
  currentUserDataSelector,
  getCurrentUserData,
} from '../store/reducers/auth';

import messages from '../config/translations';
import AdminRoutes from './AdminRoutes';
import LocaleRoutes from './LocaleRoutes';
import CommonMeta from './CommonMeta';
import { Language } from '../types';
import Error404Page from './pages/Error404Page';
import useAuth from '../hooks/useAuth';
import SessionEndedDialog from './SessionEndedDialog';
import ErrorPage from './pages/ErrorPage';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));

const getLanguage = (locale: string): Language => {
  switch (locale) {
    case 'en':
    case 'fi':
    case 'sv':
      return locale;
    default:
      return 'fi';
  }
};

const App: React.FC = () => {
  const { locale } = useParams();
  const language = getLanguage(locale ?? '');

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

  if (locale !== 'en' && locale !== 'fi' && locale !== 'sv') {
    return (
      <IntlProvider
        locale={language}
        key={language}
        messages={messages[language]}
      >
        <Error404Page />;
      </IntlProvider>
    );
  }

  return (
    <React.StrictMode>
      <IntlProvider
        locale={language}
        key={language}
        messages={messages[language]}
      >
        <HelmetProvider>
          <CommonMeta />
          <SessionEndedDialog />
          <React.Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route path="/*" element={<LocaleRoutes />} />
              <Route path="/authError" element={<ErrorPage />} />
            </Routes>
          </React.Suspense>
        </HelmetProvider>
      </IntlProvider>
    </React.StrictMode>
  );
};

export default App;
