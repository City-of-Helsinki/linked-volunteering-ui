import React from 'react';
import { FormGroup, CustomInput, FormFeedback, FormText } from 'reactstrap';
import { injectIntl } from 'react-intl';

function CheckboxField({
  id,
  label,
  required,
  error,
  touched,
  text,
  intl: { formatMessage },
  ...rest
}) {
  return (
    <FormGroup check>
      <CustomInput
        label={label ? formatMessage({ id: label }) : undefined}
        id={id}
        type="checkbox"
        required={required}
        invalid={error && touched}
        {...rest}
      >
        <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
        <FormText>{text && formatMessage({ id: text })}</FormText>
      </CustomInput>
    </FormGroup>
  );
}

export default injectIntl(CheckboxField);
