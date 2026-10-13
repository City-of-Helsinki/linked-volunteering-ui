import { CookieConsentReactProps } from 'hds-react';

import { Language } from '../../types';
import siteSettings from './siteSettings.json';

export enum COOKIE_CONSENT_GROUP {
  Essential = 'essential',
  Login = 'login',
  Statistics = 'statistics',
}

export const PAGE_HEADER_ID = 'page-header';

export const getCookieConsentProps = (
  language: Language
): CookieConsentReactProps => ({
  siteSettings,
  options: { focusTargetSelector: `#${PAGE_HEADER_ID}`, language },
});
