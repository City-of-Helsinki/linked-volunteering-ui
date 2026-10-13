import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useGroupConsent } from 'hds-react';
import useMatomo from '../matomo/hooks/useMatomo';
import { COOKIE_CONSENT_GROUP } from '../cookieConsent/cookieConsentSettings';

interface Props {
  title: string;
}

const META_TITLE = 'site.meta.title';

const PageMeta: React.FC<Props> = ({ title }) => {
  const location = useLocation();
  const intl = useIntl();
  const { formatMessage } = intl;
  const { trackPageView } = useMatomo();
  const statisticsConsent = useGroupConsent(COOKIE_CONSENT_GROUP.Statistics);

  const translatedTitle =
    title !== META_TITLE
      ? `${formatMessage({
          id: title,
        })} - ${formatMessage({ id: META_TITLE })}`
      : formatMessage({ id: META_TITLE });

  // Track page view
  useDeepCompareEffect(() => {
    if (statisticsConsent) {
      trackPageView({
        documentTitle: translatedTitle,
        href: window.location.href,
      });
    }
  }, [
    { pathname: location.pathname, search: location.search },
    statisticsConsent,
  ]);

  return (
    <Helmet>
      <title>{translatedTitle}</title>
    </Helmet>
  );
};

export default PageMeta;
