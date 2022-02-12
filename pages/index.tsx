import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/AuthContext';

export default function Index() {
  const { user, authLoading } = useAuth() || {};
  const router = useRouter();

  useEffect(() => {
    if (!user && !authLoading) {
      router.push('/register');
    }
  }, [user, authLoading]);


  // const { setUser } = useContext(UserContext);

  // const router = useRouter()
  // const { data, loading, error } = useMeQuery();
  // const me = data?.me;

  // useEffect(() => {
  //   setUser(me);
  // }, [me])

  // // const shouldRedirect = !(loading || error || me)

  // // useEffect(() => {
  // //   if (shouldRedirect) {
  // //     router.push('/register')
  // //   }
  // // }, [shouldRedirect])

  // if (error) {
  //   return <p>{error.message}</p>
  // }

  // if (me) {
  return (
    <section>
      <h2>Welcome to Pipeline Database web app</h2>
      <p>
        Click buttons in the navigation bar to view or edit desired entities.
      </p>
    </section>
  )
  // }

  // return <p>Loading...</p>
}


// import { useQuery } from "@apollo/client";
// // import { useRouter } from "next/dist/client/router";
// // import { useEffect } from "react";
// // import Layout from "../components/Layout";
// import NoteSkeleton from "../components/NoteSkeleton";
// import NotesList from "../components/NotesList";
// import { useAuth } from "../context/AuthContext";
// import { GetNotesQuery } from "../graphql/queries";

// export default function Index() {
//   const { user, authLoading } = useAuth();
//   const { data, loading, error } = useQuery(GetNotesQuery);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user && !authLoading) {
//       router.push("/register");
//     }
//   }, [user, authLoading]);

//   return (
//     <Layout title="Home page">
//       {user &&
//         (loading ? <NoteSkeleton /> : data && <NotesList notes={data.notes} />)}
//     </Layout>
//   );
// }