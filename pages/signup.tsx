import { useApolloClient, ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { User } from '@prisma/client';
import { useSignupMutation, UserCreateInput } from '../graphql/generated/graphql';

type Values = UserCreateInput;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(8, 'Minimum 8 characters required'),
  role: Yup.string().required('Required'),
});

export default function App() {
  const client = useApolloClient();
  const router = useRouter();

  const [signup] = useSignupMutation();

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: 'Doma',
          lastName: '',
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (
          values: Values,
          { setSubmitting, setFieldError }: FormikHelpers<Values>
        ) => {
          try {
            await client.resetStore();
            await signup({
              variables: {
                userCreateInput: values
              },
            });
            router.push('/');
          } catch (err) {
            const apolloErr = err as ApolloError;
            setFieldError("email", apolloErr.message);
          }
        }

          // {
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     setSubmitting(false);
          //   }, 500);
          // }
        }
      >
        <Form>
          <label htmlFor='firstName'>First Name</label>
          <Field id='firstName' name='firstName' placeholder='John' />

          <label htmlFor='lastName'>Last Name</label>
          <Field id='lastName' name='lastName' placeholder='Doe' />

          <label htmlFor='email'>Email</label>
          <Field
            id='email'
            name='email'
            placeholder='john@acme.com'
            type='email'
          />

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
};