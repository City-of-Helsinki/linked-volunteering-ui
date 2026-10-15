import React from 'react';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import { act, fireEvent, screen } from '@testing-library/react';

import useFocusOnPageChange from '../../../hooks/useFocusOnPageChange';
import renderWithProviders from '../../../test-utils/renderWithProviders';
import LoadingSpinner from '../LoadingSpinner';
import { LOADING_STATUS_ID, SLOW_LOADING_DELAY } from '../loadingStatus';

// Like the pages of the app, which use the hook through Layout
function FirstPage() {
  const ref = useFocusOnPageChange<HTMLDivElement>();

  return (
    <div ref={ref}>
      <Link to="/loading">Go to a loading page</Link>
    </div>
  );
}

const renderComponent = (initialEntry: string) =>
  renderWithProviders(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/first" element={<FirstPage />} />
        <Route path="/loading" element={<LoadingSpinner />} />
      </Routes>
    </MemoryRouter>
  );

const getStatus = () => document.getElementById(LOADING_STATUS_ID);

const waitForSlowLoading = () =>
  act(() => {
    vi.advanceTimersByTime(SLOW_LOADING_DELAY);
  });

describe('<LoadingSpinner />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    const status = document.createElement('div');
    status.id = LOADING_STATUS_ID;
    document.body.appendChild(status);
  });

  afterEach(() => {
    vi.useRealTimers();
    getStatus()?.remove();
  });

  describe('when the app is opened', () => {
    it('announces slow loading in the live region without moving focus', () => {
      renderComponent('/loading');
      expect(getStatus()).toBeEmptyDOMElement();

      waitForSlowLoading();

      expect(getStatus()).toHaveTextContent('Page is loading');
      expect(document.body).toHaveFocus();
    });

    it('announces that loading finished when the spinner is removed', () => {
      const { unmount } = renderComponent('/loading');

      waitForSlowLoading();
      unmount();
      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(getStatus()).toHaveTextContent('Page has finished loading');
    });
  });

  describe('after a page change', () => {
    it('moves focus to the loading text when loading is slow', () => {
      renderComponent('/first');

      // userEvent hangs with fake timers, and a plain click is enough here
      fireEvent.click(
        screen.getByRole('link', { name: 'Go to a loading page' })
      );
      expect(screen.getByText('Page is loading')).not.toHaveFocus();

      waitForSlowLoading();

      expect(screen.getByText('Page is loading')).toHaveFocus();
      expect(getStatus()).toBeEmptyDOMElement();
    });
  });
});
