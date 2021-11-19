import * as React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import MenuBar from '../../../components/menubar';
import Pipeline from '../../../components/dynamic_routes/Pipeline';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { usePigRunByPipelineIdQuery } from '../../../graphql/generated/graphql';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}


function PigRuns() {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading, error } = usePigRunByPipelineIdQuery({ variables: { pipelineId: typeof id === 'string' ? id : '' } });


  return (
    <>
      {loading ? 'Loading...' :
        error ? <div>{error.message}</div> :
          data ?
            data.pigRunByPipelineId ?
              <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {data.pigRunByPipelineId[0] ?
                          Object.keys(data.pigRunByPipelineId[0]).map((column, index) => {
                            return (
                              <TableCell key={index}>
                                {column}
                              </TableCell>
                            )
                          }) :
                          null
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.pigRunByPipelineId.map((pigRun) => {
                        return pigRun ?
                          <TableRow hover role="checkbox" tabIndex={-1} key={pigRun.id}>
                            {Object.values(pigRun).map((value, index) => {
                              console.log('value:', value);
                              return (
                                <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                                  {typeof value === 'string' ?
                                    value :
                                    typeof value === 'object' && !Array.isArray(value) && value !== null ?
                                      <Table>
                                        <TableBody>
                                          {Object.entries(value).map(([k, v]) => {
                                            return (
                                              <TableRow key={k}>
                                                <TableCell>
                                                  {k}
                                                </TableCell>
                                                <TableCell align="right">
                                                  {v}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          })
                                          }
                                        </TableBody>
                                      </Table> :
                                      null
                                  }
                                </TableCell>
                              )
                            })}
                          </TableRow> :
                          null;
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper> :
              null :
            null
      }
    </>
  )
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Pipeline Properties" {...a11yProps(0)} />
        <Tab label="Pig Runs" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>

        <Pipeline />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PigRuns />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}


VerticalTabs.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <MenuBar />
      {page}
    </Layout>
  )
}