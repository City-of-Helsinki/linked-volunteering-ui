import React from 'react';
import { useIntl } from 'react-intl';
import Helmet from 'react-helmet';

interface Props {
  title: string;
}

const AccessDeniedMeta: React.FC<Props> = ({ title }) => {
  const intl = useIntl();
  const { formatMessage } = intl;

  const translatedTitle =
    title !== 'site.meta.title'
      ? `${formatMessage({
          id: title
        })} - ${formatMessage({ id: 'site.meta.title' })}`
      : formatMessage({ id: 'site.meta.title' });

  return (
    <Helmet>
      <title>{translatedTitle}</title>
    </Helmet>
  );
};

export default AccessDeniedMeta;
