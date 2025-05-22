import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { LoadingSpinner } from 'hds-react';
import Error404Page from './pages/Error404Page';
import ManageEventsPage from './pages/events/ManageEventsPage';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import ReportPage from './pages/ReportPage';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import { isContractorSelector, isOfficialSelector, userLoadingSelector } from '../store/reducers/auth';

const RequireUserComponent = ({ Page }: { Page: React.ComponentType }) => {
  const isOfficial = useAppSelector(isOfficialSelector);
  const isContractor = useAppSelector(isContractorSelector);

  if (!(isOfficial || isContractor)) {
    return <Navigate to='/authError' replace />;
  }

  return <Page />;
};

const RequireOfficialComponent = ({ Page }: { Page: React.ComponentType }) => {
  const isOfficial = useAppSelector(isOfficialSelector);

  if (!isOfficial) {
    return <Navigate to='/authError' replace />;
  }

  return <Page />;
};

function AdminRoutes() {
  const { authenticated, loggingOut } = useAuth();

  const userLoading = useAppSelector(userLoadingSelector);

  if (!authenticated) {
    if (loggingOut) {
      return <Navigate to='/' replace />;
    }

    return <Navigate to='/authError' replace />;
  }

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path='/events/manage' element={<RequireUserComponent Page={ManageEventsPage} />} />
      <Route path='/event/modify/:id' element={<RequireUserComponent Page={ModifyEventPage} />} />
      <Route path='/report' element={<RequireOfficialComponent Page={ReportPage} />} />
      <Route path='*' element={<Error404Page />} />
    </Routes>
  );
}

export default AdminRoutes;
