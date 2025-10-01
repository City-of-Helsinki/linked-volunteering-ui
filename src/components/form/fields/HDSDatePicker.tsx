import React from 'react';
import { DateInput } from 'hds-react';
import { useIntl } from 'react-intl';
import { FormGroup, FormFeedback } from 'reactstrap';
import styled from 'styled-components';

import InstructionText from './InstructionText';

const StyledDateInputWrapper = styled.div`
  .hds-text-input__label {
    font-weight: 600;
    margin-bottom: 0;
  }

  .hds-text-input__input-wrapper {
    background-color: transparent;
  }

  .hds-text-input {
    display: block;
    width: 100%;
    padding: 0.375rem 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: transparent;
    background-clip: padding-box;
    border: none;
    border-bottom: 1px solid #000000;
    border-radius: 0;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;

    &:focus {
      color: #495057;
      background-color: transparent;
      border-color: #000000;
      outline: 0;
      box-shadow: none;
    }

    &.hds-text-input--invalid {
      border-bottom-color: #dc3545;
    }

    &::placeholder {
      color: #999999;
      opacity: 1;
    }
  }

  .hds-text-input__buttons {
    border-bottom: 1px solid #000000;
    background-color: transparent;
  }

  .hds-text-input--invalid .hds-text-input__buttons {
    border-bottom-color: #dc3545;
  }

  .hds-text-input__button {
    background-color: transparent;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  .is-invalid {
    .hds-text-input {
      border-bottom-color: #dc3545;

      &:focus {
        border-color: #dc3545;
      }
    }

    .hds-text-input__buttons {
      border-bottom-color: #dc3545;
    }
  }
`;

const StyledFormFeedback = styled(FormFeedback)<{ $isVisible?: boolean }>`
  display: ${(props) => (props.$isVisible ? 'block' : 'none')};
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
`;

interface Props {
  error?: string;
  id: string;
  label?: string;
  placeholder?: string;
  text?: string;
  touched: boolean;
  value: Date | null | undefined;
  onChange: (value: Date) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
  minDate?: Date;
  maxDate?: Date;
  isDateDisabledBy?: (date: Date) => boolean;
  required?: boolean;
}

const HDSDatePicker: React.FC<Props> = ({
  error,
  id,
  label,
  placeholder,
  text,
  touched,
  value,
  onChange,
  onBlur,
  minDate,
  maxDate,
  isDateDisabledBy,
  required,
}) => {
  const intl = useIntl();
  const { formatMessage, locale } = intl;

  const handleChange = (_valueAsString: string, valueAsDate: Date) => {
    if (valueAsDate && !isNaN(valueAsDate.getTime())) {
      onChange(valueAsDate);
    }
  };

  // Format date to dd.MM.yyyy or dd/MM/yyyy based on locale
  const formatDateValue = (date: Date | null | undefined): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return locale === 'en'
      ? `${day}/${month}/${year}`
      : `${day}.${month}.${year}`;
  };

  const hasError = !!error && touched;

  return (
    <FormGroup>
      {text && <InstructionText text={text} />}
      <StyledDateInputWrapper>
        <DateInput
          id={id}
          className={hasError ? 'is-invalid' : ''}
          style={
            hasError
              ? ({ '--input-background-default': 'rgba(220, 53, 69, 0.15)' } as React.CSSProperties)
              : undefined
          }
          label={label ? formatMessage({ id: label }) : undefined}
          language={locale as 'en' | 'fi' | 'sv'}
          value={formatDateValue(value)}
          onChange={handleChange}
          onBlur={onBlur}
          minDate={minDate}
          maxDate={maxDate}
          isDateDisabledBy={isDateDisabledBy}
          placeholder={
            placeholder ? formatMessage({ id: placeholder }) : undefined
          }
          invalid={hasError}
          required={required}
          disableConfirmation
          openButtonAriaLabel={formatMessage({
            id: 'form.event.field.dateInput.openCalendar',
          })}
          selectButtonLabel={formatMessage({
            id: 'form.event.field.dateInput.select',
          })}
          closeButtonLabel={formatMessage({
            id: 'form.event.field.dateInput.close',
          })}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
      </StyledDateInputWrapper>
      <StyledFormFeedback id={`${id}-error`} $isVisible={hasError}>
        {error && formatMessage({ id: error })}
      </StyledFormFeedback>
    </FormGroup>
  );
};

export default HDSDatePicker;
