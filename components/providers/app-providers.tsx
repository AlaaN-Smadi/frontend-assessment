'use client';

import type {ReactNode} from 'react';

import {ApolloClientProvider} from './apollo-provider';
import {ThemeProvider} from './theme-provider';

export function AppProviders({children}: {children: ReactNode}) {
  return (
    <ThemeProvider>
      <ApolloClientProvider>{children}</ApolloClientProvider>
    </ThemeProvider>
  );
}

