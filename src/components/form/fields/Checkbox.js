import React from 'react';
import { FormGroup, CustomInput, FormFeedback, FormText } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

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
      <FormFeedback>{error && <FormattedMessage id={error} />}</FormFeedback>
      <FormText>{text && <FormattedMessage id={text} />}</FormText>
    </CustomInput>
  </FormGroup>
);

export default CheckboxField;
