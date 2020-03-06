import { addDays, addHours, startOfDay } from 'date-fns';
import fi from 'date-fns/locale/fi';
import sv from 'date-fns/locale/sv';
import { FormikValues } from 'formik';
import React, { Fragment } from 'react';
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
const minDate = addDays(now, 8);
const timeIntervals = 30;

interface Target {
  target: {
    id: string;
    value: Date;
  };
}

interface Props {
  errors: any;
  handleBlur: (target: Target) => void;
  handleChange: (target: Target) => void;
  touched: any;
  unavailableDates?: Date[];
  values: FormikValues;
}

const DateRange: React.FC<Props> = ({
  errors,
  handleBlur,
  handleChange,
  touched,
  unavailableDates,
  values
}) => {
  const onChange = (id: string) => (value: Date) => {
    handleChange({
      target: {
        id,
        value
      }
    });
  };

  const handleDateChange = (id: string, oldDate: Date) => (value: Date) => {
    onChange(id)(oldDate ? value : addHours(value, 9));
  };

  const onBlur = (id: string) => (value: any) => {
    handleBlur({
      target: {
        id,
        value
      }
    });
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
  const selectedStartTime = values.start_time;
  const selectedEndTime = values.end_time;
  const dateFormat = getDateFormat(locale);
  const timeFormat = getTimeFormat(locale);

  return (
    <Fragment>
      <Row>
        <Col sm="12" md={{ size: 4, offset: 1 }} id="date_range_start_date_wrapper">
          <DatePicker
            id="date_range_start_date"
            required
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
            maxDate={values.end_time || undefined}
            startDate={values.start_time}
            endDate={values.end_time}
            excludeDates={unavailableDates}
            selectsStart
            showMonthDropdown
            useShortMonthInDropdown
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <TimePicker
            id="date_range.start_time"
            defaultDate={minDate}
            error={errors.start_time}
            label="form.event.partitions.date_range.start_time.label"
            onBlur={onBlur('start_time')}
            onChange={onChange('start_time')}
            placeholder="form.event.partitions.date_range.start_time.placeholder"
            required
            selected={values.start_time}
            timeCaption={formatMessage({ id: 'form.event.partitions.date_range.timeCaption' })}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            touched={!!touched.start_time}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 4, offset: 1 }} id="date_range_end_date_wrapper">
          <DatePicker
            id="date_range_end_date"
            required
            label="form.event.partitions.date_range.end_date.label"
            placeholder="form.event.partitions.date_range.end_date.placeholder"
            locale={locale}
            error={errors.end_time}
            touched={!!touched.end_time}
            onChange={handleDateChange('end_time', values.end_time)}
            onBlur={onBlur('end_time')}
            selected={selectedEndTime}
            dateFormat={dateFormat}
            minDate={values.start_time || minDate}
            startDate={values.start_time}
            endDate={values.end_time}
            excludeDates={unavailableDates}
            selectsEnd
            showMonthDropdown
            useShortMonthInDropdown
          />
        </Col>
        <Col sm="12" md={{ size: 4 }}>
          <TimePicker
            id="date_range.end_time"
            defaultDate={values.start_time || minDate}
            error={errors.end_time}
            label="form.event.partitions.date_range.end_time.label"
            onBlur={onBlur('end_time')}
            onChange={onChange('end_time')}
            placeholder="form.event.partitions.date_range.end_time.placeholder"
            required
            selected={values.end_time}
            timeCaption={formatMessage({ id: 'form.event.partitions.date_range.timeCaption' })}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            touched={!!touched.end_time}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default DateRange;
