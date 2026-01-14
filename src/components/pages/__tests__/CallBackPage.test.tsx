import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginProvider, LoginProviderProps } from 'hds-react';
import CallBackPage from '../CallBackPage';

// Mock navigate function
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actualReactRouterDom = await vi.importActual('react-router-dom');
  return {
    ...actualReactRouterDom,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('hds-react', async () => {
  // Get the original module to keep other functionalities intact
  const actualHdsReact = await vi.importActual('hds-react');

  return {
    ...actualHdsReact, // Spread the original implementation
    LoginCallbackHandler: ({
      onSuccess,
      onError,
    }: {
      onSuccess: (data: { profile: { name: string } }) => void;
      onError: (error?: { message: string }) => void;
    }) => (
      <div>
        <button
          type="button"
          onClick={() => onSuccess({ profile: { name: 'Test User' } })}
        >
          Trigger Success
        </button>
        <button
          type="button"
          onClick={() => onError({ message: 'Some error' })}
        >
          Trigger Error
        </button>
        <div>oidc.authenticating</div>
      </div>
    ),
    getApiTokensFromStorage: vi.fn(() => ({ foo: 'bar' })),
  };
});

const providerProperties: LoginProviderProps = {
  userManagerSettings: {},
};

const renderComponent = () => {
  return render(
    <LoginProvider {...providerProperties}>
      <BrowserRouter>
        <CallBackPage />
      </BrowserRouter>
    </LoginProvider>
  );
};

describe('<CallbackPage />', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles successful login', async () => {
    renderComponent();

    // Simulate the success callback
    const successButton = screen.getByText('Trigger Success');

    const user = userEvent.setup();

    await user.click(successButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });

  it('handles error during login', async () => {
    renderComponent();

    // Simulate the error callback
    const errorButton = screen.getByText('Trigger Error');

    const user = userEvent.setup();

    await user.click(errorButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
  });
});
