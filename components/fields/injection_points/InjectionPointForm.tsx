import { useEffect, useState } from "react";
import { IInjectionPointOptions } from '../../rows/RenderPipeline';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSourceOptionsLazyQuery, usePipelineOptionsLazyQuery, useValidatorSubstanceLazyQuery } from '../../../graphql/generated/graphql';

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface IInjectionPointFormProps {
  injectionPointType?: string;
  injectionPointOptions?: IInjectionPointOptions;
  handleSubmit: (newInjectionPointId: string) => void;
}

export default function InjectionPointForm({ injectionPointType, handleSubmit }: IInjectionPointFormProps) {
  const [state, setState] = useState<string>('');

  const [upstreamPipelineOptions, { data: dataUpstreamPipelineOptions }] = usePipelineOptionsLazyQuery();
  const [validatorSubstance, { data: dataValidatorSubstance }] = useValidatorSubstanceLazyQuery();

  const [sourceOptions, { data: dataSourceOptions }] = useSourceOptionsLazyQuery();

  function handleChange(e: React.FormEvent<HTMLSelectElement>) {
    setState(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e.currentTarget.name);
  }

  const upstreamPipelineInitialState =
    dataUpstreamPipelineOptions &&
      dataUpstreamPipelineOptions.allFacilities &&
      dataUpstreamPipelineOptions.allFacilities[0] &&
      dataUpstreamPipelineOptions.allFacilities[0].satellites &&
      dataUpstreamPipelineOptions.allFacilities[0].satellites[0] &&
      dataUpstreamPipelineOptions.allFacilities[0].satellites[0].pipelines &&
      dataUpstreamPipelineOptions.allFacilities[0].satellites[0].pipelines[0] &&
      dataUpstreamPipelineOptions.allFacilities[0].satellites[0].pipelines[0].id ? dataUpstreamPipelineOptions.allFacilities[0].satellites[0].pipelines[0].id : '';

  const sourceInitialState =
    dataSourceOptions && dataSourceOptions.allInjectionPoints && dataSourceOptions.allInjectionPoints[0] && dataSourceOptions.allInjectionPoints[0].id ? dataSourceOptions.allInjectionPoints[0].id : '';


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

  // function groupBy<T extends Record<string, string | number | symbol>>(objectArray: T[], property: keyof T) {
  //   const seed: Record<string | number | symbol, T[]> = {}; // notice that we change the seed type as well
  //   return objectArray.reduce(function (acc, obj) {
  //     let key = obj[property]
  //     if (!acc[key]) {
  //       acc[key] = [];
  //     }
  //     acc[key].push(obj);
  //     return acc;
  //   }, seed)
  // }


  function renderOptions() {
    if (dataUpstreamPipelineOptions && dataUpstreamPipelineOptions.allFacilities) {
      return dataUpstreamPipelineOptions.allFacilities.map(facility => {
        if (facility) {
          return (
            <optgroup key={facility.id} label={facility.name}>
              {facility.satellites ? facility.satellites.map(satellite => {
                if (satellite) {
                  return [
                    <option key={satellite.id} disabled={true} style={{ fontWeight: 'bold' }}>{satellite.name}</option>,
                    satellite.pipelines ? satellite.pipelines.map((pipeline, i, array) => {
                      if (pipeline && dataValidatorSubstance && dataValidatorSubstance.validators && dataValidatorSubstance.validators.substanceEnum) {
                        const substanceEnum = dataValidatorSubstance.validators.substanceEnum;
                        const substanceEnumKey = pipeline.substance as keyof typeof substanceEnum;
                        const substance = substanceEnum[substanceEnumKey];
                        return [
                          i === 0 || array[i - 1]?.substance !== pipeline.substance ?
                            <option key={pipeline.id + 'substance'} disabled={true} style={{ fontWeight: 'bold' }}>&nbsp;&nbsp;&nbsp;&nbsp;{substance}</option> : null,
                          <option key={pipeline.id} value={pipeline.id}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${pipeline.license}-${pipeline.segment}`}</option>
                        ]
                      }
                    }) : null
                  ]
                }
              }) : null
              }
            </optgroup>
          )
        }
      })

    } else if (dataSourceOptions && dataSourceOptions.allInjectionPoints) {
      return dataSourceOptions.allInjectionPoints.map(option => {
        if (option) {
          return (
            <option key={option.id} value={option.id}>
              {`${option.satellite?.facility?.name} - ${option.satellite?.name} - ${option.source}`}
            </option>
          )
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




// export default function GroupedSelect() {
//   return (
//     <div>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
//         <Select native defaultValue="" id="grouped-native-select" label="Grouping">
//           <option aria-label="None" value="" />
//           <optgroup label="Category 1">
//             <option value={1}>Option 1</option>
//             <option value={2}>Option 2</option>
//           </optgroup>
//           <optgroup label="Category 2">
//             <option value={3}>Option 3</option>
//             <option value={4}>Option 4</option>
//           </optgroup>
//         </Select>
//       </FormControl>
//       <FormControl sx={{ m: 1, minWidth: 120 }}>
//         <InputLabel htmlFor="grouped-select">Grouping</InputLabel>
//         <Select defaultValue="" id="grouped-select" label="Grouping">
//           <MenuItem value="">
//             <em>None</em>
//           </MenuItem>
//           <ListSubheader>Category 1</ListSubheader>
//           <MenuItem value={1}>Option 1</MenuItem>
//           <MenuItem value={2}>Option 2</MenuItem>
//           <ListSubheader>Category 2</ListSubheader>
//           <MenuItem value={3}>Option 3</MenuItem>
//           <MenuItem value={4}>Option 4</MenuItem>
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
