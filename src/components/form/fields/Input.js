import React from 'react';
import { FormGroup, Input, FormFeedback } from 'reactstrap';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import Label from './Label';
import responsive from '../../../utils/responsive';

const StyledFormText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.helBlack};

  ${responsive.lg`
    min-width: 550px;
  `}
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
}) => {
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={id} required={required}>
          {formatMessage({ id: label })}
        </Label>
      )}
      {text && (
        <StyledFormText>
          {formatMessage({ id: text })
            .split('\n')
            .map((item, key) => {
              return (
                <React.Fragment key={key}>
                  {item}
                  <br />
                </React.Fragment>
              );
            })}
        </StyledFormText>
      )}
      <Input
        id={id}
        invalid={error && touched}
        placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
        {...rest}
      />
      <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    </FormGroup>
  );
};

export default injectIntl(InputField);
