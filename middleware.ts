import createIntlMiddleware from 'next-intl/middleware';

import {i18n} from './src/i18n/request';

export default createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

