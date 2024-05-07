import React from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { compose, branch, renderComponent } from 'recompose';

import { isOfficialSelector, isContractorSelector } from '../ducks/auth';

import Error404Page from './pages/Error404Page';
import ManageEventsPage from './pages/events/containers/ManageEventsPageContainer';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import ReportPage from './pages/containers/ReportPageContainer';
import AccessDeniedPage from './pages/AccessDeniedPage';

const restrictUser = (condition) =>
  compose(
    connect((state) => ({
      isOfficial: isOfficialSelector(state),
      isContractor: isContractorSelector(state),
    })),
    branch(condition, renderComponent(AccessDeniedPage)),
  );

const requireOfficial = restrictUser(({ isOfficial }) => !isOfficial);
const requireUser = restrictUser(({ isContractor, isOfficial }) => !(isContractor || isOfficial));

function AdminRoutes() {
  return (
    <>
      <Route path="/events/manage" component={requireUser(ManageEventsPage)} />
      <Route path="/event/modify/:id" component={requireUser(ModifyEventPage)} />
      <Route path="/report" component={requireOfficial(ReportPage)} />
      <Route component={Error404Page} />
    </>
  );
}

export default AdminRoutes;
