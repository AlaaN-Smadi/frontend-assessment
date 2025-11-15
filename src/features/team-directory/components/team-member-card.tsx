'use client';

import {Mail, Sparkles} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {forwardRef, type KeyboardEventHandler} from 'react';

import {AvatarImage} from '../../../components/avatar-image';
import {Badge} from '../../../../components/ui/badge';
import {cn} from '../../../lib/utils';
import type {TeamMember} from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
  tabIndex?: number;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export const TeamMemberCard = forwardRef<HTMLDivElement, TeamMemberCardProps>(
  ({member, tabIndex = 0, onKeyDown}, ref) => {
    const t = useTranslations('teamDirectory');

    return (
      <article
        ref={ref}
        className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/50 bg-white/85 p-6 shadow-xl shadow-blue-500/10 backdrop-blur-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20 dark:border-slate-800/60 dark:bg-slate-900/70 dark:shadow-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        tabIndex={tabIndex}
        aria-label={`${member.name} (${member.role})`}
        onKeyDown={onKeyDown}
      >
        <div className="pointer-events-none absolute -right-14 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20 dark:bg-blue-500/20" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20 dark:bg-cyan-400/15" />

        <div className="relative flex items-center gap-4">
          <AvatarImage
            src={member.avatar}
            alt={member.name}
            size={72}
            className="ring-2 ring-white/80 shadow-lg shadow-blue-500/20 transition-all group-hover:ring-blue-200/90 dark:ring-slate-800"
          />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <Sparkles className="h-4 w-4 text-blue-400 opacity-0 transition group-hover:opacity-100" />
            </div>
            <Badge className={cn('self-start capitalize bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-100')}>
              {t(`roles.${member.role.toLowerCase() as 'admin' | 'agent' | 'creator'}`)}
            </Badge>
          </div>
        </div>

        <a
          href={`mailto:${member.email}`}
          className="relative flex items-center gap-2 rounded-2xl border border-transparent bg-blue-50/60 px-4 py-3 text-sm font-medium text-blue-700 transition hover:border-blue-200 hover:bg-blue-100/80 hover:text-blue-600 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:border-blue-600/40 dark:hover:bg-blue-900/40"
        >
          <Mail className="h-4 w-4" />
          <span className="truncate">{member.email}</span>
        </a>
      </article>
    );
  }
);

TeamMemberCard.displayName = 'TeamMemberCard';
