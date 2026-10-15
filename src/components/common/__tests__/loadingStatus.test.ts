import {
  announceLoading,
  CLEAR_DELAY,
  finishLoading,
  SLOW_LOADING_DELAY,
  startLoading,
} from '../loadingStatus';

const LOADING = 'Sivua ladataan';
const FINISHED = 'Sivu on ladattu';

const getStatus = () => document.getElementById('loading-status')?.textContent;

const announce = () => announceLoading(LOADING);

describe('loadingStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML =
      '<div id="loading-status" role="status" aria-live="polite"></div>';
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = '';
  });

  it('calls the spinner when loading is slow', () => {
    const onSlow = vi.fn();

    startLoading(onSlow);
    vi.advanceTimersByTime(SLOW_LOADING_DELAY - 1);
    expect(onSlow).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(onSlow).toHaveBeenCalledTimes(1);
  });

  it('does not call the spinner when loading is quick', () => {
    const onSlow = vi.fn();

    startLoading(onSlow);
    vi.advanceTimersByTime(SLOW_LOADING_DELAY - 1);
    finishLoading(FINISHED);
    vi.runAllTimers();

    expect(onSlow).not.toHaveBeenCalled();
  });

  it('counts the delay from the first spinner when another spinner replaces it', () => {
    const onSlow = vi.fn();

    startLoading(vi.fn());
    vi.advanceTimersByTime(SLOW_LOADING_DELAY / 2);
    finishLoading(FINISHED);
    startLoading(onSlow);
    vi.advanceTimersByTime(SLOW_LOADING_DELAY / 2);

    expect(onSlow).toHaveBeenCalledTimes(1);
  });

  it('calls a spinner that replaces another straight away when loading is already slow', () => {
    const onSlow = vi.fn();

    startLoading(vi.fn());
    vi.advanceTimersByTime(SLOW_LOADING_DELAY);
    finishLoading(FINISHED);
    startLoading(onSlow);

    expect(onSlow).toHaveBeenCalledTimes(1);
  });

  it('announces slow loading and then that loading finished', () => {
    startLoading(announce);
    expect(getStatus()).toBe('');

    vi.advanceTimersByTime(SLOW_LOADING_DELAY);
    expect(getStatus()).toBe(LOADING);

    finishLoading(FINISHED);
    vi.advanceTimersByTime(0);
    expect(getStatus()).toBe(FINISHED);

    vi.advanceTimersByTime(CLEAR_DELAY);
    expect(getStatus()).toBe('');
  });

  it('does not announce finishing when loading was not announced', () => {
    startLoading(vi.fn());
    vi.advanceTimersByTime(SLOW_LOADING_DELAY);
    finishLoading(FINISHED);
    vi.runAllTimers();

    expect(getStatus()).toBe('');
  });

  it('does not announce finishing when another spinner replaces the first one', () => {
    startLoading(announce);
    vi.advanceTimersByTime(SLOW_LOADING_DELAY);
    finishLoading(FINISHED);
    startLoading(announce);
    vi.runAllTimers();

    expect(getStatus()).toBe(LOADING);
  });

  it('announces finishing only after the last spinner is gone', () => {
    startLoading(announce);
    startLoading(announce);
    vi.advanceTimersByTime(SLOW_LOADING_DELAY);
    finishLoading(FINISHED);
    vi.advanceTimersByTime(0);
    expect(getStatus()).toBe(LOADING);

    finishLoading(FINISHED);
    vi.advanceTimersByTime(0);
    expect(getStatus()).toBe(FINISHED);
  });

  it('does nothing when the live region is missing', () => {
    document.body.innerHTML = '';

    expect(() => {
      startLoading(announce);
      vi.advanceTimersByTime(SLOW_LOADING_DELAY);
      finishLoading(FINISHED);
      vi.runAllTimers();
    }).not.toThrow();
  });
});
