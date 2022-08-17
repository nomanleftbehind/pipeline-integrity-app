import { prisma } from '../lib/prisma';
import { getUser } from '../lib/user';

import RenderPipeline from '../components/rows/RenderPipeline';
import Navigation from '../components/navigation/Navigation';
import { IValidatorsNavigation } from '../components/rows/PipelineData';

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

  const [pipelinesById, { data, loading, error }] = usePipelinesByIdLazyQuery();
  const { data: validatorsData } = useValidatorsPipelineQuery();

  const validatorsNavigation: IValidatorsNavigation = validatorsData?.validatorsPipeline && {
    operationEnum: validatorsData.validatorsPipeline.operationEnum,
    havingEnum: validatorsData.validatorsPipeline.havingEnum,
  };

  const handleNavigation = ({ navigationInput: { hierarchy, search }, skip, take }: PipelinesByIdQueryVariables) => {
    if (hierarchy) {
      pipelinesById({ variables: { navigationInput: { hierarchy }, skip, take } });
    }
    if (search) {
      pipelinesById({ variables: { navigationInput: { search }, skip, take } });
    }
  }

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
            paginationCount={data?.pipelinesById.count || 0}
            validators={validatorsNavigation}
          />
        </div>
      </div>
      <div className='pipelines-window'>
        <div className='pipeline-data-view-header sticky top' style={{ gridColumn: '1 / 4' }}></div>
        {pipelineHeader.map(({ label }, gridColumn) => {
          gridColumn += 4;
          return <div key={gridColumn} className='pipeline-data-view-header sticky top' style={{ gridColumn }}>{label}</div>
        })}
        <div className='pipeline-data-view-header sticky top' style={{ gridColumn: 12 }}></div>
        {loading && <div style={{ padding: '4px', gridColumn: 1, gridRow: 2 }}>Loading...</div>}
        {error && <div style={{ padding: '4px', gridColumn: 1, gridRow: 2 }}>{error.message}</div>}
        {data?.pipelinesById.pipelines?.map((pipeline, gridRow) => {

          const rowIsEven = gridRow % 2 === 0;
          gridRow *= 2;
          gridRow += 2;

          return pipeline && <RenderPipeline
            key={pipeline.id}
            gridRow={gridRow}
            rowIsEven={rowIsEven}
            pipeline={pipeline}
            validators={validatorsData?.validatorsPipeline}
          />
        }
        )}
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