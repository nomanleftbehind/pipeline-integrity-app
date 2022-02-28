import { Fragment } from 'react';
import { useLicenseChangesByPipelineIdQuery, useValidatorsLicenseChangeQuery, useEditLicenseChangeMutation, LicenseChangesByPipelineIdDocument } from '../../graphql/generated/graphql';
import RecordEntry, { IEditRecord } from '../fields/RecordEntry';

interface ILicenseChangesProps {
  pipelineId: string;
}

export default function LicenseChanges({ pipelineId }: ILicenseChangesProps) {
  const { data } = useLicenseChangesByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataValidators } = useValidatorsLicenseChangeQuery();
  const [editLicenseChange] = useEditLicenseChangeMutation({ refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId'] });
  const table = 'license change';

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
    <div style={{ display: 'grid', gridTemplateColumns: '220px 200px 200px 200px auto', gap: '10px', gridAutoRows: 'minmax(50px, auto)' }}>

      <div style={{ padding: '4px', gridColumn: 1, gridRow: 1 }}>Date</div>
      <div style={{ padding: '4px', gridColumn: 2, gridRow: 1 }}>Status</div>
      <div style={{ padding: '4px', gridColumn: 3, gridRow: 1 }}>Substance</div>
      <div style={{ padding: '4px', gridColumn: 4, gridRow: 1 }}>Link To Documentation</div>
      <div style={{ padding: '4px', gridColumn: 5, gridRow: 1 }}>ID</div>

      {data?.licenseChangesByPipelineId?.map((licenseChange, i) => {
        i += 2;
        if (licenseChange) {
          const { id, date, status, substance, linkToDocumentation, createdBy } = licenseChange;
          const { statusEnum, substanceEnum } = dataValidators?.validators || {};
          return (
            <Fragment key={id}>
              <div style={{ padding: '4px', gridColumn: 1, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='date' columnType='date' record={date} editRecord={editRecord} table={table} />
              </div>
              <div style={{ padding: '4px', gridColumn: 2, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='status' columnType='string' record={status} validator={statusEnum} editRecord={editRecord} table={table} />
              </div>
              <div style={{ padding: '4px', gridColumn: 3, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='substance' columnType='string' record={substance} validator={substanceEnum} editRecord={editRecord} table={table} />
              </div>
              <div style={{ padding: '4px', gridColumn: 4, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='linkToDocumentation' columnType='string' record={linkToDocumentation} editRecord={editRecord} table={table} />
              </div>
              <div style={{ padding: '4px', gridColumn: 5, gridRow: i }}>
                <RecordEntry id={id} createdById={createdBy.id} columnName='id' columnType='string' record={id} table={table} />
              </div>
            </Fragment>
          )
        }
      })}
    </div>
  );
}