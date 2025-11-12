'use client';

import type {ReactNode} from 'react';

import {ApolloClientProvider} from './apollo-provider';

export function AppProviders({children}: {children: ReactNode}) {
  return <ApolloClientProvider>{children}</ApolloClientProvider>;
}

