import React from 'react';
import Autosuggest, {
  BlurEvent,
  ChangeEvent,
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData,
} from 'react-autosuggest';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import styled from 'styled-components';
import { useIntl } from 'react-intl';

import Label from './Label';
import './AutoSuggest.scss';
import { useAppDispatch } from '../../../store/hooks';
import {
  clearCoordinatesByAddress,
  getCoordinatesByAddress,
} from '../../../store/reducers/geo';
import { AddressFeature, AutoSuggestEvent } from '../../../types';

const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 0;
`;

interface Props {
  addressFeatures: AddressFeature[];
  error?: string;
  getSuggestionValue: (_item: AddressFeature) => string;
  id: string;
  label?: string;
  onBlur?: (
    _event: React.FocusEvent<HTMLElement>,
    _params?: BlurEvent<AddressFeature>
  ) => void;
  onChange: (_e: AutoSuggestEvent) => void;
  onInputChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  text?: string;
  touched: boolean;
  value?: string;
}

const AutoSuggestField: React.FC<Props> = ({
  addressFeatures,
  error,
  getSuggestionValue,
  id,
  label,
  onBlur,
  onChange,
  onInputChange,
  placeholder,
  required,
  text,
  touched,
  value: controlledValue,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { formatMessage, locale } = intl;

  const value = controlledValue || '';

  const handleChange = (
    _event: React.FormEvent<HTMLElement>,
    data: ChangeEvent
  ) => {
    // Notify parent of input changes so they can update the controlled value
    onInputChange?.(data.newValue);
  };

  const onSuggestionsFetchRequested = (
    request: SuggestionsFetchRequestedParams
  ) => {
    dispatch(getCoordinatesByAddress({ text: request.value, lang: locale }));
  };

  const onSuggestionsClearRequested = () => {
    dispatch(clearCoordinatesByAddress());
  };

  const onSuggestionSelected = (
    _event: React.FormEvent<HTMLElement>,
    data: SuggestionSelectedEventData<AddressFeature>
  ) => {
    onChange({
      target: {
        id,
        value: data.suggestion,
      },
    });
  };

  const renderSuggestion = (suggestion: AddressFeature) => {
    return <span>{getSuggestionValue(suggestion)}</span>;
  };

  const inputProps = {
    value,
    onBlur,
    onChange: handleChange,
  };

  return (
    <Autosuggest
      suggestions={[...addressFeatures]}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
      inputProps={inputProps}
      renderInputComponent={(inputProps) => {
        // Create a custom props object to pass to Reactstrap's Input component
        const customProps = {
          ...inputProps,
          id: id,
          key: id,
          type: 'text' as const,
          invalid: !!(error && touched),
          placeholder: placeholder
            ? formatMessage({ id: placeholder })
            : undefined,
        };

        return (
          <StyledFormGroup>
            {label && (
              <Label htmlFor={id} required={required}>
                {formatMessage({ id: label })}
              </Label>
            )}
            {/* @ts-ignore - Working around type incompatibilities between Autosuggest and Reactstrap */}
            <Input {...customProps} />
            <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
            <FormText>{text && formatMessage({ id: text })}</FormText>
          </StyledFormGroup>
        );
      }}
    />
  );
};

export default AutoSuggestField;
