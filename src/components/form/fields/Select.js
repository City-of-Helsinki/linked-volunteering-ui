import React from 'react';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import { injectIntl } from 'react-intl';
import Label from './Label';

const SelectField = ({
  id,
  label,
  children,
  noneSelectedText,
  required,
  error,
  touched,
  text,
  intl: { formatMessage },
  ...rest
}) => (
  <FormGroup>
    {label && (
      <Label htmlFor={id} required={required}>
        {formatMessage({ id: label })}
      </Label>
    )}
    <Input type="select" id={id} {...rest} invalid={error && touched}>
      <option>{noneSelectedText}</option>
      {children}
    </Input>
    <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    <FormText>{text && formatMessage({ id: text })}</FormText>
  </FormGroup>
);

export default injectIntl(SelectField);
