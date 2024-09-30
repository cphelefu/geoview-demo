
import GeoViewMap from '../components/GeoViewMap';
import { DEFAULT_CONFIG_FILE } from '../constants';
import GeoViewPage from '../components/GeoViewPage';

function DefaultPage() {
  return (
    <GeoViewPage>
      <GeoViewMap config={DEFAULT_CONFIG_FILE} configIsFilePath={true} />
    </GeoViewPage>
  );
}

export default DefaultPage;
