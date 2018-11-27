import React from 'react';
import { FormGroup, Label, CustomInput } from 'reactstrap';

const RadioField = ({ id, label, ...rest }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <CustomInput id={id} type="radio" {...rest} />
  </FormGroup>
);

export default RadioField;
