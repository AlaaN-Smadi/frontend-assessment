'use client';

import {SortAsc, SortDesc} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {useMemo} from 'react';
import { motion } from "framer-motion";

import {Skeleton} from '../../../../components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../../components/ui/select';
import {useTeamDirectoryStore} from '../../../stores/team-directory-store';
import type {SortField, SortOrder} from '../../../stores/team-directory-store';
import {TeamMemberCard} from './team-member-card';
import type {TeamMember} from '../types';

interface TeamGridProps {
  members: TeamMember[];
  isLoading: boolean;
  showLoadingOverlay: boolean;
}

type SortValue = `${SortField}-${SortOrder}`;

const SORT_OPTIONS: Array<{field: SortField; order: SortOrder}> = [
  {field: 'NAME', order: 'ASC'},
  {field: 'NAME', order: 'DESC'},
  {field: 'ROLE', order: 'ASC'},
  {field: 'ROLE', order: 'DESC'}
];

export function TeamGrid({members, isLoading, showLoadingOverlay}: TeamGridProps) {
  const t = useTranslations('teamDirectory');
  const sortBy = useTeamDirectoryStore((state) => state.sortBy);
  const sortOrder = useTeamDirectoryStore((state) => state.sortOrder);
  const setSort = useTeamDirectoryStore((state) => state.setSort);
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
  
  const cardAnimation = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  const options = useMemo(
    () => {
      const localized = SORT_OPTIONS.map((option) => ({
        ...option,
        value: `${option.field}-${option.order}` as SortValue,
        label:
          option.field === 'NAME'
            ? option.order === 'ASC'
              ? t('gridSort.nameAsc')
              : t('gridSort.nameDesc')
            : option.order === 'ASC'
              ? t('gridSort.roleAsc')
              : t('gridSort.roleDesc')
      }));

      return localized;
    },
    [t]
  );

  const optionMap = useMemo(() => {
    const map = new Map<SortValue, (typeof options)[number]>();
    options.forEach((option) => {
      map.set(option.value, option);
    });
    return map;
  }, [options]);

  const selectedValue = `${sortBy}-${sortOrder}` as SortValue;

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

  return (
    <div className="relative space-y-4">
      <div className="flex items-center justify-end">
        <Select
          value={selectedValue}
          onValueChange={(value) => {
            const next = optionMap.get(value as SortValue);
            if (next) {
              setSort(next.field, next.order);
            }
          }}
        >
          <SelectTrigger className="inline-flex h-9 w-auto items-center gap-2 rounded-full border border-border/60 bg-white/80 px-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground shadow-sm dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-muted-foreground">
            <span className="hidden sm:inline">{t('gridSort.label')}</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="min-w-[12rem] overflow-hidden rounded-2xl border border-border/60 bg-white/95 text-[0.65rem] uppercase tracking-[0.3em] shadow-xl backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/95">
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="px-3 py-3 text-left text-muted-foreground data-[state=checked]:bg-blue-500/10 data-[state=checked]:text-blue-600 dark:data-[state=checked]:bg-blue-500/20 dark:data-[state=checked]:text-blue-200"
              >
                <span className="flex w-full items-center justify-between">
                  <span>{option.label}</span>
                  {option.order === 'ASC' ? (
                    <SortAsc className="h-3.5 w-3.5 opacity-70" />
                  ) : (
                    <SortDesc className="h-3.5 w-3.5 opacity-70" />
                  )}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className={`${showLoadingOverlay ? 'pointer-events-none opacity-60 transition' : 'transition'}`}
      >
        {members.length ? (
          <motion.div
            variants={containerAnimation}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {members.map((member, i) => (
              <motion.div
                key={i}
                variants={cardAnimation}>
                <TeamMemberCard key={member.id} member={member} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 px-8 py-12 text-center text-muted-foreground shadow-sm">
            {t('emptyState')}
          </div>
        )}
      </div>
    </div>
  );
}

