import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const InputField = ({ id, label, ...rest }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input id={id} {...rest} />
  </FormGroup>
);

export default InputField;
