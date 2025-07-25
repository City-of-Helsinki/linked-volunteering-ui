import 'bootstrap/dist/css/bootstrap.css';
import './config/theme.scss';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
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

import * as serviceWorker from './serviceWorker';
import { createStore } from './store/configureStore';
import providerProperties from './utils/userManager';

import App from './components/App';
import CallbackPage from './components/pages/CallBackPage';
import Login from './components/Login';

if (import.meta.env.REACT_APP_SENTRY_ENVIRONMENT) {
  Sentry.init({
    dsn: import.meta.env.REACT_APP_SENTRY_DSN,
    environment: import.meta.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [new Integrations.BrowserTracing()],
    release: `${import.meta.env.REACT_APP_APPLICATION_NAME}@${import.meta.env.REACT_APP_VERSION}`,
  });
}

const instance = createInstance({
  disabled: import.meta.env.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: import.meta.env.REACT_APP_MATOMO_URL_BASE || '',
  siteId: Number(import.meta.env.REACT_APP_MATOMO_SITE_ID),
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
