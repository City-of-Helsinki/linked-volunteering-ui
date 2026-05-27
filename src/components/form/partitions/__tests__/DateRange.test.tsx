import React from 'react';
import { addDays, setHours, startOfDay, format } from 'date-fns';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { vi } from 'vitest';

import DateRange from '../DateRange';
import formatTime from '../../../../utils/formatTime';

const datePickerMock = vi.fn();
const timePickerMock = vi.fn();
const printValueMock = vi.fn();

vi.mock('../../fields/DatePicker', () => ({
  default: (props: Record<string, unknown>) => {
    datePickerMock(props);
    return (
      <div
        data-testid={String(props.id)}
        data-exclude-count={
          Array.isArray(props.excludeDates) ? props.excludeDates.length : 0
        }
      />
    );
  },
}));

vi.mock('../../fields/timePicker/TimePicker', () => ({
  default: (props: Record<string, unknown>) => {
    timePickerMock(props);
    return <div data-testid={String(props.id)} />;
  },
}));

vi.mock('../../fields/PrintValue', () => ({
  default: (props: Record<string, unknown>) => {
    printValueMock(props);
    return <div data-testid="print-value" data-value={String(props.value)} />;
  },
}));

const renderComponent = () => {
  const startTime = setHours(addDays(startOfDay(new Date()), 8), 9);
  const endTime = setHours(addDays(startOfDay(new Date()), 10), 17);
  const unavailableDates = [addDays(startOfDay(new Date()), 12)];

  return render(
    <IntlProvider
      locale="en"
      messages={{
        'form.event.partitions.date_range.dayAriaLabelPrefix': 'Day',
        'form.event.partitions.date_range.timeCaption': 'Time',
      }}
    >
      <DateRange
        errors={{} as never}
        handleBlur={vi.fn()}
        handleChange={vi.fn()}
        touched={{} as never}
        unavailableDates={unavailableDates}
        values={
          {
            start_time: startTime,
            end_time: endTime,
          } as never
        }
      />
    </IntlProvider>
  );
};

describe('<DateRange />', () => {
  it('keeps unavailable dates blocked and renders print-only date and time mirrors', () => {
    datePickerMock.mockClear();
    timePickerMock.mockClear();
    printValueMock.mockClear();

    const { container } = renderComponent();

    const startPickerProps = datePickerMock.mock.calls[0][0] as {
      excludeDates?: Date[];
      id: string;
    };
    const endPickerProps = datePickerMock.mock.calls[1][0] as {
      excludeDates?: Date[];
      id: string;
    };

    expect(screen.getByTestId('date_range_start_date')).toBeInTheDocument();
    expect(screen.getByTestId('date_range_end_date')).toBeInTheDocument();
    expect(startPickerProps.id).toBe('date_range_start_date');
    expect(endPickerProps.id).toBe('date_range_end_date');
    expect(startPickerProps.excludeDates).toHaveLength(1);
    expect(endPickerProps.excludeDates).toHaveLength(1);

    const expectedStartDate = format(
      setHours(addDays(startOfDay(new Date()), 8), 9),
      'dd/MM/yyyy'
    );
    const expectedStartTime = formatTime(
      setHours(addDays(startOfDay(new Date()), 8), 9),
      'h:mm a',
      'en'
    );
    const expectedEndDate = format(
      setHours(addDays(startOfDay(new Date()), 10), 17),
      'dd/MM/yyyy'
    );
    const expectedEndTime = formatTime(
      setHours(addDays(startOfDay(new Date()), 10), 17),
      'h:mm a',
      'en'
    );

    expect(screen.getAllByTestId('print-value')).toHaveLength(4);
    expect(container.querySelectorAll('.printable')).toHaveLength(1);
    expect(printValueMock.mock.calls[0][0]).toMatchObject({
      value: expectedStartDate,
    });
    expect(printValueMock.mock.calls[1][0]).toMatchObject({
      value: expectedStartTime,
    });
    expect(printValueMock.mock.calls[2][0]).toMatchObject({
      value: expectedEndDate,
    });
    expect(printValueMock.mock.calls[3][0]).toMatchObject({
      value: expectedEndTime,
    });
  });
});
