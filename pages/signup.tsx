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
import { useSignupMutation, UserCreateInput, useValidatorUserRoleQuery } from '../graphql/generated/graphql';

type Values = UserCreateInput;

type IInput = {
  label: string;
} & FieldHookConfig<string>;


export default function Signup() {

  const { data: dataUserRole } = useValidatorUserRoleQuery();
  const client = useApolloClient();
  const router = useRouter();
  const [signup] = useSignupMutation();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required').min(8, 'Minimum 8 characters required'),
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: 'USER' as any // Fix type error
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
            setFieldError('email', apolloErr.message);
          }
        }
        }
      >
        {({ errors, touched, isSubmitting }) => {
          return (
            <Form>
              <TextInput
                label='First Name'
                name='firstName'
                type='text'
                autoComplete='off'
              />

              <TextInput
                label='Last Name'
                name='lastName'
                type='text'
                autoComplete='off'
              />

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

              <RoleInput label='Role' name='role'>
                {dataUserRole?.validators && Object
                  .entries(dataUserRole.validators.userRoleEnum)
                  .map(([roleServer, roleDatabase]) => <MenuItem
                    key={roleServer}
                    value={roleServer}
                  >
                    {roleDatabase}
                  </MenuItem>)}
              </RoleInput>

              <Button color='primary' variant='contained' fullWidth type='submit'>
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