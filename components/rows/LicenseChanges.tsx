import { useLicenseChangesByPipelineIdQuery, useValidatorsLicenseChangeQuery, useEditLicenseChangeMutation, LicenseChangesByPipelineIdDocument } from '../../graphql/generated/graphql';
import EntryField, { IEditRecord } from '../fields/EntryField2';
import { IRecord } from '../fields/PipelineProperties';
import { IColumnType } from '../fields/EntryField2';

interface ILicenseChangesProps {
  pipelineId: string;
}

export default function LicenseChanges({ pipelineId }: ILicenseChangesProps) {
  const { data } = useLicenseChangesByPipelineIdQuery({ variables: { pipelineId } });
  const { data: dataValidators } = useValidatorsLicenseChangeQuery();
  const [editLicenseChange] = useEditLicenseChangeMutation({ refetchQueries: [LicenseChangesByPipelineIdDocument, 'LicenseChangesByPipelineId'] });
  const table = 'license change';

  const editRecord = ({ id, columnName, columnType, newRecord }: IEditRecord) => {
    console.log(id, columnName, columnType, newRecord);

    editLicenseChange({ variables: { id, [columnName]: columnType === 'number' ? Number(newRecord) : newRecord } });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {data?.licenseChangesByPipelineId?.map(licenseChange => {
        if (licenseChange) {
          const { id, date, status, substance, linkToDocumentation, createdBy } = licenseChange;
          const { statusEnum, substanceEnum } = dataValidators?.validators || {};
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'row' }}>
              <EntryField id={id} createdById={createdBy.id} columnName='date' columnType='date' record={date} table={table} />
              <EntryField id={id} createdById={createdBy.id} columnName='status' columnType='string' record={status} validator={statusEnum} editRecord={editRecord} table={table} />
              <EntryField id={id} createdById={createdBy.id} columnName='substance' columnType='string' record={substance} validator={substanceEnum} editRecord={editRecord} table={table} />
              <EntryField id={id} createdById={createdBy.id} columnName='linkToDocumentation' columnType='string' record={linkToDocumentation} editRecord={editRecord} table={table} />
              <EntryField id={id} createdById={createdBy.id} columnName='id' columnType='string' record={id} table={table} />
            </div>
          )
        }
      })}
    </div>
  );
}

interface IContainerProps {
  licenseChangeProp?: string | null;
}

function Container({ licenseChangeProp }: IContainerProps) {
  return <div style={{ padding: '4px', border: 'solid red 1px' }}>
    <div style={{
      padding: '8px',
      backgroundColor: '#fff',
      borderRadius: '4px',
      color: 'rgba(0, 0, 0, 0.6)',
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }}
    >{licenseChangeProp}</div>
  </div>
}