/* eslint-disable no-console */
import '@testing-library/jest-dom/vitest';

import { resetLoadingStatus } from './components/common/loadingStatus';
import { resetHasNavigated } from './hooks/useHasNavigated';

// Load generated runtime configuration to be available in tests
// eslint-disable-next-line @typescript-eslint/no-require-imports, import-x/extensions
require('../public/test-env-config.js');

window.scrollTo = vi.fn();

// Every test starts like a freshly opened app, see useHasNavigated and
// loadingStatus
beforeEach(() => {
  resetHasNavigated();
  resetLoadingStatus();
});

const originalError = console.error.bind(console.error);

console.error = (msg, ...optionalParams) => {
  const msgStr = msg.toString();

  return (
    !msgStr.includes('Could not parse CSS stylesheet') &&
    originalError(msg, ...optionalParams)
  );
};
