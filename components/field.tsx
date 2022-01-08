import { HTMLInputTypeAttribute } from "react";

interface IFieldProps {
  name?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  required?: boolean;
}

export default function Field({
  name,
  label,
  type,
  autoComplete,
  required,
}: IFieldProps) {
  const formattedId = [name, "label"].join("-");
  return (
    <div>
      <label id={formattedId} htmlFor={formattedId}>
        {label} {required ? <span title="Required">*</span> : null}
      </label>
      <br />
      <input
        autoComplete={autoComplete}
        id={formattedId}
        name={name}
        required={required}
        type={type}
      />
    </div>
  );
}
