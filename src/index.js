import 'react-app-polyfill/ie11';
import '@babel/polyfill';

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

import App from './components/containers/AppContainer';
import CallbackPage from './components/pages/containers/CallBackPageContainer';

const store = configureStore();
loadUser(store, userManager);

const Root = () => (
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Redirect exact path="/" to="/fi" />
            <Route path="/callback" component={CallbackPage} />
            <Route path="/:locale" component={App} />
          </Switch>
        </Router>
      </ThemeProvider>
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
