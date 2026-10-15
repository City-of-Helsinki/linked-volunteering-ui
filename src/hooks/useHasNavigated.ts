import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

// The key of the first location the app was shown in
let initialLocationKey: string | undefined;
let navigated = false;

// Returns a function that tells whether the user has moved to another page
// inside the app. It stays true after the first page change, also when going
// back to the first page. Call the function in an effect, not during render.
const useHasNavigated = () => {
  const { key } = useLocation();

  return useCallback(() => {
    if (initialLocationKey === undefined) {
      initialLocationKey = key;
    }

    if (key !== initialLocationKey) {
      navigated = true;
    }

    return navigated;
  }, [key]);
};

// For tests, which render the app from the start many times
export const resetHasNavigated = () => {
  initialLocationKey = undefined;
  navigated = false;
};

export default useHasNavigated;
