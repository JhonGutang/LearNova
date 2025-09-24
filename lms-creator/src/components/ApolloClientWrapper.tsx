// ApolloClientWrapper.tsx
'use client'; // This is important — place it at the very top

import * as ApolloReact from '@apollo/client/react';
import { apolloClient } from '@/lib/apolloClient'; // Your Apollo Client instance
import React from 'react';

interface ApolloClientWrapperProps {
  children: React.ReactNode;
}

export default function ApolloClientWrapper({ children }: ApolloClientWrapperProps) {
  return <ApolloReact.ApolloProvider client={apolloClient}>{children}</ApolloReact.ApolloProvider>;
}
