import React from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { useIntl } from 'react-intl';
import { FormFeedback, FormGroup, Input } from 'reactstrap';

import InstructionText from './InstructionText';
import Label from './Label';

interface Props extends ReactDatePickerProps {
  error?: string;
  id: string;
  label?: string;
  placeholder?: string;
  text?: string;
  touched: boolean;
}

const DatePickerField: React.FC<Props> = props => {
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
        customInput={<Input invalid={!!error && touched} />}
        placeholderText={placeholder ? formatMessage({ id: placeholder }) : undefined}
        {...rest}
      />
      <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    </FormGroup>
  );
};

export default DatePickerField;
