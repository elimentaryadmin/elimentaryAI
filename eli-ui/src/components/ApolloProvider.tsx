'use client';

import { ApolloProvider as Provider } from '@apollo/client';
import { initializeApollo } from '../apollo/client';

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const apolloClient = initializeApollo();
  
  return (
    <Provider client={apolloClient}>
      {children}
    </Provider>
  );
} 