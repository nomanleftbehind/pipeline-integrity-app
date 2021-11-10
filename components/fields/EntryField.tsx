import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IPipelineProperties, IPipelinePropertiesValidators } from '../rows/PipelineData2';


type Record = IPipelineProperties[keyof IPipelineProperties];

interface ITextFieldProps {
  id: string;
  record: Record;
  columnName: string;
  validator: string | string[] | number[];
}

export default function TextField({ id, record, columnName, validator }: ITextFieldProps): JSX.Element {
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
    <TableCell>
      <div className="cell-wrapper">
        {<div className="cell-r">
          <IconButton aria-label="edit cell" size="small" onClick={toggleEdit}>
            {edit ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}
          </IconButton>
        </div>}
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
              <IconButton aria-label="submit cell" size="small" type="submit" disabled={!validateForm()}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </div>
          </form> :
          <div className="cell-l">
            <div>{record}</div>
          </div>}
      </div>
    </TableCell>
  );
}