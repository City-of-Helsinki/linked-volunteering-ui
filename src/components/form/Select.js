import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const SelectField = ({ id, label, children, ...rest }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <Input type="select" id={id} {...rest}>
      <option />
      {children}
    </Input>
  </FormGroup>
);

export default SelectField;
