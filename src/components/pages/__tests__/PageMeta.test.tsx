import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as hdsReact from 'hds-react';

import renderWithProviders from '../../../test-utils/renderWithProviders';
import { MatomoContext } from '../../matomo/matomo-context';
import PageMeta from '../PageMeta';

vi.mock('hds-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('hds-react')>()),
  useGroupConsent: vi.fn(),
}));

const renderComponent = (statisticsConsent: boolean) => {
  vi.mocked(hdsReact.useGroupConsent).mockReturnValue(statisticsConsent);

  const tracker = {
    trackPageView: vi.fn(),
    giveConsent: vi.fn(),
    forgetConsent: vi.fn(),
  };

  renderWithProviders(
    <MemoryRouter>
      <MatomoContext.Provider value={tracker}>
        <PageMeta title="site.meta.title" />
      </MatomoContext.Provider>
    </MemoryRouter>
  );

  return tracker;
};

describe('<PageMeta />', () => {
  it('tracks the page view when statistics cookies are accepted', () => {
    const tracker = renderComponent(true);

    expect(tracker.trackPageView).toHaveBeenCalledTimes(1);
  });

  it('does not track the page view without statistics consent', () => {
    const tracker = renderComponent(false);

    expect(tracker.trackPageView).not.toHaveBeenCalled();
  });
});
