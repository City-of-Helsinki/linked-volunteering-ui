import React, { PureComponent } from 'react';
import Autosuggest from 'react-autosuggest';
import { FormGroup, Input, FormFeedback, FormText } from 'reactstrap';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Label from './Label';

const Suggestion = styled.div`
  background: red;
  .react-autosuggest__suggestion {
  }
  .react-autosuggest__suggestion--first {
  }
  .react-autosuggest__suggestion--highlighted {
  }
  .react-autosuggest__suggestions-container {
  }
  .react-autosuggest__suggestions-container--open {
  }
  .react-autosuggest__suggestions-list {
  }
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

  renderSuggestion = suggestion => <div>{suggestion.name.fi}</div>;

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
      <FormGroup>
        {label && (
          <Label htmlFor={id} required={required}>
            {formatMessage({ id: label })}
          </Label>
        )}
        <Autosuggest
          alwaysRenderSuggestions
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={this.renderSuggestion}
          getSuggestionValue={getSuggestionValue}
          inputProps={inputProps}
          renderInputComponent={props => (
            <Input
              id={id}
              invalid={error && touched}
              placeholder={placeholder ? formatMessage({ id: placeholder }) : undefined}
              {...props}
            />
          )}
          renderSuggestionsContainer={({ containerProps, children }) => (
            <Suggestion {...containerProps}>{children}</Suggestion>
          )}
        />
        <FormFeedback>{error && formatMessage({ id: error })}</FormFeedback>
        <FormText>{text && formatMessage({ id: text })}</FormText>
      </FormGroup>
    );
  }
}

export default injectIntl(Example);
