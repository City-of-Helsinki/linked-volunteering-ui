import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import { v4 as uuid } from 'uuid';
import { mockUserCreator } from '../../test-utils/mocks/user';
import * as useAuthMock from '../../hooks/useAuth';
import renderWithProviders from '../../test-utils/renderWithProviders';
import AdminRoutes from '../AdminRoutes';

const mockUser = mockUserCreator();

const renderComponent = (initialEntries = ['/'], preloadedState = {}) => {
  vi.spyOn(useAuthMock, 'default').mockImplementation(() => ({
    authenticated: true,
    user: mockUser,
    getApiToken: () => 'mockApiToken',
    login: vi.fn(),
    logout: vi.fn(),
    loggingOut: false,
  }));

  return renderWithProviders(
    <MemoryRouter initialEntries={initialEntries}>
      <AdminRoutes />
    </MemoryRouter>,
    { preloadedState },
  );
};

describe('<AdminRoutes />', () => {
  it('should navigate to authError', async () => {
    const mockState = {
      auth: {
        currentUserData: {
          uuid: uuid(),
          first_name: 'Gaylord',
          last_name: 'Lohiposki',
          is_official: false,
          is_contractor: false,
        },
        isLoading: false,
      },
    };

    renderComponent(['/events/manage'], mockState);

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Oops, you are lost in the woods!' }),
      ).toBeInTheDocument(),
    );
  });

  it('renders ManageEventsPage for /events/manage route', async () => {
    const mockState = {
      auth: {
        currentUserData: {
          uuid: uuid(),
          first_name: 'Gaylord',
          last_name: 'Lohiposki',
          is_official: true,
          is_contractor: true,
        },
        isLoading: false,
      },
    };

    renderComponent(['/events/manage'], mockState);

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Park volunteer activities' }),
      ).toBeInTheDocument(),
    );
  });

  it('renders ModifyEventPage for /event/modify/:id route', async () => {
    const mockState = {
      auth: {
        currentUserData: {
          uuid: uuid(),
          first_name: 'Gaylord',
          last_name: 'Lohiposki',
          is_official: true,
          is_contractor: true,
        },
        isLoading: false,
      },
      event: {
        events: {
          '1': {
            name: 'Mock event',
          },
        },
      },
    };

    renderComponent(['/event/modify/1'], mockState);

    await waitFor(() =>
      expect(screen.getByRole('heading', { name: 'Edit activity' })).toBeInTheDocument(),
    );
  });

  it('renders ReportPage for /report route', async () => {
    const mockState = {
      auth: {
        currentUserData: {
          uuid: uuid(),
          first_name: 'Gaylord',
          last_name: 'Lohiposki',
          is_official: true,
          is_contractor: false,
        },
        isLoading: false,
      },
    };

    renderComponent(['/report'], mockState);

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Spring cleaning activities' }),
      ).toBeInTheDocument(),
    );
  });
});
