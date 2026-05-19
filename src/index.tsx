import 'bootstrap/dist/css/bootstrap.css';
import './config/theme.scss';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import * as Sentry from '@sentry/react';
import React from 'react';
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

if (globalThis.window._env_.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: globalThis.window._env_.REACT_APP_SENTRY_DSN,
    environment: globalThis.window._env_.REACT_APP_SENTRY_ENVIRONMENT,
    release: globalThis.window._env_.REACT_APP_SENTRY_RELEASE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: parseFloat(
      globalThis.window._env_.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || '0'
    ),
    tracePropagationTargets: (
      globalThis.window._env_.REACT_APP_SENTRY_TRACE_PROPAGATION_TARGETS || ''
    ).split(','),
    replaysSessionSampleRate: parseFloat(
      globalThis.window._env_.REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE ||
        '0'
    ),
    replaysOnErrorSampleRate: parseFloat(
      globalThis.window._env_.REACT_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ||
        '0'
    ),
  });
}

const instance = createInstance({
  disabled: globalThis.window._env_.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: globalThis.window._env_.REACT_APP_MATOMO_URL_BASE || '',
  siteId: Number(globalThis.window._env_.REACT_APP_MATOMO_SITE_ID),
});

const store = createStore();

function Root() {
  return (
    <LoginProvider {...providerProperties}>
      <Provider store={store}>
        <MatomoProvider value={instance} />
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
      </Provider>
    </LoginProvider>
  );
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<Root />);
}
