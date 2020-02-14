import React from 'react';
import { FormFeedback, FormGroup, Input, InputProps } from 'reactstrap';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import Label from './Label';
import responsive from '../../../utils/responsive';

export const StyledFormText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.helBlack};

  ${responsive.lg`
    min-width: 550px;
  `}
`;

interface Props extends InputProps {
  error?: string;
  id: string;
  label?: string;
  placeholder?: string;
  required: boolean;
  text?: string;
  touched: boolean;
}

const InputField: React.FC<Props> = props => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const { id, label, required, error, touched, text, placeholder, ...rest } = props;

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
        invalid={!!error && touched}
        placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
        {...rest}
      />
      <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
    </FormGroup>
  );
};

export default InputField;
