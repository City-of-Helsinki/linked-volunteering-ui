import { useCallback, useContext } from 'react';

import {
  MatomoContext,
  MatomoInstance,
  MatomoPageViewParams,
} from '../matomo-context';

function useMatomo() {
  const instance: MatomoInstance | null = useContext(MatomoContext);

  const trackPageView = useCallback(
    (params: MatomoPageViewParams) => instance?.trackPageView(params),
    [instance]
  );

  const giveConsent = useCallback(() => instance?.giveConsent(), [instance]);

  const forgetConsent = useCallback(
    () => instance?.forgetConsent(),
    [instance]
  );

  return { trackPageView, giveConsent, forgetConsent };
}

export default useMatomo;
