import '@babel/polyfill';
import React from 'react';
import { Switch, Route } from 'react-router';

import ManageEventsPage from './pages/events/containers/ManageEventsPageContainer';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import ReportPage from './pages/containers/ReportPageContainer';

const AdminRoutes = props => (
  <Switch>
    <Route path={`${props.match.path}/events/manage`} component={ManageEventsPage} />
    <Route path={`${props.match.path}/event/modify/:id`} component={ModifyEventPage} />
    <Route path={`${props.match.path}/report`} component={ReportPage} />
  </Switch>
);

export default AdminRoutes;
