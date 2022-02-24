import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthContext';
import { prisma } from '../lib/prisma';
import { getUser } from '../lib/user';
import { IGetServerSideProps } from './register';

function Index() {
  // const { user, authLoading } = useAuth() || {};
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user && !authLoading) {
  //     router.push('/register');
  //   }
  // }, [user, authLoading]);


  return (
    <section>
      <h2>Welcome to Pipeline Database web app</h2>
      <p>
        Click buttons in the navigation bar to view or edit desired entities.
      </p>
    </section>
  )
}


export async function getServerSideProps({ req }: IGetServerSideProps) {

  const user = await getUser(req, prisma);

  if (!user) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

export default Index;