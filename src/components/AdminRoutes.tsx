import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { LoadingSpinner } from 'hds-react';
import Error404Page from './pages/Error404Page';
import ManageEventsPage from './pages/events/ManageEventsPage';
import ModifyEventPage from './pages/events/containers/ModifyEventPageContainer';
import ReportPage from './pages/ReportPage';
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../store/hooks';
import {
  isContractorSelector,
  isOfficialSelector,
  userLoadingSelector,
} from '../store/reducers/auth';

const RequireUserComponent = ({ Page }: { Page: React.ComponentType }) => {
  const isOfficial = useAppSelector(isOfficialSelector);
  const isContractor = useAppSelector(isContractorSelector);

  if (!isOfficial || !isContractor) {
    return <Navigate to="/authError" replace />;
  }

  return <Page />;
};

const RequireOfficialComponent = ({ Page }: { Page: React.ComponentType }) => {
  const isOfficial = useAppSelector(isOfficialSelector);

  if (!isOfficial) {
    return <Navigate to="/authError" replace />;
  }

  return <Page />;
};

function AdminRoutes() {
  const [userLoaded, setUserLoaded] = useState(false);

  const { authenticated } = useAuth();

  const userLoading = useAppSelector(userLoadingSelector);
  const isOfficial = useAppSelector(isOfficialSelector);
  const isContractor = useAppSelector(isContractorSelector);

  useEffect(() => {
    if ((!userLoading && Boolean(isOfficial)) || Boolean(isContractor)) {
      setUserLoaded(true);
    }
  }, [userLoading, isOfficial, isContractor]);

  if (!authenticated) {
    return <Navigate to="/authError" replace />;
  }

  if (!userLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/events/manage" element={<RequireUserComponent Page={ManageEventsPage} />} />
      <Route path="/event/modify/:id" element={<RequireUserComponent Page={ModifyEventPage} />} />
      <Route path="/report" element={<RequireOfficialComponent Page={ReportPage} />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default AdminRoutes;
