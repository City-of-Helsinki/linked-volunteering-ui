import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';
import Error404Page from './pages/Error404Page';
import LandingPage from './pages/LandingPage';
import AdminRoutes from './Admin';
import LocaleRoutes from './LocaleRoutes';
import Login from './Login';
import CommonMeta from './CommonMeta';
import { Language } from '../types';

interface Props {
  locale: string;
}

const getLanguage = (locale: string): Language => {
  switch (locale) {
    case 'en':
    case 'fi':
    case 'sv':
      return locale;
    default:
      return 'fi';
  }
};

const App: React.FC<Props> = ({ locale }) => {
  const language = getLanguage(locale);

  return (
    <IntlProvider locale={language} key={language} messages={messages[language]}>
      <CommonMeta />
      <Switch>
        <Route exact path="/logged_out">
          <Redirect to="fi" />
        </Route>
        <Route exact path="/login/" component={Login} />
        <Route path={`/${language}/admin`} component={AdminRoutes} />
        <Route exact path={`/${language}`} component={LandingPage} />
        <Route path={`/${language}/*`} component={LocaleRoutes} />
        <Route path="*" component={Error404Page} />
      </Switch>
    </IntlProvider>
  );
};

export default App;
