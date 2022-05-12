import { prisma } from '../lib/prisma';
import { Context } from '../graphql/context';
import { UserNoPassword } from '../lib/auth';
export interface IGetServerSideProps extends Pick<Context, 'req' | 'res'> { };


import { useApolloClient, ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers, useField, FieldHookConfig } from 'formik';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useLoginMutation, useSignupMutation, UserCreateInput, UserRoleEnum, useValidatorUserRoleQuery } from '../graphql/generated/graphql';
import { getUser } from "../lib/user";

type IInput = {
  label?: string;
} & FieldHookConfig<string>;

export interface IServerSideProps {
  userCount: number;
  user: UserNoPassword | null;
}

function Register({ userCount, user }: IServerSideProps) {

  const { setUser } = useAuth() || {};

  const router = useRouter();

  const isSignup = userCount === 0 || user?.role === 'ADMIN';

  const { data: dataUserRole } = useValidatorUserRoleQuery();
  const client = useApolloClient();

  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  const emailYupSchema = Yup.string().email('Invalid email address').required('Required');
  const passwordYupSchema = Yup.string().required('Required').min(8, 'password must be at least 8 characters long');

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: emailYupSchema,
    password: passwordYupSchema,
  });

  const LoginSchema = Yup.object().shape({
    email: emailYupSchema,
    password: passwordYupSchema,
  });

  return (
    <Box sx={{ minWidth: 500, margin: '0 auto' }}>
      <h1>{isSignup ? 'Signup' : 'Login'}</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: UserRoleEnum['Operator'],
        }}
        validationSchema={isSignup ? SignupSchema : LoginSchema}
        onSubmit={async (
          values: UserCreateInput,
          { setFieldError }: FormikHelpers<UserCreateInput>
        ) => {
          try {
            await client.resetStore();
            if (!isSignup) {
              const { data, errors } = await login({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              });
              if (data?.login?.user && setUser) {
                setUser(data.login.user);
                await router.push('/');
              }
              if (data?.login?.error) {
                setFieldError(data.login.error.field, data.login.error.message);
              }
              if (errors) {
                setFieldError('email', errors.map(error => error.message).join('; '));
              }
            } else {
              const { data, errors } = await signup({
                variables: {
                  userCreateInput: values
                },
              });
              if (data?.signup?.user) {
                await router.push('/');
              }
              if (data?.signup?.error) {
                setFieldError(data.signup.error.field, data.signup.error.message);
              }
              if (errors) {
                setFieldError('email', errors.map(error => error.message).join('; '));
              }
            }
          } catch (e) {
            if (e instanceof ApolloError) {
              setFieldError(e.name, e.message);
            }
            throw e;
          }
        }
        }
      >
        {({ errors, touched, isSubmitting }) => {

          return (
            <Form className='register'>
              {isSignup && <TextInput
                placeholder='First Name'
                name='firstName'
                type='text'
                autoComplete='off'
              />}

              {isSignup && <TextInput
                placeholder='Last Name'
                name='lastName'
                type='text'
                autoComplete='off'
              />}

              <TextInput
                placeholder='Email Address'
                name='email'
                type='email'
                autoComplete='off'
              />

              <TextInput
                placeholder='Password'
                name='password'
                type='password'
                autoComplete='off'
              />

              {isSignup && userCount > 0 && <DOMSelectInput label='Role' name='role'>
                {dataUserRole?.validators && Object
                  .entries(dataUserRole.validators.userRoleEnum)
                  .map(([roleServer, roleDatabase]) => <option
                    key={roleServer}
                    value={roleServer}
                  >
                    {roleDatabase}
                  </option>)}
              </DOMSelectInput>}

              <Button fullWidth color='primary' variant='contained' type='submit'>
                Submit
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  );
};


export const TextInput = ({ label, ...props }: IInput) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input {...field} {...props as any /* Fix type error */} />
      {meta.touched && meta.error ? (
        <div className='error' style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextInputRecordEntry = ({ label, ...props }: IInput) => {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input {...field} {...props as any /* Fix type error */} />
      {meta.touched && meta.error ? (
        <div className='error' style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </>
  );
};

export const SelectInput = ({ label, ...props }: IInput) => {
  const [field, meta] = useField(props);

  return (
    <>
      {label && <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>}
      <Select fullWidth {...field} {...props as any /* Fix type error */} />
      {meta.touched && meta.error ? (
        <div className='error' style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </>
  );
};

// We will use DOM <select /> in RecordEntry component because Material UI <Select /> component
// creates a portal to independent <div /> that doesn't get registered by refs that we are using to detect clicking outside of component.
export const DOMSelectInput = ({ label, ...props }: IInput) => {
  const [field, meta] = useField(props);

  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select {...field} {...props as any /* Fix type error */} />
      {meta.touched && meta.error ? (
        <div className='error' style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </div>
  );
};


// This gets called on every request
export async function getServerSideProps({ req }: IGetServerSideProps) {

  const userCount = await prisma.user.count();
  const user = await getUser(req, prisma);

  // Only when first user of the app is registering, he/she is allowed to register themself and is automatically made ADMIN.
  // Any future users are only possible to be added by users with ADMIN privilages.
  // If user is logged in and is not an ADMIN they are not allowed to visit the register page.
  if (userCount > 0 && user && user.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      userCount,
      user: user ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      } : null
    }
  }
}

export default Register;