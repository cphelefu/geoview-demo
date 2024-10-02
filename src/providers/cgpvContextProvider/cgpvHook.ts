/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DEFAULT_MAP_HEIGHT,
  DEFAULT_MAP_WIDTH,
  URL_TO_CONFIGS,
} from '../../constants';
import _ from 'lodash';
import { EventListItemType, LegendLayerStatus } from '@/types';

export interface ICgpvHook {
  mapId: string;
  isInitialized: boolean;
  isLoading: boolean;
  configFilePath: string;
  configJson: object;
  eventsList: EventListItemType[];
  legendLayerStatusList: LegendLayerStatus[];
  mapWidth: string;
  mapHeight: string;
  setMapWidth: (width: string) => void;
  setMapHeight: (height: string) => void;

  initializeMap: (config: string | object, configIsFilePath?: boolean) => void;
  handleConfigFileChange: (filePath: string | null) => void;
  handleConfigJsonChange: (data: any) => void;
  validateConfigJson: (json: string) => string | null;
  createMapFromConfigText: (configText: string) => void;
  updateConfigProperty: (property: string, value: any) => void;
  handleApplyStateToConfigFile: () => void;
  clearEventsList: () => void;
}

export function useCgpvHook(): ICgpvHook {
  const [mapId, setMapId] = useState<string>('sandboxMap3');
  const [configFilePath, setConfigFilePath] = useState<string>('');
  const [configJson, setConfigJson] = useState<object>({});
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventsList, setEventsList] = useState<EventListItemType[]>([]);
  const [legendLayerStatusList, setLegendLayerStatusList] = useState<LegendLayerStatus[]>([]);
  const [mapWidth, setMapWidth] = useState<string>(DEFAULT_MAP_WIDTH);
  const [mapHeight, setMapHeight] = useState<string>(DEFAULT_MAP_HEIGHT);


  const addEventToList = (eventName: string, description: string) => {
    setEventsList((prevList) => {
      return [...prevList, { eventName, description }];
    });
  };

  const registerEventListeners = (mapId: string) => {
    // Events=====================================================================================================================
    console.log('registering events');

    cgpv.api.maps[mapId].layer.legendsLayerSet.onLayerSetUpdated((sender: any, payload: any) => {
      const { resultSet } = payload;
      const resultArr: LegendLayerStatus[] = Object.keys(resultSet).map((key) => {
        return { layerName: resultSet[key]?.layerName, status: resultSet[key]?.layerStatus };
      });

      setLegendLayerStatusList(resultArr);
    });

    // listen to layer added event
    cgpv.api.maps[mapId].layer.onLayerAdded((sender: any, payload: any) => {
      addEventToList('onLayerAdded', `layer ${payload.layerPath} added`);
    });

    // listen to layer loaded events
    cgpv.api.maps[mapId].layer.onLayerLoaded((sender: any, payload: any) => {
      addEventToList('onLayerLoaded', `layer ${payload.layerPath} loaded successfully`);
    });

    // listen to layer error events
    cgpv.api.maps[mapId].layer.onLayerError((sender: any, payload: any) => {
      addEventToList('addLayerError', `layer ${payload.layerPath} has an error`);
    });

    // listen to layer removed event
    cgpv.api.maps[mapId].layer.onLayerRemoved((sender: any, payload: any) => {
      addEventToList('onLayerRemoved', `layer ${payload.layerPath} removed`);
    });

    /*
    // listen to individual layer loaded event
    cgpv.api.maps[mapId].layer.getGeoviewLayer('nonmetalmines/5').onIndividualLayerLoaded((sender: any, payload:any) => {
      cgpv.api.maps[mapId].notifications.addNotificationSuccess('Nonmetal mines has finished loading');
      console.log(sender.olRootLayer.getSource().getFeatures());
    });
    
    // listen to layer visibility changed event (individual geoview layer)
    cgpv.api.maps[mapId].layer.getGeoviewLayer('uniqueValueId/1').onVisibleChanged((sender: any, payload:any) => {
      cgpv.api.maps[mapId].notifications.addNotificationSuccess(`uniqueValueId/1 visibility set to ${payload.visible} - individual`);
    });

    // listen to layer visibility changed event (individual geoview layer)
    cgpv.api.maps[mapId].layer.getGeoviewLayer('rcs.f4c51eaa-a6ca-48b9-a1fc-b0651da20509.en').onVisibleChanged((sender: any, payload:any) => {
      cgpv.api.maps[mapId].notifications.addNotificationSuccess(`layer ${payload.layerPath} visibility set to ${payload.visible} - individual`);
    });

    // listen to layer status change event
    cgpv.api.maps[mapId].layer.getLayerEntryConfig('uniqueValueId/1').onLayerStatusChanged((sender: any, payload:any) => {
      addEventToList('getLayerEntryConfig', `uniqueValueId/1 status changed to ${payload.layerStatus}`);
    });

    // listen to layer filter applied event
    cgpv.api.maps[mapId].layer.getGeoviewLayerHybrid('uniqueValueId/1').onLayerFilterApplied((sender: any, payload:any) => {
      addEventToList('getGeoviewLayerHybrid', `Filter ${payload.filter} applied to ${payload.layerPath}`);
    });
        // listen to layer opacity changed event
    cgpv.api.maps[mapId].layer.getGeoviewLayer('uniqueValueId/1').onLayerOpacityChanged((sender: any, payload:any) => {
      addEventToList('getGeoviewLayer', `${payload.layerPath} opacity changed to ${payload.opacity}`);
    });
    */

    // listen to layer item visibility changed event (any layers)
    cgpv.api.maps[mapId].layer.onLayerVisibilityToggled((sender: any, payload: any) => {
      addEventToList('onLayerVisibilityToggled', `layer ${payload.layerPath} visibility set to ${payload.visibility} - global`);
    });

    // listen to layer item visibility changed event (any layers)
    cgpv.api.maps[mapId].layer.onLayerItemVisibilityToggled((sender: any, payload: any) => {
      addEventToList('onLayerItemVisibilityToggled', `${payload.itemName} on layer ${payload.layerPath} visibility set to ${payload.visibility} - global`);
    });

    // listen to map zoom event
    cgpv.api.maps[mapId].onMapZoomEnd((sender: any, payload: any) => {
      addEventToList('onLayerItemVisibilityToggled', `Zoomed to level ${payload.zoom}`);
    });

    // listen to map move event
    cgpv.api.maps[mapId].onMapMoveEnd((sender: any, payload: any) => {
      addEventToList('onLayerItemVisibilityToggled', `Map moved to center latitude ${payload.lnglat[1]} and longitude ${payload.lnglat[0]}`);
    });

    // listen to map language changed event
    cgpv.api.maps[mapId].onMapLanguageChanged((sender: any, payload: any) => {
      addEventToList('onMapLanguageChanged', `Map language changed to ${payload.language}`);
    });

    // listen to basemap changed event
    cgpv.api.maps[mapId].basemap.onBasemapChanged((sender: any, payload: any) => {
      addEventToList('onBasemapChanged', `Basemap changed to ${payload.basemap.basemapId}`);
    });

    // listen to layer reordered event
    cgpv.api.maps[mapId].stateApi.onLayersReordered((sender: any, payload: any) => {
      addEventToList('onLayersReordered', `Layers reordered to ${payload.orderedLayers.map((layer: any) => layer.layerPath)}`);
    });

    /*
    // listen to map added to div event
    cgpv.api.onMapAddedToDiv((sender: any, payload:any) => {
       addEventToList('onMapAddedToDiv', `Map ${payload.mapId} added`);
    });*/
  };

  const readConfigFile = async (filePath: string) => {
    const res = await fetch(`${URL_TO_CONFIGS}${filePath}`, { mode: 'cors' });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  }

  const initializeMap = (config: string | object, configIsFilePath = false) => {
    if (isInitialized) return;
    setIsInitialized(true);
    createNewMap(config, configIsFilePath);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //removes map and creates a new map
  const createNewMap = (config: string | object, configIsFilePath = false) => {
    cgpv.api.maps[mapId]?.remove(true);
    const newMapId = 'sandboxMap_' + uuidv4();

    // replace div with id 'sandboxMap' with another div
    const mapContainerDiv = document.getElementById('sandboxMapContainer');
    if (!mapContainerDiv) {
      throw new Error('Element with id sandboxMapContainer not found');
    }

    mapContainerDiv.innerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.id = newMapId;
    newDiv.className = 'geoview-map2';
    mapContainerDiv?.appendChild(newDiv);
    setMapId(newMapId);

    setTimeout(() => {
      renderNewMap(newMapId, config, configIsFilePath);
    }, 1500);
  };

  const renderNewMap = async (mapId: string, config: string | object, configIsFilePath = false) => {
    setEventsList([]);
    setLegendLayerStatusList([]);

    const mapElement = document.getElementById(mapId) as HTMLElement;
    if (!mapElement) {
      return;
      //throw new Error(`Element with id ${mapId} not found`);
    }

    let configTxt = '';
    let configData = {};
    if (typeof config !== 'string' && !configIsFilePath) {
      configTxt = JSON.stringify(config);
      configData = JSON.parse(configTxt as string);
    }

    if (configIsFilePath) {
      const res = await readConfigFile(config as string);
      configData = res;
      configTxt = JSON.stringify(res)
    }

    // setting dimensions of the map
    mapElement?.setAttribute('style', `width: ${mapWidth}; min-height: ${mapHeight}; height: ${mapHeight}`);
    mapElement.setAttribute('dataset', `height: ${mapHeight}`);

    //we have json; now lets start
    setIsLoading(true);

    if (configIsFilePath) {
      setConfigFilePath(config as string);
    }

    setConfigJson({ ...configData });
    if (configIsFilePath) {
      cgpv.api.createMapFromConfig(mapId, `${URL_TO_CONFIGS}${config}`, 800); // just use file directly if its a file path
    } else {
      const toUseTxt = JSON.stringify(configData, null, 4);
      cgpv.api.createMapFromConfig(mapId, toUseTxt);
    }

    setTimeout(() => { // just a delay for animation purposes
      setIsLoading(false);
      registerEventListeners(mapId);
    }, 800);
    cgpv.init(async () => {
      console.log('registering events ');
      //registerEventListeners(mapId);

    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleConfigFileChange = async (filePath: string | null) => {
    if (!filePath) return;
    createNewMap(filePath, true);
  };

  //when config settings changes recreate map
  const handleConfigJsonChange = (data: any) => {
    // pre-select theme and projection from config file
    createNewMap(data, false);
  };

  const validateConfigJson = (json: string): string | null => {
    try {
      const str = json.replaceAll(`'`, `"`);
      //const configJSON = JSON.parse(str);
      cgpv.api.config.createMapConfig(str, 'en');
    } catch (e: any) {
      return cgpv.api.utilities.core.escapeRegExp(e.message);
    }
    return null;
  };

  const createMapFromConfigText = (configText: string) => {
    const config = JSON.parse(configText);
    handleConfigJsonChange(config);
  };

  const updateConfigProperty = (property: string, value: any) => {
    // eslint-disable-next-line prefer-const
    let newConfig = { ...configJson };
    if (value === undefined) {
      _.unset(newConfig, property);
    } else {
      _.set(newConfig, property, value);
    }
    handleConfigJsonChange(newConfig);
  };

  const handleApplyStateToConfigFile = () => {
    const state = cgpv.api.maps[mapId].createMapConfigFromMapState();
    handleConfigJsonChange(state);
  }

  const clearEventsList = () => {
    setEventsList([]);
  }

  return {
    mapId,
    configFilePath,
    configJson,
    isInitialized,
    isLoading,
    eventsList,
    legendLayerStatusList,
    mapWidth,
    mapHeight,
    setMapWidth,
    setMapHeight,

    initializeMap,
    handleConfigFileChange,
    handleConfigJsonChange,
    validateConfigJson,
    createMapFromConfigText,
    updateConfigProperty,
    handleApplyStateToConfigFile,
    clearEventsList
  };
}
