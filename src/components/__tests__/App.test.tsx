import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Mock } from 'vitest';
import { mockUserCreator } from '../../test-utils/mocks/user';
import { createStore } from '../../store/configureStore';
import * as useAuthMock from '../../hooks/useAuth';
import renderWithProviders from '../../test-utils/renderWithProviders';
import App from '../App';

// Setup fetch mock
global.fetch = vi.fn();
const mockUser = mockUserCreator();

const renderComponent = () => {
  const store = createStore();

  vi.spyOn(useAuthMock, 'default').mockImplementation(() => ({
    authenticated: true,
    user: mockUser,
    getApiToken: () => 'mockApiToken',
    login: vi.fn(),
    logout: vi.fn(),
    loggingOut: false,
  }));

  return renderWithProviders(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    { store }
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

    (global.fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    renderComponent();
  });
});
