import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject, } from '@apollo/client';
import merge from 'deepmerge';
import { HttpLink } from '@apollo/client/link/http';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    // Extremely important to import variables here because otherwise we get `Module not found: Can't resolve 'fs'` error.
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { schema } = require("../graphql/schema");
    return new SchemaLink({ schema });
  } else {
    return new HttpLink({
      uri: '/api',
      credentials: 'same-origin',
    });
  }
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
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