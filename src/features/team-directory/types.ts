import type {RoleFilter, SortField, SortOrder, TeamMemberRole} from '../../stores/team-directory-store';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  avatar: string;
}

export interface TeamMembersResponse {
  teamMembers: {
    nodes: TeamMember[];
    pageInfo: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface TeamMembersVariables {
  page?: number;
  limit?: number;
  role?: Extract<RoleFilter, 'ADMIN' | 'AGENT' | 'CREATOR'>;
  searchTerm?: string;
  sortBy?: SortField;
  sortOrder?: SortOrder;
}

