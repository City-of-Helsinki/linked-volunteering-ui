import '@babel/polyfill';
import React from 'react';
import { Switch, Route } from 'react-router';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';

import ManageEventsPage from './pages/events/containers/ManageEventsPageContainer';
import NewEventPage from './pages/events/containers/NewEventPageContainer';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import SubmittedPage from './pages/events/SubmittedPage';
import ReportPage from './pages/containers/ReportPageContainer';
import LandingPage from './pages/LandingPage';

const App = ({ locale }) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Route exact path="/:locale/" component={LandingPage} />
      <Route exact path={`/:locale/event/new`} component={NewEventPage} />
      <Route exact path={`/:locale/event/submitted`} component={SubmittedPage} />
      <Route exact path={`/:locale/admin/events/manage`} component={ManageEventsPage} />
      <Route exact path={`/:locale/admin/event/modify/:id`} component={ModifyEventPage} />
      <Route exact path="/:locale/admin/report" component={ReportPage} />
    </Switch>
  </IntlProvider>
);

export default App;
