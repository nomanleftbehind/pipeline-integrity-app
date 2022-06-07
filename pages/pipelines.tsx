import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { prisma } from '../lib/prisma';
import { getUser } from '../lib/user';

import RenderPipeline from '../components/rows/RenderPipeline';
import Navigation from '../components/navigation/Navigation';

import { IGetServerSideProps } from './register';
import { usePipelinesByIdLazyQuery, useValidatorsPipelineQuery, PipelinesByIdQueryVariables } from '../graphql/generated/graphql';

export interface IHeader {
  license: string;
  segment: string;
  from: string;
  fromFeature: string;
  to: string;
  toFeature: string;
}


function PipelineDatabase() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const offsetPagination = { skip: page * rowsPerPage, take: rowsPerPage }


  // const header: IHeader = { license: '', segment: '', from: '', fromFeature: '', to: '', toFeature: '' };
  // const [filterText, setFilterText] = useState<IHeader>(header);
  // const [filterTextCaseInsensitive, setFilterTextCaseInsensitive] = useState<IHeader>(header);


  const [pipelinesById, { data, loading, error }] = usePipelinesByIdLazyQuery();
  const { data: validatorsData } = useValidatorsPipelineQuery();

  const handleNavigation = ({ navigationInput: { hierarchy, search }, skip, take }: PipelinesByIdQueryVariables) => {
    if (hierarchy) {
      pipelinesById({ variables: { navigationInput: { hierarchy }, skip, take } });
    }
    if (search) {
      pipelinesById({ variables: { navigationInput: { search }, skip, take } });
    }
  }

  // const handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   const { name, value }: { name: string; value: string } = e.currentTarget;
  //   const myHeader = name as keyof IHeader;
  //   const newFilterText = { ...filterText };
  //   const newFilterTextCaseInsensitive = { ...filterTextCaseInsensitive };
  //   newFilterText[myHeader] = value;
  //   newFilterTextCaseInsensitive[myHeader] = value.toUpperCase();
  //   setFilterText(newFilterText);
  //   setFilterTextCaseInsensitive(newFilterTextCaseInsensitive);
  // }

  const validators = validatorsData?.validators;
  // function valuesFromEnum<T>(property: keyof T, validator: T | undefined) {
  //   return validator ? validator[property] : property;
  // }

  const pipelineHeader = [
    { label: 'License' },
    { label: 'Segment' },
    { label: 'From' },
    { label: 'From Feature' },
    { label: 'To' },
    { label: 'To Feature' },
    { label: 'Current Status' },
    { label: 'Current Substance' },
  ];

  return (
    <div className="pipeline-database-wrapper">
      <div className="pipeline-database-side-bar"/* style={{border: '1px solid green'}}*/>
        <div className="pipeline-database-side-bar-fixed" /*style={{border: '1px solid red'}}*/>
          <Navigation
            onNavigationAction={handleNavigation}
            offsetPagination={offsetPagination}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className='pipelines-window'>
          <div className='pipeline-data-view-header sticky top' style={{ gridColumn: '1 / 4' }}></div>
          {pipelineHeader.map(({ label }, gridColumn) => {
            gridColumn += 4;
            return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
          })}
          <div className='pipeline-data-view-header sticky top' style={{ gridColumn: 12 }}></div>
          {loading && <div style={{ padding: '4px', gridColumn: 1, gridRow: 2 }}>Loading...</div>}
          {error && <div style={{ padding: '4px', gridColumn: 1, gridRow: 2 }}>{error.message}</div>}
          {data && data.pipelinesById && data.pipelinesById.map((pipeline, gridRow) => {
            gridRow *= 2;
            gridRow += 2;
            return pipeline && <RenderPipeline
              key={pipeline.id}
              gridRow={gridRow}
              pipeline={pipeline}
              validators={validators}
            />
          }
          )}
        </div>
        <div>
          <TablePagination
            style={{ width: '417px', margin: '0 auto' }}
            component="div"
            count={100}
            size='small'
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

// Using Server-Side Rendering to prevent a flash of unauthenticated content
export async function getServerSideProps({ req }: IGetServerSideProps) {

  const user = await getUser(req, prisma);

  if (!user) {
    return {
      redirect: {
        destination: '/register',
        permanent: false,
      },
    }
  }

  return {
    props: {}
  }
}

export default PipelineDatabase;