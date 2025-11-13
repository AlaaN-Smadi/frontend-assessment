'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname, useSearchParams} from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';

const supportedLocales = [
  {value: 'en', label: 'English'},
  {value: 'ar', label: 'العربية'}
] as const;

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (nextLocale: 'en' | 'ar') => {
    if (nextLocale === locale) return;

    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = segments.slice(1).join('/');
    const nextPath = pathWithoutLocale
      ? `/${nextLocale}/${pathWithoutLocale}`
      : `/${nextLocale}`;
    const queryString = searchParams.toString();

    router.replace(`${nextPath}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <Select value={locale} onValueChange={(value) => handleSelect(value as 'en' | 'ar')}>
      <SelectTrigger className="h-10 w-[130px] rounded-full border border-border/70 bg-card/70 text-sm font-medium shadow-sm transition hover:border-blue-400 hover:text-blue-500">
        <SelectValue placeholder="Locale" />
      </SelectTrigger>
      <SelectContent>
        {supportedLocales.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

