import React from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as useAuthMock from '../../../hooks/useAuth';
import renderWithProviders from '../../../test-utils/renderWithProviders';
import Layout from '../Layout';

const renderComponent = () => {
  vi.spyOn(useAuthMock, 'default').mockImplementation(() => ({
    authenticated: false,
    user: null,
    getApiToken: () => undefined,
    login: vi.fn(),
    logout: vi.fn(),
    loggingOut: false,
  }));

  return renderWithProviders(
    <MemoryRouter initialEntries={['/en/']}>
      <Routes>
        <Route
          path="/en/"
          element={
            <Layout>
              <h1>First page</h1>
              <Link to="/en/second">Go to second page</Link>
            </Layout>
          }
        />
        <Route
          path="/en/second"
          element={
            <Layout>
              <h1>Second page</h1>
            </Layout>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('<Layout />', () => {
  it('moves focus to the heading of the new page after a page change', async () => {
    renderComponent();

    await userEvent.click(
      screen.getByRole('link', { name: 'Go to second page' })
    );

    expect(screen.getByRole('heading', { name: 'Second page' })).toHaveFocus();
  });

  it('renders the content as the main landmark', () => {
    renderComponent();

    expect(screen.getByRole('main')).toContainElement(
      screen.getByRole('heading', { name: 'First page' })
    );
  });

  it('does not move focus on the first page', () => {
    renderComponent();

    expect(document.body).toHaveFocus();
  });
});
