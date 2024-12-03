import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mockUserCreator } from '../../../../../test-utils/mocks/user';
import { createStore } from '../../../../../store/configureStore';
import * as useAuthMock from '../../../../../hooks/useAuth';
import renderWithProviders from '../../../../../test-utils/renderWithProviders';
import NewEventPageContainer from '../NewEventPageContainer';

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
      <NewEventPageContainer />
    </BrowserRouter>,
    { store },
  );
};

describe('<NewEventPageContainer />', () => {
  it('renders correctly', async () => {
    renderComponent();
  });
});
