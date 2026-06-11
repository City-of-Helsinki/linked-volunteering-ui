import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { vi } from 'vitest';

import EventForm from '../EventForm';

vi.mock('../../../store/hooks', () => ({
  useAppSelector: (selector: unknown) => {
    if (typeof selector === 'function') {
      return selector({
        geo: {
          addressCoordinates: null,
          selectedAddress: null,
          selectedContractZone: { id: 1 },
          unavailableDates: [],
        },
      });
    }

    return undefined;
  },
}));

vi.mock('../fields/Input', () => ({
  default: (props: Record<string, unknown>) => (
    <div data-testid={String(props.id)} />
  ),
}));

vi.mock('../fields/NumericInput', () => ({
  default: (props: Record<string, unknown>) => (
    <div data-testid={String(props.id)} />
  ),
}));

vi.mock('../partitions/DateRange', () => ({
  default: () => <div data-testid="date-range" />,
}));

vi.mock('../partitions/Location', () => ({
  default: () => <div data-testid="location" />,
}));

const renderComponent = (additionalInformation: string) =>
  render(
    <IntlProvider
      locale="fi"
      messages={{
        'form.event.title.name_and_description': 'Tapahtuman perustiedot',
        'form.event.title.time': 'Aika',
        'form.event.title.contact_person': 'Yhteyshenkilö',
        'form.event.title.tools_and_suplies': 'Työkalut ja tarvikkeet',
        'form.event.subtitle.time':
          'Tapahtuman alkamispäivä voi olla tästä päivästä viikko eteenpäin.',
        'form.event.subtitle.contact_person':
          'Järjestäjän yhteystiedot tarvitaan urakoitsijoita varten.',
        'form.event.subtitle.tools_and_suplies':
          'Ilmoita tarvittavat työkalut. Urakoitsijat hoitavat oikean määrän tarvikkeita paikan päälle.',
      }}
    >
      <EventForm
        errors={{} as never}
        handleBlur={vi.fn()}
        handleChange={vi.fn()}
        handleSubmit={vi.fn()}
        touched={{} as never}
        values={
          {
            name: '',
            description: '',
            estimated_attendee_count: undefined,
            targets: '',
            location: undefined,
            organizer_first_name: '',
            organizer_last_name: '',
            organizer_email: '',
            organizer_phone: '',
            large_trash_bag_count: undefined,
            small_trash_bag_count: undefined,
            trash_picker_count: undefined,
            maintenance_location: '',
            additional_information: additionalInformation,
            start_time: '',
            end_time: '',
          } as never
        }
      />
    </IntlProvider>
  );

describe('<EventForm />', () => {
  it('renders additional information as a printable field when populated', () => {
    const { container } = renderComponent('Muita lisätietoja toimitukselle');

    const additionalInformation = container.querySelector(
      '[data-testid="additional_information"]'
    );

    expect(additionalInformation).toBeInTheDocument();
    expect(
      additionalInformation?.closest('.event-form-print-note')
    ).toBeInTheDocument();
    expect(
      additionalInformation?.closest('.event-form-print-skip')
    ).not.toBeInTheDocument();
    expect(
      additionalInformation?.closest('.event-form-print-note--empty')
    ).not.toBeInTheDocument();
  });

  it('hides empty additional information from the printable layout', () => {
    const { container } = renderComponent('');

    expect(
      container.querySelector('[data-testid="additional_information"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('.event-form-print-note--empty')
    ).toBeInTheDocument();
  });
});
