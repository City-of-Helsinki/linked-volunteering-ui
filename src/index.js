import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './polyfills';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { OidcProvider, loadUser } from 'redux-oidc';

import { ThemeProvider } from 'styled-components';
import theme from './config/theme';

import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
import userManager from './utils/userManager';
import { mockUser, mockUserData } from './ducks/mock';
import { getApiAccessToken, getCurrentUserData } from './ducks/auth';

import App from './components/containers/AppContainer';
import CallbackPage from './components/pages/containers/CallBackPageContainer';
import Login from './components/Login';

if (process.env.REACT_APP_SENTRY_ENVIRONMENT) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
    integrations: [new Integrations.BrowserTracing()],
    release: `${process.env.REACT_APP_APPLICATION_NAME}@${process.env.REACT_APP_VERSION}`,
  });
}

const store = configureStore();
const { REACT_APP_AUTHENTICATED } = process.env;

if (REACT_APP_AUTHENTICATED === 'yes') {
  store.dispatch(mockUser());
  store.dispatch(mockUserData());
} else {
  loadUser(store, userManager);
  store.dispatch(getApiAccessToken());
  store.dispatch(getCurrentUserData());
}

const instance = createInstance({
  disabled: process.env.REACT_APP_MATOMO_ENABLED !== 'true',
  urlBase: process.env.REACT_APP_MATOMO_URL_BASE,
  siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID),
});

function Root() {
  return (
    <Provider store={store}>
      <OidcProvider store={store} userManager={userManager}>
        <MatomoProvider value={instance}>
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                <Route path="/logged_out" element={<Navigate to="/fi/" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<CallbackPage />} />
                <Route path="/:locale/*" element={<App />} />
                <Route path="*" element={<Navigate to="/fi/" replace />} />
              </Routes>
            </Router>
          </ThemeProvider>
        </MatomoProvider>
      </OidcProvider>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<Root />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
