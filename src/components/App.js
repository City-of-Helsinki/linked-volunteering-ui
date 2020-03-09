import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../constants';
import Error404Page from './pages/Error404Page.tsx';
import LandingPage from './pages/LandingPage.tsx';
import AdminRoutes from './Admin';
import LocaleRoutes from './LocaleRoutes.tsx';
import Login from './Login';

const App = ({ locale }) => {
  const language = SUPPORT_LANGUAGES[locale.toUpperCase()] || DEFAULT_LANGUAGE;

  return (
    <IntlProvider locale={language} key={language} messages={messages[language]}>
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
