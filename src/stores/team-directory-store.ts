import {create} from 'zustand';

export type TeamMemberRole = 'ADMIN' | 'AGENT' | 'CREATOR';
export type RoleFilter = TeamMemberRole | 'ALL';
export type SortField = 'NAME' | 'ROLE';
export type SortOrder = 'ASC' | 'DESC';

interface TeamDirectoryState {
  searchTerm: string;
  role: RoleFilter;
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  sortBy: SortField;
  sortOrder: SortOrder;
}

interface TeamDirectoryActions {
  setSearchTerm: (value: string) => void;
  setRole: (role: RoleFilter) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSort: (sortBy: SortField, sortOrder: SortOrder) => void;
  setPagination: (payload: {totalPages: number; totalItems: number}) => void;
  resetFilters: () => void;
}

export type TeamDirectoryStore = TeamDirectoryState & TeamDirectoryActions;

const DEFAULT_LIMIT = 10;

export const useTeamDirectoryStore = create<TeamDirectoryStore>((set) => ({
  searchTerm: '',
  role: 'ALL',
  currentPage: 1,
  limit: DEFAULT_LIMIT,
  totalPages: 1,
  totalItems: 0,
  sortBy: 'NAME',
  sortOrder: 'ASC',
  setSearchTerm: (value) =>
    set({
      searchTerm: value,
      currentPage: 1
    }),
  setRole: (role) =>
    set({
      role,
      currentPage: 1
    }),
  setPage: (page) =>
    set({
      currentPage: page
    }),
  setLimit: (limit) =>
    set({
      limit,
      currentPage: 1
    }),
  setSort: (sortBy, sortOrder) =>
    set({
      sortBy,
      sortOrder,
      currentPage: 1
    }),
  setPagination: ({totalPages, totalItems}) =>
    set({
      totalPages,
      totalItems
    }),
  resetFilters: () =>
    set({
      searchTerm: '',
      role: 'ALL',
      currentPage: 1,
      sortBy: 'NAME',
      sortOrder: 'ASC'
    })
}));

