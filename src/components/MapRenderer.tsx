import { Box } from '@mui/material';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { useContext } from 'react';
import { DEFAULT_MAP_HEIGHT, DEFAULT_MAP_WIDTH } from '@/constants';
import _ from 'lodash';

//TODO Maybe update this to control its own rendering on some feature changes. Eg. height, width, etc.
export function MapRenderer() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { configJson } = cgpvContext;
  
  const mapWidth = _.get(configJson, 'mapDimensions.width', DEFAULT_MAP_WIDTH);
  const mapHeight = _.get(configJson, 'mapDimensions.height', DEFAULT_MAP_HEIGHT);

  return (
    <Box id="sandboxMapContainer" sx={{ width: mapWidth, height: mapHeight }}>
      <Box id="sandboxMap3" className="geoview-map"></Box>
    </Box>
  );
}
