import { useLicenseChangesByPipelineIdQuery, useValidatorsLicenseChangeQuery, useEditLicenseChangeMutation, LicenseChangesByPipelineIdDocument } from '../../graphql/generated/graphql';
import EntryField, { IEditRecord } from '../fields/EntryField2';

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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {data?.licenseChangesByPipelineId?.map(licenseChange => {
        if (licenseChange) {
          const { id, date, status, substance, linkToDocumentation, createdBy } = licenseChange;
          const { statusEnum, substanceEnum } = dataValidators?.validators || {};
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'row' }}>
              {/* <EntryField id={id} createdById={createdBy.id} columnName='date' columnType='date' record={date} editRecord={editRecord} table={table} /> */}
              <EntryField id={id} createdById={createdBy.id} columnName='status' columnType='string' record={status} validator={statusEnum} editRecord={editRecord} table={table} />
              {/* <EntryField id={id} createdById={createdBy.id} columnName='substance' columnType='string' record={substance} validator={substanceEnum} editRecord={editRecord} table={table} /> */}
              {/* <EntryField id={id} createdById={createdBy.id} columnName='linkToDocumentation' columnType='string' record={linkToDocumentation} editRecord={editRecord} table={table} /> */}
              {/* <EntryField id={id} createdById={createdBy.id} columnName='id' columnType='string' record={id} table={table} /> */}
            </div>
          )
        }
      })}
    </div>
  );
}