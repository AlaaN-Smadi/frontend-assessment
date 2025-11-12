import {useQuery} from '@apollo/client';

import {GET_TEAM_MEMBERS} from '../graphql/queries';
import type {TeamMembersResponse, TeamMembersVariables} from '../types';

export function useTeamMembers(variables: TeamMembersVariables) {
  const queryResult = useQuery<TeamMembersResponse, TeamMembersVariables>(GET_TEAM_MEMBERS, {
    variables,
    notifyOnNetworkStatusChange: true
  });

  return queryResult;
}

