import React from 'react';
import Helmet from 'react-helmet';

import useLocale from '../hooks/useLocale';

function CommonMeta() {
  const locale = useLocale();

  const path = window.location.pathname.replace(`/${locale}/`, '');

  return (
    <Helmet>
      <html lang={locale} />
      <link rel='alternate' hrefLang='fi' href={`/fi/${path}`} />
      <link rel='alternate' hrefLang='sv' href={`/sv/${path}`} />
      <link rel='alternate' hrefLang='en' href={`/en/${path}`} />
    </Helmet>
  );
}

export default CommonMeta;
