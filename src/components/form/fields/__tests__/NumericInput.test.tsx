import React from 'react';
import { createEvent, fireEvent, screen } from '@testing-library/react';
import renderWithProviders from '../../../../test-utils/renderWithProviders';
import NumericInput from '../NumericInput';

const defaultProps = {
  id: 'test-numeric',
  label: 'form.event.field.amount_of_volunteers.label',
  value: '5',
  onChange: vi.fn(),
  onBlur: vi.fn(),
};

const renderComponent = (props = {}) => {
  return renderWithProviders(<NumericInput {...defaultProps} {...props} />);
};

describe('<NumericInput />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls preventDefault when the user scrolls with the wheel over the input', () => {
    renderComponent();
    const input = screen.getByRole('spinbutton');
    const wheelEvent = createEvent.wheel(input, {
      deltaY: 100,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(wheelEvent, 'preventDefault');
    fireEvent(input, wheelEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('still invokes parent onWheel when provided', () => {
    const onWheel = vi.fn();
    renderComponent({ onWheel });
    const input = screen.getByRole('spinbutton');
    fireEvent.wheel(input, { deltaY: 50 });
    expect(onWheel).toHaveBeenCalledTimes(1);
  });
});
