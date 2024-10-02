import React, { useContext, useEffect } from 'react';
import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerTabs from './DrawerTabs';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { MapRenderer } from './MapRenderer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { AppToolbar } from './AppToolbar';
import { useSearchParams } from "react-router-dom";
import { DEFAULT_CONFIG_FILE } from '@/constants';

interface GeoViewMapProps {
  showConfigEditor?: boolean;
  children?: React.ReactNode;
  top?: React.ReactNode;
  codeSnippet?: string;
  bottom?: React.ReactNode;
}

function GeoViewMap(props: GeoViewMapProps) {
  const cgpvContext = useContext(CGPVContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();


  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { configFilePath, initializeMap, isInitialized } = cgpvContext;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const {
    children
  } = props;

  const DRAWER_WIDTH = 440;

  useEffect(() => {
    if(!isInitialized) {
      const fPath = searchParams.get('config') ?? DEFAULT_CONFIG_FILE;
      initializeMap(fPath, true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (configFilePath && configFilePath.length > 0) {
      setSearchParams({ config: configFilePath });
    } else if(isInitialized) {
      setSearchParams({ config: ''});
    }
  }, [configFilePath]);


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
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
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
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }} aria-label="settings panel">
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
          }}
        >
          <DrawerTabs />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, borderRight: '5px solid lightgray', },
          }}
          open
        >
          <DrawerTabs />
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pt: 1, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
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
