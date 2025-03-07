import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as useAuthMock from '../../../../hooks/useAuth';
import renderWithProviders from '../../../../test-utils/renderWithProviders';
import { mockUserCreator } from '../../../../test-utils/mocks/user';
import ManageEventsPage from '../ManageEventsPage';
import { RootState } from 'store/configureStore';
import eventService from 'store/services/eventService';
import { Event } from '../../../../store/types';
import { Map } from 'immutable';

const mockUser = mockUserCreator();

const initialState = {
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
  contractZones: {
    contractZones: {
      '1': {
        id: 1,
        name: 'Mock Zone',
        active: true,
        contact_person: 'Mock Person',
        email: 'test.test@test.com',
        phone: '+35840000000',
      },
    },
  },
  event: {
    count: 1,
    next: {},
    events: {
      '1': {
        id: 1,
        state: 'waiting_for_approval',
        created_at: new Date('2024-12-04T06:17:08.196Z'),
        modified_at: new Date('2024-12-04T06:17:08.196Z'),
        name: 'Puistotalkoot',
        description: 'Puistotalkoot',
        start_time: new Date('2025-01-15T07:00:00.000Z'),
        end_time: new Date('2025-02-16T07:00:00.000Z'),
        location: {
          type: 'Point',
          coordinates: [24.93931620883691, 60.18799324237526],
        },
        organizer_first_name: 'Etunimi',
        organizer_last_name: 'Sukunimi',
        organizer_email: 'sahko@posti.fi',
        organizer_phone: '1234567',
        estimated_attendee_count: 1,
        targets: '1',
        maintenance_location: 'Tivolikuja 1',
        additional_information: '1',
        small_trash_bag_count: 1,
        large_trash_bag_count: 1,
        trash_picker_count: 1,
        equipment_information: '',
        contract_zone: 1,
      },
    },
    filterByContractZone: null,
    ordering: {
      key: null,
      order: null,
    },
    submittedEvent: null,
  },
};

const renderComponent = (preloadedState?: Partial<RootState>) => {
  jest.spyOn(useAuthMock, 'default').mockImplementation(() => ({
    authenticated: true,
    user: mockUser,
    getApiToken: () => 'mockApiToken',
    login: jest.fn(),
    logout: jest.fn(),
  }));

  return renderWithProviders(
    <BrowserRouter>
      <ManageEventsPage />
    </BrowserRouter>,
    { preloadedState: preloadedState || initialState },
  );
};

describe('<ManageEventsPage />', () => {
  it('renders correctly', async () => {
    renderComponent();

    await waitFor(() => expect(screen.getByRole('table').children[1].children).toHaveLength(1));
    await waitFor(() => expect(screen.queryByTestId('next-page')).not.toBeInTheDocument());
  });

  it('should show the next page button when there are more events', async () => {
    const state = {
      ...initialState,
      event: {
        ...initialState.event,
        count: 2,
        next: {
          limit: 1,
          offset: 1,
        },
      },
    };

    renderComponent(state);

    await waitFor(() => expect(screen.getByTestId('next-page')).toBeInTheDocument());
  });

  it('should fetch next page of events', async () => {
    const event = {
      id: 2,
      state: 'waiting_for_approval',
      created_at: '2024-12-04T06:17:08.196Z',
      modified_at: '2024-12-04T06:17:08.196Z',
      name: 'Puistotalkoot',
      description: 'Puistotalkoot',
      start_time: '2025-01-15T07:00:00.000Z',
      end_time: '2025-02-16T07:00:00.000Z',
      location: {
        type: 'Point',
        coordinates: [24.93931620883691, 60.18799324237526],
      },
      organizer_first_name: 'Etunimi',
      organizer_last_name: 'Sukunimi',
      organizer_email: 'sahko@posti.fi',
      organizer_phone: '1234567',
      estimated_attendee_count: 1,
      targets: '1',
      maintenance_location: 'Tivolikuja 1',
      additional_information: '1',
      small_trash_bag_count: 1,
      large_trash_bag_count: 1,
      trash_picker_count: 1,
      equipment_information: '',
      contract_zone: 1,
    };

    jest.spyOn(eventService, 'getEvents').mockResolvedValue({
      data: {
        count: 2,
        next: null,
        previous: null,
        results: [event],
      },
      events: Map<string, Event>({
        '2': {
          ...event,
          start_time: new Date(`${event.start_time}`),
          end_time: new Date(`${event.end_time}`),
          created_at: new Date(`${event.created_at}`),
          modified_at: new Date(`${event.modified_at}`),
        },
      }),
    });

    const state = {
      ...initialState,
      event: {
        ...initialState.event,
        count: 2,
        next: {
          limit: 1,
          offset: 1,
        },
      },
    };

    renderComponent(state);

    const nextPageButton = await screen.findByTestId('next-page');

    const user = userEvent.setup();

    await user.click(nextPageButton);

    await waitFor(() => expect(screen.getByRole('table').children[1].children).toHaveLength(2));

    await waitFor(() => expect(screen.queryByTestId('next-page')).not.toBeInTheDocument());
  });

  it('should remove event', async () => {
    renderComponent();

    const extendButton = await screen.findByTestId('toggle-details');

    const user = userEvent.setup();

    await user.click(extendButton);

    const openModalButton = await screen.findByTestId('reject_event_1');

    await user.click(openModalButton);

    const modal = await screen.findByRole('dialog');

    expect(modal).toBeInTheDocument();

    const removeButton = await within(modal).findByText('Yes, delete activity');

    await user.click(removeButton);

    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });
});
