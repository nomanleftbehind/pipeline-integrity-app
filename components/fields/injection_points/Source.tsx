import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
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
}

export default function InjectionPointEntry({ injectionPointType, injectionPointId, source, handleSubmit, disconnectInjectionPoint }: IInjectionPointEnrtyProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleSubmitAndHideForm(injectionPointType: string, newInjectionPointId: string) {
    handleSubmit(injectionPointType, newInjectionPointId, injectionPointId);
    setShowForm(false);
  }

  return (
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
  );
}