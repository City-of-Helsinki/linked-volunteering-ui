import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useParams } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { useDispatch } from 'react-redux';
import { getCurrentUserData } from '../store/reducers/auth';

import messages from '../config/translations';
import LandingPage from './pages/LandingPage';
import AdminRoutes from './Admin';
import LocaleRoutes from './LocaleRoutes';
import CommonMeta from './CommonMeta';
import { Language } from '../types';
import Error404Page from './pages/Error404Page';
import useAuth from '../hooks/useAuth';
import SessionEndedDialog from './SessionEndedDialog';
import ErrorPage from './pages/ErrorPage';

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
  const language = getLanguage(locale || '');

  const dispatch = useDispatch();

  const { getApiToken } = useAuth();

  const apiToken = getApiToken();

  useEffect(() => {
    if (process.env.REACT_APP_MOCK_USER === 'true') {
      dispatch(getCurrentUserData());
    } else {
      // eslint-disable-next-line no-lonely-if
      if (apiToken) {
        dispatch(getCurrentUserData(apiToken));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiToken]);

  if (locale !== 'en' && locale !== 'fi' && locale !== 'sv') {
    return (
      <IntlProvider locale={language} key={language} messages={messages[language]}>
        <Error404Page />;
      </IntlProvider>
    );
  }

  return (
    <IntlProvider locale={language} key={language} messages={messages[language]}>
      <CommonMeta />
      <SessionEndedDialog />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<LocaleRoutes />} />
        <Route path="/authError" element={<ErrorPage />} />
      </Routes>
    </IntlProvider>
  );
};

export default App;
