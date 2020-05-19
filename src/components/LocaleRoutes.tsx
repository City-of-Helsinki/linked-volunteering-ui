import React from 'react';
import { Switch, Route } from 'react-router';

import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import Error404Page from './pages/Error404Page';
import NewEventPage from './pages/events/containers/NewEventPageContainer';
import SubmittedPage from './pages/events/containers/SubmittedPageContainer';

const LocaleRoutes = () => (
  <Switch>
    <Route path={`/:locale/accessibility`} component={AccessibilityPage} />
    <Route exact path={`/:locale/event/new`} component={NewEventPage} />
    <Route exact path={`/:locale/event/submitted`} component={SubmittedPage} />
    <Route component={Error404Page} />
  </Switch>
);

export default LocaleRoutes;
