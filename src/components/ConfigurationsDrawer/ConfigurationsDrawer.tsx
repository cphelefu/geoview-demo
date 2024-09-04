import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ApiFunctionsTab from './ApiFunctionsTab/ApiFunctionsTab';
import { MapBuilderTab } from './MapBuilderTab/MapBuilderTab';


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
          </TabList>
        </Box>
        <TabPanel value="interactive-map" >
          <ApiFunctionsTab />
        </TabPanel>
        <TabPanel value="config-builder">
          <MapBuilderTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
