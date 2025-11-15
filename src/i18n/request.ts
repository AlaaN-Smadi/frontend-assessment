import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'ar'] as const;

export type AppLocale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  console.log(locale);
  
  if (!locales.includes(locale as AppLocale)) {
    locale = 'en';
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});

export const i18n = {
  defaultLocale: 'en' as AppLocale,
  locales
};

