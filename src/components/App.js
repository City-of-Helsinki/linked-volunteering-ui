import React from 'react';
import { Switch, Redirect, Route } from 'react-router';
import { IntlProvider } from 'react-intl';

import messages from '../config/translations';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../constants';
import AccessibilityPage from './pages/accessibility/AccessibilityPage.tsx';
import NewEventPage from './pages/events/containers/NewEventPageContainer';
import SubmittedPage from './pages/events/containers/SubmittedPageContainer';
import LandingPage from './pages/LandingPage.tsx';
import AdminRoutes from './Admin';
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
        <Route exact path="/:locale/" component={LandingPage} />
        <Route path={`/:locale/accessibility`} component={AccessibilityPage} />
        <Route exact path={`/:locale/event/new`} component={NewEventPage} />
        <Route exact path={`/:locale/event/submitted`} component={SubmittedPage} />
        <Route path={`/:locale/admin`} component={AdminRoutes} />
      </Switch>
    </IntlProvider>
  );
};

export default App;
