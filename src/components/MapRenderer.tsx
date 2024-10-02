import { Box } from '@mui/material';
import _ from 'lodash';

//TODO Maybe update this to control its own rendering on some feature changes. Eg. height, width, etc.
export function MapRenderer() {
 
  return (
    <Box id="sandboxMapContainer">
      <Box id="sandboxMap3" className="geoview-map"></Box>
    </Box>
  );
}
