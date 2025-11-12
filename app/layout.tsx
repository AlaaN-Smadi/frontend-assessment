import {getLocale} from 'next-intl/server';
import type {ReactNode} from 'react';

import './globals.css';

export const metadata = {
  title: 'Team Directory',
  description: 'Browse team members'
};

export default async function RootLayout({children}: {children: ReactNode}) {
  const locale = await getLocale();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      {children}
    </html>
  );
}

