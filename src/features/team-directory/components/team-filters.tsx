'use client';

import {Label} from '@radix-ui/react-label';
import {Search} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useCallback} from 'react';

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

export function TeamFilters() {
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
    <section className="flex flex-col gap-4 rounded-lg border border-border bg-card/80 p-4 shadow-sm lg:flex-row lg:items-end lg:justify-between">
      <div className="flex w-full flex-col gap-2 lg:flex-1">
        <Label htmlFor="team-search" className="text-sm font-medium text-muted-foreground">
          {tFilters('searchPlaceholder')}
        </Label>
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute inset-y-0 start-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="team-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={tFilters('searchPlaceholder')}
            className="ps-9"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2 lg:max-w-xs">
        <Label htmlFor="role-filter" className="text-sm font-medium text-muted-foreground">
          {tFilters('roleFilter')}
        </Label>
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger id="role-filter">
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

      <div className="flex w-full justify-end lg:w-auto">
        <Button variant="outline" onClick={resetFilters} className="w-full lg:w-auto">
          {tFilters('clearFilters')}
        </Button>
      </div>
    </section>
  );
}

