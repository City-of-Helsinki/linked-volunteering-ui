import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { FormFeedback, FormGroup } from 'reactstrap';

const CaptchaAlignmentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CaptchaBorderContainer = styled.div`
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  padding: 2px;
  transition: border-color 0.15s ease-in-out;

  &.is-invalid {
    border-color: #dc3545;
  }
`;

interface CaptchaFieldProps {
  error?: string;
  touched?: boolean;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

const CaptchaField: React.FC<CaptchaFieldProps> = ({
  error,
  touched,
  setFieldValue,
}) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const showError = !!error && !!touched;

  return (
    <FormGroup>
      <CaptchaAlignmentWrapper>
        <CaptchaBorderContainer className={showError ? 'is-invalid' : ''}>
          {/* TODO: Add Captcha Here once another solution is approved */}
        </CaptchaBorderContainer>
      </CaptchaAlignmentWrapper>
      {showError && (
        <FormFeedback style={{ display: 'block', textAlign: 'right' }}>
          {error && formatMessage({ id: error })}
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default CaptchaField;

