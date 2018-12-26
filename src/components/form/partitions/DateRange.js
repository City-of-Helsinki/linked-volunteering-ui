import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import { addWeeks, min, max } from 'date-fns';
import { injectIntl } from 'react-intl';

import { registerLocale, setDefaultLocale } from 'react-datepicker';
import fi from 'date-fns/locale/fi';
import DatePicker from '../fields/DatePicker';

import 'react-datepicker/dist/react-datepicker.css';
import './dateRange.scss';

registerLocale('fi', fi);
setDefaultLocale('fi');

const now = new Date();
const minDate = addWeeks(now, 1);
const dateFormat = 'd.M.yyyy';
const timeFormat = 'HH:mm';
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

  onBlur = id => value => {
    const { handleBlur } = this.props;
    handleBlur({
      target: {
        id,
        value
      }
    });
  };

  render() {
    const {
      errors,
      touched,
      values,
      intl: { formatMessage }
    } = this.props;

    const selectedStartTime = values.start_time;

    const selectedEndTime = values.end_time;
    return (
      <Fragment>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 1 }}>
            <DatePicker
              required
              label="form.event.partitions.date_range.start_date.label"
              placeholder="form.event.partitions.date_range.start_date.placeholder"
              locale="fi"
              error={errors.start_time}
              touched={touched.start_time}
              onChange={this.onChange('start_time')}
              onBlur={this.onBlur('start_time')}
              selected={selectedStartTime}
              dateFormat={dateFormat}
              minDate={minDate}
              maxDate={values.end_time}
              startDate={values.start_time}
              endDate={values.end_time}
              selectsStart
              showMonthDropdown
              useShortMonthInDropdown
            />
          </Col>
          <Col sm="12" md={{ size: 4 }}>
            <DatePicker
              required
              label="form.event.partitions.date_range.end_date.label"
              placeholder="form.event.partitions.date_range.end_date.placeholder"
              locale="fi"
              error={errors.end_time}
              touched={touched.end_time}
              onChange={this.onChange('end_time')}
              onBlur={this.onBlur('end_time')}
              selected={selectedEndTime}
              dateFormat={dateFormat}
              minDate={values.start_time || minDate}
              startDate={values.start_time}
              endDate={values.end_time}
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
              label="form.event.partitions.date_range.start_time.label"
              placeholder="form.event.partitions.date_range.start_time.placeholder"
              locale="fi"
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
              label="form.event.partitions.date_range.end_time.label"
              placeholder="form.event.partitions.date_range.end_time.placeholder"
              locale="fi"
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
