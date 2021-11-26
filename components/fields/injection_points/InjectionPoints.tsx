import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import Source from './Source';
import InjectionPointForm from './InjectionPointForm';
import { IPipeline, IInjectionPointOptions } from '../../rows/RenderPipeline';

import { useDeleteInjectionPointFromPipelineMutation, useChangeInjectionPointToPipelineMutation, PipelinesByIdQueryDocument } from '../../../graphql/generated/graphql';

type IInjectionPoints = IPipeline['injectionPoints'];
type IUpstream = IPipeline['upstream'];

interface IInjectionPointsProps {
  open: boolean;
  id: string;
  upstream: IUpstream;
  injectionPoints: IInjectionPoints;
  injectionPointOptions: IInjectionPointOptions;
}


export default function InjectionPoints({ open, id, injectionPoints, injectionPointOptions }: IInjectionPointsProps) {
  const [showUpstreamPipelinesForm, setShowUpstreamPipelinesForm] = React.useState<boolean>(false);
  const [showSourcesForm, setShowSourcesForm] = React.useState<boolean>(false);

  const [deleteInjectionPoint, { data, error, loading }] = useDeleteInjectionPointFromPipelineMutation();
  const [changeInjectionPointToPipeline, { data: dataChangeInjectionPointToPipeline }] = useChangeInjectionPointToPipelineMutation();

  function toggleShowUpstreamPipelinesForm() {
    setShowUpstreamPipelinesForm(!showUpstreamPipelinesForm);
  }

  function toggleShowSourcesForm() {
    setShowSourcesForm(!showSourcesForm);
  }

  function handleSubmit(newInjectionPointId: string, oldnewInjectionPointId?: string) {
    if (oldnewInjectionPointId) deleteInjectionPoint({ variables: { id: oldnewInjectionPointId } }); // Very important this is the first mutation called in this block,
    // as otherwise if you click OK, while not having selected a different injection point,
    // it would first override injection point with itself and then delete it.
    changeInjectionPointToPipeline({ variables: { id: newInjectionPointId, pipelineId: id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] });
    setShowSourcesForm(false);
  }

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Injection Points
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Upstream Pipelines
                  <IconButton aria-label="expand row" size="small" onClick={toggleShowUpstreamPipelinesForm}>
                    {showUpstreamPipelinesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                  </IconButton>
                </TableCell>
                <TableCell align="right">Oil</TableCell>
                <TableCell align="right">Water</TableCell>
                <TableCell align="right">Gas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showUpstreamPipelinesForm ?
                <TableRow>
                  <TableCell colSpan={4}>
                    <InjectionPointForm
                      injectionPointType="upstream pipeline"
                      injectionPointId={injectionPointOptions ?
                        injectionPointOptions[0] ?
                          injectionPointOptions[0].id :
                          '' :
                        ''}
                      injectionPointOptions={injectionPointOptions}
                      handleSubmit={handleSubmit}
                    />
                  </TableCell>
                </TableRow> :
                null}
              {injectionPoints ? injectionPoints.map(injectionPoint => {
                return injectionPoint ?
                  (
                    <TableRow key={injectionPoint.id}>
                      <Source
                        injectionPointId={injectionPoint.id}
                        source={injectionPoint.source}
                        injectionPointOptions={injectionPointOptions}
                        handleSubmit={handleSubmit}
                        deleteInjectionPoint={() => deleteInjectionPoint({ variables: { id: injectionPoint.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })}
                      />
                      <TableCell align="right">{injectionPoint.oil}</TableCell>
                      <TableCell align="right">{injectionPoint.water}</TableCell>
                      <TableCell align="right">{injectionPoint.gas}</TableCell>
                    </TableRow>
                  ) :
                  null;
              }) :
                null}
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}>Sources
                  <IconButton aria-label="expand row" size="small" onClick={toggleShowSourcesForm}>
                    {showSourcesForm ? <BlockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showSourcesForm ?
                <TableRow>
                  <TableCell colSpan={4}>
                    <InjectionPointForm
                      injectionPointType="source"
                      injectionPointId={injectionPointOptions ?
                        injectionPointOptions[0] ?
                          injectionPointOptions[0].id :
                          '' :
                        ''}
                      handleSubmit={handleSubmit}
                    />
                  </TableCell>
                </TableRow> :
                null}
              {injectionPoints ? injectionPoints.map(injectionPoint => {
                return injectionPoint ?
                  (
                    <TableRow key={injectionPoint.id}>
                      <Source
                        injectionPointId={injectionPoint.id}
                        source={injectionPoint.source}
                        injectionPointOptions={injectionPointOptions}
                        handleSubmit={handleSubmit}
                        deleteInjectionPoint={() => deleteInjectionPoint({ variables: { id: injectionPoint.id }, refetchQueries: [PipelinesByIdQueryDocument, 'pipelinesByIdQuery'] })}
                      />
                      <TableCell align="right">{injectionPoint.oil}</TableCell>
                      <TableCell align="right">{injectionPoint.water}</TableCell>
                      <TableCell align="right">{injectionPoint.gas}</TableCell>
                    </TableRow>
                  ) :
                  null;
              }) :
                null}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
}