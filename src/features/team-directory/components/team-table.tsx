'use client';

import {useTranslations} from 'next-intl';
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import {ArrowDownUp, ArrowDownWideNarrow, ArrowUpNarrowWide, RefreshCcw} from 'lucide-react';

import {AvatarImage} from '../../../components/avatar-image';
import {Button} from '../../../../components/ui/button';
import {Skeleton} from '../../../../components/ui/skeleton';
import {cn} from '../../../lib/utils';
import {useTeamDirectoryStore} from '../../../stores/team-directory-store';
import type {SortField, SortOrder} from '../../../stores/team-directory-store';
import type {TeamMember} from '../types';

interface TeamTableProps {
  data: TeamMember[];
  isLoading: boolean;
  isFetching: boolean;
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

const AVATAR_SIZE = 40;

export function TeamTable({
  data,
  isLoading,
  isFetching,
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
      header: t('table.avatar'),
      cell: ({row}) => (
        <div className="flex items-center justify-center">
          <AvatarImage src={row.original.avatar} alt={row.original.name} size={AVATAR_SIZE} />
        </div>
      ),
      enableSorting: false,
      size: 64
    },
    {
      accessorKey: 'name',
      header: () => (
        <div className="flex items-center gap-2">
          <span>{t('table.name')}</span>
          <SortIcon columnId="name" sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      ),
      cell: ({row}) => (
        <div>
          <p className="font-medium text-foreground">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'role',
      header: () => (
        <div className="flex items-center gap-2">
          <span>{t('table.role')}</span>
          <SortIcon columnId="role" sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      ),
      cell: ({row}) => (
        <span className="rounded-full border border-muted px-2 py-1 text-xs font-medium capitalize text-muted-foreground">
          {t(`roles.${row.original.role.toLowerCase() as 'admin' | 'agent' | 'creator'}`)}
        </span>
      ),
      enableSorting: true
    },
    {
      accessorKey: 'email',
      header: t('table.email'),
      cell: ({row}) => (
        <a href={`mailto:${row.original.email}`} className="text-sm text-blue-600">
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

  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-muted/60 text-left text-sm font-semibold text-muted-foreground">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={cn(
                      'px-4 py-3',
                      header.column.getCanSort() ? 'cursor-pointer select-none' : ''
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
          <tbody>
            {isLoading
              ? Array.from({length: 5}).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-t border-border">
                    <td className="px-4 py-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="mb-2 h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="px-4 py-3">
                      <Skeleton className="h-4 w-40" />
                    </td>
                  </tr>
                ))
              : table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-t border-border">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {!isLoading && !data.length && !isError ? (
        <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
          <p className="text-base font-medium text-muted-foreground">{t('emptyState')}</p>
        </div>
      ) : null}

      {isError ? (
        <div className="flex items-center justify-between gap-4 border-t border-border bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{t('errors.generic')}</p>
          <Button variant="outline" onClick={onRetry} className="border-red-300 text-red-700">
            <RefreshCcw className="me-2 h-4 w-4" />
            {t('errors.retry')}
          </Button>
        </div>
      ) : (
        <footer className="flex flex-col gap-3 border-t border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            {t('pagination.page', {
              page: pageInfo.currentPage,
              totalPages: pageInfo.totalPages
            })}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onPageChange(pageInfo.currentPage - 1)}
              disabled={!pageInfo.hasPreviousPage || isFetching}
              aria-label="Previous page"
            >
              ‹
            </Button>
            <Button
              variant="outline"
              onClick={() => onPageChange(pageInfo.currentPage + 1)}
              disabled={!pageInfo.hasNextPage || isFetching}
              aria-label="Next page"
            >
              ›
            </Button>
          </div>
        </footer>
      )}
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

