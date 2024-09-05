import { useContext, useEffect, useRef, useState } from 'react';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export function EventsLog() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { eventsList } = cgpvContext;

  console.log('eventsList', eventsList);


  return (
    <Box sx={{p:2}}>
      <h2>Events Log</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventsList.map((row, index) => (
              <TableRow
                key={`${row.eventName}${index}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.eventName}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

}