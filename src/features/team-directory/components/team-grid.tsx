'use client';

import {useTranslations} from 'next-intl';

import {Skeleton} from '../../../../components/ui/skeleton';
import {TeamMemberCard} from './team-member-card';
import type {TeamMember} from '../types';

interface TeamGridProps {
  members: TeamMember[];
  isLoading: boolean;
}

export function TeamGrid({members, isLoading}: TeamGridProps) {
  const t = useTranslations('teamDirectory');

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({length: 6}).map((_, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="mt-4 h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="rounded-lg border border-dashed border-border px-6 py-10 text-center text-muted-foreground">
        {t('emptyState')}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

