import { IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from '../assets/logo.png';

interface AppToolbarProps {
  children?: React.ReactNode;
}

export const AppToolbar = (props: AppToolbarProps) => {
  const { children } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar>
      {children}
      <img src={Logo} alt="GeoView" style={{ height: 40, marginRight: 16 }} />{/* Adjust height and margin as needed */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Canadian Geospatial Platform (CGP) - GeoView Project
      </Typography>
      <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} href="https://github.com/Canadian-Geospatial-Platform/geoview-demo" target="_blank"> GitHub</MenuItem>
        <MenuItem component={Link} href="https://canadian-geospatial-platform.github.io/geoview-demo/"  target="_blank"> Demo</MenuItem>
      </Menu>
      </div>
    </Toolbar>
  );
}
