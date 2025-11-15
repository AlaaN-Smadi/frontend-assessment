import createIntlMiddleware from 'next-intl/middleware';

import {i18n} from './src/i18n/request';

export default createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
});

export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};

