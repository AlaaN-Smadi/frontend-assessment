import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

import {TeamDirectory} from '../../../src/features/team-directory/components/team-directory';
import type {AppLocale} from '../../../src/i18n/request';

type PageParams = {
  params: {
    locale: AppLocale;
  };
};

export async function generateMetadata({params}: PageParams): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'teamDirectory'
  });

  return {
    title: t('metadata.title'),
    description: t('metadata.description')
  };
}

export default function TeamDirectoryPage() {
  return <TeamDirectory />;
}

