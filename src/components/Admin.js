import React from 'react';
import { Switch, Route } from 'react-router';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { isOfficialSelector, isContractorSelector } from '../ducks/auth';

import ManageEventsPage from './pages/events/containers/ManageEventsPageContainer';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import ReportPage from './pages/containers/ReportPageContainer';
import ErrorPage from './pages/containers/ErrorPageContainer';

const restrictUser = condition =>
  compose(
    connect(state => ({
      isOfficial: isOfficialSelector(state),
      isContractor: isContractorSelector(state)
    })),
    branch(condition, renderComponent(ErrorPage))
  );

const requireOfficial = restrictUser(({ isOfficial }) => !isOfficial);
const requireUser = restrictUser(({ isContractor, isOfficial }) => !(isContractor || isOfficial));

const AdminRoutes = props => (
  <Switch>
    <Route
      path={`${props.match.path}/events/manage`}
      component={requireOfficial(ManageEventsPage)}
    />
    <Route
      path={`${props.match.path}/event/modify/:id`}
      component={requireOfficial(ModifyEventPage)}
    />
    <Route path={`${props.match.path}/report`} component={requireUser(ReportPage)} />
  </Switch>
);

export default AdminRoutes;
