import React from 'react';
import { Route, Routes } from 'react-router';
import { useParams } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';
import Error404Page from './pages/Error404Page';
import LandingPage from './pages/LandingPage';
import AdminRoutes from './Admin';
import LocaleRoutes from './LocaleRoutes';
import CommonMeta from './CommonMeta';
import { Language } from '../types';

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

  return (
    <IntlProvider locale={language} key={language} messages={messages[language]}>
      <CommonMeta />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminRoutes />} />
        <Route path="/*" element={<LocaleRoutes />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </IntlProvider>
  );
};

export default App;
