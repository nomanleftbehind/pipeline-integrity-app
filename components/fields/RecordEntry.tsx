import { useEffect, useState, useRef } from 'react';
import { ApolloError } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { TextInputRecordEntry, DOMSelectInput } from '../../pages/register';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { EnumObject } from '../../graphql/generated/graphql';


export type IRecord = string | number | boolean | null | undefined;
export type IColumnType = 'string' | 'number' | 'date' | 'boolean' | 'link';

interface IValues {
  [x: string]: NonNullable<IRecord>;
}

export interface IEditRecord {
  id: string;
  columnName: string;
  columnType: IColumnType;
  newRecord: IRecord;
}

export type IEditRecordFunction = ({ id, columnName, columnType, newRecord }: IEditRecord) => void;

export interface IRecordEntryProps {
  id: string;
  columnName: string;
  columnType: IColumnType;
  nullable: boolean;
  record: IRecord;
  validator?: EnumObject[] | string;
  authorized: boolean;
  editRecord?: IEditRecordFunction;
}

export default function RecordEntry({ id, columnName, columnType, nullable, record, validator, authorized, editRecord }: IRecordEntryProps) {
  
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState(false);
  const [valid, setValid] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event: Event) => {
    const target = event.target as Node;
    if (ref.current && !ref.current.contains(target)) {
      setEdit(false);
      setSelected(false);
    }
  };

  const validatorIsEnumObjectArray = Array.isArray(validator);

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (typeof validator === 'string') {
      const validatorRegexp = new RegExp(validator);
      const isValid = validatorRegexp.test(e.currentTarget.value);
      setValid(isValid)
    } else {
      setValid(true);
    }
  }

  const switchRecordDisplay = () => {
    switch (columnType) {
      case 'date':
        if (typeof record === 'string') {
          if (['createdAt', 'updatedAt'].includes(columnName)) {
            const dateFormat = new Date(record);
            return dateFormat.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });

          } else {
            return record.slice(0, 10);
          }
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
      case 'link':
        if (typeof record === 'string') {
          return <a href={record} rel='stylesheet'>{record}</a>
        } else {
          return record;
        }
      case 'string':
        if (typeof record === 'string') {
          if (validatorIsEnumObjectArray) {
            const databaseEnumRecord = validator.find(({ serverEnum }) => serverEnum === record)?.databaseEnum;
            return databaseEnumRecord;
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

  const switchInitialValue = () => {
    if (record == null) {
      if (validatorIsEnumObjectArray) {
        // return Object.keys(validator)[0]
        return validator[0].serverEnum;
      }
      if (columnType === 'boolean') {
        return 'true'
      }
      return '';
    }
    if (columnType === 'date' && typeof record === 'string') {
      return record.slice(0, 10);
    }
    if (columnType === 'boolean') {
      if (record === true) {
        return 'true'
      }
      if (record === false) {
        return 'false'
      }
    }
    return record;
  }

  const initialValue = switchInitialValue();

  if (columnName === 'product') {
    console.log('initialValue:', initialValue);
  }


  const validationSchema = Yup.object().shape({ [columnName]: Yup.string().required('required').nullable(true), });

  return (
    <div
      ref={ref}
      className={`record-entry${authorized && editRecord ? ' editable' : ''}`}
      tabIndex={-1}
      onDoubleClick={() => setEdit(true)}
      onClick={() => setSelected(true)}
    >{edit && editRecord && authorized ?
      <Formik
        initialValues={{
          [columnName]: initialValue,
        }}
        validationSchema={validationSchema}
        onSubmit={(values: IValues, { setFieldError }: FormikHelpers<IValues>) => {
          try {
            editRecord({ id, columnName, columnType, newRecord: values[columnName] });
          } catch (e) {
            if (e instanceof ApolloError) {
              setFieldError(columnName, e.message);
            }
            throw e;
          }
          setEdit(false);
          setSelected(false);
        }
        }
      >
        {({ errors, touched, isSubmitting, handleChange }) => {
          return (
            <Form
              className='entry-field-form'
            >
              {validatorIsEnumObjectArray ?
                <DOMSelectInput
                  className='record-entry-input'
                  name={columnName}
                >
                  {validator/* && Object
                    .entries(validator)
                    */.map((/*[validatorServer, validatorDatabase]*/{ serverEnum, databaseEnum }) => <option
                    key={/* validatorServer */serverEnum}
                    value={/* validatorServer */serverEnum}
                  >
                    {/* validatorDatabase */databaseEnum}
                  </option>)}
                </DOMSelectInput> :
                columnType === 'boolean' ?
                  <DOMSelectInput
                    className='record-entry-input'
                    name={columnName}
                  >
                    <option value='true' >Y</option>
                    <option value='false' >N</option>
                  </DOMSelectInput> :
                  <TextInputRecordEntry
                    className={`record-entry-input${valid ? ' valid' : ' invalid'}`}
                    name={columnName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                      handleValidation(e);
                      handleChange(e);
                    }}
                    type={columnType === 'date' ? 'date' : columnType === 'number' ? 'number' : columnType === 'link' ? 'url' : 'text'}
                    autoComplete='off'
                  />}
              <div>
                <IconButton aria-label='submit cell' size='small' type='submit' disabled={!valid}>
                  <CheckCircleOutlineIcon />
                </IconButton>
              </div>
            </Form>
          )
        }}
      </Formik> :
      <div className='entry-field-form'>
        <div className='record-entry-display'>
          {recordDisplay}
        </div>
        {nullable && editRecord && authorized && selected && <div>
          <IconButton aria-label="expand row" size='small' onClick={() => editRecord({ id, columnName, columnType, newRecord: null })}>
            <BlockOutlinedIcon />
          </IconButton>
        </div>}
      </div>}
    </div>

  );
}