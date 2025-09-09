import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { FormFeedback, FormGroup } from 'reactstrap';

const { REACT_APP_GOOGLE_RECAPTCHA_KEY } = import.meta.env;

const ReCaptchaAlignmentWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ReCaptchaBorderContainer = styled.div`
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  padding: 2px;
  transition: border-color 0.15s ease-in-out;

  &.is-invalid {
    border-color: #dc3545;
  }
`;

interface ReCaptchaFieldProps {
  error?: string;
  touched?: boolean;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
}

const ReCaptchaField: React.FC<ReCaptchaFieldProps> = ({
  error,
  touched,
  setFieldValue,
}) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const showError = !!error && !!touched;

  return (
    <FormGroup>
      <ReCaptchaAlignmentWrapper>
        <ReCaptchaBorderContainer className={showError ? 'is-invalid' : ''}>
          <ReCAPTCHA
            sitekey={REACT_APP_GOOGLE_RECAPTCHA_KEY as string}
            onChange={(token: string | null) =>
              setFieldValue('recaptchaToken', token || '')
            }
            onExpired={() => setFieldValue('recaptchaToken', '')}
            onError={() => setFieldValue('recaptchaToken', '')}
          />
        </ReCaptchaBorderContainer>
      </ReCaptchaAlignmentWrapper>
      {showError && (
        <FormFeedback style={{ display: 'block', textAlign: 'right' }}>
          {error && formatMessage({ id: error })}
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default ReCaptchaField;

