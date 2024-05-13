import React from 'react';
import { Route, Routes } from 'react-router';
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
    <Routes>
      <Route path="/events/manage" Component={requireUser(ManageEventsPage)} />
      <Route path="/event/modify/:id" Component={requireUser(ModifyEventPage)} />
      <Route path="/report" Component={requireOfficial(ReportPage)} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default AdminRoutes;
