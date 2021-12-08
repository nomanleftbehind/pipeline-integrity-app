import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useEditPipelineMutation, PipelinesByIdQueryDocument, useEditPigRunMutation, PigRunByPipelineIdDocument, useEditPressureTestMutation, PressureTestsByIdDocument } from '../../graphql/generated/graphql';
import { IValidator, IRecord } from '../fields/PipelineProperties';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';



interface ITextFieldProps {
  table?: string;
  id: string;
  columnName: string;
  record: IRecord;
  validator?: IValidator;
}

export default function EntryField({ table, id, columnName, record, validator }: ITextFieldProps): JSX.Element {
  const [edit, setEdit] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const [state, setState] = useState<string>(record ? record.toString() : "");

  const recordAsKey = record as keyof typeof validator;

  const [editPipeline, { data: dataPipeline }] = useEditPipelineMutation({ refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
  const [editPigRun, { data: dataPigRun }] = useEditPigRunMutation({ refetchQueries: [PigRunByPipelineIdDocument, 'PigRunByPipelineId'] });
  const [editPressureTest, { data: dataPressureTest }] = useEditPressureTestMutation({ refetchQueries: [PressureTestsByIdDocument, 'pressureTestsById'] });

  const recordIfDateDisplay = typeof record === "string" && record.length === 24 && record.slice(-1) === 'Z' ? record.slice(0, 10) : record;

  const validatorIsString = typeof validator === "string";

  const recordDisplay = record ?
    validatorIsString ?
      recordIfDateDisplay :
      validator ? validator[recordAsKey] :
        recordIfDateDisplay :
    null

  const toggleEdit = (): void => {
    setEdit(!edit);
    setState(record ? record.toString() : (!validatorIsString && validator) ? Object.keys(validator)[0] : "");
  }

  function validateForm() {
    if (validatorIsString && validator !== 'date') {
      const validator_regexp = new RegExp(validator);
      const isValid = validator_regexp.test(state);
      setValid(isValid)
    } else {
      setValid(true);
    }
  }

  useEffect(() => { validateForm() }, [state]);

  function handleChange(e: React.FormEvent<HTMLInputElement | HTMLSelectElement> | Date | null) {

    if (e instanceof Date && !isNaN(e.valueOf())) {
      console.log('event', e);
      console.log('event valueOf', e.valueOf());
      console.log('event toISOString', e.toISOString());
      console.log('event toUTCString', e.toUTCString());
      console.log('event toDateString', e.toDateString());
      console.log('event toString', e.toString());
      console.log('event toLocaleDateString', e.toLocaleDateString());
      console.log('event toLocaleString', e.toLocaleString());

      setState(e.toISOString())
    } else if (e && !(e instanceof Date)) {
      setState(e.currentTarget.value)
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mutationOptions = { variables: { id: id, [columnName]: validatorIsString && typeof record === "number" ? Number(e.currentTarget.name) : e.currentTarget.name } }
    switch (table) {
      case 'pigRun':
        console.log(table)
        editPigRun(mutationOptions);
        break;
      case 'pressureTest':
        console.log(table)
        editPressureTest(mutationOptions);
        break;
      default:
        editPipeline(mutationOptions);
        break;
    }
    toggleEdit();
  };

  function renderForm() {
    if (validator === 'date') {
      return (
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/dd/yyyy"
            value={state}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )
    } else if (validatorIsString) {
      return (
        <input
          className={valid ? "valid" : "invalid"} type="text" autoComplete="off" name={columnName} value={state} onChange={handleChange}
        />
      )
    } else if (validator) {
      console.log('validator', state);

      return (
        <select name={columnName} value={state} onChange={handleChange}>
          {Object.entries(validator).map(([serverEnum, dbEnum]) => {
            return (
              <option key={serverEnum} value={serverEnum}>{dbEnum}</option>
            );
          })}
        </select>
      )
    }
  }

  return (
    <TableCell align="right">
      <div className="cell-wrapper">
        {<div className="cell-r">
          {validator ?
            <IconButton aria-label="edit cell" size="small" onClick={toggleEdit}>
              {edit ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton> :
            null
          }
        </div>}
        {edit ?
          <form className="cell-l" name={state} onSubmit={handleSubmit}>
            <div className="form-l">
              {renderForm()}
            </div>
            <div className="form-r">
              <IconButton aria-label="submit cell" size="small" type="submit" disabled={!valid}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </div>
          </form> :
          <div className="cell-l">
            <div>
              {recordDisplay}
            </div>
          </div>}
      </div>
    </TableCell>
  );
}