import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { isOfficialSelector, isContractorSelector } from '../ducks/auth';

import ManageEventsPage from './pages/events/containers/ManageEventsPageContainer';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import ReportPage from './pages/containers/ReportPageContainer';
import AccessDeniedPage from './pages/AccessDeniedPage';

const restrictUser = condition =>
  compose(
    connect(state => ({
      isOfficial: isOfficialSelector(state),
      isContractor: isContractorSelector(state)
    })),
    branch(condition, renderComponent(AccessDeniedPage))
  );

const requireOfficial = restrictUser(({ isOfficial }) => !isOfficial);
const requireUser = restrictUser(({ isContractor, isOfficial }) => !(isContractor || isOfficial));

const AdminRoutes = props => (
  <Switch>
    <Route path={`${props.match.path}/events/manage`} component={requireUser(ManageEventsPage)} />
    <Route path={`${props.match.path}/event/modify/:id`} component={requireUser(ModifyEventPage)} />
    <Route path={`${props.match.path}/report`} component={requireOfficial(ReportPage)} />
  </Switch>
);

export default AdminRoutes;
