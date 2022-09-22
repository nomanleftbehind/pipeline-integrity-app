import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject, split } from '@apollo/client';
import merge from 'deepmerge';
import { HttpLink } from '@apollo/client/link/http';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/api',
    credentials: 'same-origin',
  });

  const wsLink = typeof window !== 'undefined' ? new GraphQLWsLink(createClient({
    url: 'ws://localhost:3000/api',
  })) : null;

  const splitLink = typeof window !== 'undefined' ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink!,
    httpLink,
  ) : httpLink;


  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: splitLink,//createIsomorphLink(),
    cache: new InMemoryCache({
      addTypename: false,
      // default behavior of completely replacing the existing data with the incoming data,
      // while also silencing the warnings, the following merge function will explicitly permit replacement of `validators` data:
      typePolicies: {
        User: {
          keyFields: ['email']
        },
        Query: {
          fields: {
            validators: {
              merge(_existing, incoming) {
                // Equivalent to what happens if there is no custom merge function.
                return incoming;
              },
            },
            riskById: {
              merge(_existing, incoming) {
                return incoming;
              },
            }
          }
        }
      }
    }),
  })
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any /* Comes from Next.js AppInitialProps pageProps which is any */) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}