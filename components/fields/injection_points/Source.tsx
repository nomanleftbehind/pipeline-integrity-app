import { useState } from 'react';
import InjectionPointForm from './InjectionPointForm';
import RemoveIcon from '../../svg/remove-pipeline';
import EditIcon from '../../svg/edit-icon';
import CancelIcon from '../../svg/cancel-icon';
import { IInjectionPointQuery } from '../../../pages/pipelines';

interface ISourceProps {
  injectionPointId: string;
  source: string;
  injectionPointOptions: IInjectionPointQuery[] | undefined;
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
    <th className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeSmall" role="cell" scope="row">
      <div className="cell-wrapper">
        <div className="cell-r">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={toggleShowForm}>{showForm ? <CancelIcon /> : <EditIcon />}</button>
        </div>
        <div className="cell-fr">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={deleteInjectionPoint} type="button">
            <RemoveIcon />
          </button>
        </div>
        {showForm ?
          <InjectionPointForm
            injectionPointId={injectionPointId}
            injectionPointOptions={injectionPointOptions}
            handleSubmit={handleSubmitAndHideForm}
          /> :
          <div className="cell-l no-wrap">{source}</div>}
      </div>
    </th>
  );
}