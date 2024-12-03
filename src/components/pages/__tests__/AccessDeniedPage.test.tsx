import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderWithProviders from '../../../test-utils/renderWithProviders';
import AccessDeniedPage from '../AccessDeniedPage';

import { mockUserCreator } from '../../../test-utils/mocks/user';
import * as useAuthMock from '../../../hooks/useAuth';
import { createStore } from '../../../store/configureStore';

const mockUser = mockUserCreator();

const renderComponent = () => {
  const store = createStore();

  jest.spyOn(useAuthMock, 'default').mockImplementation(() => ({
    authenticated: true,
    user: mockUser,
    getApiToken: () => 'mockApiToken',
    login: jest.fn(),
    logout: jest.fn(),
  }));

  return renderWithProviders(
    <BrowserRouter>
      <AccessDeniedPage />
    </BrowserRouter>,
    { store },
  );
};

describe('<AccessDeniedPage />', () => {
  it('renders correctly', async () => {
    renderComponent();
  });
});
