import { useIntl } from 'react-intl';

import { Language } from '../types';

export default (): Language => {
  const intl = useIntl();
  const { locale } = intl;

  switch (locale) {
    case 'en':
    case 'fi':
    case 'sv':
      return locale;
    default:
      return 'fi';
  }
};
