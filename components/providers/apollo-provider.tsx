'use client';

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {useMemo} from 'react';
import type {ReactNode} from 'react';

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin'
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all'
      }
    }
  });
}

export function ApolloClientProvider({children}: {children: ReactNode}) {
  const client = useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

