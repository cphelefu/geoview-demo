import { Box } from '@mui/material';
import { CGPVContext } from '../providers/cgpvContextProvider/CGPVContextProvider';
import { useContext, useEffect, useRef } from 'react';

//TODO Maybe update this to control its own rendering on some feature changes. Eg. height, width, etc.
export function MapRenderer() {
  const cgpvContext = useContext(CGPVContext);

  if (!cgpvContext) {
    throw new Error('CGPVContent must be used within a CGPVProvider');
  }

  const { mapId } = cgpvContext;
  const mapContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    renderMapElem();
  }, [mapId]);

  //removes all child elements from the map container and creates a new map element
  const renderMapElem = () => {
    if (mapContainerRef.current) {
      mapContainerRef.current.innerHTML = '';
      const mapElem = document.createElement('div');
      mapElem.id = mapId;
      mapElem.className = 'geoview-map';
      mapContainerRef.current.appendChild(mapElem);
    }
  }
  
  return (
    <Box id="sandboxMapContainer" sx={{ width: '100%', height: '500px'}} ref={mapContainerRef}>
      <Box id="sandboxMap3" className="geoview-map" sx={{ width: '100%', height: '500px'}}></Box>
    </Box>
  );
}
