import React from 'react';
import DatePicker from 'react-datepicker';
import Input from './Input';

const DatePickerField = ({ id, label, required, error, touched, text, placeholder, ...rest }) => (
  <DatePicker
    customInput={
      <Input
        alternativeId={id}
        alternativeLabel={label}
        alternativeRequired={required}
        error={error}
        touched={touched}
        text={text}
        placeholder={placeholder}
      />
    }
    {...rest}
  />
);

export default DatePickerField;
