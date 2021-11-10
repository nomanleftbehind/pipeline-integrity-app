import * as React from 'react';
import Layout from '../components/layout';
import MenuBar from '../components/menubar';
import RenderPipeline from '../components/rows/RenderPipeline';
import RenderPipeline2 from '../components/rows/RenderPipeline2';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { usePipelinesByIdQueryLazyQuery, useAllInjectionPointsQueryQuery } from '../graphql/generated/graphql';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export const validators = {
  license: "^(AB|SK|BC)(\\d{5}|\\d{6})$",
  segment: "^((UL)(\\d{1,2})|(\\d{1,3}))$",
  substance: ['Natural Gas', 'Fresh Water', 'Salt Water', 'Crude Oil', 'Oil Well Effluent', 'LVP Products', 'Fuel Gas', 'Sour Natural Gas'],
  fromTo: "^((\\d{2}-\\d{2}-\\d{3}-\\d{2}W\\d{1})|([A-Z]{1}-\\d{3}-[A-Z]{1} \\d{3}-[A-Z]{1}-\\d{2}))$",
  fromToFeature: ['Blind end', 'Battery', 'Pipeline', 'Satellite', 'Storage tank', 'Injection plant', 'Well', 'Compressor station', 'Meter station', 'Pump station', 'Gas processing plant', 'Underground cap or tie-in', 'Header'],
  status: ['Operating', 'Discontinued', 'Abandoned', 'Removed', 'To Be Constructed', 'Active', 'Cancelled', 'New', 'Not Constructed'],
  length: "^\\d*\\.?\\d*$",
  type: ['515', '2306', '3406', '3408', '6063', '6351', '5A', '5L', '5LX', 'A106', 'A120', 'A53', 'AMERON', 'B515', 'B51S', 'B5IS', 'CENTRON', 'CIBA', 'FSLP', 'REDTHR', 'SMITH', 'STAR', 'TBS', 'WSLP', 'Z245.1', 'Z245.3'],
  grade: ['A', '3592', 'B', 'X42', 'BW1', '2500', '3591', '2901', 'T4', '300', '3593', '11', 'J55', '2250', 'X52', '2750', '2902', '25', '241', '2413', '2411', '155', '150', '1000', '800', 'T1A', '2010', 'T4A', '1250', '17', '900', 'T1B', '810', '35', '5', '9', '200', '1200', '11.03'],
  outsideDiameter: [0, 42.2, 50.8, 53.8, 54.4, 55.1, 57.1, 59.1, 60.3, 60.5, 62, 65.2, 66, 73, 76.2, 77, 81.3, 82.6, 88.9, 90.7, 91.2, 95.5, 97.4, 105.7, 114.3, 152.4, 168.3, 219.1, 231.4, 273.1, 296.2, 323.89],
  wallThickness: "^(\\d|1\\d|2[0-5])(\\.\\d{1,2})?$",
  material: ['Steel', 'Polyvinyl Chloride', 'Composite', 'Fiberglass', 'Aluminum', 'Polyethylene', 'Cellulose Acetate Butyrate', 'Unknown', 'Asbestos Cement'],
  mop: "^\\d{1,5}$",
  internalProtection: ['Uncoated', 'Free Standing (Slip Lined)', 'Unknown', 'Cement', 'Expanded Polyethylene', 'Thin Film']
}

export type IValidators = typeof validators;

export interface IHeader {
  createdAt: string;
  license: string;
  segment: string;
  substance: string;
  from: string;
  fromFeature: string;
  to: string;
  toFeature: string;
  injectionPoints: string;
  status: string
}

export default function CollapsibleTable() {

  const header: IHeader = { createdAt: "", license: "", segment: "", substance: "", from: "", fromFeature: "", to: "", toFeature: "", injectionPoints: "", status: "" };
  const [expandedPipelines, setExpandedPipelines] = React.useState<string[]>([]);
  const [filterText, setFilterText] = React.useState<IHeader>(header);
  const [filterTextCaseInsensitive, setFilterTextCaseInsensitive] = React.useState<IHeader>(header);

  const [pipelinesById, { data, loading, error }] = usePipelinesByIdQueryLazyQuery();
  const { data: injectionPointData } = useAllInjectionPointsQueryQuery();

  function handleSatelliteClick(e: React.MouseEvent<HTMLButtonElement>): void {
    pipelinesById({ variables: { satelliteId: e.currentTarget.value } })
  }

  function handleFacilityClick(e: React.MouseEvent<HTMLButtonElement>): void {
    pipelinesById({ variables: { facilityId: e.currentTarget.value } })
  }

  const handleFilterTextChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    const myHeader = name as keyof IHeader;
    const newFilterText = { ...filterText };
    const newFilterTextCaseInsensitive = { ...filterTextCaseInsensitive };
    newFilterText[myHeader] = value;
    newFilterTextCaseInsensitive[myHeader] = value.toUpperCase();
    setFilterText(newFilterText);
    setFilterTextCaseInsensitive(newFilterTextCaseInsensitive);
    console.log(filterTextCaseInsensitive[myHeader]);
  }

  const handlePipelineClick = (id: string): void => {
    setExpandedPipelines((prevState) => {
      return prevState.includes(id) ? prevState.filter(ppl_id => ppl_id !== id) : prevState.concat(id);
    });
  }

  return (
    <div className="pipeline-database-wrapper">
      <div className="pipeline-database-side-bar">
        <div className="pipeline-database-side-bar-fixed">
          <SideNavBar
            onAllPipelinesClick={pipelinesById}
            onSatelliteClick={handleSatelliteClick}
            onFacilityClick={handleFacilityClick}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <Header
            filterText={filterText}
            onFilterTextChange={handleFilterTextChange} />
          <TableBody>
            {loading ? <TableRow><TableCell>Loading...</TableCell></TableRow> :
              error ? <TableRow><TableCell>{error.message}</TableCell></TableRow> :
                data ?
                  data.pipelinesById ?
                    data.pipelinesById.filter(pipeline => {
                      const inj_pt_source =
                        pipeline ?
                          pipeline.injectionPoints ?
                            pipeline.injectionPoints.map(injectionPoints =>
                              injectionPoints ? injectionPoints.source : undefined) :
                            undefined :
                          undefined;
                      return (
                        pipeline ?
                          (
                            pipeline.license.toUpperCase().includes(filterTextCaseInsensitive.license) &&
                            pipeline.segment.toUpperCase().includes(filterTextCaseInsensitive.segment) &&
                            pipeline.substance.toUpperCase().includes(filterTextCaseInsensitive.substance) &&
                            pipeline.from.toUpperCase().includes(filterTextCaseInsensitive.from) &&
                            (pipeline.fromFeature ? pipeline.fromFeature.toUpperCase().includes(filterTextCaseInsensitive.fromFeature) : filterTextCaseInsensitive.fromFeature.length === 0) &&
                            pipeline.to.toUpperCase().includes(filterTextCaseInsensitive.to) &&
                            (pipeline.toFeature ? pipeline.toFeature.toUpperCase().includes(filterTextCaseInsensitive.toFeature) : filterTextCaseInsensitive.toFeature.length === 0) &&
                            (inj_pt_source === undefined ||
                              (inj_pt_source.length === 0 && filterTextCaseInsensitive.injectionPoints.length === 0) ||
                              inj_pt_source.some(i => {
                                switch (i) {
                                  case undefined:
                                    return filterTextCaseInsensitive.injectionPoints.length === 0;
                                  default:
                                    return i.toUpperCase().includes(filterTextCaseInsensitive.injectionPoints)
                                }
                              })) &&
                            pipeline.status.toUpperCase().includes(filterTextCaseInsensitive.status)
                          ) :
                          undefined
                      );
                    }).map((pipeline, ppl_idx) => {
                      return pipeline ?
                        (
                          <RenderPipeline2
                            key={pipeline.id}
                            ppl_idx={ppl_idx}
                            pipeline={pipeline}
                            injectionPointOptions={injectionPointData?.allInjectionPoints}
                            validators={validators}
                            expandedPipelines={expandedPipelines}
                            onPipelineClick={() => handlePipelineClick(pipeline.id)}
                          />
                        ) :
                        null;
                    }) :
                    null :
                  null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

CollapsibleTable.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}
