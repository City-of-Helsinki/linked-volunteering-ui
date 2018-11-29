import React from 'react';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Label from './Label';

const InputField = ({
  id,
  label,
  required,
  error,
  touched,
  text,
  placeholder,
  intl: { formatMessage },
  ...rest
}) => (
  <FormGroup>
    {label && (
      <Label htmlFor={id} required={required}>
        {formatMessage({ id: label })}
      </Label>
    )}
    <Input
      id={id}
      invalid={error && touched}
      placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
      {...rest}
    />
    <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    <FormText>{text && formatMessage({ id: text })}</FormText>
  </FormGroup>
);

export default injectIntl(InputField);
