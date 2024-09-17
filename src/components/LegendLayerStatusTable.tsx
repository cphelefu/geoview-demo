import { useContext, useEffect, useRef, useState } from 'react';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export function LegendLayerStatusTable() {
    const cgpvContext = useContext(CGPVContext);
  
    if (!cgpvContext) {
      throw new Error('CGPVContent must be used within a CGPVProvider');
    }
  
    const { legendLayerStatusList } = cgpvContext;


    return (
        <Box sx={{ p: 2 }}>
          <h2>Legend Layer Status</h2>
    
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 'bold' }}>
                <TableRow>
                  <TableCell>Layer Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {legendLayerStatusList.map((row, index) => (
                  <TableRow
                    key={`$layer_index_${index}`}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.layerName}
                    </TableCell>
                    <TableCell>{row?.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      );
    

};