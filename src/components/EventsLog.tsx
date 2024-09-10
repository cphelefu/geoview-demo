import { useContext, useEffect, useState } from 'react';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { EventListItemType, ListOptionType } from '../types';
import PillsAutoComplete from './PillsAutoComplete';

export function EventsLog() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { eventsList } = cgpvContext;

  const [logsList, setLogsList] = useState<EventListItemType[]>(eventsList);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [eventTypeOptions, setEventTypeOptions] = useState<ListOptionType[]>([]);

  useEffect(() => {
    const eventTypes = eventsList.map((log) => log.eventName);
    const uniqueEventTypes = Array.from(new Set(eventTypes));
    const options = uniqueEventTypes.map((eventName) => ({ title: eventName, value: eventName } as unknown as ListOptionType));
    setEventTypeOptions(options);
  }, [eventsList]);


  useEffect(() => {
    if (selectedEventTypes.length === 0) {
      setLogsList(eventsList);
      return;
    }
    const filteredLogs = eventsList.filter((log) => selectedEventTypes.includes(log.eventName));
    setLogsList(filteredLogs);
  }, [selectedEventTypes, eventsList]);


  return (
    <Box sx={{ p: 2 }}>
      <h2>Events Log</h2>

      <Box sx={{ maxwidth: '450px', mb: 3 }}>
        <PillsAutoComplete
          value={selectedEventTypes}
          onChange={(value) => setSelectedEventTypes(value)}
          options={eventTypeOptions}
          label="Filter by eventName" placeholder="" />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead sx={{ fontWeight: 'bold' }}>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logsList.map((row, index) => (
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