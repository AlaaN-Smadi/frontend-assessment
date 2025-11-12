import {gql} from 'graphql-tag';

import {teamMembers} from './team-members';

export const typeDefs = gql`
  enum Role {
    ADMIN
    AGENT
    CREATOR
  }

  enum TeamMemberSort {
    NAME
    ROLE
  }

  enum SortOrder {
    ASC
    DESC
  }

  type TeamMember {
    id: ID!
    name: String!
    email: String!
    role: Role!
    avatar: String!
  }

  type PageInfo {
    currentPage: Int!
    totalPages: Int!
    totalItems: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  type TeamMembersConnection {
    nodes: [TeamMember!]!
    pageInfo: PageInfo!
  }

  type Query {
    teamMembers(
      page: Int = 1
      limit: Int = 10
      role: Role
      searchTerm: String
      sortBy: TeamMemberSort = NAME
      sortOrder: SortOrder = ASC
    ): TeamMembersConnection!
  }
`;

export const resolvers = {
  Query: {
    teamMembers: (
      _: unknown,
      args: {
        page?: number;
        limit?: number;
        role?: 'ADMIN' | 'AGENT' | 'CREATOR';
        searchTerm?: string;
        sortBy?: 'NAME' | 'ROLE';
        sortOrder?: 'ASC' | 'DESC';
      }
    ) => {
      const {
        page = 1,
        limit = 10,
        role,
        searchTerm,
        sortBy = 'NAME',
        sortOrder = 'ASC'
      } = args;

      const normalizedSearch = searchTerm?.trim().toLowerCase();

      let filtered = teamMembers;

      if (role) {
        filtered = filtered.filter((member) => member.role === role);
      }

      if (normalizedSearch) {
        filtered = filtered.filter((member) =>
          member.name.toLowerCase().includes(normalizedSearch)
        );
      }

      filtered = filtered.sort((a, b) => {
        const direction = sortOrder === 'ASC' ? 1 : -1;

        if (sortBy === 'ROLE') {
          return a.role.localeCompare(b.role) * direction;
        }

        return a.name.localeCompare(b.name) * direction;
      });

      const totalItems = filtered.length;
      const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
      const currentPage = Math.min(Math.max(page, 1), totalPages);

      const start = (currentPage - 1) * limit;
      const end = start + limit;

      const nodes = filtered.slice(start, end);

      return {
        nodes,
        pageInfo: {
          currentPage,
          totalPages,
          totalItems,
          hasNextPage: currentPage < totalPages,
          hasPreviousPage: currentPage > 1
        }
      };
    }
  }
};

