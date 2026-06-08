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

  return { trackPageView };
}

export default useMatomo;
