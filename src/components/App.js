// @flow
import React from 'react';
import { Switch, Route } from 'react-router';
import { IntlProvider } from 'react-intl';
import messages from '../config/translations';

import NewEventPage from './pages/containers/NewEventPageContainer';
import ReportPage from './pages/containers/ReportPageContainer';
import LandingPage from './pages/LandingPage';

type Props = {
  locale: string
};

const App = ({ locale }: Props) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Route exact path="/:locale/" component={LandingPage} />
      <Route exact path="/:locale/new-event" component={NewEventPage} />
      <Route exact path="/:locale/report" component={ReportPage} />
    </Switch>
  </IntlProvider>
);

export default App;
