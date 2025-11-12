import {gql} from '@apollo/client';

export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers(
    $page: Int
    $limit: Int
    $role: Role
    $searchTerm: String
    $sortBy: TeamMemberSort
    $sortOrder: SortOrder
  ) {
    teamMembers(
      page: $page
      limit: $limit
      role: $role
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      nodes {
        id
        name
        email
        role
        avatar
      }
      pageInfo {
        currentPage
        totalPages
        totalItems
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

