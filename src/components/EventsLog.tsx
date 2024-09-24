import { useContext, useEffect, useState } from 'react';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';
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
    <Box>
      <h2>Events Log</h2>

      <Box sx={{ maxwidth: '450px', mb: 3 }}>
        <PillsAutoComplete
          value={selectedEventTypes}
          onChange={(value) => setSelectedEventTypes(value)}
          options={eventTypeOptions}
          label="Filter by eventName" placeholder="" />
      </Box>


      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {logsList.map((row, index) => (
          <>
            <ListItem key={`$legend_layer_status_index_${index}`}>
              <ListItemText primary={row.eventName} secondary={row?.description} />
            </ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </Box>
  );

}