import { useState } from "react";
import { IInjectionPointOptions } from '../../rows/RenderPipeline2';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IInjectionPointFormProps {
  injectionPointId: string;
  injectionPointOptions: IInjectionPointOptions;
  handleSubmit: (newInjectionPointId: string) => void;
}

export default function InjectionPointForm({ injectionPointId, injectionPointOptions, handleSubmit }: IInjectionPointFormProps) {
  const [state, setState] = useState<string>(injectionPointId);

  function handleChange(e: React.FormEvent<HTMLSelectElement>) {
    setState(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e.currentTarget.name);
  }

  return (
    <form className="cell-l" name={state} onSubmit={onSubmit}>
      <div className="form-l">
        <select value={state} onChange={handleChange}>
          {injectionPointOptions ? injectionPointOptions.map(option => {
            return option ? (
              <option key={option.id} value={option.id}>
                {`${option.satellite?.facility?.name} - ${option.satellite?.name} - ${option.source}`}
              </option>
            ) :
              null;
          }) : null}
        </select>
      </div>
      <div className="form-r">
        <IconButton aria-label="expand row" size="small" type="submit">
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
    </form>
  )
}