import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEditPipelineMutation, PipelinesByIdQueryDocument } from '../../graphql/generated/graphql';


type Record = IPipelineProperties[keyof IPipelineProperties];

interface ITextFieldProps {
  id: string;
  record: Record;
  columnName: string;
  validator: string | string[] | number[];
}

export default function TextField({ id, record, columnName, validator }: ITextFieldProps): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const [state, setState] = useState<string>(record ? record.toString() : "");

  const [editPipeline, { data }] = useEditPipelineMutation({ refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });

  const validatorIsString = typeof validator === "string";

  const toggleEdit = (): void => {
    setEdit(!edit);
    setState(record ? record.toString() : "");
  }

  function validateForm() {
    if (validatorIsString) {
      const validator_regexp = new RegExp(validator);
      const isValid = validator_regexp.test(state);
      setValid(isValid)
    } else {
      setValid(true);
    }
  }

  useEffect(() => { console.log(columnName, typeof state, typeof record, validatorIsString && typeof record === "number"); validateForm() }, [state]);

  function handleChange(e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) {
    setState(e.currentTarget.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    editPipeline({
      variables: {
        id: id,
        [columnName]: validatorIsString && typeof record === "number" ? Number(e.currentTarget.name) : e.currentTarget.name
      }
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
              {validatorIsString ?
                <input
                  className={valid ? "valid" : "invalid"} type="text" autoComplete="off" name={columnName} value={state} onChange={handleChange}
                /> :
                <select name={columnName} value={state} onChange={handleChange}>
                  {Object.entries(validator).map(([serverEnum, dbEnum]) => {
                    return (
                      <option key={serverEnum} value={serverEnum}>{dbEnum}</option>
                    );
                  })}
                </select>}
            </div>
            <div className="form-r">
              <IconButton aria-label="submit cell" size="small" type="submit" disabled={!valid}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </div>
          </form> :
          <div className="cell-l">
            <div>{validatorIsString ? record : validator[record]}</div>
          </div>}
      </div>
    </TableCell>
  );
}