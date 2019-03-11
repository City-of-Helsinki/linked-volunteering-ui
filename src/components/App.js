import '@babel/polyfill';
import React from 'react';
import { Switch, Route } from 'react-router';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';

import NewEventPage from './pages/events/containers/NewEventPageContainer';
import SubmittedPage from './pages/events/SubmittedPage';
import LandingPage from './pages/LandingPage';
import AdminRoutes from './Admin';
import Login from './Login';

const App = ({ locale }) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Route exact path="/login/" component={Login} />
      <Route exact path="/:locale/" component={LandingPage} />
      <Route exact path={`/:locale/event/new`} component={NewEventPage} />
      <Route exact path={`/:locale/event/submitted`} component={SubmittedPage} />
      <Route path={`/:locale/admin`} component={AdminRoutes} />
    </Switch>
  </IntlProvider>
);

export default App;
