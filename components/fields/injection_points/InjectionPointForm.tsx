import { useState } from "react";
import { IInjectionPointQuery } from '../../../pages/pipelines';
import OkIcon from '../../svg/ok-icon';

interface IInjectionPointFormProps {
  injectionPointId: string;
  injectionPointOptions: IInjectionPointQuery[] | undefined;
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
            return (
              <option key={option.id} value={option.id}>
                {`${option.satellite?.facility?.name} - ${option.satellite?.name} - ${option.source}`}
              </option>
            );
          }) : null}
        </select>
      </div>
      <div className="form-r">
        <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" type="submit"><OkIcon /></button>
      </div>
    </form>
  )
}