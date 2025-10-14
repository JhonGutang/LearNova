// lib/apolloClient.ts

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client';

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:3000/graphql';

// Create the HTTP link
const httpLink = new HttpLink({
  uri: graphqlEndpoint,
  credentials: 'include',
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({    
    typePolicies: {
      Query: {
        fields: {
          courses: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
