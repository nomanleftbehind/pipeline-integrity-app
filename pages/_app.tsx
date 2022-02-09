import type { AppLayoutProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import AuthProvider from "../context/AuthContext";
import { useApollo } from '../graphql/client';
import '../styles/globals.css';
import Layout from '../components/layout';


// export const UserContext = createContext({
//   user: undefined as MeQuery['me'],
//   setUser: (user: MeQuery['me']) => { user }
// });

export default function MyApp({ Component, pageProps }: AppLayoutProps) {

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout title="Pipeline Database">
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}