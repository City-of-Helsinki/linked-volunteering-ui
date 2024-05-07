import { format } from 'date-fns';
import { enGB as en, fi, sv } from 'date-fns/locale';
import get from 'lodash/get';
import isNumber from 'lodash/isNumber';

const locales = { en, fi, sv };

export default (date: Date, timeFormat = 'HH.mm', locale = 'fi'): string => {
  const d = isNumber(date) ? date : new Date(date);
  return format(d, timeFormat, {
    locale: get(locales, locale),
  }).trim();
};
