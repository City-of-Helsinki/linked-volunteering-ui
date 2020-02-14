import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useIntl } from 'react-intl';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

import InstructionText from './InstructionText';

interface Props extends ReactDatePickerProps {
  error?: string;
  id: string;
  label?: string;
  placeholder?: string;
  text?: string;
  touched: boolean;
}

const DatePickerField: React.FC<Props> = props => {
  const handleDateChangeRaw = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const intl = useIntl();
  const { formatMessage } = intl;

  const { id, label, required, error, touched, text, placeholder, ...rest } = props;
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={id} required={required}>
          {formatMessage({ id: label })}
        </Label>
      )}
      {text && <InstructionText text={text} />}
      <DatePicker
        id={id}
        onChangeRaw={handleDateChangeRaw}
        customInput={<Input invalid={!!error && touched} />}
        placeholderText={placeholder ? formatMessage({ id: placeholder }) : undefined}
        {...rest}
      />
      <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    </FormGroup>
  );
};

export default DatePickerField;
