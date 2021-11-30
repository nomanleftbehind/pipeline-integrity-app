import { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSourceOptionsLazyQuery, usePipelineOptionsLazyQuery, PipelineOptionsQuery, useValidatorSubstanceLazyQuery, ValidatorSubstanceQuery } from '../../../graphql/generated/graphql';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface IInjectionPointFormProps {
  injectionPointId?: string;
  injectionPointType: string;
  handleSubmit: (injectionPointType: string, newInjectionPointId: string) => void;
}

type IPipelineOption = PipelineOptionsQuery['pipelineOptions'] extends (infer U | null | undefined)[] | null | undefined ? U : never;

type ISubstanceEnum = NonNullable<ValidatorSubstanceQuery['validators']>['substanceEnum'] | undefined;


export default function InjectionPointForm({ injectionPointId, injectionPointType, handleSubmit }: IInjectionPointFormProps) {
  const [state, setState] = useState<string>('');

  const [upstreamPipelineOptions, { data: dataUpstreamPipelineOptions }] = usePipelineOptionsLazyQuery();
  const [validatorSubstance, { data: dataValidatorSubstance }] = useValidatorSubstanceLazyQuery();

  const [sourceOptions, { data: dataSourceOptions }] = useSourceOptionsLazyQuery();

  function handleChange(e: React.FormEvent<HTMLSelectElement>) {
    setState(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(injectionPointType, e.currentTarget.name);
  }

  const upstreamPipelineInitialState = injectionPointId ||
    dataUpstreamPipelineOptions &&
    dataUpstreamPipelineOptions.pipelineOptions &&
    dataUpstreamPipelineOptions.pipelineOptions[0] &&
    dataUpstreamPipelineOptions.pipelineOptions[0].id || ''

  const sourceInitialState = injectionPointId ||
    dataSourceOptions && dataSourceOptions.sourceOptions && dataSourceOptions.sourceOptions[0] && dataSourceOptions.sourceOptions[0].id || '';


  useEffect(() => { loadOptions(); }, []);

  useEffect(() => {
    setState(upstreamPipelineInitialState || sourceInitialState);
  }, [upstreamPipelineInitialState, sourceInitialState]);

  function loadOptions() {
    switch (injectionPointType) {
      case 'upstream pipeline':
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

    if (dataUpstreamPipelineOptions && dataUpstreamPipelineOptions.pipelineOptions) {

      return dataUpstreamPipelineOptions.pipelineOptions.map((pipelineOption, i, array) => {
        if (pipelineOption) {
          return [
            array[i - 1]?.facility !== pipelineOption.facility ?
              <option key={pipelineOption.id + 'facility'} disabled={true} style={{ fontWeight: 'bold' }}>{pipelineOption.facility}</option> : null,
            array[i - 1]?.satellite !== pipelineOption.satellite || array[i - 1]?.facility !== pipelineOption.facility ?
              <option key={pipelineOption.id + 'satellite'} disabled={true} style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;{pipelineOption.satellite}</option> : null,
            array[i - 1]?.substance !== pipelineOption.substance || array[i - 1]?.satellite !== pipelineOption.satellite || array[i - 1]?.facility !== pipelineOption.facility ?
              <option key={pipelineOption.id + 'substance'} disabled={true} style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{substanceValue(pipelineOption.substance, dataValidatorSubstance?.validators?.substanceEnum)}</option> : null,
            <option key={pipelineOption.id} value={pipelineOption.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${pipelineOption.license}-${pipelineOption.segment}`}</option>
          ]
        }
      })
    } else if (dataSourceOptions && dataSourceOptions.sourceOptions) {
      return dataSourceOptions.sourceOptions.map((source, i, array) => {
        if (source) {
          return [
            array[i - 1]?.facility !== source.facility ?
              <option key={source.id + 'facility'} disabled={true} style={{ fontWeight: 'bold' }}>{source.facility}</option> : null,
            array[i - 1]?.satellite !== source.satellite || array[i - 1]?.facility !== source.facility ?
              <option key={source.id + 'satellite'} disabled={true} style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;{source.satellite}</option> : null,
            <option key={source.id} value={source.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{source.source}</option>
          ]
        }
      })
    }
  }


  return (
    // <FormControl sx={{ m: 1, minWidth: 120 }}>
    //   <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
    //   <Select native defaultValue="" id="grouped-native-select" label="Grouping">
    //     <option aria-label="None" value="" />
    //     <optgroup label="Category 1">
    //       <option value={1}>Option 1</option>
    //       <option value={2}>Option 2</option>
    //     </optgroup>
    //     <optgroup label="Category 2">
    //       <option value={3}>Option 3</option>
    //       <option value={4}>Option 4</option>
    //     </optgroup>
    //   </Select>
    // </FormControl>
    <form className="cell-l" name={state} onSubmit={onSubmit}>
      <div className="form-l">
        <select value={state} onChange={handleChange}>
          {renderOptions()}
        </select>
      </div>
      <div className="form-r">
        <IconButton aria-label="expand row" size="small" type="submit">
          <CheckCircleOutlineIcon />
        </IconButton>
      </div>
    </form>
  )
}