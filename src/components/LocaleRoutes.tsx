import React from 'react';
import { Route, Routes } from 'react-router';

import { LoadingSpinner } from 'hds-react';
import Error404Page from './pages/Error404Page';

const AccessibilityPage = React.lazy(() => import('./pages/accessibility/AccessibilityPage'));
const NewEventPage = React.lazy(() => import('./pages/events/containers/NewEventPageContainer'));
const SubmittedPage = React.lazy(() => import('./pages/events/containers/SubmittedPageContainer'));

function LocaleRoutes() {
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/accessibility' element={<AccessibilityPage />} />
        <Route path='/event/new' element={<NewEventPage />} />
        <Route path='/event/submitted' element={<SubmittedPage />} />
        <Route path='*' element={<Error404Page />} />
      </Routes>
    </React.Suspense>
  );
}

export default LocaleRoutes;
