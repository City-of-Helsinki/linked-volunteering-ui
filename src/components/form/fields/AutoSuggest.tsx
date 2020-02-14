import React from 'react';
import Autosuggest, {
  BlurEvent,
  ChangeEvent,
  SuggestionsFetchRequestedParams,
  SuggestionSelectedEventData
} from 'react-autosuggest';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import Label from './Label';
import './AutoSuggest.scss';

const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 0;
`;

const simplify = (value: string) => value.toLowerCase();

interface Target {
  target: {
    id: string;
    value: any;
  };
}

interface Props {
  addressFeatures: any[];
  clearCoordinatesByAddress: Function;
  error?: string;
  getCoordinatesByAddress: Function;
  getSuggestionValue: (item: any) => string;
  id: string;
  label?: string;
  onBlur?: (event: React.FocusEvent<any>, params?: BlurEvent<any>) => void;
  onChange: (e: Target) => void;
  placeholder?: string;
  required?: boolean;
  suggestions: Array<any>;
  text?: string;
  touched: boolean;
}

const AutoSuggestField: React.FC<Props> = ({
  addressFeatures,
  clearCoordinatesByAddress,
  error,
  getCoordinatesByAddress,
  getSuggestionValue,
  id,
  label,
  onBlur,
  onChange,
  placeholder,
  required,
  suggestions,
  text,
  touched
}) => {
  const intl = useIntl();
  const { formatMessage, locale } = intl;

  const [filteredSuggestions, setFilteredSuggestions] = React.useState<Array<any>>([]);
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.FormEvent<any>, data: ChangeEvent) => {
    setValue(data.newValue);
  };

  const onSuggestionsFetchRequested = (request: SuggestionsFetchRequestedParams) => {
    getCoordinatesByAddress(request.value, locale);
    setFilteredSuggestions(
      suggestions.filter((suggestion: any) =>
        simplify(getSuggestionValue(suggestion)).includes(simplify(request.value))
      )
    );
  };

  const onSuggestionsClearRequested = () => {
    clearCoordinatesByAddress();
    setFilteredSuggestions([]);
  };

  const onSuggestionSelected = (
    event: React.FormEvent<any>,
    data: SuggestionSelectedEventData<any>
  ) => {
    onChange({
      target: {
        id,
        value: data.suggestion
      }
    });
  };

  const renderSuggestion = (suggestion: any) => {
    return <span>{getSuggestionValue(suggestion)}</span>;
  };

  const inputProps = {
    value,
    onBlur,
    onChange: handleChange
  };

  return (
    <Autosuggest
      suggestions={[...addressFeatures, ...filteredSuggestions]}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      renderSuggestion={renderSuggestion}
      getSuggestionValue={getSuggestionValue}
      inputProps={inputProps}
      renderInputComponent={(props: any) => (
        <StyledFormGroup>
          {label && (
            <Label htmlFor={id} required={required}>
              {formatMessage({ id: label })}
            </Label>
          )}
          <Input
            {...props}
            id={id}
            invalid={error && touched}
            placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
          />
          <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
          <FormText>{text && formatMessage({ id: text })}</FormText>
        </StyledFormGroup>
      )}
    />
  );
};

export default AutoSuggestField;
