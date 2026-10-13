import { useEffect } from 'react';
import { useGroupConsent } from 'hds-react';

import useMatomo from '../matomo/hooks/useMatomo';
import { COOKIE_CONSENT_GROUP } from './cookieConsentSettings';

// Keeps Matomo's consent in sync with the user's statistics cookie consent.
const MatomoConsent = () => {
  const statisticsConsent = useGroupConsent(COOKIE_CONSENT_GROUP.Statistics);
  const { giveConsent, forgetConsent } = useMatomo();

  useEffect(() => {
    if (statisticsConsent) {
      giveConsent();
    } else {
      forgetConsent();
    }
  }, [giveConsent, forgetConsent, statisticsConsent]);

  return null;
};

export default MatomoConsent;
