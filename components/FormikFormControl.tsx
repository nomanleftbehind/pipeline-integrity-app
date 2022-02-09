import { Field, FieldProps } from 'formik';

interface IProps {
  id: string;
  name: string;
  type?: string;
  touched?: boolean;
  error?: string;
}

const MyInput = ({ field, form, ...props }: FieldProps) => {
  return <input className='form-control' {...field} {...props} />;
};

export default function FormikFormControl({
  id,
  name,
  type = 'text',
  touched,
  error,
}: IProps) {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={id} className='capitalize'>
        {name}
      </label>
      {type === 'textarea' ? (
        <Field
          as='textarea'
          id={id}
          name={name}
          className='form-control'
          rows={5}
        />
      ) : (
        <Field type={type} id={id} name={name} component={MyInput} />
      )}
      {touched && error && (
        <span className='text-sm text-red-500'>{error}</span>
      )}
    </div>
  );
}
