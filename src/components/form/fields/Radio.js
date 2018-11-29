import React from 'react';
import { FormGroup, CustomInput, FormFeedback, FormText } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

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
      <FormFeedback>{error && <FormattedMessage id={error} />}</FormFeedback>
      <FormText>{text && <FormattedMessage id={text} />}</FormText>
    </CustomInput>
  </FormGroup>
);

export default RadioField;
