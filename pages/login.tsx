import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, ReactNode } from 'react';
import { useApolloClient, ApolloError } from '@apollo/client';
import { useLoginMutation, useMeQuery } from '../graphql/generated/graphql';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import Field from '../components/field';

import { useAuth } from '../context/AuthContext';
import { Form, Formik, FormikHelpers } from 'formik';
import FormikFormControl from '../components/FormikFormControl';
import * as Yup from 'yup';

interface Values {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

export default function Login() {
  const { setUser } = useAuth() || {};
  const client = useApolloClient();
  const router = useRouter();

  const [login] = useLoginMutation();

  return (
    <section className='flex flex-col items-center'>
      <h1 className='text-3xl text-center'>Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async (
          values: Values,
          { setFieldError }: FormikHelpers<Values>
        ) => {

          try {
            await client.resetStore();
            const { data } = await login({
              variables: {
                email: values.email,
                password: values.password,
              },
            });
            if (data?.login?.user && setUser) {
              console.log('data.login.user', data.login.user);
              
              setUser(data.login.user);
              await router.push('/');
            }
          } catch (err) {
            if (err.message.includes('password')) {
              setFieldError('password', err.message);
            } else {
              setFieldError('email', err.message);
            }
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className='flex flex-col w-full gap-8 mt-8 md:w-1/3'>
            <FormikFormControl
              id='login_email'
              name='email'
              type='email'
              touched={touched.email}
              error={errors.email}
            />

            <FormikFormControl
              id='login_password'
              name='password'
              type='password'
              touched={touched.password}
              error={errors.password}
            />

            <p className='self-center text-sm text-gray-500'>
              Not registered? Register{' '}
              <Link href='/register'>
                <a className='font-semibold text-gray-700'>here</a>
              </Link>
            </p>

            <button
              type='submit'
              className='self-center w-full md:w-auto btn'
            >
              {isSubmitting ? (
                <img src='/spinner.svg' alt='loading...' className='w-6' />
              ) : (
                'Submit'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );







  // const client = useApolloClient()
  // const [login/*, { data: dataLogin, loading: loadingLogin, error: errorLogin }*/] = useLoginMutation();
  // const router = useRouter();
  // const { user, setUser } = useContext(UserContext);

  // // const { data: dataMe, loading: loadingMe, error: errorMe } = useMeQuery();

  // // function meFunc() {
  // //   if (dataLogin) {
  // //     if (dataLogin.login) {
  // //       return dataLogin.login.user
  // //     }
  // //   } else {
  // //     if (dataMe) {
  // //       return dataMe.me
  // //     }
  // //   }
  // // }
  // // const me = meFunc();

  // // // const me = data?.me;



  // async function handleSubmit(e: any) {
  //   e.preventDefault()

  //   const emailElement = e.currentTarget.elements.email
  //   const passwordElement = e.currentTarget.elements.password

  //   console.log(emailElement.value, passwordElement.value);


  //   await client.resetStore()
  //   // const { data, errors } = 
  //   const { data } = await login({
  //     variables: {
  //       email: emailElement.value,
  //       password: passwordElement.value,
  //     },
  //   })
  //   if (data?.login?.user) {
  //     localStorage.setItem('token', data.login.token!);
  //     setUser(data.login.user);
  //     await router.push('/')
  //   }
  // }

  // return (
  //   <>
  //     <h1>Log In</h1>
  //     <form onSubmit={handleSubmit}>
  //       {/* {errorMsg && <p>{errorMsg}</p>} */}
  //       <Field
  //         name='email'
  //         type='email'
  //         autoComplete='email'
  //         required
  //         label='Email'
  //       />
  //       <Field
  //         name='password'
  //         type='password'
  //         autoComplete='password'
  //         required
  //         label='Password'
  //       />
  //       <button type='submit'>Sign in</button> or{' '}
  //       <Link href='/signup'>
  //         <a>Sign up</a>
  //       </Link>
  //       <style jsx>{`
  //         form,
  //         label {
  //           display: flex;
  //           flex-flow: column;
  //         }
  //         label > span {
  //           font-weight: 600;
  //         }
  //         input {
  //           padding: 8px;
  //           margin: 0.3rem 0 1rem;
  //           border: 1px solid #ccc;
  //           border-radius: 4px;
  //         }
  //         .error {
  //           color: brown;
  //           margin: 1rem 0 0;
  //         }
  //   `}</style>
  //     </form>
  //   </>
  // )
}


Login.getLayout = function getLayout(page: ReactNode) {

  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}