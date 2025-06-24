import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Mock } from 'vitest';
import Login from '../../Login';
import renderWithProviders from '../../../test-utils/renderWithProviders';
import useAuth from '../../../hooks/useAuth';

vi.mock('../../../hooks/useAuth');

const renderComponent = () => {
  return renderWithProviders(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('<Login />', () => {
  it('calls OIDC login', async () => {
    const loginMock = vi.fn();

    (useAuth as Mock).mockReturnValue({ login: loginMock });

    renderComponent();

    expect(loginMock).toHaveBeenCalled();
  });
});
