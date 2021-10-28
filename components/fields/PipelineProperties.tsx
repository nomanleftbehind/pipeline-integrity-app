import EntryField from './EntryField';

import { IPipelineProperties, IPipelinePropertiesValidators } from '../rows/PipelineData';

interface IPipelinePropertiesProps {
  id: string;
  properties_name: string;
  pipeline_properties: IPipelineProperties;
  pipeline_properties_validators: IPipelinePropertiesValidators[];
  // fetchPipelines: () => void
}

export default function PipelineProperties({ id, properties_name, pipeline_properties, pipeline_properties_validators/*, fetchPipelines*/ }: IPipelinePropertiesProps): JSX.Element {

  return (
    <td className="MuiTableCell-root MuiTableCell-body" colSpan={2}>
      <div className="collapse-container">
        <div className="collapse-container-inner">
          <div className="injection-points-title">{properties_name}</div>
          <table className="MuiTable-root">
            <thead className="MuiTableHead-root">
              <tr className="MuiTableRow-root MuiTableRow-head">
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-sizeSmall">Property</th>
                <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-alignRight MuiTableCell-sizeSmall">Value</th>
              </tr>
            </thead>
            <tbody className="MuiTableBody-root">
              {Object.entries(pipeline_properties).map(([columnName, record], index) => {
                const validator = pipeline_properties_validators[index];
                return (
                  <tr key={columnName} className="MuiTableRow-root">
                    <td className="MuiTableCell-root MuiTableCell-body MuiTableCell-sizeSmall">{columnName.replace('_', ' ')}</td>
                    <EntryField id={id} record={record} columnName={columnName} validator={validator}/* fetchPipelines={fetchPipelines}*/ />
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