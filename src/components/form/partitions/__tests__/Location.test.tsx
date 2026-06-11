import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { vi } from 'vitest';

import Location from '../Location';

vi.mock('../../../../store/hooks', () => ({
  useAppDispatch: () => vi.fn(),
}));

vi.mock('../../../../hooks/useAuth', () => ({
  default: () => ({
    getApiToken: () => 'mock-token',
  }),
}));

vi.mock('../../fields/Map', () => ({
  default: () => <div data-testid="map" />,
}));

vi.mock('../../fields/AutoSuggest', () => ({
  default: () => <div data-testid="autosuggest" />,
}));

vi.mock('../../fields/Input', () => ({
  default: (props: Record<string, unknown>) => (
    <div data-testid={String(props.id)} />
  ),
}));

vi.mock('../../fields/Label', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderComponent = () =>
  render(
    <IntlProvider
      locale="fi"
      messages={{
        'form.event.field.trash_location.placeholder':
          'Lisätietoja tarvikkeiden toimittamiseen (valinnainen)',
      }}
    >
      <Location
        addressFeatures={[]}
        errors={{} as never}
        handleBlur={vi.fn()}
        handleChange={vi.fn()}
        selectedAddress={undefined}
        selectedContractZone={undefined}
        touched={{} as never}
        values={
          {
            maintenance_location: 'Tivolikuja 1',
          } as never
        }
      />
    </IntlProvider>
  );

describe('<Location />', () => {
  it('renders a printable label for delivery notes', () => {
    const { container } = renderComponent();

    expect(
      container.querySelector('.print-only')
    ).toHaveTextContent('Lisätietoja tarvikkeiden toimittamiseen (valinnainen)');
  });
});
