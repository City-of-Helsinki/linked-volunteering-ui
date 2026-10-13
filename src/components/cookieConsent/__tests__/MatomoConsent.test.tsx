import React from 'react';
import { render } from '@testing-library/react';
import * as hdsReact from 'hds-react';

import { MatomoContext } from '../../matomo/matomo-context';
import MatomoConsent from '../MatomoConsent';

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

  render(
    <MatomoContext.Provider value={tracker}>
      <MatomoConsent />
    </MatomoContext.Provider>
  );

  return tracker;
};

describe('<MatomoConsent />', () => {
  it('gives Matomo consent when statistics cookies are accepted', () => {
    const tracker = renderComponent(true);

    expect(hdsReact.useGroupConsent).toHaveBeenCalledWith('statistics');
    expect(tracker.giveConsent).toHaveBeenCalledTimes(1);
    expect(tracker.forgetConsent).not.toHaveBeenCalled();
  });

  it('forgets Matomo consent when statistics cookies are not accepted', () => {
    const tracker = renderComponent(false);

    expect(tracker.forgetConsent).toHaveBeenCalledTimes(1);
    expect(tracker.giveConsent).not.toHaveBeenCalled();
  });
});
