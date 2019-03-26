import React from 'react';
import DatePicker from 'react-datepicker';
import Input from './Input';

export default class DatePickerField extends React.Component {
  handleDateChangeRaw = e => {
    e.preventDefault();
  };

  render = () => {
    const { id, label, required, error, touched, text, placeholder, ...rest } = this.props;
    return (
      <DatePicker
        onChangeRaw={this.handleDateChangeRaw}
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
  };
}
