import React from 'react';
import { FormFeedback, FormGroup, Input, InputProps } from 'reactstrap';
import { useIntl } from 'react-intl';

import InstructionText from './InstructionText';
import Label from './Label';

import PrintValue from './PrintValue';

interface Props extends InputProps {
  error?: string;
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  text?: string;
  touched?: boolean;
}

const InputField: React.FC<Props> = (props) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const { id, label, required, error, touched, text, placeholder, ...rest } =
    props;

  return (
    <FormGroup className="printable">
      {label && (
        <Label htmlFor={id} required={required}>
          {formatMessage({ id: label })}
        </Label>
      )}
      {text && <InstructionText text={text} />}
      <Input
        id={id}
        invalid={!!error && touched}
        placeholder={
          placeholder ? formatMessage({ id: placeholder }) : undefined
        }
        {...rest}
      />
      <PrintValue value={props.value as string} />
      <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    </FormGroup>
  );
};

export default InputField;
