import 'bootstrap/dist/css/bootstrap.css';
import './config/theme.scss';

import * as Sentry from '@sentry/react';
import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import { LoginProvider } from 'hds-react';
import theme from './config/theme';

import { createStore } from './store/configureStore';
import providerProperties from './utils/userManager';

import App from './components/App';
import CallbackPage from './components/pages/CallBackPage';
import Login from './components/Login';
import MatomoTracker from './components/matomo/MatomoTracker';
import { MatomoContext } from './components/matomo/matomo-context';

if (import.meta.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.REACT_APP_SENTRY_DSN,
    environment: import.meta.env.REACT_APP_SENTRY_ENVIRONMENT,
    release: import.meta.env.REACT_APP_SENTRY_RELEASE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: parseFloat(
      import.meta.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || '0'
    ),
    tracePropagationTargets: (
      import.meta.env.REACT_APP_SENTRY_TRACE_PROPAGATION_TARGETS || ''
    ).split(','),
    replaysSessionSampleRate: parseFloat(
      import.meta.env.REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || '0'
    ),
    replaysOnErrorSampleRate: parseFloat(
      import.meta.env.REACT_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || '0'
    ),
  });
}

const store = createStore();

function Root() {
  const matomoTracker = useMemo(
    () =>
      new MatomoTracker({
        urlBase: import.meta.env.REACT_APP_MATOMO_URL_BASE || '',
        siteId: Number(import.meta.env.REACT_APP_MATOMO_SITE_ID),
        srcUrl: 'matomo.js',
        enabled: import.meta.env.REACT_APP_MATOMO_ENABLED === 'true',
        configurations: {
          setDoNotTrack: undefined,
        },
      }),
    []
  );

  return (
    <LoginProvider {...providerProperties}>
      <Provider store={store}>
        {/* @ts-ignore */}
        <MatomoContext.Provider value={matomoTracker}>
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/fi/" />} />
                <Route path="/logged_out" element={<Navigate to="/fi/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<CallbackPage />} />
                <Route path="/:locale/*" element={<App />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </MatomoContext.Provider>
      </Provider>
    </LoginProvider>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<Root />);
}
