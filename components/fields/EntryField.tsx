import React, { useState } from 'react';
import EditIcon from '../svg/edit-icon';
import CancelIcon from '../svg/cancel-icon';
import OkIcon from '../svg/ok-icon';
import { IPipelineProperties, IPipelinePropertiesValidators } from '../rows/PipelineData';


type Record = IPipelineProperties[keyof IPipelineProperties];

interface ITextFieldProps {
  id: string;
  record: Record;
  columnName: string;
  validator: IPipelinePropertiesValidators;
  // fetchPipelines: () => void
}

export default function TextField({ id, record, columnName, validator/*, fetchPipelines*/ }: ITextFieldProps): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [state, setState] = useState<string>(record ? record.toString() : "");

  const toggleEdit = (): void => {
    setEdit(!edit);
    setState(record ? record.toString() : "");
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setState(e.currentTarget.value);
  };

  const validateForm = (): boolean => {
    console.log(state);
    if (typeof validator === "string") {
      const validator_regexp = new RegExp(validator)
      return validator_regexp.test(state);
    } else {
      return true;
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch("http://localhost:5002/pipeline/" + id + "/column", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ record: e.currentTarget.name, column: columnName }),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response);
          throw new Error('Network response was not ok');
        } else {
          // fetchPipelines();
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    toggleEdit();
  };

  return (
    <td className="MuiTableCell-root MuiTableCell-body  MuiTableCell-sizeSmall MuiTableCell-alignRight">
      <div className="cell-wrapper">
        <div className="cell-r">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={toggleEdit}>{edit ? <CancelIcon /> : <EditIcon />}</button>
        </div>
        {edit ?
          <form className="cell-l" name={state} onSubmit={handleSubmit}>
            <div className="form-l">
              {typeof validator === "string" ?
                <input
                  className={validateForm() ? "valid" : "invalid"} type="text" autoComplete="off" name={columnName} value={state} onChange={handleChange}
                /> :
                <select name={columnName} value={state} onChange={handleChange}>
                  {validator.map(option => {
                    console.log(option);

                    return (
                      <option key={option} value={option}>{option}</option>
                    );
                  })}
                </select>}
            </div>
            <div className="form-r">
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" type="submit" disabled={!validateForm()}><OkIcon /></button>
            </div>
          </form> :
          <div className="cell-l">
            <div>{record}</div>
          </div>}
      </div>
    </td>
  );
}