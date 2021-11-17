import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import InjectionPointForm from './InjectionPointForm';
import { IInjectionPointOptions } from '../../rows/RenderPipeline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface ISourceProps {
  injectionPointId: string;
  source: string;
  injectionPointOptions: IInjectionPointOptions;
  handleSubmit: (newInjectionPointId: string, oldInjectionPointId: string) => void;
  deleteInjectionPoint: () => void;
}

export default function Source({ injectionPointId, source, injectionPointOptions, handleSubmit, deleteInjectionPoint }: ISourceProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleSubmitAndHideForm(newInjectionPointId: string) {
    handleSubmit(newInjectionPointId, injectionPointId);
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
          <IconButton aria-label="delete injection point" size="small" onClick={deleteInjectionPoint} type="button">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
        {showForm ?
          <InjectionPointForm
            injectionPointId={injectionPointId}
            injectionPointOptions={injectionPointOptions}
            handleSubmit={handleSubmitAndHideForm}
          /> :
          <div className="cell-l no-wrap">{source}</div>}
      </div>
    </TableCell>
  );
}