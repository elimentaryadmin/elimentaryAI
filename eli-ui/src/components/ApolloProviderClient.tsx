'use client';

import { ApolloProvider } from '@apollo/client';
import { initializeApollo } from '../apollo/client';

const apolloClient = initializeApollo();

export default function ApolloProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
} 