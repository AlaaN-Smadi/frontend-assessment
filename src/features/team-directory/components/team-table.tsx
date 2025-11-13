'use client';

import {useTranslations} from 'next-intl';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  RefreshCcw,
  Sparkles
} from 'lucide-react';

import {AvatarImage} from '../../../components/avatar-image';
import {Button} from '../../../../components/ui/button';
import {LoadingOverlay} from '../../../../components/ui/loading-overlay';
import {Skeleton} from '../../../../components/ui/skeleton';
import {cn} from '../../../lib/utils';
import {useTeamDirectoryStore} from '../../../stores/team-directory-store';
import type {SortField, SortOrder} from '../../../stores/team-directory-store';
import type {TeamMember} from '../types';

interface TeamTableProps {
  data: TeamMember[];
  isLoading: boolean;
  isFetching: boolean;
  showLoadingOverlay: boolean;
  isError: boolean;
  onRetry: () => void;
  pageInfo: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalItems: number;
  };
  onPageChange: (page: number) => void;
}

const AVATAR_SIZE = 48;

export function TeamTable({
  data,
  isLoading,
  isFetching,
  showLoadingOverlay,
  isError,
  onRetry,
  pageInfo,
  onPageChange
}: TeamTableProps) {
  const t = useTranslations('teamDirectory');

  const sortBy = useTeamDirectoryStore((state) => state.sortBy);
  const sortOrder = useTeamDirectoryStore((state) => state.sortOrder);
  const setSort = useTeamDirectoryStore((state) => state.setSort);

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: 'avatar',
      header: () => (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t('table.avatar')}
        </div>
      ),
      cell: ({row}) => (
        <div className="flex items-center justify-center">
          <AvatarImage src={row.original.avatar} alt={row.original.name} size={AVATAR_SIZE} />
        </div>
      ),
      enableSorting: false,
      size: 72
    },
    {
      accessorKey: 'name',
      header: () => (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t('table.name')}
          <SortIcon columnId="name" sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      ),
      cell: ({row}) => (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'role',
      header: () => (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t('table.role')}
          <SortIcon columnId="role" sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      ),
      cell: ({row}) => (
        <span className="inline-flex items-center rounded-full border border-blue-200/60 bg-blue-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
          {t(`roles.${row.original.role.toLowerCase() as 'admin' | 'agent' | 'creator'}`)}
        </span>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'email',
      header: () => (
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {t('table.email')}
        </div>
      ),
      cell: ({row}) => (
        <a
          href={`mailto:${row.original.email}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-500 dark:text-blue-300 dark:hover:text-blue-200"
        >
          {row.original.email}
        </a>
      ),
      enableSorting: false
    }
  ];

  const sortingState: SortingState =
    sortBy === 'NAME'
      ? [{id: 'name', desc: sortOrder === 'DESC'}]
      : sortBy === 'ROLE'
        ? [{id: 'role', desc: sortOrder === 'DESC'}]
        : [];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState
    },
    enableSortingRemoval: false,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: (updater) => {
      const nextState = typeof updater === 'function' ? updater(sortingState) : updater;

      if (!nextState?.length) {
        setSort('NAME', 'ASC');
        return;
      }

      const [nextSort] = nextState;
      const nextField = nextSort.id === 'role' ? 'ROLE' : 'NAME';
      setSort(nextField, nextSort.desc ? 'DESC' : 'ASC');
    }
  });

  const showOverlay = showLoadingOverlay && !isLoading;

  return (
    <div className="glass-panel relative overflow-hidden">
      {showOverlay ? <LoadingOverlay label={t('loading')} className="rounded-3xl" /> : null}

      <div className={showOverlay ? 'pointer-events-none opacity-60 transition' : 'transition'}>
        <div className="flex flex-col gap-4 border-b border-white/40 px-6 py-6 dark:border-slate-700/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">{t('metadata.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('metadata.description')}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onRetry} disabled={isFetching}>
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <div className="rounded-full border border-border/70 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground dark:bg-slate-900/60">
              {t('pagination.page', {
                page: pageInfo.currentPage,
                totalPages: pageInfo.totalPages
              })}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-transparent">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="text-left text-sm text-muted-foreground">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-6 py-4 align-middle',
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none transition hover:text-blue-600'
                          : ''
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border/70">
              {isLoading
                ? Array.from({length: 6}).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="bg-white/40 dark:bg-slate-900/40">
                      <td className="px-6 py-5">
                        <Skeleton className="h-12 w-12 rounded-full" />
                      </td>
                      <td className="px-6 py-5">
                        <Skeleton className="mb-2 h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                      </td>
                      <td className="px-6 py-5">
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </td>
                      <td className="px-6 py-5">
                        <Skeleton className="h-4 w-40" />
                      </td>
                    </tr>
                  ))
                : table.getRowModel().rows.map((row, rowIndex) => (
                    <tr
                      key={row.id}
                      className={cn(
                        'group transition',
                        rowIndex % 2 === 0
                          ? 'bg-white/60 dark:bg-slate-900/40'
                          : 'bg-white/40 dark:bg-slate-900/30',
                        'hover:-translate-y-[1px] hover:bg-blue-50/60 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:bg-slate-800/50'
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-5 align-middle">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {!isLoading && !data.length && !isError ? (
          <div className="flex flex-col items-center gap-3 border-t border-white/40 px-6 py-12 text-center dark:border-slate-700/60">
            <p className="text-base font-semibold text-muted-foreground">{t('emptyState')}</p>
          </div>
        ) : null}

        {isError ? (
          <div className="flex items-center justify-between gap-4 border-t border-red-200 bg-red-50/70 px-6 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
            <p>{t('errors.generic')}</p>
            <Button variant="outline" onClick={onRetry} className="border-red-300 text-red-700 dark:border-red-400 dark:text-red-100">
              <RefreshCcw className="me-2 h-4 w-4" />
              {t('errors.retry')}
            </Button>
          </div>
        ) : (
          <footer className="flex flex-col gap-3 border-t border-white/40 bg-white/60 px-6 py-4 text-sm text-muted-foreground dark:border-slate-700/60 dark:bg-slate-900/50 md:flex-row md:items-center md:justify-between">
            <p>
              {t('pagination.page', {
                page: pageInfo.currentPage,
                totalPages: pageInfo.totalPages
              })}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => onPageChange(pageInfo.currentPage - 1)}
                disabled={!pageInfo.hasPreviousPage || isFetching}
                aria-label="Previous page"
                size="icon"
              >
                ‹
              </Button>
              <Button
                variant="ghost"
                onClick={() => onPageChange(pageInfo.currentPage + 1)}
                disabled={!pageInfo.hasNextPage || isFetching}
                aria-label="Next page"
                size="icon"
              >
                ›
              </Button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function SortIcon({
  columnId,
  sortBy,
  sortOrder
}: {
  columnId: 'name' | 'role';
  sortBy: SortField;
  sortOrder: SortOrder;
}) {
  if (
    (columnId === 'name' && sortBy !== 'NAME') ||
    (columnId === 'role' && sortBy !== 'ROLE')
  ) {
    return <ArrowDownUp className="h-4 w-4 text-muted-foreground/60" />;
  }

  return sortOrder === 'DESC' ? (
    <ArrowDownWideNarrow className="h-4 w-4 text-blue-600" />
  ) : (
    <ArrowUpNarrowWide className="h-4 w-4 text-blue-600" />
  );
}

