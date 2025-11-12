'use client';

import {NetworkStatus} from '@apollo/client';
import {useTranslations} from 'next-intl';
import {useEffect, useMemo, useRef, useState} from 'react';

import {Button} from '../../../../components/ui/button';
import {useDebouncedValue} from '../../../hooks/use-debounced-value';
import {useTeamDirectoryStore} from '../../../stores/team-directory-store';
import {TeamGrid} from './team-grid';
import {TeamFilters} from './team-filters';
import {TeamTable} from './team-table';
import {useTeamMembers} from '../hooks/use-team-members';

export function TeamDirectory() {
  const t = useTranslations('teamDirectory');

  const searchTerm = useTeamDirectoryStore((state) => state.searchTerm);
  const role = useTeamDirectoryStore((state) => state.role);
  const currentPage = useTeamDirectoryStore((state) => state.currentPage);
  const limit = useTeamDirectoryStore((state) => state.limit);
  const sortBy = useTeamDirectoryStore((state) => state.sortBy);
  const sortOrder = useTeamDirectoryStore((state) => state.sortOrder);
  const setPage = useTeamDirectoryStore((state) => state.setPage);
  const setPagination = useTeamDirectoryStore((state) => state.setPagination);

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
    
    console.log(query.error);
    
  const isError = Boolean(query.error);

  return (
    <div className="flex flex-col gap-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          {t('metadata.title')}
        </h1>
        <p className="text-muted-foreground">{t('metadata.description')}</p>
      </header>

      <TeamFilters />

      <section className="block lg:hidden">
        <TeamGrid members={gridMembers} isLoading={isInitialLoading && currentPage === 1} />
        {isError ? (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {t('errors.generic')}
          </p>
        ) : null}
        {pageInfo.hasNextPage ? (
          <div className="mt-4 flex justify-center">
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={isFetching}>
              {isFetching ? `${t('loadMore')}...` : t('loadMore')}
            </Button>
          </div>
        ) : null}
      </section>

      <section className="hidden lg:block">
        <TeamTable
          data={members}
          isLoading={isInitialLoading}
          isFetching={isFetching}
          isError={isError}
          onRetry={() => query.refetch(variables)}
          pageInfo={pageInfo}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
}

