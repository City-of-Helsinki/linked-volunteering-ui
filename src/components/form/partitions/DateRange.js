import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { addDays, addHours } from 'date-fns';
import { injectIntl } from 'react-intl';

import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import sv from 'date-fns/locale/sv';
import DatePicker from '../fields/DatePicker';

import 'react-datepicker/dist/react-datepicker.css';
import './dateRange.scss';

registerLocale('fi', fi);
registerLocale('sv', sv);
setDefaultLocale('fi');

const now = new Date();
const minDate = addDays(now, 8);
const timeIntervals = 30;

class DateTime extends PureComponent {
  onChange = id => value => {
    const { handleChange } = this.props;
    handleChange({
      target: {
        id,
        value
      }
    });
  };

  handleDateChange = (id, oldDate) => value => {
    this.onChange(id)(oldDate ? value : addHours(value, 9));
  };

  onBlur = id => value => {
    const { handleBlur } = this.props;
    handleBlur({
      target: {
        id,
        value
      }
    });
  };

  getDateFormat = locale => {
    switch (locale) {
      case 'en':
        return 'dd/MM/yyyy';
      case 'sv':
      case 'fi':
      default:
        return 'dd.MM.yyyy';
    }
  };

  getTimeFormat = locale => {
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

  render() {
    const {
      errors,
      touched,
      values,
      unavailableDates,
      intl: { formatMessage, locale }
    } = this.props;
    const selectedStartTime = values.start_time;
    const selectedEndTime = values.end_time;
    const dateFormat = this.getDateFormat(locale);
    const timeFormat = this.getTimeFormat(locale);

    return (
      <Fragment>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 1 }} id="date_range_start_date_wrapper">
            <DatePicker
              id="date_range_start_date"
              required
              label="form.event.partitions.date_range.start_date.label"
              placeholder="form.event.partitions.date_range.start_date.placeholder"
              text="form.event.partitions.date_range.start_date.text"
              locale={locale}
              error={errors.start_time}
              touched={touched.start_time}
              onChange={this.handleDateChange('start_time', values.start_time)}
              onBlur={this.onBlur('start_time')}
              highlightDates={[now]}
              selected={selectedStartTime}
              dateFormat={dateFormat}
              minDate={minDate}
              maxDate={values.end_time}
              startDate={values.start_time}
              endDate={values.end_time}
              excludeDates={unavailableDates}
              selectsStart
              showMonthDropdown
              useShortMonthInDropdown
            />
          </Col>
          <Col sm="12" md={{ size: 4 }} id="date_range_end_date_wrapper">
            <DatePicker
              id="date_range_end_date"
              required
              label="form.event.partitions.date_range.end_date.label"
              placeholder="form.event.partitions.date_range.end_date.placeholder"
              locale={locale}
              error={errors.end_time}
              touched={touched.end_time}
              onChange={this.handleDateChange('end_time', values.end_time)}
              onBlur={this.onBlur('end_time')}
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
        </Row>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 1 }}>
            <DatePicker
              required
              id="date_range.start_time"
              label="form.event.partitions.date_range.start_time.label"
              placeholder="form.event.partitions.date_range.start_time.placeholder"
              locale={locale}
              error={errors.start_time}
              touched={touched.start_time}
              onChange={this.onChange('start_time')}
              onBlur={this.onBlur('start_time')}
              selected={values.start_time}
              timeIntervals={timeIntervals}
              dateFormat={timeFormat}
              timeFormat={timeFormat}
              timeCaption={formatMessage({ id: 'form.event.partitions.date_range.timeCaption' })}
              showTimeSelect
              showTimeSelectOnly
            />
          </Col>
          <Col sm="12" md={{ size: 4 }}>
            <DatePicker
              required
              id="date_range.end_time"
              label="form.event.partitions.date_range.end_time.label"
              placeholder="form.event.partitions.date_range.end_time.placeholder"
              locale={locale}
              error={errors.end_time}
              touched={touched.end_time}
              onChange={this.onChange('end_time')}
              onBlur={this.onBlur('end_time')}
              selected={values.end_time}
              timeIntervals={timeIntervals}
              dateFormat={timeFormat}
              timeFormat={timeFormat}
              timeCaption={formatMessage({ id: 'form.event.partitions.date_range.timeCaption' })}
              showTimeSelect
              showTimeSelectOnly
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default injectIntl(DateTime);
