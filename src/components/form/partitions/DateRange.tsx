import { addMonths, addDays, addHours, setHours, startOfDay } from 'date-fns';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { Event } from '../../../store/types';
import { Row, Col } from 'reactstrap';

import HDSDatePicker from '../fields/HDSDatePicker';
import HDSTimePicker from '../fields/HDSTimePicker';

import './dateRange.scss';

const now = startOfDay(new Date());
const minDate = addDays(now, 7);
const maxDateFromToday = addMonths(now, 3);
const maxDateDelta = 7;

interface EventWithDateObjects extends Omit<Event, 'start_time' | 'end_time'> {
  start_time: Date | string;
  end_time: Date | string;
}

interface Props {
  errors: FormikErrors<Event>;
  handleBlur: (_event: React.FormEvent<HTMLElement>) => void;
  handleChange: (
    event:
      | { target: { id: string; value: unknown } }
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
  ) => void;
  touched: FormikTouched<Event>;
  unavailableDates?: Date[];
  values: EventWithDateObjects;
}

const DateRange: React.FC<Props> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  unavailableDates,
  values,
}) => {
  const onChange = (id: string) => (value: Date) => {
    handleChange({
      target: {
        id,
        value,
      },
    });
  };

  const isDate = (value: unknown): value is Date =>
    value instanceof Date && !isNaN(value.getTime());

  const ensureDate = (value: string | Date | undefined): Date | undefined => {
    if (!value) return undefined;
    if (isDate(value)) return value;

    const date = new Date(value.toString());

    return isNaN(date.getTime()) ? undefined : date;
  };

  const handleDateChange =
    (id: string, oldDate: Date | string | undefined) => (value: Date) => {
      const oldDateObj = ensureDate(oldDate);
      onChange(id)(
        oldDateObj ? setHours(value, oldDateObj.getHours()) : addHours(value, 9)
      );
    };

  const onBlur = (id: string) => (_: unknown) => {
    const syntheticEvent = {
      currentTarget: { id },
      preventDefault: () => {},
    } as React.FormEvent<HTMLElement>;

    handleBlur(syntheticEvent);
  };

  const selectedStartTime = ensureDate(values.start_time);
  const selectedEndTime = ensureDate(values.end_time);

  return (
    <>
      <Row>
        <Col
          sm="12"
          md={{ size: 4, offset: 1 }}
          id="date_range_start_date_wrapper"
        >
          <HDSDatePicker
            id="date_range_start_date"
            label="form.event.partitions.date_range.start_date.label"
            placeholder="form.event.partitions.date_range.start_date.placeholder"
            error={errors.start_time}
            touched={!!touched.start_time}
            value={selectedStartTime}
            onChange={handleDateChange('start_time', values.start_time)}
            onBlur={onBlur('start_time')}
            minDate={minDate}
            maxDate={ensureDate(values.end_time) || maxDateFromToday}
            isDateDisabledBy={(date) =>
              unavailableDates?.some(
                (unavailableDate) =>
                  unavailableDate.toDateString() === date.toDateString()
              ) || false
            }
            required
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <HDSTimePicker
            id="date_range_start_time"
            error={errors.start_time}
            label="form.event.partitions.date_range.start_time.label"
            placeholder="form.event.partitions.date_range.start_time.placeholder"
            value={selectedStartTime}
            onChange={onChange('start_time')}
            onBlur={onBlur('start_time')}
            touched={!!touched.start_time}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col
          sm="12"
          md={{ size: 4, offset: 1 }}
          id="date_range_end_date_wrapper"
        >
          <HDSDatePicker
            id="date_range_end_date"
            label="form.event.partitions.date_range.end_date.label"
            placeholder="form.event.partitions.date_range.end_date.placeholder"
            error={errors.end_time}
            touched={!!touched.end_time}
            value={selectedEndTime}
            onChange={handleDateChange('end_time', values.end_time)}
            onBlur={onBlur('end_time')}
            minDate={ensureDate(values.start_time) || minDate}
            maxDate={
              selectedStartTime
                ? addDays(selectedStartTime, maxDateDelta)
                : undefined
            }
            isDateDisabledBy={(date) =>
              unavailableDates?.some(
                (unavailableDate) =>
                  unavailableDate.toDateString() === date.toDateString()
              ) || false
            }
            required
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <HDSTimePicker
            id="date_range_end_time"
            error={errors.end_time}
            label="form.event.partitions.date_range.end_time.label"
            placeholder="form.event.partitions.date_range.end_time.placeholder"
            value={selectedEndTime}
            onChange={onChange('end_time')}
            onBlur={onBlur('end_time')}
            touched={!!touched.end_time}
            required
          />
        </Col>
      </Row>
    </>
  );
};

export default DateRange;
