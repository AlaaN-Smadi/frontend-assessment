'use client';

import {NetworkStatus} from '@apollo/client';
import type {Route} from 'next';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useRef, useState} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {Button} from '../../../../components/ui/button';
import {useDebouncedValue} from '../../../hooks/use-debounced-value';
import {useTeamDirectoryStore} from '../../../stores/team-directory-store';
import type {RoleFilter, SortField, SortOrder, TeamDirectoryStore} from '../../../stores/team-directory-store';
import {TeamGrid} from './team-grid';
import {TeamFilters} from './team-filters';
import {TeamTable} from './team-table';
import {useTeamMembers} from '../hooks/use-team-members';
import LocaleLoading from '../../../../components/ui/loading';
import Typewriter from '../../../../components/animations/Typewriter';

const ROLE_QUERY_MAP: Record<string, RoleFilter> = {
  all: 'ALL',
  admin: 'ADMIN',
  agent: 'AGENT',
  creator: 'CREATOR'
};

const SORT_FIELD_QUERY_MAP: Record<string, SortField> = {
  name: 'NAME',
  role: 'ROLE'
};

const SORT_ORDER_QUERY_MAP: Record<string, SortOrder> = {
  asc: 'ASC',
  desc: 'DESC'
};

const VIEW_MODE_STORAGE_KEY = 'team-directory-view-mode';

export function TeamDirectory() {
  const t = useTranslations('teamDirectory');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTerm = useTeamDirectoryStore((state: TeamDirectoryStore) => state.searchTerm);
  const role = useTeamDirectoryStore((state: TeamDirectoryStore) => state.role);
  const currentPage = useTeamDirectoryStore((state: TeamDirectoryStore) => state.currentPage);
  const limit = useTeamDirectoryStore((state: TeamDirectoryStore) => state.limit);
  const sortBy = useTeamDirectoryStore((state: TeamDirectoryStore) => state.sortBy);
  const sortOrder = useTeamDirectoryStore((state: TeamDirectoryStore) => state.sortOrder);
  const setSearchTerm = useTeamDirectoryStore((state: TeamDirectoryStore) => state.setSearchTerm);
  const setRole = useTeamDirectoryStore((state: TeamDirectoryStore) => state.setRole);
  const setPage = useTeamDirectoryStore((state: TeamDirectoryStore) => state.setPage);
  const setPagination = useTeamDirectoryStore((state: TeamDirectoryStore) => state.setPagination);
  const resetFilters = useTeamDirectoryStore((state: TeamDirectoryStore) => state.resetFilters);
  const unsafeHydrate = useTeamDirectoryStore((state: TeamDirectoryStore) => state.unsafeHydrate);

  const hasSyncedFromQuery = useRef(false);
  const lastQueryRef = useRef('');

  const debouncedSearch = useDebouncedValue(searchTerm, 300);

  const variables = useMemo(
    () => ({
      page: currentPage,
      limit,
      role: role === 'ALL' ? undefined : role,
      searchTerm: debouncedSearch || undefined,
      sortBy,
      sortOrder
    }),
    [currentPage, limit, role, debouncedSearch, sortBy, sortOrder]
  );

  const query = useTeamMembers(variables);

  const [gridMembers, setGridMembers] = useState(query.data?.teamMembers.nodes ?? []);
  const [showFetchingOverlay, setShowFetchingOverlay] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const userSelectedView = useRef(false);
  const filterKeyRef = useRef<string>('');

  const members = query.data?.teamMembers.nodes ?? [];
  const pageInfo = query.data?.teamMembers.pageInfo ?? {
    currentPage,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    totalItems: 0
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storedView = window.localStorage.getItem(VIEW_MODE_STORAGE_KEY);

    if (storedView === 'grid' || storedView === 'table') {
      userSelectedView.current = true;
      setViewMode(storedView);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const applyPreferredView = () => {
      if (!userSelectedView.current) {
        setViewMode(mediaQuery.matches ? 'table' : 'grid');
      }
    };

    applyPreferredView();

    const listener = (event: MediaQueryListEvent) => {
      if (!userSelectedView.current) {
        setViewMode(event.matches ? 'table' : 'grid');
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', listener);
      return () => {
        mediaQuery.removeEventListener('change', listener);
      };
    }

    mediaQuery.onchange = listener;
    return () => {
      mediaQuery.onchange = null;
    };
  }, []);

  useEffect(() => {
    if (query.data?.teamMembers.nodes) {
      const nodes = query.data.teamMembers.nodes;
      const filterKey = JSON.stringify({role, search: debouncedSearch, sortBy, sortOrder});
      const filtersChanged = filterKeyRef.current !== filterKey;

      setGridMembers((previous) => {
        if (filtersChanged || currentPage === 1) {
          return nodes;
        }

        const existingIds = new Set(previous.map((member) => member.id));
        const merged = [...previous];

        nodes.forEach((member) => {
          if (!existingIds.has(member.id)) {
            merged.push(member);
          }
        });

        return merged;
      });

      filterKeyRef.current = filterKey;
    }

    if (query.data?.teamMembers.pageInfo) {
      const info = query.data.teamMembers.pageInfo;
      setPagination({totalPages: info.totalPages, totalItems: info.totalItems});

      if (info.currentPage !== currentPage) {
        setPage(info.currentPage);
      }
    }
  }, [
    query.data?.teamMembers.nodes,
    query.data?.teamMembers.pageInfo,
    setPagination,
    setPage,
    currentPage,
    role,
    debouncedSearch,
    sortBy,
    sortOrder
  ]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage === currentPage) {
      return;
    }

    if (pageInfo.totalPages && nextPage > pageInfo.totalPages) {
      return;
    }

    setPage(nextPage);
  };

  const isInitialLoading = query.networkStatus === NetworkStatus.loading;
  const isFetching =
    query.networkStatus === NetworkStatus.refetch ||
    query.networkStatus === NetworkStatus.setVariables;
  const isError = Boolean(query.error);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (isFetching) {
      setShowFetchingOverlay(true);
    } else {
      timeout = setTimeout(() => {
        setShowFetchingOverlay(false);
      }, 500);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isFetching]);

  const handleViewChange = (mode: 'grid' | 'table') => {
    userSelectedView.current = true;
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VIEW_MODE_STORAGE_KEY, mode);
    }
  };

  const overlayActive = showFetchingOverlay || isFetching;
  const isGridView = viewMode === 'grid';

  useEffect(() => {
    const currentParams = searchParams.toString();

    if (hasSyncedFromQuery.current && currentParams === lastQueryRef.current) {
      return;
    }

    const params = new URLSearchParams(currentParams);
    const search = params.get('search') ?? '';
    const roleParam = params.get('role')?.toLowerCase();
    const nextRole = roleParam ? ROLE_QUERY_MAP[roleParam] ?? 'ALL' : 'ALL';
    const sortFieldParam = params.get('sort')?.toLowerCase();
    const sortOrderParam = params.get('order')?.toLowerCase();

    const nextSort = SORT_FIELD_QUERY_MAP[sortFieldParam ?? ''] ?? 'NAME';
    const nextOrder = SORT_ORDER_QUERY_MAP[sortOrderParam ?? ''] ?? 'ASC';

    const {
      searchTerm: currentSearchTerm,
      role: currentRole,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder
    } = useTeamDirectoryStore.getState();

    if (search !== currentSearchTerm) {
      setSearchTerm(search);
    }

    if (nextRole !== currentRole) {
      setRole(nextRole);
    }

    if (nextSort !== currentSortBy || nextOrder !== currentSortOrder) {
      unsafeHydrate({sortBy: nextSort, sortOrder: nextOrder});
    }

    hasSyncedFromQuery.current = true;
    lastQueryRef.current = params.toString();
  }, [searchParams, setRole, setSearchTerm, unsafeHydrate]);

  useEffect(() => {
    if (!hasSyncedFromQuery.current) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }

    if (role !== 'ALL') {
      params.set('role', role.toLowerCase());
    } else {
      params.delete('role');
    }

    if (sortBy !== 'NAME') {
      params.set('sort', sortBy.toLowerCase());
    } else {
      params.delete('sort');
    }

    if (sortOrder !== 'ASC') {
      params.set('order', sortOrder.toLowerCase());
    } else {
      params.delete('order');
    }

    const next = params.toString();

    if (next === lastQueryRef.current) {
      return;
    }

    lastQueryRef.current = next;

    const query = next ? `?${next}` : '';
    router.replace(`${pathname}${query}` as Route, {scroll: false});
  }, [pathname, role, router, searchParams, searchTerm, sortBy, sortOrder]);

  return (
    <div className="space-y-10">
      {
        isInitialLoading ?
        <LocaleLoading /> : null
      }
      
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-2xl transition dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/30 sm:p-10">
        <div className="pointer-events-none absolute -left-24 top-4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/25" />
        <div className="pointer-events-none absolute -right-12 -bottom-6 h-80 w-80 rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-500/20" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 shadow-sm dark:border-blue-500/40 dark:bg-blue-500/15 dark:text-blue-200">
              {t('hero.chip')}
            </span>
            <div className="space-y-4">
              
              <Typewriter text={t('hero.title')} speed={40} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl" />

              <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>

          <div className="hidden flex-col items-end gap-4 text-right lg:flex">
            <p className="text-sm font-medium text-muted-foreground">
              {t('pagination.page', {
                page: pageInfo.currentPage,
                totalPages: pageInfo.totalPages || 1
              })}
            </p>
            <Button
              onClick={() => {
                resetFilters();
                handlePageChange(1);
              }}
              disabled={isFetching}
            >
              {t('hero.cta')}
            </Button>
          </div>
        </div>

        <div className="relative mt-8">
          <TeamFilters />
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/60 bg-white/70 px-5 py-4 shadow-md backdrop-blur lg:px-6 dark:border-slate-800/70 dark:bg-slate-900/50">
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
            {t('view.toggleLabel')}
          </span>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/80 p-1 dark:border-slate-700/60 dark:bg-slate-900/60">
            <Button
              size="sm"
              variant={isGridView ? 'primary' : 'ghost'}
              aria-pressed={isGridView}
              onClick={() => handleViewChange('grid')}
            >
              {t('view.grid')}
            </Button>
            <Button
              size="sm"
              variant={!isGridView ? 'primary' : 'ghost'}
              aria-pressed={!isGridView}
              onClick={() => handleViewChange('table')}
            >
              {t('view.table')}
            </Button>
          </div>
        </div>

        {isGridView ? (
          <div className="space-y-6">
            <TeamGrid
              members={gridMembers}
              isLoading={isInitialLoading && currentPage === 1}
              showLoadingOverlay={overlayActive}
            />

            {isError ? (
              <p className="rounded-2xl border border-red-200/70 bg-red-50/70 px-4 py-3 text-sm font-medium text-red-700 shadow-sm dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                {t('errors.generic')}
              </p>
            ) : null}

            {pageInfo.hasNextPage ? (
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={overlayActive}
                >
                  {overlayActive ? t('loading') : t('loadMore')}
                </Button>
              </div>
            ) : null}

            <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
              {t('view.mobileHint')}
            </p>
          </div>
        ) : (
          <TeamTable
            data={members}
            isLoading={isInitialLoading}
            isFetching={isFetching}
            showLoadingOverlay={overlayActive}
            isError={isError}
            onRetry={() => query.refetch(variables)}
            pageInfo={pageInfo}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </div>
  );
}

