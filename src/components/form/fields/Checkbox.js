import React from 'react';
import { FormGroup, CustomInput, FormFeedback, FormText } from 'reactstrap';

const CheckboxField = ({ id, label, required, error, touched, text, ...rest }) => (
  <FormGroup>
    <CustomInput
      label={label}
      id={id}
      type="checkbox"
      required={required}
      invalid={error && touched}
      {...rest}
    >
      <FormFeedback>{error}</FormFeedback>
      <FormText>{text}</FormText>
    </CustomInput>
  </FormGroup>
);

export default CheckboxField;
