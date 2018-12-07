// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { IntlProvider } from 'react-intl';
import messages from '../config/translations';

import EventPage from './pages/events/containers/EventPageContainer';
import ReportPage from './pages/containers/ReportPageContainer';

type Props = {
  locale: string
};

const App = ({ locale }: Props) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Redirect exact path="/:locale/" to="/:locale/new-event" />
      <Route path="/:locale/event" component={EventPage} />
      <Route exact path="/:locale/report" component={ReportPage} />
    </Switch>
  </IntlProvider>
);

export default App;
