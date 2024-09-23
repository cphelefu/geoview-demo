import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import ApiFunctionsTab from './ApiFunctionsTab/ApiFunctionsTab';
import { MapBuilderTab } from './MapBuilderTab/MapBuilderTab';
import { EventsLog } from '../EventsLog';
import { LegendLayerStatusTable } from '../LegendLayerStatusTable';


export default function ConfigurationDrawer() {
  const [selectedTab, setSelectedTab] = useState('config-builder');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', minHeight: {md: '100vh'} }}>
      <TabContext value={selectedTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="handling tabs change" variant="scrollable" scrollButtons="auto">
            <Tab icon={<ListAltIcon />} label="Map Builder" value="config-builder" />
            <Tab icon={<SettingsIcon />} label="API Functions" value="interactive-map" />
            <Tab icon={<BallotIcon />} label="Layers Status" value="layers-status" />
            <Tab icon={<RunCircleIcon />} label="Events Log" value="events-log" />
          </TabList>
        </Box>
        <TabPanel value="interactive-map" >
          <ApiFunctionsTab />
        </TabPanel>
        <TabPanel value="config-builder">
          <MapBuilderTab />
        </TabPanel>
        <TabPanel value="layers-status">
          <LegendLayerStatusTable />
        </TabPanel>
        <TabPanel value="events-log">
          <EventsLog />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
