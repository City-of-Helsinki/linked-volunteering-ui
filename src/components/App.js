// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { IntlProvider } from 'react-intl';
import messages from '../config/translations';

import NewEventPage from './pages/NewEventPage';

type Props = {
  locale: string
};

const App = ({ locale }: Props) => (
  <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
    <Switch>
      <Redirect exact path="/:locale/" to="/:locale/new-event" />
      <Route exact path="/:locale/new-event" component={NewEventPage} />
    </Switch>
  </IntlProvider>
);

export default App;
