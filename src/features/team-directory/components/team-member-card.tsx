'use client';

import {useTranslations} from 'next-intl';

import {AvatarImage} from '../../../components/avatar-image';
import {Badge} from '../../../../components/ui/badge';
import {cn} from '../../../lib/utils';
import type {TeamMember} from '../types';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({member}: TeamMemberCardProps) {
  const t = useTranslations('teamDirectory');

  return (
    <article
      className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
      tabIndex={0}
      aria-label={`${member.name} (${member.role})`}
    >
      <div className="flex items-center gap-3">
        <AvatarImage
          src={member.avatar}
          alt={member.name}
          size={64}
          className="transition group-hover:ring-2 group-hover:ring-blue-200"
        />
        <div>
          <h3 className="text-base font-semibold text-foreground">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.email}</p>
        </div>
      </div>
      <Badge className={cn('self-start capitalize')}>
        {t(`roles.${member.role.toLowerCase() as 'admin' | 'agent' | 'creator'}`)}
      </Badge>
    </article>
  );
}

