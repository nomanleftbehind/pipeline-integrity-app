import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Source from './Source';
import InjectionPointForm from './InjectionPointForm';
import { InjectionPoint, Pipeline } from '@prisma/client';
import { IInjectionPointQuery, PIPELINES_BY_ID_QUERY } from '../../../pages/pipelines';
import AddIcon from '../../svg/add-pipeline';
import CancelIcon from '../../svg/cancel-icon';

interface IInjectionPointsProps {
  id: string;
  injectionPoints: InjectionPoint[];
  injectionPointOptions: IInjectionPointQuery[] | undefined;
}


type IMutateInjectionPoint = Pick<InjectionPoint, 'id' | 'source'> & { pipeline?: Pick<Pipeline, 'id' | 'license' | 'segment'> };

interface IDeleteInjectionPointFromPipeline {
  deleteInjectionPointFromPipeline: IMutateInjectionPoint;
}

type IMutateInjectionPointVars = Pick<InjectionPoint, 'id'> & Partial<Pick<InjectionPoint, 'pipelineId'>>;

const DELETE_INJECTION_POINT_FROM_PIPELINE = gql`
  mutation deleteInjectionPointFromPipeline($id: String!) {
  deleteInjectionPointFromPipeline(id: $id) {
    id
    source
  }
}
`

const CHANGE_INJECTION_POINT_TO_PIPELINE = gql`
  mutation changeInjectionPointToPipeline($id: String!, $pipelineId: String) {
  editInjectionPoint(id: $id, pipelineId: $pipelineId) {
    id
    source
    pipeline {
      id
      license
      segment
    }
  }
}
`


export default function InjectionPoints({ id, injectionPoints, injectionPointOptions }: IInjectionPointsProps) {
  const [showForm, setShowForm] = useState<boolean>(false);

  const [deleteInjectionPoint, { data, error, loading }] = useMutation<IDeleteInjectionPointFromPipeline, IMutateInjectionPointVars>(DELETE_INJECTION_POINT_FROM_PIPELINE);
  const [changeInjectionPointToPipeline, { data: dataChangeInjectionPointToPipeline }] = useMutation<{ editInjectionPoint: IMutateInjectionPoint }, IMutateInjectionPointVars>(CHANGE_INJECTION_POINT_TO_PIPELINE);

  function toggleShowForm() {
    setShowForm(!showForm);
  }

  function handleSubmit(newInjectionPointId: string, oldnewInjectionPointId?: string) {
    if (oldnewInjectionPointId) deleteInjectionPoint({ variables: { id: oldnewInjectionPointId } }); // Very important this is the first mutation called in this block,
    // as otherwise if you click OK, while not having selected a different injection point,
    // it would first override injection point with itself and then delete it.
    changeInjectionPointToPipeline({ variables: { id: newInjectionPointId, pipelineId: id }, refetchQueries: [PIPELINES_BY_ID_QUERY, 'pipelinesByIdQuery'] });
    setShowForm(false);
  }

  return (
    <td className="MuiTableCell-root MuiTableCell-body" colSpan={3}>
      <div className="collapse-container">
        <div className="collapse-container-inner">
          <div className="injection-points-title">Injection Points</div>
          <table className="MuiTable-root">
            <thead className="MuiTableHead-root">
              <tr className="MuiTableRow-root MuiTableRow-head">
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall">
                  <div className="cell-wrapper">
                    <div className="form-l">Source</div>
                    <div className="form-r">
                      <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall" onClick={toggleShowForm} type="button">
                        {showForm ? <CancelIcon /> : <AddIcon />}
                      </button>
                    </div>
                  </div>
                </th>
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Oil</th>
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Gas</th>
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Water</th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root">
              {showForm ?
                <tr>
                  <td colSpan={5}>
                    <InjectionPointForm
                      injectionPointId={injectionPointOptions ? injectionPointOptions[0].id : ''}
                      injectionPointOptions={injectionPointOptions}
                      handleSubmit={handleSubmit}
                    />
                  </td>
                </tr> :
                null}
              {injectionPoints.map(injectionPoint => {
                return (
                  <tr key={injectionPoint.id} className="MuiTableRow-root">
                    <Source
                      injectionPointId={injectionPoint.id}
                      source={injectionPoint.source}
                      injectionPointOptions={injectionPointOptions}
                      handleSubmit={handleSubmit}
                      deleteInjectionPoint={() => deleteInjectionPoint({ variables: { id: injectionPoint.id }, refetchQueries: [PIPELINES_BY_ID_QUERY, 'pipelinesByIdQuery'] })}
                    />
                    <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeSmall">{injectionPoint.oil}</td>
                    <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeSmall">{injectionPoint.water}</td>
                    <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-alignRight MuiTableCell-sizeSmall">{injectionPoint.gas}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </td>
  );
}