import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, ReactNode } from 'react';
import { UserContext } from '../pages/_app';
import { useApolloClient } from '@apollo/client';
import { useLoginMutation, useMeQuery } from '../graphql/generated/graphql';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import Field from '../components/field';


export default function Login() {
  const client = useApolloClient()
  const [login/*, { data: dataLogin, loading: loadingLogin, error: errorLogin }*/] = useLoginMutation();
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  // const { data: dataMe, loading: loadingMe, error: errorMe } = useMeQuery();

  // function meFunc() {
  //   if (dataLogin) {
  //     if (dataLogin.login) {
  //       return dataLogin.login.user
  //     }
  //   } else {
  //     if (dataMe) {
  //       return dataMe.me
  //     }
  //   }
  // }
  // const me = meFunc();

  // // const me = data?.me;

  useEffect(() => {
    console.log('loginUser: ', user);

  }, [user])



  async function handleSubmit(e: any) {
    e.preventDefault()

    const emailElement = e.currentTarget.elements.email
    const passwordElement = e.currentTarget.elements.password

    await client.resetStore()
    // const { data, errors } = 
    const { data } = await login({
      variables: {
        email: emailElement.value,
        password: passwordElement.value,
      },
    })
    if (data?.login?.user) {
      localStorage.setItem('token', data.login.token!);
      setUser(data.login.user);
      await router.push('/')
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {/* {errorMsg && <p>{errorMsg}</p>} */}
        <Field
          name="email"
          type="email"
          autoComplete="email"
          required
          label="Email"
        />
        <Field
          name="password"
          type="password"
          autoComplete="password"
          required
          label="Password"
        />
        <button type="submit">Sign in</button> or{' '}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
        <style jsx>{`
          form,
          label {
            display: flex;
            flex-flow: column;
          }
          label > span {
            font-weight: 600;
          }
          input {
            padding: 8px;
            margin: 0.3rem 0 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          .error {
            color: brown;
            margin: 1rem 0 0;
          }
    `}</style>
      </form>
    </>
  )
}


Login.getLayout = function getLayout(page: ReactNode) {

  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}