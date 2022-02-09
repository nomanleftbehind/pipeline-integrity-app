import type { AppLayoutProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import AuthProvider from "../context/AuthContext";
// import apolloClient from '../lib/apollo';
import { useApollo } from '../graphql/client';
import { useState, createContext, ReactNode } from 'react';
import { MeQuery } from '../graphql/generated/graphql';
import '../styles/globals.css';


export const UserContext = createContext({
  user: undefined as MeQuery['me'],
  setUser: (user: MeQuery['me']) => { user }
});

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // const [user, setUser] = useState<MeQuery['me']>();

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    // <UserContext.Provider value={{ user, setUser }}>
    //   {
    getLayout(
      <div className="app" >
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
      </div>
    )
    //     }
    //   </UserContext.Provider>
  )
}