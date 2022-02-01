import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/api',
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
  link: authLink.concat(httpLink),
})

export default apolloClient