import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithProviders from '../../../../test-utils/renderWithProviders';
import Radio from '../Radio';

const defaultProps = {
  id: 'test-radio',
  label: 'form.radio.label',
  required: false,
};

const renderComponent = (props = {}) => {
  return renderWithProviders(<Radio {...defaultProps} {...props} />);
};

describe('<Radio />', () => {
  it('renders with required label and input', () => {
    renderComponent({ required: true });

    const input = screen.getByRole('radio');

    expect(input).toBeRequired();
    expect(screen.getByText('form.radio.label')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided and field is touched', () => {
    renderComponent({
      error: 'form.radio.error',
      touched: true,
    });

    expect(screen.getByText('form.radio.error')).toBeInTheDocument();
    expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not show error message when field is not touched', () => {
    renderComponent({
      error: 'form.radio.error',
      touched: false,
    });

    expect(screen.queryByText('form.radio.error')).not.toBeInTheDocument();
    expect(screen.getByRole('radio')).not.toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('displays helper text when text prop is provided', () => {
    renderComponent({
      text: 'form.radio.help',
    });

    expect(screen.getByText('form.radio.help')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();
    renderComponent({
      onChange: handleChange,
      name: 'test-group',
      value: 'test-value',
    });

    const radio = screen.getByRole('radio');
    fireEvent.click(radio);

    expect(handleChange).toHaveBeenCalled();
    expect(radio).toBeChecked();
  });
});
