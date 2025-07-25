import { useMatomo } from '@datapunt/matomo-tracker-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import useDeepCompareEffect from 'use-deep-compare-effect';

interface Props {
  title: string;
}

const META_TITLE = 'site.meta.title';

const PageMeta: React.FC<Props> = ({ title }) => {
  const location = useLocation();
  const intl = useIntl();
  const { formatMessage } = intl;
  const { trackPageView } = useMatomo();

  const translatedTitle =
    title !== META_TITLE
      ? `${formatMessage({
          id: title,
        })} - ${formatMessage({ id: META_TITLE })}`
      : formatMessage({ id: META_TITLE });

  // Track page view
  useDeepCompareEffect(() => {
    trackPageView({
      documentTitle: translatedTitle,
      href: window.location.href,
    });
  }, [{ pathname: location.pathname, search: location.search }]);

  return (
    <Helmet>
      <title>{translatedTitle}</title>
    </Helmet>
  );
};

export default PageMeta;
