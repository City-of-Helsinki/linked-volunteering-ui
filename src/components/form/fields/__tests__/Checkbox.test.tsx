import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithProviders from '../../../../test-utils/renderWithProviders';
import Checkbox from '../Checkbox';

const defaultProps = {
  id: 'test-checkbox',
  label: 'form.checkbox.label',
  required: false,
};

const renderComponent = (props = {}) => {
  return renderWithProviders(<Checkbox {...defaultProps} {...props} />);
};

describe('<Checkbox />', () => {
  it('renders with required label and input', () => {
    renderComponent({ required: true });

    const input = screen.getByRole('checkbox');

    expect(input).toBeRequired();
    expect(screen.getByText('form.checkbox.label')).toBeInTheDocument();
  });

  it('shows error message when error prop is provided and field is touched', () => {
    renderComponent({
      error: 'form.checkbox.error',
      touched: true,
    });

    expect(screen.getByText('form.checkbox.error')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('does not show error message when field is not touched', () => {
    renderComponent({
      error: 'form.checkbox.error',
      touched: false,
    });

    expect(screen.queryByText('form.checkbox.error')).not.toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('displays helper text when text prop is provided', () => {
    renderComponent({
      text: 'form.checkbox.help',
    });

    expect(screen.getByText('form.checkbox.help')).toBeInTheDocument();
  });

  it('handles change events', () => {
    const handleChange = vi.fn();

    renderComponent({
      onChange: handleChange,
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });
});
