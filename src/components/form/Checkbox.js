import React from 'react';
import { FormGroup, Label, CustomInput } from 'reactstrap';

const CheckboxField = ({ id, label, ...rest }) => (
  <FormGroup>
    <Label for={id}>{label}</Label>
    <CustomInput id={id} type="checkbox" {...rest} />
  </FormGroup>
);

export default CheckboxField;
