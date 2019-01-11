import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import Label from './Label';
import './AutoSuggest.scss';

const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 0;
`;

const simplify = value => value.toLowerCase();

class Example extends PureComponent {
  state = {
    value: '',
    suggestions: []
  };

  onChange = (event, { newValue }) => {
    this.setState(() => ({
      value: newValue
    }));
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const { suggestions, getSuggestionValue } = this.props;
    this.setState(() => ({
      suggestions: suggestions.filter(suggestion =>
        simplify(getSuggestionValue(suggestion)).includes(simplify(value))
      )
    }));
  };

  onSuggestionsClearRequested = () => {
    this.setState(() => ({
      suggestions: []
    }));
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const { id, onChange } = this.props;
    onChange({
      target: {
        id,
        value: suggestion
      }
    });
  };

  renderSuggestion = suggestion => <span>{suggestion.name.fi}</span>;

  render() {
    const {
      id,
      label,
      required,
      error,
      touched,
      text,
      placeholder,
      intl: { formatMessage },
      onBlur,
      getSuggestionValue
    } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      value,
      onBlur,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        inputProps={inputProps}
        renderInputComponent={props => (
          <StyledFormGroup>
            {label && (
              <Label htmlFor={id} required={required}>
                {formatMessage({ id: label })}
              </Label>
            )}
            <Input
              id={id}
              invalid={error && touched}
              placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
              {...props}
            />
            <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
            <FormText>{text && formatMessage({ id: text })}</FormText>
          </StyledFormGroup>
        )}
      />
    );
  }
}

export default injectIntl(Example);
