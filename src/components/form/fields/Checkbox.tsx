import React from 'react';
import { useIntl } from 'react-intl';
import { FormGroup, Input, FormFeedback, FormText, Label } from 'reactstrap';

type CheckboxFieldProps = {
  id: string;
  label: string;
  required: boolean;
  error?: string;
  touched?: boolean;
  text?: string;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
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
      <Input id={id} type="checkbox" required={required} invalid={!!error && touched} {...rest} />
      {!!error && touched && <FormFeedback>{error}</FormFeedback>}
      <FormText>{text && formatMessage({ id: text })}</FormText>
    </FormGroup>
  );
};

export default CheckboxField;
