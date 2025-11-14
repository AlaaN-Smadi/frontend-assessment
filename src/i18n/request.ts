import {getRequestConfig} from 'next-intl/server';

const locales = ['en', 'ar'] as const;

export type AppLocale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  if (!locales.includes(requested as AppLocale)) {
    throw new Error(`Unsupported locale: ${requested}`);
  }

  const messages = (await import(`../../messages/${requested}.json`)).default;

  return {
    locale: requested,
    messages
  };
});

export const i18n = {
  defaultLocale: 'en' as AppLocale,
  locales
};

