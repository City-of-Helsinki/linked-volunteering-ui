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
 * ## How wheel blocking works
 * We prevent number inputs from changing while scrolling by attaching a native
 * `wheel` listener directly on the input with `{ passive: false }`. This keeps
 * the parent `onWheel` callback semantics unchanged while ensuring browser-level
 * wheel behavior is suppressed for this field.
 */
const NumericInput: React.FC<Props> = (props) => {
  const {
    onWheel: onWheelFromParent,
    innerRef: innerRefFromParent,
    ...rest
  } = props;
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const setInputRef = (input: HTMLInputElement | null) => {
    // Keep a local handle for the native wheel listener and still forward the
    // ref to any external consumer, preserving the component's existing API
    inputRef.current = input;

    if (typeof innerRefFromParent === 'function') {
      innerRefFromParent(input);
      return;
    }

    if (innerRefFromParent && 'current' in innerRefFromParent) {
      (
        innerRefFromParent as React.MutableRefObject<HTMLInputElement | null>
      ).current = input;
    }
  };

  React.useEffect(() => {
    const input = inputRef.current;
    // Defensively bail out if the underlying input has not been resolved yet
    if (!input) {
      return;
    }

    const onNativeWheel = (event: WheelEvent) => {
      // Some wheel events are not cancelable (for example, synthetic or non-gesture
      // sources), so call preventDefault only when it can actually be canceled
      if (event.cancelable) {
        event.preventDefault();
      }
    };

    // Core fix: attach the wheel handler directly with `passive: false` so
    // scrolling over a focused number input cannot change its value.
    input.addEventListener('wheel', onNativeWheel, { passive: false });

    return () => {
      input.removeEventListener('wheel', onNativeWheel);
    };
  }, []);

  // reactstrap `InputProps` has `[key: string]: any`, so `Omit<…>` and object rest
  // after destructuring do not preserve known keys for TypeScript. Runtime shape is correct.
  const fieldProps = {
    ...rest,
    type: 'number' as const,
    innerRef: setInputRef,
    // Keep parent onWheel behavior as-is
    // Native wheel suppression happens in the listener
    // above to avoid React synthetic-passive edge cases
    onWheel: onWheelFromParent,
  } as InputFieldProps;

  return <InputField {...fieldProps} />;
};

export default NumericInput;
