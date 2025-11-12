import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import '../globals.css';
import {AppProviders} from '../../components/providers/app-providers';
import type {AppLocale} from '../../src/i18n/request';
import {i18n} from '../../src/i18n/request';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

type LayoutProps = {
  children: ReactNode;
  params: {
    locale: AppLocale;
  };
};

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: {
    locale: AppLocale;
  };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'teamDirectory'
  });

  const title = t('metadata.title');
  const description = t('metadata.description');

  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map((locale) => [locale, `/${locale}`])
      )
    }
  };
}

export default async function LocaleLayout({children, params}: LayoutProps) {
  const {locale} = params;

  unstable_setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <body className={`min-h-screen bg-background ${inter.variable}`} data-locale={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppProviders>{children}</AppProviders>
      </NextIntlClientProvider>
    </body>
  );
}

