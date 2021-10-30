import { useState } from 'react';
import RemoveIcon from '../../svg/remove-pipeline';
import EditIcon from '../../svg/edit-icon';
import CancelIcon from '../../svg/cancel-icon';
import OkIcon from '../../svg/ok-icon';
import { IInjectionPointQuery } from '../../../pages/pipelines';

interface ISourceProps {
  ppl_id: string;
  inj_pt_id: string;
  source: string;
  injectionPointOptions: IInjectionPointQuery[] | undefined;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function Source({ ppl_id, inj_pt_id, source, injectionPointOptions, onSubmit }: ISourceProps) {
  const [edit, setEdit] = useState(false);
  const [state, setState] = useState(inj_pt_id);

  const toggleEdit = () => {
    setEdit(!edit);
    setState(inj_pt_id);
  }

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setState(e.currentTarget.value);
  };

  const handleSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e.currentTarget.name, inj_pt_id);
  }

  const deleteInjectionPoint = () => {
    fetch(`http://localhost:5002/pipeline/${ppl_id}/${inj_pt_id}`, {
      method: 'DELETE',
    })
      .then(response => { return response.json() })
      .then(data => {
        fetchPipelines();
        console.log('Delete Success:', data);
      })
      .catch((error) => {
        console.error('Delete Error:', error);
      });
  }

  return (
    <th className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeSmall" role="cell" scope="row">
      <div className="cell-wrapper">
        <div className="cell-r">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={toggleEdit}>{edit ? <CancelIcon /> : <EditIcon />}</button>
        </div>
        <div className="cell-fr">
          <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={deleteInjectionPoint} type="button">
            <RemoveIcon />
          </button>
        </div>
        {edit ?
          <form className="cell-l" name={state} onSubmit={handleSubmit}>
            <div className="form-l">
              <select value={state} onChange={handleChange}>
                {injectionPointOptions.map(option => {
                  return (
                    <option key={option._id} value={option._id}>{option.source}</option>
                  );
                })}
              </select>
            </div>
            <div className="form-r">
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" type="submit"><OkIcon /></button>
            </div>
          </form> :
          <div className="cell-l no-wrap">{source}</div>}
      </div>
    </th>
  );
}