import React from 'react';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
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
    <FormFeedback>{error && <FormattedMessage id={error} />}</FormFeedback>
    <FormText>{text && <FormattedMessage id={text} />}</FormText>
  </FormGroup>
);

export default SelectField;
