import React from 'react';

import InputField, { type InputFieldProps } from './Input';

/** Same as {@link InputFieldProps}, but `type` is always `"number"` here. */
type Props = Omit<InputFieldProps, 'type'>;

/**
 * Numeric input for event-form quantities (participant count, bag rolls, pickers).
 *
 * Wraps {@link InputField} with `type="number"` and blocks the mouse wheel from
 * changing the value while the input is focused.
 *
 * ## User story (Puistotalkoot test feedback)
 * During testing, test users noted that quantities "changed randomly".
 * It turned out that scrolling the page with the mouse wheel changed the value.
 * This could lead to accidental changes, and the user receiving less
 * trash bags and other equipment than they needed.
 * And tracking down the cause is impossible after the fact.
 * The solution is to block the default wheel behavior on the input
 * so that the values don't change accidentally when scrolling the page.
 *
 * ## Why `preventDefault` on `wheel`
 * We stop the default wheel behavior on the input so the page scroll (or no-op)
 * wins. Arrow keys and the spinner UI still work as usual.
 */
const NumericInput: React.FC<Props> = (props) => {
  const { onWheel: onWheelFromParent, ...rest } = props;

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    onWheelFromParent?.(e);
  };

  // reactstrap `InputProps` has `[key: string]: any`, so `Omit<…>` and object rest
  // after destructuring do not preserve known keys for TypeScript. Runtime shape is correct.
  const fieldProps = {
    ...rest,
    type: 'number' as const,
    onWheel: handleWheel,
  } as InputFieldProps;

  return <InputField {...fieldProps} />;
};

export default NumericInput;
