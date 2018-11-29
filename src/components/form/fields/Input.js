import React from 'react';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import Label from './Label';

const InputField = ({ id, label, required, error, touched, text, ...rest }) => (
  <FormGroup>
    <Label htmlFor={id} required={required}>
      {label}
    </Label>
    <Input id={id} {...rest} invalid={error && touched} />
    <FormFeedback>{error}</FormFeedback>
    <FormText>{text}</FormText>
  </FormGroup>
);

export default InputField;
