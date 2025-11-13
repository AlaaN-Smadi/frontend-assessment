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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({length: 6}).map((_, index) => (
          <div
            key={index}
            className="glass-panel flex flex-col gap-4 rounded-3xl p-6 shadow-lg shadow-blue-500/10"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-3 w-40 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-8 w-28 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="rounded-3xl border border-dashed border-border/70 px-8 py-12 text-center text-muted-foreground shadow-sm">
        {t('emptyState')}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  );
}

