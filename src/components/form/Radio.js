import React from 'react';
import { FormGroup, CustomInput, FormFeedback, FormText } from 'reactstrap';

const RadioField = ({ id, label, required, error, touched, text, ...rest }) => (
  <FormGroup check>
    <CustomInput
      label={label}
      required={required}
      id={id}
      type="radio"
      invalid={error && touched}
      {...rest}
    >
      <FormFeedback>{error}</FormFeedback>
      <FormText>{text}</FormText>
    </CustomInput>
  </FormGroup>
);

export default RadioField;
