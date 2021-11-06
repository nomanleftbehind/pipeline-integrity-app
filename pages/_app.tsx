import '../styles/globals.css';
import type { AppLayoutProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import apolloClient from '../lib/apollo';
import { useState, createContext, ReactNode } from 'react';
import { MeQuery } from '../graphql/generated/graphql';


export const UserContext = createContext({
  user: undefined as MeQuery['me'],
  setUser: (user: MeQuery['me']) => { user }
});

export default function MyApp({ Component, pageProps }: AppLayoutProps) {

  const [user, setUser] = useState<MeQuery['me']>();

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {
        getLayout(
          <div className="app" >
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
          </div>
        )
      }
    </UserContext.Provider>
  )
}