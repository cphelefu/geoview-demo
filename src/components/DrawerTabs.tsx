import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, CircularProgress, Tab } from '@mui/material';
import { useContext, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import ApiFunctionsTab from './ApiFunctionsTab/ApiFunctionsTab';
import { MapBuilder } from './MapBuilder';
import { EventsLog } from './EventsLog';
import { LegendLayerStatusTable } from './LegendLayerStatusTable';
import { CGPVContext } from '@/providers/cgpvContextProvider/CGPVContextProvider';


export default function DrawerTabs() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { isLoading } = cgpvContext;
  const [selectedTab, setSelectedTab] = useState('config-builder');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };


  if (isLoading) {
    return <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <CircularProgress />
    </Box>;
  }


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
          <MapBuilder />
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
