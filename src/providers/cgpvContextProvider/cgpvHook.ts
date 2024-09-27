/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  DEFAULT_MAP_HEIGHT,
  DEFAULT_MAP_WIDTH,
} from '../../constants';
import _ from 'lodash';
import { EventListItemType, LegendLayerStatus } from '@/types';

export interface ICgpvHook {
  mapId: string;
  isInitialized: boolean;
  isLoading: boolean;
  configFilePath: string;
  configJson: object;
  mapWidth: string;
  setMapWidth: React.Dispatch<React.SetStateAction<string>>;
  mapHeight: string;
  setMapHeight: React.Dispatch<React.SetStateAction<string>>;
  eventsList: EventListItemType[];
  legendLayerStatusList: LegendLayerStatus[];

  initializeMap: (mapId: string, config: string | object, configIsFilePath?: boolean) => void;
  handleRemoveMap: () => string;
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
  const [mapWidth, setMapWidth] = useState<string>(DEFAULT_MAP_WIDTH);
  const [mapHeight, setMapHeight] = useState<string>(DEFAULT_MAP_HEIGHT);
  const [configFilePath, setConfigFilePath] = useState<string>('');
  const [configJson, setConfigJson] = useState<object>({});
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [eventsList, setEventsList] = useState<EventListItemType[]>([]);
  const [legendLayerStatusList, setLegendLayerStatusList] = useState<LegendLayerStatus[]>([]);


  const addEventToList = (eventName: string, description: string) => {
    setEventsList((prevList) => {
      return [...prevList, { eventName, description }];
    });
  };

  const registerEventListeners = (mapId: string) => {
    // Events=====================================================================================================================
    console.log('registering events');

    cgpv.api.maps[mapId].layer.legendsLayerSet.onLayerSetUpdated((sender: any, payload: any) => {
      console.log('legendsLayerSet updated', payload);
      const { resultSet } = payload;
      const resultArr: LegendLayerStatus[] = Object.keys(resultSet).map((key) => {
        return { layerName: resultSet[key]?.layerName, status: resultSet[key]?.layerStatus };
      });
      console.log('resultArr', resultArr);
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
    cgpv.api.maps[mapId].layer.onLayerVisibilityToggled((sender: any, payload:any) => {
      addEventToList('onLayerVisibilityToggled', `layer ${payload.layerPath} visibility set to ${payload.visibility} - global`);
    });

    // listen to layer item visibility changed event (any layers)
    cgpv.api.maps[mapId].layer.onLayerItemVisibilityToggled((sender: any, payload:any) => {
      addEventToList('onLayerItemVisibilityToggled', `${payload.itemName} on layer ${payload.layerPath} visibility set to ${payload.visibility} - global`);
    });

    // listen to map zoom event
    cgpv.api.maps[mapId].onMapZoomEnd((sender: any, payload:any) => {
      addEventToList('onLayerItemVisibilityToggled', `Zoomed to level ${payload.zoom}`);
    });

    // listen to map move event
    cgpv.api.maps[mapId].onMapMoveEnd((sender: any, payload:any) => {
      addEventToList('onLayerItemVisibilityToggled', `Map moved to center latitude ${payload.lnglat[1]} and longitude ${payload.lnglat[0]}`);
    });

    // listen to map language changed event
    cgpv.api.maps[mapId].onMapLanguageChanged((sender: any, payload:any) => {
      addEventToList('onMapLanguageChanged', `Map language changed to ${payload.language}`);
    });

    // listen to basemap changed event
    cgpv.api.maps[mapId].basemap.onBasemapChanged((sender: any, payload:any) => {
      addEventToList('onBasemapChanged', `Basemap changed to ${payload.basemap.basemapId}`);
    });

    // listen to layer reordered event
    cgpv.api.maps[mapId].stateApi.onLayersReordered((sender: any, payload:any) => {
      addEventToList('onLayersReordered', `Layers reordered to ${payload.orderedLayers.map((layer: any) => layer.layerPath)}`);
    });

    /*
    // listen to map added to div event
    cgpv.api.onMapAddedToDiv((sender: any, payload:any) => {
       addEventToList('onMapAddedToDiv', `Map ${payload.mapId} added`);
    });*/
  };

  const readConfigFile = async (filePath: string) => {
    const res = await fetch(`${filePath}`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  }

  const initializeMap = (mapId: string, config: string | object, configIsFilePath = false) => {
    if (isInitialized) return;
    setIsLoading(true);
    if (configIsFilePath) {
      readConfigFile(config as string).then((data) => {
        console.log('i fetch a file ', data);
        initializeMap(mapId, data);
      });
    } else {
      setIsInitialized(true);
      const configJson = typeof config === 'string' ? JSON.parse(config) : config;
      handleCreateMap(mapId, configJson);
      cgpv.init(() => {
        // write some code ...
        registerEventListeners(mapId);
        setIsLoading(false);
      });
    }
  };


  const handleConfigFileChange = async (filePath: string | null) => {
    if (!filePath) return;
    readConfigFile(filePath).then((data) => {
      setEventsList([]);
      setLegendLayerStatusList([]);
      handleConfigJsonChange(data);
      setConfigFilePath(filePath);
    });
  };

  //removes map and creates a new map
  const handleRemoveMap = (): string => {
    cgpv.api.maps[mapId]?.remove(true);

    const newMapId = 'sandboxMap_' + uuidv4();
    // replace div with id 'sandboxMap' with another div
    const mapContainerDiv = document.getElementById('sandboxMapContainer');
    const newDiv = document.createElement('div');
    newDiv.id = newMapId;
    newDiv.className = 'geoview-map2';
    mapContainerDiv?.appendChild(newDiv);
    setMapId(newMapId);

    return newMapId;
  };


  const handleCreateMap = (theMapId: string, data: any) => {
    const mapDiv = document.getElementById(theMapId);
    
    mapDiv?.setAttribute('style', `width: ${mapWidth}px; height: ${mapHeight}px;`);
    

    cgpv.api.createMapFromConfig(theMapId, JSON.stringify(data));
    cgpv.init(() => {
      // write some code ...
      console.log('map created----------------------------------------');
      registerEventListeners(theMapId);
    });
    setConfigJson({ ...data });
    setMapId(theMapId);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  //deletes old map and creates a new map
  /*const reCreateMap = () => {
    const newMapId = handleRemoveMap();
    setTimeout(() => {
      //waiting for states that were prior to this function to update
      const mapDiv = document.getElementById(newMapId);
      if (applyWidthHeight) {
        mapDiv?.setAttribute('style', `width: ${mapWidth}px; height: ${mapHeight}px;`);
      } else {
        mapDiv?.setAttribute('style', `width: 100%; height: 100%;`);
      }

      cgpv.api.createMapFromConfig(newMapId, JSON.stringify(configJson));
    }, 500);
    setMapId(newMapId);
  };

  const onHeightChange = (newHeight: string) => {
    setMapHeight(newHeight);
    reCreateMap();
  };

  const onWidthChange = (newWidth: string) => {
    setMapWidth(newWidth);
    reCreateMap();
  };*/

  //when config settings changes recreate map
  const handleConfigJsonChange = (data: any) => {
    // pre-select theme and projection from config file
    setIsLoading(true);

    const newMapId = handleRemoveMap();
    setTimeout(() => {
      // create map
      handleCreateMap(newMapId, data);
    }, 1500);
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
    mapWidth,
    setMapWidth,
    mapHeight,
    setMapHeight,
    isInitialized,
    isLoading,
    eventsList,
    legendLayerStatusList,

    initializeMap,
    handleRemoveMap,
    handleConfigFileChange,
    handleConfigJsonChange,
    validateConfigJson,
    createMapFromConfigText,
    updateConfigProperty,
    handleApplyStateToConfigFile,
    clearEventsList
  };
}
