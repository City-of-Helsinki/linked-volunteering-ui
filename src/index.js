import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './polyfills';

import { createInstance, MatomoProvider } from '@datapunt/matomo-tracker-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { OidcProvider, loadUser } from 'redux-oidc';

import { ThemeProvider } from 'styled-components';
import theme from './config/theme';

import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
import userManager from './utils/userManager';
import { mockUser, mockUserData } from './ducks/mock';
import { getApiAccessToken, getCurrentUserData } from './ducks/auth';

import App from './components/containers/AppContainer.tsx';
import CallbackPage from './components/pages/containers/CallBackPageContainer';

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
  siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID)
});

const Root = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <MatomoProvider value={instance}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Redirect exact path="/" to="/fi" />
              <Route path="/callback" component={CallbackPage} />
              <Route path="/:locale" component={App} />
            </Switch>
          </Router>
        </ThemeProvider>
      </MatomoProvider>
    </OidcProvider>
  </Provider>
);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<Root />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
