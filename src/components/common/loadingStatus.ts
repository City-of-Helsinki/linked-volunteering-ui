// Keeps track of the loading spinners, and announces loading to screen readers
// through the live region in index.html.
//
// The HDS LoadingSpinner creates its own live region at the same moment it
// writes the loading text into it. Screen readers, VoiceOver especially, don't
// announce changes in a live region that was just added to the page, so the
// spinner was silent. This live region exists from the page load onwards.

export const LOADING_STATUS_ID = 'loading-status';

// Loading is made known to screen readers only when it takes longer than this.
// A quicker load would only start an announcement that is cut off when the
// page is shown.
export const SLOW_LOADING_DELAY = 1000;

// How long the finished text stays in the live region before it is cleared,
// so that it is not left at the end of the page for screen reader users.
export const CLEAR_DELAY = 1000;

let activeSpinners = 0;
let slow = false;
let announced = false;
let onSlowLoading: (() => void) | undefined;
let pendingSlow: ReturnType<typeof setTimeout> | undefined;
let pendingFinish: ReturnType<typeof setTimeout> | undefined;
let pendingClear: ReturnType<typeof setTimeout> | undefined;

const setStatus = (text: string) => {
  const element = document.getElementById(LOADING_STATUS_ID);

  if (element) {
    element.textContent = text;
  }
};

// Called by a spinner when it is shown. onSlow is called when loading has
// taken longer than SLOW_LOADING_DELAY, counted from the first spinner, or
// straight away if loading is already slow when this spinner is shown.
export const startLoading = (onSlow: () => void) => {
  activeSpinners += 1;
  onSlowLoading = onSlow;

  if (pendingFinish) {
    // Another spinner replaced the one that just finished, so the page is
    // still loading and the delay keeps counting from the first spinner
    clearTimeout(pendingFinish);
    pendingFinish = undefined;

    if (slow) {
      onSlow();
    }

    return;
  }

  if (activeSpinners === 1) {
    clearTimeout(pendingClear);
    setStatus('');
    pendingSlow = setTimeout(() => {
      pendingSlow = undefined;
      slow = true;
      onSlowLoading?.();
    }, SLOW_LOADING_DELAY);
  }
};

export const announceLoading = (loadingText: string) => {
  if (!announced) {
    announced = true;
    setStatus(loadingText);
  }
};

// Called by a spinner when it is removed. Finishing is announced only if
// loading was.
export const finishLoading = (loadingFinishedText: string) => {
  activeSpinners = Math.max(activeSpinners - 1, 0);

  if (activeSpinners > 0) {
    return;
  }

  onSlowLoading = undefined;

  // Wait for the other effects of the same render, in case another spinner is
  // shown in place of this one
  pendingFinish = setTimeout(() => {
    pendingFinish = undefined;
    clearTimeout(pendingSlow);
    pendingSlow = undefined;
    slow = false;

    if (announced) {
      announced = false;
      setStatus(loadingFinishedText);
      pendingClear = setTimeout(() => setStatus(''), CLEAR_DELAY);
    }
  });
};

// For tests, which render spinners from the start many times
export const resetLoadingStatus = () => {
  activeSpinners = 0;
  slow = false;
  announced = false;
  onSlowLoading = undefined;
  clearTimeout(pendingSlow);
  clearTimeout(pendingFinish);
  clearTimeout(pendingClear);
  pendingSlow = undefined;
  pendingFinish = undefined;
  pendingClear = undefined;
};
