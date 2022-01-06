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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> /*.FormEvent<HTMLInputElement | HTMLSelectElement> | Date | null*/) {
    if (e.currentTarget.type === 'date') {
      const date = new Date(e.currentTarget.value);
      try {
        // GraphQL will only accept date stored in ISOString format
        setState(date.toISOString());
      } catch {
        // If we try to type the date, state will change with every keystroke
        // and toISOString() will throw an error until we fully type the proper date format.
        setState(e.currentTarget.value);
      }
    } else {
      setState(e.currentTarget.value);
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
    if (validatorIsString) {
      return (
        <input
          className={valid ? "valid" : "invalid"} autoComplete="off" name={columnName}
          type={validator === 'date' ? 'date' : typeof record === "number" ? 'number' : 'text'}
          // <input type="date"> can only accept date as string in yyyy-MM-dd format
          // But we set state as ISOString date since that's the only format GraphQL will accept
          // Because of that we are taking a slice of first 10 characters to get the yyyy-MM-dd format
          value={validator === 'date' ? state.slice(0, 10) : state}
          onChange={handleChange}
          required
          // In case browser doesn't support <input type="date"> it will fallback to type="text".
          // Text input will use the pattern attribute to highlight the input as invalid if entry doesn't match the pattern ####-##-## (where # is a digit from 0 to 9).
          pattern={validator === 'date' ? "\d{4}-\d{2}-\d{2}" : undefined}
          placeholder={validator === 'date' ? "####-##-##" : undefined}
        />
      )
    } else if (validator) {
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
      {validator ?
        <div className="cell-wrapper">
          <div className="cell-r">
            <IconButton aria-label="edit cell" size="small" onClick={toggleEdit}>
              {edit ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton>
          </div>
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
            <div className={"cell-l"}>
              {recordDisplay}
            </div>}
        </div> :
        recordDisplay
      }
    </TableCell>
  );
}