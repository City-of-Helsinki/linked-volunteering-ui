import { useMatomo } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface Props {
  title: string;
}

const PageMeta: React.FC<Props> = ({ title }) => {
  const location = useLocation();
  const intl = useIntl();
  const { formatMessage } = intl;
  const { trackPageView } = useMatomo();

  const translatedTitle =
    title !== 'site.meta.title'
      ? `${formatMessage({
          id: title
        })} - ${formatMessage({ id: 'site.meta.title' })}`
      : formatMessage({ id: 'site.meta.title' });

  // Track page view
  useDeepCompareEffect(() => {
    trackPageView({
      documentTitle: translatedTitle,
      href: window.location.href
    });
  }, [{ pathname: location.pathname, search: location.search }]);

  return (
    <Helmet>
      <title>{translatedTitle}</title>
    </Helmet>
  );
};

export default PageMeta;
