import { useEffect, useRef } from 'react';

import useHasNavigated from './useHasNavigated';
import { focusElement, isFocusLost } from '../utils/focus';

// After a page change inside the app, the element that had focus (e.g. the
// clicked link) was removed together with the previous page. Moves focus to
// the heading inside the element of the returned ref, or to the element itself
// if it has no heading, so that screen readers continue from the new content.
// Focus is only moved when it was lost, so it is never taken from an element
// the user is on. Runs when the element is shown and when the location changes.
const useFocusOnPageChange = <T extends HTMLElement>() => {
  const hasNavigated = useHasNavigated();
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || !hasNavigated() || !isFocusLost()) {
      return;
    }

    focusElement(element.querySelector('h1') ?? element);
  }, [hasNavigated]);

  return ref;
};

export default useFocusOnPageChange;
