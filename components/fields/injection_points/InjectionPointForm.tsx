import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSourceOptionsLazyQuery, usePipelineOptionsLazyQuery, PipelineOptionsQuery, useValidatorSubstanceLazyQuery, ValidatorSubstanceQuery } from '../../../graphql/generated/graphql';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { IInjectionPointType } from './Source';

interface IInjectionPointFormProps {
  injectionPointId?: string;
  injectionPointType: IInjectionPointType;
  handleSubmit: (injectionPointType: IInjectionPointType, newInjectionPointId: string) => void;
}

type IPipelineOption = PipelineOptionsQuery['pipelineOptions'] extends (infer U | null | undefined)[] | null | undefined ? U : never;

type ISubstanceEnum = NonNullable<ValidatorSubstanceQuery['validators']>['substanceEnum'] | undefined;


export default function InjectionPointForm({ injectionPointId, injectionPointType, handleSubmit }: IInjectionPointFormProps) {
  const [state, setState] = useState('');

  const [upstreamPipelineOptions, { data: dataUpstreamPipelineOptions }] = usePipelineOptionsLazyQuery();
  const [validatorSubstance, { data: dataValidatorSubstance }] = useValidatorSubstanceLazyQuery();

  const [sourceOptions, { data: dataSourceOptions }] = useSourceOptionsLazyQuery();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(injectionPointType, e.currentTarget.name);
  }

  useEffect(() => { loadOptions(); }, []);

  function loadOptions() {
    switch (injectionPointType) {
      case 'connected pipeline':
        upstreamPipelineOptions();
        validatorSubstance();
        break;
      case 'source':
        sourceOptions();
        break;
      default:
        break;
    }
  }

  function renderOptions() {
    function substanceValue(substance: IPipelineOption['substance'], substanceEnum: ISubstanceEnum) {
      return substanceEnum ? substanceEnum[substance] : substance;
    }
    const arr = [];

    if (dataUpstreamPipelineOptions && dataUpstreamPipelineOptions.pipelineOptions) {

      const arr1 = dataUpstreamPipelineOptions.pipelineOptions;

      for (let i = 0; i < arr1.length; i++) {
        const pipelineOption = arr1[i];
        if (pipelineOption) {
          const { facility, satellite, substance, id, license, segment } = pipelineOption;

          // if (arr1[i - 1]?.facility !== facility) {
          //   arr.push({ disabled: true, value: facility, id: `fac-${id}`, k: `fac-${i}` });
          // }
          // if (arr1[i - 1]?.satellite !== satellite || arr1[i - 1]?.facility !== facility) {
          //   arr.push({ disabled: true, value: `${nbsp.repeat(4)}${satellite}`, id: `sat-${id}`, k: `sat-${i}` });
          // }
          // if (arr1[i - 1]?.substance !== substance || arr1[i - 1]?.satellite !== satellite || arr1[i - 1]?.facility !== facility) {
          //   arr.push({ disabled: true, value: `${nbsp.repeat(8)}${substanceValue(substance, dataValidatorSubstance?.validators?.substanceEnum)}`, id: `sub-${id}`, k: `sub-${i}` });
          // }
          arr.push({ disabled: false, groupBy: facility, value: `${license}-${segment}`, id });
        }
      }
    } else if (dataSourceOptions && dataSourceOptions.sourceOptions) {
      const arr1 = dataSourceOptions.sourceOptions;

      for (let i = 0; i < arr1.length; i++) {
        const pipelineOption = arr1[i];
        if (pipelineOption) {
          const { facility, satellite, id, source } = pipelineOption;

          // if (arr1[i - 1]?.facility !== facility) {
          //   arr.push({ disabled: true, value: facility, id: `fac-${id}`, k: `fac-${i}` });
          // }
          // if (arr1[i - 1]?.satellite !== satellite || arr1[i - 1]?.facility !== facility) {
          //   arr.push({ disabled: true, value: `${nbsp.repeat(4)}${satellite}`, id: `sat-${id}`, k: `sat-${i}` });
          // }
          arr.push({ disabled: false, groupBy: facility, value: source, id });
        }
      }
    }
    return arr;
  }

  const optionsArray = renderOptions();

  return (
    <form className="cell-l" name={state} onSubmit={onSubmit}>
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
        sx={{ width: 400, /* Default button padding is 12px and makes button fall awkwardly half way outside of input element, so we are setting it to 0 */ '& button': { padding: 0 } }}
        renderInput={(params) => <TextField {...params} label={injectionPointType} />}
      />
      <div className="form-r">
        <IconButton aria-label="expand row" size="small" type="submit" disabled={state === '' ? true : false}>
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
    </form>

  )
}