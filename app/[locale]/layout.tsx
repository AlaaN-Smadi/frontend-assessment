import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import type {ReactNode} from 'react';

import '../globals.css';
import {AppProviders} from '../../components/providers/app-providers';
import {SiteHeader} from '../../components/layout/site-header';
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

  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations('common');

  return (
    <body className={`min-h-screen bg-background ${inter.variable}`} data-locale={locale} lang={locale}>
      <a href="#main-content" className="skip-link">
        {tCommon('skipToContent')}
      </a>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AppProviders>
          <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),rgba(2,6,23,0.9)_60%)]">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,_rgba(59,130,246,0.12),rgba(14,165,233,0.08)_40%,transparent_70%)] dark:bg-[linear-gradient(120deg,_rgba(59,130,246,0.15),rgba(14,165,233,0.1)_45%,rgba(2,6,23,0.95)_80%)]" />
            <SiteHeader />
            <main
              id="main-content"
              className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 xl:px-10"
            >
              {children}
            </main>
          </div>
        </AppProviders>
      </NextIntlClientProvider>
    </body>
  );
}

