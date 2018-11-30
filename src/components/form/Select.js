import React from 'react';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import Label from './Label';

const SelectField = ({ id, label, children, required, error, touched, text, ...rest }) => (
  <FormGroup>
    <Label htmlFor={id} required={required}>
      {label}
    </Label>
    <Input type="select" id={id} {...rest} invalid={error && touched}>
      <option />
      {children}
    </Input>
    <FormFeedback>{error}</FormFeedback>
    <FormText>{text}</FormText>
  </FormGroup>
);

export default SelectField;
