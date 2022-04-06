import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { IDis_ConnectSource } from './ConnectedSources';
import TextField from '@mui/material/TextField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {

  WellOptionsQuery,

} from '../../../graphql/generated/graphql';

interface IAutocompleteFormProps {
  pipelineId: string;
  options: WellOptionsQuery['wellOptions'];
  connectSource: (arg0: IDis_ConnectSource) => void;
}

export default function AutocompleteForm({ pipelineId, options, connectSource }: IAutocompleteFormProps) {
  const [state, setState] = useState('');


  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    connectSource({ id: e.currentTarget.name, pipelineId });
  }

  function renderOptions() {
    const arr = [];
    if (options) {
      for (let i = 0; i < options.length; i++) {
        const sourceOption = options[i];
        if (sourceOption) {
          const { facility, satellite, id, source, disabled } = sourceOption;
          arr.push({ disabled, groupBy: facility || 'no facility', value: source, id });
        }
      }

    }
    return arr;
  }

  const optionsArray = renderOptions();

  return (
    <>
      <td>
        <form id='sourceForm' style={{ display: 'flex' }} name={state} onSubmit={onSubmit}>
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
            options={optionsArray}
            getOptionLabel={(option) => option.value}
            groupBy={(option) => option.groupBy}
            getOptionDisabled={(option) => option.disabled}
            size="small"
            sx={{ width: 230, height: 33,/* Default button padding is 12px and makes button fall awkwardly half way outside of input element, so we are setting it to 0 */ '& button': { padding: 0 }, '& div': { height: 33 } }}
            renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, style: { fontSize: 'small' } }} /*label={injectionPointType}*/ />}
            ListboxProps={{ style: { fontSize: 'small' } }}
          />
        </form>
      </td>
      <td>
        <button className='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root' type='submit' form='sourceForm' disabled={state === '' ? true : false}>
          <CheckCircleOutlineIcon />
        </ button>
      </td>
    </>
  );
}