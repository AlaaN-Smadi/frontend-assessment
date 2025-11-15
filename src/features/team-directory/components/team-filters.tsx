'use client';

import {Label} from '@radix-ui/react-label';
import {Search} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useCallback, type RefObject} from 'react';

import {Button} from '../../../../components/ui/button';
import {Input} from '../../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../../components/ui/select';
import {useTeamDirectoryStore} from '../../../stores/team-directory-store';

const ROLE_OPTIONS = ['ALL', 'ADMIN', 'AGENT', 'CREATOR'] as const;

type TeamFiltersProps = {
  searchInputRef?: RefObject<HTMLInputElement>;
};

export function TeamFilters({searchInputRef}: TeamFiltersProps) {
  const tFilters = useTranslations('teamDirectory.filters');
  const tRoles = useTranslations('teamDirectory.roles');

  const searchTerm = useTeamDirectoryStore((state) => state.searchTerm);
  const role = useTeamDirectoryStore((state) => state.role);
  const setSearchTerm = useTeamDirectoryStore((state) => state.setSearchTerm);
  const setRole = useTeamDirectoryStore((state) => state.setRole);
  const resetFilters = useTeamDirectoryStore((state) => state.resetFilters);

  const handleRoleChange = useCallback(
    (value: string) => {
      if (value === 'ALL' || value === 'ADMIN' || value === 'AGENT' || value === 'CREATOR') {
        setRole(value);
      }
    },
    [setRole]
  );

  return (
    <section className="glass-panel relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -left-10 top-3 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl dark:bg-blue-400/20" />
      <div className="pointer-events-none absolute -right-14 bottom-0 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl dark:bg-cyan-500/10" />

      <div className="relative grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <Label htmlFor="team-search" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {tFilters('searchPlaceholder')}
          </Label>
          <div className="mt-2 relative flex items-center">
            <Search className="pointer-events-none absolute inset-y-0 start-4 h-4 w-4 text-muted-foreground top-4" />
            <Input
              id="team-search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={tFilters('searchPlaceholder')}
              className="h-12 rounded-full border border-transparent bg-white/80 ps-11 text-sm shadow-inner shadow-blue-500/5 transition focus:border-blue-400 focus:bg-white focus-visible:ring-blue-500 dark:bg-slate-900/70"
              ref={searchInputRef}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <Label htmlFor="role-filter" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {tFilters('roleFilter')}
          </Label>
          <div className="mt-2">
            <Select value={role} onValueChange={handleRoleChange}>
              <SelectTrigger
                id="role-filter"
                className="h-12 rounded-full border border-transparent bg-white/80 text-sm font-medium shadow-inner shadow-blue-500/5 transition hover:border-blue-300 focus:border-blue-400 focus:bg-white focus-visible:ring-blue-500 dark:bg-slate-900/70"
              >
                <SelectValue placeholder={tFilters('roleFilter')} />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === 'ALL'
                      ? tRoles('all')
                      : tRoles(option.toLowerCase() as 'admin' | 'agent' | 'creator')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 lg:col-span-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            &nbsp;
          </span>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="w-full rounded-full border border-border/60 bg-white/70 text-sm font-semibold text-muted-foreground hover:border-blue-400 hover:text-blue-500 dark:bg-slate-900/70">
            {tFilters('clearFilters')}
          </Button>
        </div>
      </div>
    </section>
  );
}

