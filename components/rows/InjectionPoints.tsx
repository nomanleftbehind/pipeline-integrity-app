import { useState, Fragment, useEffect } from 'react';
import RecordEntry, { IEditRecord, IRecordEntryProps } from '../fields/RecordEntry';
import { ModalFieldError } from '../Modal';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  useConnectWellMutation,
  useDisconnectWellMutation,
  LicenseChangesByPipelineIdDocument,
  PipelinesByIdDocument,
  RiskByIdDocument,
  useWellsByPipelineIdQuery,
  useWellOptionsLazyQuery,
  WellOptionsQuery,
} from '../../graphql/generated/graphql';


interface IInjectionPointsProps {
  pipelineId: string;
}

export default function InjectionPoints({ pipelineId }: IInjectionPointsProps) {

  const { data, loading, error } = useWellsByPipelineIdQuery({ variables: { pipelineId } });
  const [showWellOptionsForm, setShowWellOptionsForm] = useState(false);

  function toggleShowWellOptionsForm() {
    setShowWellOptionsForm(!showWellOptionsForm);
    wellOptions();
  }


  const [connectWell] = useConnectWellMutation({
    refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId', PipelinesByIdDocument, 'pipelinesById', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ connectWell }) => {
      const { error } = connectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const [disconnectWell] = useDisconnectWellMutation({
    refetchQueries: [PipelinesByIdDocument, 'pipelinesById', RiskByIdDocument, 'RiskById'],
    onCompleted: ({ disconnectWell }) => {
      const { error } = disconnectWell || {};
      if (error) {
        setFieldError(error);
      }
    }
  });

  const [wellOptions, { data: dataWellOptions }] = useWellOptionsLazyQuery();


  const initialFieldError = { field: '', message: '' };
  const [fieldError, setFieldError] = useState(initialFieldError);

  const hideFieldErrorModal = () => {
    setFieldError(initialFieldError);
  }

  const wellHeader = [
    { label: 'Source', width: '160px', colspan: 3 },
    { label: 'Oil (m³/d)', width: '50px' },
    { label: 'Water (m³/d)', width: '120px' },
    { label: 'Gas (E3m³/d)', width: '100px' },
    { label: 'Gas Associated Liquids (m³/d)', width: '100px' },
    { label: 'Total Fluids (m³/d)', width: '100px' },
    { label: 'Last Production', width: '100px' },
    { label: 'First Production', width: '100px' },
    { label: 'Last Injection', width: '100px' },
    { label: 'First Injection', width: '100px' },
  ];

  return (
    <table className='injection-point'>
      <thead>
        <tr>
          {wellHeader.map(({ label, width, colspan }, i) => <th key={i} style={{ width }} colSpan={colspan}>{label}</th>)}
        </tr>
        <tr>
          <th colSpan={2}>Wells</th>
          <th>
            <IconButton aria-label="expand row" size="small" onClick={toggleShowWellOptionsForm}>
              {showWellOptionsForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
            </IconButton>
          </th>
        </tr>
      </thead>
      <tbody>
        {showWellOptionsForm && <tr>
          <td></td>
          <td colSpan={4}>
            <InjectionPointForm options={dataWellOptions?.wellOptions}/>
          </td>
        </tr>}
        {data?.wellsByPipelineId?.map((well, row) => {
          if (well) {
            const { id, uwi, oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, firstProduction, lastInjection, firstInjection, createdBy, createdAt, updatedBy, updatedAt, authorized } = well;
            const columns = [
              {
                record: <IconButton
                  aria-label='delete row' size='small' onClick={() => disconnectWell({ variables: { id: pipelineId, wellId: id } })}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              },
              { record: uwi, borderRight: 'unset' },
              {
                record: <IconButton
                  aria-label='delete row' size='small' onClick={() => alert('hello')}>
                  <EditOutlinedIcon />
                </IconButton>, borderLeft: 'unset'
              },
              { record: oil },
              { record: water },
              { record: gas },
              { record: gasAssociatedLiquids.toFixed(3) },
              { record: totalFluids.toFixed(2) },
              { record: lastProduction?.split('T')[0] },
              { record: firstProduction?.split('T')[0] },
              { record: lastInjection?.split('T')[0] },
              { record: firstInjection?.split('T')[0] }
            ];
            return (
              <tr key={row}>
                {columns.map(({ record, borderLeft, borderRight }, c) => {
                  return (
                    <td
                      key={c}
                      style={{ borderLeft, borderRight }}>{record}</td>
                  );
                })}
              </tr>
            );
          }
        })}
      </tbody>
    </table>);
}


interface IInjectionPointFormProps {
  options: WellOptionsQuery['wellOptions']
}

function InjectionPointForm({ options }: IInjectionPointFormProps) {
  const [state, setState] = useState('');


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert(e.currentTarget.name)
    // handleSubmit(injectionPointType, e.currentTarget.name);
  }




  function renderOptions() {
    const arr = [];
    if (options) {
      for (let i = 0; i < options.length; i++) {
        const sourceOption = options[i];
        if (sourceOption) {
          const { facility, satellite, id, source } = sourceOption;
          arr.push({ disabled: false, groupBy: facility, value: source, id });
        }
      }

    }
    return arr;
  }

  const optionsArray = renderOptions();

  return (
    <form style={{display: 'flex'}} name={state} onSubmit={onSubmit}>
      <Autocomplete
        blurOnSelect
        autoComplete
        onChange={(_, value) => {
          // When we click `Clear` button, value is set to null, and in that case we want state to be set back to default value of empty string.
          setState(value ? value.id : '');
        }}
        isOptionEqualToValue={(option, value) => option !== value}
        onInputChange={(_, keyboardInput, reason) => {
          // We are setting state to empty string on every keystroke
          // because we don't want dangling state from previous valid input to keep around.
          // We will only call setState if input changes due to keyboard stroke.
          // This is because input changes one last time immediately after submit form button is clicked, returning the reason === `reset`.
          // If we just called setState without the condition, state would change to empty string in the last moment before it is pased to onSubmit function. 
          if (reason === 'input') {
            setState('');
          }
          for (let i = 0; i < optionsArray.length; i++) {
            const option = optionsArray[i];
            if (option.value.toUpperCase() === keyboardInput.toUpperCase()) {
              // In case we are manually typing with keyboard, set state to that injection point's id only if we match the actual injection point string value with keyboard input.
              setState(option.id);
            }
          }
        }}
        id="injection-point-form"
        options={optionsArray}
        getOptionLabel={(option) => option.value}
        groupBy={(option) => option.groupBy}
        size="small"
        sx={{ width: 300, height: 30,/* Default button padding is 12px and makes button fall awkwardly half way outside of input element, so we are setting it to 0 */ '& button': { padding: 0 }, '& div': {height: 30} }}
        renderInput={(params) => <TextField {...params} /*label={injectionPointType}*/ />}
      />
      <div className="form-r">
        <IconButton aria-label="expand row" size="small" type="submit" disabled={state === '' ? true : false}>
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
    </form>

  )
}


/*<div className='injection-point'>*/
{/* <div className='pipeline-data-view-header sticky top left' style={{ gridColumn: 1 }}>
        <IconButton
          className='button-container'
          aria-label='add row' size='small' onClick={addRecord}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div> */}
  /*{JSON.stringify(fieldError) !== JSON.stringify(initialFieldError) && <ModalFieldError
  fieldError={fieldError}
  hideFieldError={hideFieldErrorModal}
/>}
{wellHeader.map(({ label }, gridColumn) => {
  gridColumn += 2;
  return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
})}
{loading && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>Loading...</div>}
{error && <div style={{ padding: '4px', gridColumn: 2, gridRow: 2 }}>{error.message}</div>}
{data?.wellsByPipelineId?.map((well, gridRow) => {
  const isLastRow = data.wellsByPipelineId?.length === gridRow + 1;
  gridRow += 2;
  if (well) {
    const { id, uwi, oil, water, gas, gasAssociatedLiquids, totalFluids, lastProduction, firstProduction, lastInjection, firstInjection, createdBy, createdAt, updatedBy, updatedAt, authorized } = well;
    const wellColumns = [
      <div key={1} style={{display: 'flex'}}>{uwi}</div>,
      oil, water, gas, gasAssociatedLiquids.toFixed(3), totalFluids.toFixed(2), lastProduction?.split('T')[0], firstProduction?.split('T')[0], lastInjection?.split('T')[0], firstInjection?.split('T')[0]
    ];
    return (
      <Fragment key={id}>
        <div className={`injection-point-row sticky left${isLastRow ? ' last' : ''}`} style={{ gridColumn: 1, gridRow }}>
          <IconButton
            className='button-container'
            aria-label='delete row' size='small' onClick={() => disconnectWell({ variables: { id: pipelineId, wellId: id } })}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
        {wellColumns.map((record, gridColumn) => {
          gridColumn += 2;
          return (
            <div key={gridColumn} className='injection-point-row' style={{ gridColumn, gridRow }}>
              {record}
            </div>
          );
        })}
      </Fragment>
    )
  }
})}
</div>*/