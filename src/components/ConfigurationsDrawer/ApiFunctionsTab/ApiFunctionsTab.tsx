import { Accordion, AccordionDetails, AccordionSummary, Box, Divider, FormControl, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Fragment, useContext, useState } from 'react';
import { CGPVContext } from '../../../providers/cgpvContextProvider/CGPVContextProvider';
import _ from 'lodash';
import { CodeSnipperPopup } from '../../CodeSnippet';
import apiFunctions from './apiFunctions';

export interface ApiFuncItem {
  group: string;
  description: string;
  secondaryDescription?: string;
  function: (mapId: string) => void;
  code?: string;
}

export default function ApiFunctionsTab() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { mapId } = cgpvContext;

  const [apiFunctionsList, setApiFunctionsList] = useState<ApiFuncItem[]>(apiFunctions);

  const groups =  _(apiFunctionsList).orderBy( ['group', 'description'], ['asc', 'asc']).groupBy('group').value();
  const groupNames = Object.keys(groups);

  function trimFirstSubstring(text: string, sub: string): string {
    const regex = new RegExp(sub + '(?=.*)', 'i'); // Case-insensitive (optional)
    return text.replace(regex, '');
  }

  function trimLastSubstring(text: string, sub: string): string {
    const index = text.lastIndexOf(sub);
    if (index !== -1) { // Substring found
      return text.slice(0, index) + text.slice(index + sub.length);
    } else { // Substring not found
      return text;
    }
  }

  const renderCodePopupButton = (item: ApiFuncItem) => {
    if(item.code) {
      return <CodeSnipperPopup code={item.code} />;
    }
    let code = `${item.function}`;
    code = trimFirstSubstring(code, `(mapId) => {`);
    code = code.replace('(mapId) => {', '');
    code = trimLastSubstring(code, `}`).trim();
    return <CodeSnipperPopup code={code} />;
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value;
    if (filterText === '') {
      setApiFunctionsList(apiFunctions);
      return;
    }
    const filteredList = apiFunctions.filter((item) => 
      item.description.toLowerCase().includes(filterText.toLowerCase()) 
    || item.secondaryDescription?.toLowerCase().includes(filterText.toLowerCase())
    || item.group.toLowerCase().includes(filterText.toLowerCase()));
    setApiFunctionsList(filteredList);
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl sx={{}}>
        <TextField
          onChange={handleFilterChange}
          id="filter-text"  size="small" label="Enter filter text here..." variant="outlined" sx={{bgColor: 'white'}} />
      </FormControl>

      {groupNames.map((groupName, index) => (
        <Accordion sx={{mt: 1}} defaultExpanded={index === 0} key={`group_${index}`}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            <Typography>{groupName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense={true}>
              {groups[groupName].map((item, ind) => (
                <Fragment key={`group_${index}_${ind}`}>
                <ListItem secondaryAction={renderCodePopupButton(item)}>
                  <ListItemButton onClick={() => item.function(mapId)}>
                    <ListItemText primary={item.description} secondary={item.secondaryDescription} />
                  </ListItemButton>
                </ListItem>
                {(ind < groups[groupName].length - 1) && <Divider />}
                </Fragment>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

    </Box>
  );
}
