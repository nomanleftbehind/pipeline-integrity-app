import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import {
  useEditPipelineMutation,
  PipelinesByIdDocument,
  useEditPigRunMutation,
  PigRunsByPipelineIdDocument,
  useEditPressureTestMutation,
  PressureTestsByPipelineIdDocument,
  useEditRiskMutation,
  RiskByIdDocument,
} from '../../graphql/generated/graphql';
import { IValidator, IRecord } from '../fields/PipelineProperties';
import { ITable } from '../rows/PipelineData';
import { useAuth } from '../../context/AuthContext';
import { IColumnType } from './PipelineProperties';


// We are taking `validators` type which is a union of many objects, a string and undefined.
// We are removing string and undefined and combining all objects into one object that contains all properties.
// This is because we we will use keys of this type to index validators.
type RemoveStringFromUnion<T> = T extends infer U ? string extends U ? never : U : never;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
type IntersectionToObject<I> = UnionToIntersection<I> extends infer O ? { [K in keyof O]: O[K] } : never;

type IValidatorEnumsToOneObject = IntersectionToObject<UnionToIntersection<RemoveStringFromUnion<NonNullable<IValidator>>>>;

interface ITextFieldProps {
  id: string;
  createdById: string;
  table?: ITable;
  columnName: string;
  columnType: IColumnType;
  record: IRecord;
  deleteField?: () => void;
  validator?: IValidator;
}

export default function EntryField({ id, createdById, table, columnName, columnType, record, validator, deleteField }: ITextFieldProps): JSX.Element {

  const { user } = useAuth() || {};
  const { role, id: userId } = user || {};

  const authorized =
    (role === 'ADMIN' || role === 'ENGINEER') ||
    (role === 'OPERATOR' && createdById === userId && (table === 'pressure tests' || table === 'pig runs')) ||
    (role === 'CONTRACTOR' && createdById === userId/* && (table === 'chemicals')*/);

  const [edit, setEdit] = useState(false);
  const [valid, setValid] = useState(true);
  const [state, setState] = useState(record?.toString() || '');

  const [editPipeline, { data: dataPipeline }] = useEditPipelineMutation({ refetchQueries: [PipelinesByIdDocument, 'pipelinesById'] });
  const [editPigRun, { data: dataPigRun }] = useEditPigRunMutation({ refetchQueries: [PigRunsByPipelineIdDocument, 'PigRunsByPipelineId'] });
  const [editPressureTest, { data: dataPressureTest }] = useEditPressureTestMutation({ refetchQueries: [PressureTestsByPipelineIdDocument, 'PressureTestsByPipelineId'] });
  const [editRisk, { data: dataRisk }] = useEditRiskMutation({ refetchQueries: [RiskByIdDocument, 'RiskById'] });

  const validatorIsString = typeof validator === "string";

  const switchRecordDisplay = () => {
    switch (columnType) {
      case 'date':
        if (typeof record === 'string') {
          return record.slice(0, 10);
        } else {
          return record;
        }
      case 'boolean':
        if (typeof record === 'boolean') {
          // Material UI doesn't allow boolean values be displayed in it's components.
          return record === true ? 'Y' : 'N';
        } else {
          return record;
        }
      case 'string':
        if (typeof record === 'string') {
          if (typeof validator === 'object' && validator !== null) {
            // Using previously defined object type that represents all validator properties.
            return (validator as IValidatorEnumsToOneObject)[record as keyof IValidatorEnumsToOneObject];
          } else {
            return record;
          }
        } else {
          return record;
        }
      default:
        return record;
    }
  }

  const recordDisplay = switchRecordDisplay();

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

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
    const mutationOptions = {
      variables: {
        id,
        [columnName]: columnType === 'number' ? Number(e.currentTarget.name) : e.currentTarget.name
      }
    }

    switch (table) {
      case 'pig runs':
        editPigRun(mutationOptions);
        break;
      case 'pressure tests':
        editPressureTest(mutationOptions);
        break;
      case 'risk':
        editRisk(mutationOptions);
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
          {authorized && <div className="cell-r">
            <IconButton aria-label="edit cell" size="small" onClick={toggleEdit}>
              {edit ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton>
            {deleteField && <IconButton aria-label="delete field" size="small" onClick={deleteField}>
              <RemoveCircleOutlineOutlinedIcon />
            </IconButton>}
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
            <div className={"cell-l"}>
              {recordDisplay}
            </div>}
        </div> :
        recordDisplay
      }
    </TableCell>
  );
}