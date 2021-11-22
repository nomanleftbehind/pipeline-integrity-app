import * as React from 'react';

import Layout from '../../../components/layout';
import MenuBar from '../../../components/menubar';
import PipelineProperties from '../../../components/dynamic_routes/PipelineProperties';
import PigRuns from '../../../components/dynamic_routes/PigRuns';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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
      </Tabs>
      <TabPanel value={value} index={0}>
        <PipelineProperties />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PigRuns />
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