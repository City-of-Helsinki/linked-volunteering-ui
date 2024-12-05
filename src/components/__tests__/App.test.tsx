import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { mockUserCreator } from '../../test-utils/mocks/user';
import { createStore } from '../../store/configureStore';
import * as useAuthMock from '../../hooks/useAuth';
import renderWithProviders from '../../test-utils/renderWithProviders';
import App from '../App';

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
      <App />
    </BrowserRouter>,
    { store },
  );
};

describe('<App />', () => {
  it('renders correctly', async () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        uuid: uuid(),
        first_name: 'Gaylord',
        last_name: 'Lohiposki',
        is_official: true,
        is_contractor: false,
      },
    });

    renderComponent();
  });
});
