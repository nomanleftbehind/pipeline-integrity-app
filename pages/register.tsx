import { useState } from 'react';
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
import { useLoginMutation, useSignupMutation, useForgotPasswordMutation, useChangePasswordMutation, UserCreateInput, UserRoleEnum, useValidatorUserRoleQuery } from '../graphql/generated/graphql';
import { getUser } from '../lib/user';

type IInput = {
  label?: string;
} & FieldHookConfig<string>;

export interface IServerSideProps {
  userCount: number;
  user: UserNoPassword | null;
}

export function Register({ userCount, user }: IServerSideProps) {

  const { setUser } = useAuth() || {};

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const router = useRouter();
  // token string will only appear if current route is change-password/:token. That's how we will know that register form should be a 'Change Password' variant.
  const { token } = router.query;

  const formVariant = typeof token === 'string' && !user ? 'Change Password' : isForgotPassword && !user ? 'Forgot Password' : userCount === 0 || user?.role === 'ADMIN' ? 'Register' : 'Login';

  const { data: dataUserRole } = useValidatorUserRoleQuery();
  const client = useApolloClient();

  const [login] = useLoginMutation();
  const [register] = useSignupMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [changePassword] = useChangePasswordMutation();

  const emailYupSchema = Yup.string().email('Invalid email address').required('Required');
  const passwordYupSchema = Yup.string().required('Required').min(8, 'password must be at least 8 characters long');

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: emailYupSchema,
  });

  const LoginSchema = Yup.object().shape({
    email: emailYupSchema,
    password: passwordYupSchema,
  });

  const ForgotPasswordSchema = Yup.object().shape({
    email: emailYupSchema,
  });

  const ChangePasswordSchema = Yup.object().shape({
    password: passwordYupSchema,
    confirmPassword: passwordYupSchema//Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <Box sx={{ minWidth: 500, margin: '0 auto' }}>
      <h1>{formVariant}</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: UserRoleEnum['Operator'],
        }}
        validationSchema={formVariant === 'Register' ? RegisterSchema : formVariant === 'Login' ? LoginSchema : formVariant === 'Forgot Password' ? ForgotPasswordSchema : ChangePasswordSchema}
        onSubmit={async (
          values: UserCreateInput,
          { setFieldError }: FormikHelpers<UserCreateInput>
        ) => {
          try {
            await client.resetStore();
            if (formVariant === 'Register') {
              const { data, errors } = await register({
                variables: {
                  userRegisterInput: { firstName: values.firstName, lastName: values.lastName, email: values.email, role: values.role }
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
            } else if (formVariant === 'Login') {
              const { data, errors } = await login({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              });
              if (data?.login.user && setUser) {
                setUser(data.login.user);
                await router.push('/');
              }
              if (data?.login.error) {
                setFieldError(data.login.error.field, data.login.error.message);
              }
              if (errors) {
                setFieldError('email', errors.map(error => error.message).join('; '));
              }
            } else if (formVariant === 'Forgot Password') {
              setIsForgotPassword(false);
              const { errors } = await forgotPassword({
                variables: {
                  email: values.email,
                },
              });
              if (errors) {
                setFieldError('email', errors.map(error => error.message).join('; '));
              }
            } else if (typeof token === 'string') {
              // We already know that token is of type string in this scenario because formVariant can only be 'Change Password' if token is of type string, but Typescript doesn't recognize this so we need to be explicit.
              const { data, errors } = await changePassword({
                variables: {
                  changePasswordInput: { token, password: values.password, confirmPassword: values.confirmPassword }
                },
              });
              if (data?.changePassword?.user && setUser) {
                setUser(data.changePassword.user);
                await router.push('/');
              }
              if (data?.changePassword?.error) {
                setFieldError(data.changePassword.error.field, data.changePassword.error.message);
              }
              if (errors) {
                setFieldError('confirmPassword', errors.map(error => error.message).join('; '));
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
              {formVariant === 'Register' && <TextInput
                placeholder='First Name'
                name='firstName'
                type='text'
                autoComplete='off'
              />}

              {formVariant === 'Register' && <TextInput
                placeholder='Last Name'
                name='lastName'
                type='text'
                autoComplete='off'
              />}

              {formVariant !== 'Change Password' && <TextInput
                placeholder='Email Address'
                name='email'
                type='email'
                autoComplete='off'
              />}

              {(formVariant === 'Login' || formVariant === 'Change Password') && <TextInput
                placeholder='Password'
                name='password'
                type='password'
                autoComplete='off'
              />}

              {formVariant === 'Change Password' && <TextInput
                placeholder='Confirm Password'
                name='confirmPassword'
                type='password'
                autoComplete='off'
              />}

              {formVariant === 'Register' && userCount > 0 && <DOMSelectInput label='Role' name='role'>
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
              {(formVariant === 'Login' || formVariant === 'Forgot Password') && <Button onClick={() => setIsForgotPassword(!isForgotPassword)}>{isForgotPassword ? 'Login' : 'Forgot Password'}</Button>}
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