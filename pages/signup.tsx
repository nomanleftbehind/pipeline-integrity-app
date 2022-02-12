import { useState } from 'react';
import { useApolloClient, ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { Formik, Form, FormikHelpers, useField, FieldHookConfig } from 'formik';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useLoginMutation, useSignupMutation, UserCreateInput, UserRoleEnum, useValidatorUserRoleQuery } from '../graphql/generated/graphql';

type IInput = {
  label: string;
} & FieldHookConfig<string>;

export default function Signup() {
  const [isSignup, setIsSignup] = useState(false);

  const title = isSignup ? 'Signup' : 'Login';
  const buttonText = isSignup ? 'Login' : 'Signup';

  const { user, setUser } = useAuth() || {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const { data: dataUserRole } = useValidatorUserRoleQuery();
  const client = useApolloClient();
  const router = useRouter();

  const [login] = useLoginMutation();
  const [signup, { data }] = useSignupMutation();

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
      <h1>{title}</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: UserRoleEnum['User'],
        }}
        validationSchema={isSignup ? SignupSchema : LoginSchema}
        onSubmit={async (
          values: UserCreateInput,
          { setFieldError }: FormikHelpers<UserCreateInput>
        ) => {
          try {
            await client.resetStore();
            console.log(isSignup);


            if (!isSignup) {
              const { data: dataLogin } = await login({
                variables: {
                  email: values.email,
                  password: values.password,
                },
              });
              if (dataLogin?.login?.user && setUser) {
                console.log('data.login.user', dataLogin.login.user);

                setUser(dataLogin.login.user);
                await router.push('/');
              }
            } else {
              const { data: dataSignup } = await signup({
                variables: {
                  userCreateInput: values
                },
              });

              if (dataSignup?.signup?.user) {
                await router.push('/');
              }
            }
          } catch (err) {
            const apolloErr = err as ApolloError;

            if (apolloErr.message.includes('password')) {
              setFieldError('password', apolloErr.message);
            } else {
              setFieldError('email', apolloErr.message);
            }
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

              <Button color='primary' variant='contained' type='submit' onClick={handleClick}>
                Submit
              </Button>

              <Popper open={Boolean(data?.signup?.error)} anchorEl={anchorEl}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                  {data?.signup?.error?.message}
                </Box>
              </Popper>

              {user && user.role === 'ADMIN' && <Button onClick={() => setIsSignup(!isSignup)}>
                {buttonText}
              </Button>}

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