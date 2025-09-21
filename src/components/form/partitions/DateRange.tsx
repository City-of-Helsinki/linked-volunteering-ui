import { addMonths, addDays, addHours, setHours, startOfDay } from 'date-fns';
import fi from 'date-fns/locale/fi';
import sv from 'date-fns/locale/sv';
import { FormikErrors, FormikTouched } from 'formik';
import React from 'react';
import { Event } from '../../../store/types';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useIntl } from 'react-intl';
import { Row, Col } from 'reactstrap';

import DatePicker from '../fields/DatePicker';
import TimePicker from '../fields/timePicker/TimePicker';

import 'react-datepicker/dist/react-datepicker.css';
import './dateRange.scss';

registerLocale('fi', fi);
registerLocale('sv', sv);
setDefaultLocale('fi');

const now = startOfDay(new Date());
const minDate = addDays(now, 7);
const maxDateFromToday = addMonths(now, 3);
const timeIntervals = 30;
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

  const getDateFormat = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'dd/MM/yyyy';
      case 'sv':
      case 'fi':
      default:
        return 'dd.MM.yyyy';
    }
  };

  const getTimeFormat = (locale: string) => {
    switch (locale) {
      case 'en':
        return 'h:mm a';
      case 'sv':
        return 'HH:mm';
      case 'fi':
      default:
        return 'HH.mm';
    }
  };
  const intl = useIntl();
  const { formatMessage, locale } = intl;
  const selectedStartTime = ensureDate(values.start_time);
  const selectedEndTime = ensureDate(values.end_time);
  const dateFormat = getDateFormat(locale);
  const timeFormat = getTimeFormat(locale);

  return (
    <>
      <Row>
        <Col
          sm="12"
          md={{ size: 4, offset: 1 }}
          id="date_range_start_date_wrapper"
        >
          <DatePicker
            id="date_range_start_date"
            // @ts-ignore
            chooseDayAriaLabelPrefix={formatMessage({
              id: 'form.event.partitions.date_range.dayAriaLabelPrefix',
            })}
            label="form.event.partitions.date_range.start_date.label"
            placeholder="form.event.partitions.date_range.start_date.placeholder"
            locale={locale}
            error={errors.start_time}
            touched={!!touched.start_time}
            onChange={handleDateChange('start_time', values.start_time)}
            onBlur={onBlur('start_time')}
            highlightDates={[now]}
            selected={selectedStartTime}
            dateFormat={dateFormat}
            minDate={minDate}
            maxDate={ensureDate(values.end_time) || maxDateFromToday}
            startDate={selectedStartTime}
            endDate={selectedEndTime}
            excludeDates={unavailableDates}
            selectsStart
            showMonthDropdown
            useShortMonthInDropdown
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <TimePicker
            id="date_range_start_time"
            defaultDate={minDate}
            error={errors.start_time}
            label="form.event.partitions.date_range.start_time.label"
            onChange={onChange('start_time')}
            placeholder="form.event.partitions.date_range.start_time.placeholder"
            selected={selectedStartTime}
            timeCaption={formatMessage({
              id: 'form.event.partitions.date_range.timeCaption',
            })}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            touched={!!touched.start_time}
          />
        </Col>
      </Row>
      <Row>
        <Col
          sm="12"
          md={{ size: 4, offset: 1 }}
          id="date_range_end_date_wrapper"
        >
          <DatePicker
            id="date_range_end_date"
            // @ts-ignore
            chooseDayAriaLabelPrefix={formatMessage({
              id: 'form.event.partitions.date_range.dayAriaLabelPrefix',
            })}
            label="form.event.partitions.date_range.end_date.label"
            placeholder="form.event.partitions.date_range.end_date.placeholder"
            locale={locale}
            error={errors.end_time}
            touched={!!touched.end_time}
            onChange={handleDateChange('end_time', values.end_time)}
            onBlur={onBlur('end_time')}
            selected={selectedEndTime}
            dateFormat={dateFormat}
            minDate={ensureDate(values.start_time) || minDate}
            maxDate={selectedStartTime ? addDays(selectedStartTime, maxDateDelta) : null}
            startDate={selectedStartTime}
            endDate={selectedEndTime}
            excludeDates={unavailableDates}
            selectsEnd
            showMonthDropdown
            useShortMonthInDropdown
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <TimePicker
            id="date_range_end_time"
            defaultDate={ensureDate(values.start_time) || minDate}
            error={errors.end_time}
            label="form.event.partitions.date_range.end_time.label"
            onChange={onChange('end_time')}
            placeholder="form.event.partitions.date_range.end_time.placeholder"
            selected={selectedEndTime}
            timeCaption={formatMessage({
              id: 'form.event.partitions.date_range.timeCaption',
            })}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            touched={!!touched.end_time}
          />
        </Col>
      </Row>
    </>
  );
};

export default DateRange;
