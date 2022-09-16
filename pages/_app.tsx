import type { AppLayoutProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import AuthProvider from '../context/AuthContext';
import { useApollo } from '../graphql/client';
import '../styles/globals.css';
import '../styles/register.css';
import '../styles/style-entry-field.css';
import '../styles/pipelines-window.css';
import '../styles/pipeline-data.css';
import '../styles/tab-panels.css';
import '../styles/pipeline-data-view.css';
import '../styles/license-change.css';
import '../styles/mechanical-properties.css';
import '../styles/pig-run.css';
import '../styles/pipeline-batch.css';
import '../styles/pressure-test.css';
import '../styles/injection-point.css';
import '../styles/chemical.css';
import '../styles/risk.css';
import '../styles/geotechnical.css';
import '../styles/cathodic-survey.css';
import '../styles/search-navigation.css';
import '../styles/button-container.css';
import '../styles/modal.css';
import Layout from '../components/layout';
// import '../styles/styles-formik.css';
// import '../styles/styles-custom-formik.css';



export default function PipelineIntegrityApp({ Component, pageProps }: AppLayoutProps) {

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout title='Pipeline Integrity'>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  )
}