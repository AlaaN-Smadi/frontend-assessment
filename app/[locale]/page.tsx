import {redirect} from 'next/navigation';

import type {AppLocale} from '../../src/i18n/request';

export default function LocaleIndexPage({
  params
}: {
  params: {
    locale: AppLocale;
  };
}) {
  redirect(`/${params.locale}/team-directory`);
}

