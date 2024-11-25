import React, { ReactNode, ChangeEvent } from 'react';
import { FormGroup, Input, FormFeedback, FormText, InputProps } from 'reactstrap';
import { useIntl } from 'react-intl';
import Label from './Label';

interface SelectFieldProps extends Omit<InputProps, 'onChange'> {
  id: string;
  label?: string;
  children: ReactNode;
  noneSelectedText: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  text?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  children,
  noneSelectedText,
  required,
  error,
  touched,
  text,
  onChange,
  ...rest
}) => {
  const intl = useIntl();

  const isInvalid = !!error && touched;

  return (
    <FormGroup>
      {label && (
        <Label htmlFor={id} required={required}>
          {intl.formatMessage({ id: label })}
        </Label>
      )}
      <Input type="select" id={id} onChange={onChange} {...rest} invalid={isInvalid}>
        <option>{noneSelectedText}</option>
        {children}
      </Input>
      <FormFeedback>{error && intl.formatMessage({ id: error })}</FormFeedback>
      <FormText>{text && intl.formatMessage({ id: text })}</FormText>
    </FormGroup>
  );
};

export default SelectField;
