import {redirect} from 'next/navigation';

import {i18n} from '../src/i18n/request';

export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}

