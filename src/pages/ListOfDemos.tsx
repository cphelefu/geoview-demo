import { AppBar, Box, Container, Grid, Toolbar, Typography } from "@mui/material";

import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";

function ListOfDemosPage() {

  return (
    <Container maxWidth="lg" sx={{ borderRightWidth: '1px', borderLeftWidth: '1px', borderColor: '#ccc' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img src={Logo} alt="GeoView" style={{ height: 40, marginRight: 16 }} />{/* Adjust height and margin as needed */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Canadian Geospatial Platform (CGP)
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2} p={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Sandbox</h3>
            <Link to="/general">Default Page</Link>
          </Grid>

        </Grid>

      </Box>
    </Container>
  )
}

export default ListOfDemosPage;