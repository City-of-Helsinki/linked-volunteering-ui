import React from 'react';
import { FormGroup, Input, FormFeedback, FormText, Label } from 'reactstrap';
import { useIntl } from 'react-intl';

type RadioFieldProps = {
  id: string;
  label: string;
  required: boolean;
  error?: string;
  touched?: boolean;
  text?: string;
};

const RadioField: React.FC<RadioFieldProps> = ({
  id,
  label,
  required,
  error,
  touched,
  text,
  ...rest
}) => {
  const { formatMessage } = useIntl();

  return (
    <FormGroup check>
      {label && <Label for={id}>{formatMessage({ id: label })}</Label>}
      <Input
        required={required}
        id={id}
        type="radio"
        invalid={!!error && touched}
        {...rest}
      />
      {!!error && touched && <FormFeedback>{error}</FormFeedback>}
      <FormText>{text && formatMessage({ id: text })}</FormText>
    </FormGroup>
  );
};

export default RadioField;
