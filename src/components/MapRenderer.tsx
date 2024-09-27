import { Box } from '@mui/material';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { useContext, useState } from 'react';

//TODO Maybe update this to control its own rendering on some feature changes. Eg. height, width, etc.
export function MapRenderer() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { mapHeight, mapWidth, configJson } = cgpvContext;
  const [curWidth, setCurWidth] = useState(mapWidth);
  const [curHeight, setCurHeight] = useState(mapHeight);


  return (
    <Box id="sandboxMapContainer" sx={{ width: curWidth, height: curHeight }}>
      <Box id="sandboxMap3" className="geoview-map"></Box>
    </Box>
  );
}
