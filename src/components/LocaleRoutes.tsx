import React from 'react';
import { Route, Routes } from 'react-router';

import AccessibilityPage from './pages/accessibility/AccessibilityPage';
import Error404Page from './pages/Error404Page';
import NewEventPage from './pages/events/containers/NewEventPageContainer';
import SubmittedPage from './pages/events/containers/SubmittedPageContainer';

function LocaleRoutes() {
  return (
    <Routes>
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/event/new" element={<NewEventPage />} />
      <Route path="/event/submitted" element={<SubmittedPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
}

export default LocaleRoutes;
