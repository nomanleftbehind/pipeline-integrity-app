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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useLoginMutation, useSignupMutation, UserCreateInput, UserRoleEnum, useValidatorUserRoleQuery } from '../graphql/generated/graphql';
import { getUser } from "../lib/user";

type IInput = {
  label: string;
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
  const passwordYupSchema = Yup.string().required('Required').min(8, 'Minimum 8 characters required');

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
                setFieldError('email', data.login.error.message);
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
                setFieldError('email', data.signup.error.message);
              }
              if (errors) {
                setFieldError('email', errors.map(error => error.message).join('; '));
              }
            }
          } catch (err) {
            const apolloErr = err as ApolloError;
            setFieldError('email', apolloErr.message);
          }
        }
        }
      >
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form>
              {isSignup && <TextInput
                label='First Name'
                name='firstName'
                type='text'
                autoComplete='off'
              />}

              {isSignup && <TextInput
                label='Last Name'
                name='lastName'
                type='text'
                autoComplete='off'
              />}

              <TextInput
                label='Email Address'
                name='email'
                type='email'
                autoComplete='off'
              />

              <TextInput
                label='Password'
                name='password'
                type='password'
                autoComplete='off'
              />

              {isSignup && <RoleInput label='Role' name='role'>
                {dataUserRole?.validators && Object
                  .entries(dataUserRole.validators.userRoleEnum)
                  .map(([roleServer, roleDatabase]) => <MenuItem
                    key={roleServer}
                    value={roleServer}
                  >
                    {roleDatabase}
                  </MenuItem>)}
              </RoleInput>}

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


const TextInput = ({ label, ...props }: IInput) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);

  return (
    <>
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <TextField fullWidth className='text-input' {...field} {...props as any /* Fix type error */} />
      {meta.touched && meta.error ? (
        <div className='error' style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </>
  );
};

const RoleInput = ({ label, ...props }: IInput) => {
  const [field, meta] = useField(props);

  return (
    <>
      <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
      <Select fullWidth {...field} {...props as any /* Fix type error */} />
      {meta.touched && meta.error ? (
        <div className='error' style={{ color: 'red' }}>{meta.error}</div>
      ) : null}
    </>
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