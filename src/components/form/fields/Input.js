import React from 'react';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Label from './Label';

const StyledFormText = styled.span`
  small {
    font-size: 14px;
    color: #666666 !important;
  }
`;

const InputField = ({
  alternativeId,
  alternativeLabel,
  alternativeRequired,
  id = alternativeId,
  label = alternativeLabel,
  required = alternativeRequired,
  error,
  touched,
  text,
  placeholder,
  intl: { formatMessage },
  ...rest
}) => (
  <FormGroup>
    {label && (
      <Label htmlFor={id} required={required}>
        {formatMessage({ id: label })}
      </Label>
    )}
    <Input
      id={id}
      invalid={error && touched}
      placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
      {...rest}
    />
    <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    <StyledFormText>
      <FormText>{text && formatMessage({ id: text })}</FormText>
    </StyledFormText>
  </FormGroup>
);

export default injectIntl(InputField);
