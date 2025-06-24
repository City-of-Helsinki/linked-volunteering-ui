import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from '../../../test-utils/renderWithProviders';
import ErrorPage from '../ErrorPage';
import { createStore } from '../../../store/configureStore';

const renderComponent = (store = createStore()) => {
  return renderWithProviders(
    <BrowserRouter>
      <ErrorPage />
    </BrowserRouter>,
    { store }
  );
};

describe('<ErrorPage />', () => {
  it('renders correctly', async () => {
    renderComponent();
  });
});
