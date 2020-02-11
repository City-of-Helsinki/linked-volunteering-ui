import { setLocale } from 'yup';

import fi from '../translations/fi.json';
import en from '../translations/en.json';
import sv from '../translations/sv.json';
import defaultValidationMessages from '../translations/validation/defaultMessages';

setLocale(defaultValidationMessages);

export default { fi, en, sv };
