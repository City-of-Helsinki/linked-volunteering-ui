import React from 'react';
import { TimeInput } from 'hds-react';
import { useIntl } from 'react-intl';
import { FormGroup } from 'reactstrap';
import styled from 'styled-components';

import InstructionText from './InstructionText';

const StyledTimeInputWrapper = styled.div`
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
  required?: boolean;
}

const HDSTimePicker: React.FC<Props> = ({
  error,
  id,
  label,
  placeholder,
  text,
  touched,
  value,
  onChange,
  onBlur,
  required,
}) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value; // Format: "HH:mm"

    if (!timeValue || !timeValue.includes(':')) {
      return;
    }

    const [hours, minutes] = timeValue.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      return;
    }

    // Create new date with the time, preserving existing date if available
    const baseDate =
      value instanceof Date && !isNaN(value.getTime())
        ? new Date(value)
        : new Date();

    baseDate.setHours(hours, minutes, 0, 0);
    onChange(baseDate);
  };

  // Format time to HH:mm - HDS TimeInput always expects colon format
  // The component handles locale-specific display formatting internally
  const formatTimeValue = (date: Date | null | undefined): string => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formattedValue = formatTimeValue(value);

  return (
    <FormGroup>
      {text && <InstructionText text={text} />}
      <StyledTimeInputWrapper>
        <TimeInput
          id={id}
          label={label ? formatMessage({ id: label }) : undefined}
          value={formattedValue}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={
            placeholder ? formatMessage({ id: placeholder }) : undefined
          }
          errorText={
            error && touched ? formatMessage({ id: error }) : undefined
          }
          invalid={!!error && touched}
          required={required}
          hoursLabel={formatMessage({ id: 'form.event.field.timeInput.hours' })}
          minutesLabel={formatMessage({
            id: 'form.event.field.timeInput.minutes',
          })}
        />
      </StyledTimeInputWrapper>
    </FormGroup>
  );
};

export default HDSTimePicker;
