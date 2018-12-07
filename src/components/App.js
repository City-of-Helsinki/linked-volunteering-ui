// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { IntlProvider } from 'react-intl';
import messages from '../config/translations';

import EventsPage from './pages/events/containers/EventsPageContainer';
import NewEventPage from './pages/events/containers/NewEventPageContainer';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import SubmittedPage from './pages/events/SubmittedPage';
import ReportPage from './pages/containers/ReportPageContainer';

type Props = {
  locale: string
};

const App = ({ locale }: Props) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Redirect exact path="/:locale/" to="/:locale/new-event" />
      <Route exact path={`/:locale/events`} component={EventsPage} />
      <Route exact path={`/:locale/event/new`} component={NewEventPage} />
      <Route exact path={`/:locale/event/submitted`} component={SubmittedPage} />
      <Route exact path={`/:locale/event/modify/:id`} component={ModifyEventPage} />
      <Route exact path="/:locale/report" component={ReportPage} />
    </Switch>
  </IntlProvider>
);

export default App;
