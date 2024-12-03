import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../Login';
import renderWithProviders from '../../../test-utils/renderWithProviders';
import useAuth from '../../../hooks/useAuth';

jest.mock('../../../hooks/useAuth');

const renderComponent = () => {
  return renderWithProviders(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
};

describe('<Login />', () => {
  it('calls OIDC login', async () => {
    const loginMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({ login: loginMock });

    renderComponent();

    expect(loginMock).toHaveBeenCalled();
  });
});
