import { HTMLInputTypeAttribute } from 'react'

interface IFieldProps {
  name: string | undefined;
  label: string;
  type: HTMLInputTypeAttribute | undefined;
  autoComplete: string | undefined;
  required: boolean | undefined;
}

export default function Field({ name, label, type, autoComplete, required }: IFieldProps) {
  return (
    <div>
      <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
        {label} {required ? <span title="Required">*</span> : undefined}
      </label>
      <br />
      <input
        autoComplete={autoComplete}
        id={[name, 'input'].join('-')}
        name={name}
        required={required}
        type={type}
      />
    </div>
  )
}
