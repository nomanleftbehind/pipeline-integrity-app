import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import { schema } from '../graphql/schema';
import { SchemaLink } from '@apollo/client/link/schema';
import { HttpLink } from '@apollo/client/link/http';

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    // Extremely important to import them here because otherwise we get `Module not found: Can't resolve 'fs'` error.
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


const httpLink = createHttpLink({
  uri: '/api',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  // uri: 'http://localhost:3000/api',
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
  link: createIsomorphLink(),//httpLink,//authLink.concat(httpLink),
  // ssrMode: typeof window === 'undefined',
})

export default apolloClient