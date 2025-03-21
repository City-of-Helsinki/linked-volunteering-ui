import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { mockUserCreator } from '../../test-utils/mocks/user';
import { createStore } from '../../store/configureStore';
import * as useAuthMock from '../../hooks/useAuth';
import renderWithProviders from '../../test-utils/renderWithProviders';
import App from '../App';

// Setup fetch mock
global.fetch = jest.fn();
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
    const mockResponse = {
      uuid: uuid(),
      first_name: 'Gaylord',
      last_name: 'Lohiposki',
      is_official: true,
      is_contractor: false,
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    renderComponent();
  });
});
