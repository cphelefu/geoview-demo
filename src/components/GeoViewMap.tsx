import React, { useContext, useEffect } from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ConfigurationDrawer from './ConfigurationsDrawer/ConfigurationsDrawer';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { MapRenderer } from './MapRenderer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { AppToolbar } from './AppToolbar';

interface GeoViewMapProps {
  showConfigEditor?: boolean;
  config: string | object;
  configIsFilePath?: boolean;
  children?: React.ReactNode;
  top?: React.ReactNode;
  codeSnippet?: string;
  bottom?: React.ReactNode;
}

function GeoViewMap(props: GeoViewMapProps) {
  const cgpvContext = useContext(CGPVContext);
  const navigate = useNavigate();

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { initializeMap, isInitialized } = cgpvContext;
  const {
    config,
    configIsFilePath,
    children
  } = props;

  const drawerWidth = 440;

  //when component is mounted, initialize the map
  useEffect(() => {
    if (!isInitialized) {
      initializeMap(config, configIsFilePath);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <AppToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleBackToHome}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </AppToolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="settings panel">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            bgcolor: '#f4f4f4',
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <ConfigurationDrawer />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: '5px solid lightgray', },
          }}
          open
        >
          <ConfigurationDrawer />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pt: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {props.top}
        {children}
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <MapRenderer />
        </Box>
        {props.bottom}
      </Box>
    </Box>
  );
}

export default GeoViewMap;
