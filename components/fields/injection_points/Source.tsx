import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import InjectionPointForm from './InjectionPointForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


interface IInjectionPointEnrtyProps {
  injectionPointType: string;
  injectionPointId: string;
  source: string;
  handleSubmit: (injectionPointType: string, newInjectionPointId: string, oldInjectionPointId: string) => void;
  disconnectInjectionPoint: () => void;
  injectionPointFlow: {
    injectionPointOil?: number;
    injectionPointWater?: number;
    injectionPointGas?: number;
    injectionPointLastProduction?: string | null;
    injectionPointFirstProduction?: string | null;
    injectionPointLastInjection?: string | null;
    injectionPointFirstInjection?: string | null;
  };
}

export default function InjectionPointEntry({ injectionPointType, injectionPointId, source, handleSubmit, disconnectInjectionPoint, injectionPointFlow }: IInjectionPointEnrtyProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleSubmitAndHideForm(injectionPointType: string, newInjectionPointId: string) {
    handleSubmit(injectionPointType, newInjectionPointId, injectionPointId);
    setShowForm(false);
  }

  const { injectionPointOil, injectionPointWater, injectionPointGas, injectionPointLastProduction, injectionPointFirstProduction, injectionPointLastInjection, injectionPointFirstInjection } = injectionPointFlow || {};

  return (
    <TableRow sx={{ '& > td, th': { whiteSpace: 'nowrap' } }}>
      <TableCell component="th" scope="row">
        <div className="cell-wrapper">
          <div className="cell-r">
            <IconButton aria-label="show form" size="small" onClick={toggleShowForm} type="button">
              {showForm ? <BlockOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton>
          </div>
          <div className="cell-fr">
            <IconButton aria-label="delete injection point" size="small" onClick={disconnectInjectionPoint} type="button">
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </div>
          {showForm ?
            <InjectionPointForm
              injectionPointId={injectionPointId}
              injectionPointType={injectionPointType}
              handleSubmit={handleSubmitAndHideForm}
            /> :
            <div className="cell-l no-wrap">{source}</div>}
        </div>
      </TableCell>
      {/* Rounding to two decimal places because Prisma raw query sometimes returns what should be a two decimal places number,
          showing gazillion trailing zeros and 1 after a decimal point */}
      <TableCell align="right">{injectionPointOil ? Math.round((injectionPointOil) * 100) / 100 : null}</TableCell>
      <TableCell align="right">{injectionPointWater ? Math.round((injectionPointWater) * 100) / 100 : null}</TableCell>
      <TableCell align="right">{injectionPointGas ? Math.round((injectionPointGas) * 100) / 100 : null}</TableCell>
      <TableCell align="right">{injectionPointLastProduction ? injectionPointLastProduction.slice(0, 10) : null}</TableCell>
      <TableCell align="right">{injectionPointLastInjection ? injectionPointLastInjection.slice(0, 10) : null}</TableCell>
      <TableCell align="right">{injectionPointFirstProduction ? injectionPointFirstProduction.slice(0, 10) : null}</TableCell>
      <TableCell align="right">{injectionPointFirstInjection ? injectionPointFirstInjection.slice(0, 10) : null}</TableCell>
    </TableRow>
  );
}