import { Fragment } from 'react';
import {
  useLicenseChangesByPipelineIdQuery,
  useValidatorsLicenseChangeQuery,
  useEditLicenseChangeMutation,
  useAddLicenseChangeMutation,
  useDeleteLicenseChangeMutation,
  LicenseChangesByPipelineIdDocument,
} from '../../graphql/generated/graphql';

import RecordEntry, { IEditRecord } from '../fields/RecordEntry';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface ILicenseChangesProps {
  pipelineId: string;
}

export default function LicenseChanges({ pipelineId }: ILicenseChangesProps) {
  const { data } = useLicenseChangesByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataValidators } = useValidatorsLicenseChangeQuery();
  const [editLicenseChange] = useEditLicenseChangeMutation({ refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId'] });
  const [addRecord] = useAddLicenseChangeMutation({ refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId'] });
  const [deleteRecord] = useDeleteLicenseChangeMutation({ refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId'] });

  const editRecord = ({ id, columnName, columnType, newRecord }: IEditRecord) => {
    const switchNewRecord = () => {
      switch (columnType) {
        case 'number':
          return Number(newRecord);
        case 'date':
          if (newRecord && typeof newRecord !== 'boolean') {
            const date = new Date(newRecord);
            return date.toISOString();
          }
        default:
          return newRecord;
      }
    }
    newRecord = switchNewRecord();
    editLicenseChange({ variables: { id, [columnName]: newRecord } });
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '30px 220px 200px 200px 200px auto', gap: '10px', gridAutoRows: 'minmax(40px, auto)' }}>
      <div style={{ padding: '4px', gridColumn: 1, gridRow: 1 }}>
        <IconButton
          style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
          aria-label='add row' size='small' onClick={() => addRecord({ variables: { pipelineId } })}>
          <AddCircleOutlineOutlinedIcon />
        </IconButton>
      </div>
      <div style={{ padding: '4px', gridColumn: 2, gridRow: 1 }}>Date</div>
      <div style={{ padding: '4px', gridColumn: 3, gridRow: 1 }}>Status</div>
      <div style={{ padding: '4px', gridColumn: 4, gridRow: 1 }}>Substance</div>
      <div style={{ padding: '4px', gridColumn: 5, gridRow: 1 }}>Link To Documentation</div>
      <div style={{ padding: '4px', gridColumn: 6, gridRow: 1 }}>ID</div>

      {data?.licenseChangesByPipelineId?.map((licenseChange, i) => {
        i += 2;
        if (licenseChange) {
          const { id, date, status, substance, linkToDocumentation, createdBy } = licenseChange;
          const { statusEnum, substanceEnum } = dataValidators?.validators || {};
          return (
            <Fragment key={id}>
              <div style={{ padding: '4px', gridColumn: 1, gridRow: i }}>
                <IconButton
                  style={{ margin: 0, position: 'relative', top: '50%', left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)' }}
                  aria-label='delete row' size='small' onClick={() => deleteRecord({ variables: { id } })}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </div>
              <div style={{ padding: '4px', gridColumn: 2, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='date' columnType='date' nullable={false} record={date} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 3, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='status' columnType='string' nullable={false} record={status} validator={statusEnum} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 4, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='substance' columnType='string' nullable={false} record={substance} validator={substanceEnum} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 5, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='linkToDocumentation' columnType='string' nullable={true} record={linkToDocumentation} editRecord={editRecord} />
              </div>
              <div style={{ padding: '4px', gridColumn: 6, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='id' columnType='string' nullable={false} record={id} />
              </div>
            </Fragment>
          )
        }
      })}
    </div>
  );
}