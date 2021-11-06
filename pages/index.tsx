import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import { useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../graphql/generated/graphql';
import { UserContext } from './_app';

export default function Index() {

  const { setUser } = useContext(UserContext);

  const router = useRouter()
  const { data, loading, error } = useMeQuery();
  const me = data?.me;

  useEffect(() => {
    setUser(me);
  }, [me])

  // const shouldRedirect = !(loading || error || me)

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/login')
  //   }
  // }, [shouldRedirect])

  if (error) {
    return <p>{error.message}</p>
  }

  if (me) {
    return (
      <section>
        <h2>Welcome to Pipeline Database web app</h2>
        <p>
          Click buttons in the navigation bar to view or edit desired entities.
        </p>
      </section>
    )
  }

  return <p>Loading...</p>
}


Index.getLayout = function getLayout(page: ReactNode) {

  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}