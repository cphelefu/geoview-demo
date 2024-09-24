import { AppBar, Box, Container, Grid } from "@mui/material";

import { Link } from "react-router-dom";
import { AppToolbar } from "@/components/AppToolbar";

function ListOfDemosPage() {

  return (
    <Container maxWidth="lg" sx={{ borderRightWidth: '1px', borderLeftWidth: '1px', borderColor: '#ccc' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <AppToolbar />
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