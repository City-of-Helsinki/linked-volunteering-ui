import React from 'react';
import { Route, Routes, useMatch, useParams } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import { CookieBanner, CookieConsentContextProvider } from 'hds-react';
import { HelmetProvider } from 'react-helmet-async';

import messages from '../config/translations';
import AdminRoutes from './AdminRoutes';
import LocaleRoutes from './LocaleRoutes';
import CommonMeta from './CommonMeta';
import { Language } from '../types';
import Error404Page from './pages/Error404Page';
import SessionEndedDialog from './SessionEndedDialog';
import ErrorPage from './pages/ErrorPage';
import LoadingSpinner from './common/LoadingSpinner';
import { getCookieConsentProps } from './cookieConsent/cookieConsentSettings';
import MatomoConsent from './cookieConsent/MatomoConsent';
import CurrentUserLoader from './CurrentUserLoader';

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
  // The settings page has its own consent form, so the banner is not shown there
  const isCookieSettingsPage = Boolean(useMatch('/:locale/cookies'));

  if (locale !== 'en' && locale !== 'fi' && locale !== 'sv') {
    return (
      <>
        <CurrentUserLoader />
        <IntlProvider
          locale={language}
          key={language}
          messages={messages[language]}
        >
          <HelmetProvider>
            <CookieConsentContextProvider {...getCookieConsentProps(language)}>
              <MatomoConsent />
              <CookieBanner />
              <Error404Page />
            </CookieConsentContextProvider>
          </HelmetProvider>
        </IntlProvider>
      </>
    );
  }

  return (
    <React.StrictMode>
      <CurrentUserLoader />
      <IntlProvider
        locale={language}
        key={language}
        messages={messages[language]}
      >
        <HelmetProvider>
          <CookieConsentContextProvider {...getCookieConsentProps(language)}>
            <MatomoConsent />
            {!isCookieSettingsPage && <CookieBanner />}
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
          </CookieConsentContextProvider>
        </HelmetProvider>
      </IntlProvider>
    </React.StrictMode>
  );
};

export default App;
