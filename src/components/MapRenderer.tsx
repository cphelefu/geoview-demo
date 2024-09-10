import { Box } from '@mui/material';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { useContext } from 'react';

//TODO Maybe update this to control its own rendering on some feature changes. Eg. height, width, etc.
export function MapRenderer() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  return (
    <Box id="sandboxMapContainer" sx={{ width: '100%', height: '500px'}}>
      <Box id="sandboxMap3" className="geoview-map" sx={{ width: '100%', height: '500px'}}></Box>
    </Box>
  );
}
