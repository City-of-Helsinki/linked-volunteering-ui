import React from 'react';
import { waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockUserCreator } from '../../../../../test-utils/mocks/user';
import { createStore, RootState } from '../../../../../store/configureStore';
import * as useAuthMock from '../../../../../hooks/useAuth';
import renderWithProviders from '../../../../../test-utils/renderWithProviders';
import NewEventPageContainer from '../NewEventPageContainer';

const mockUser = mockUserCreator();

/** Simulates leftover geo after visiting another screen (regression: stale address on new event form). */
const staleGeoState: RootState['geo'] = {
  addressCoordinates: {
    type: 'FeatureCollection',
    features: [],
    properties: {},
  },
  geoData: {
    closest_address: {
      street: { name: { fi: 'Vanha tie' } },
      distance: 0,
      number: '1',
      number_end: '',
      letter: '',
      location: { type: 'Point', coordinates: [25.0, 60.0] },
    },
    contract_zone: { id: 99, name: 'Stale zone' },
  },
};

const emptyGeoState: RootState['geo'] = {
  addressCoordinates: null,
  geoData: null,
};

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
      <NewEventPageContainer />
    </BrowserRouter>,
    { store }
  );
};

describe('<NewEventPageContainer />', () => {
  it('renders correctly', async () => {
    renderComponent();
  });

  it('resets geo slice on mount so a new form does not inherit a previous address', async () => {
    vi.spyOn(useAuthMock, 'default').mockImplementation(() => ({
      authenticated: true,
      user: mockUser,
      getApiToken: () => 'mockApiToken',
      login: vi.fn(),
      logout: vi.fn(),
      loggingOut: false,
    }));

    const store = createStore({ geo: staleGeoState });
    expect(store.getState().geo).toEqual(staleGeoState);

    renderWithProviders(
      <BrowserRouter>
        <NewEventPageContainer />
      </BrowserRouter>,
      { store }
    );

    await waitFor(() => {
      expect(store.getState().geo).toEqual(emptyGeoState);
    });
  });
});
