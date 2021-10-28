import '../styles/globals.css';
import type { AppLayoutProps } from 'next/app';
import { ApolloProvider } from "@apollo/client";
import apolloClient from '../lib/apollo';
import { ReactNode } from 'react';

export default function MyApp({ Component, pageProps }: AppLayoutProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return getLayout(
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
