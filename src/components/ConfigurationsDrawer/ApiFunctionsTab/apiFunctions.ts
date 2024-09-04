import { ApiFuncItem } from "./ApiFunctionsTab";

const apiFuncs: ApiFuncItem[] = [
  {
    group: "General",
    description: "Reload with current state",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].reloadWithCurrentState();
    }
  },
  {
    group: "General",
    description: "Reload map",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].reload();
    }
  },
  {
    group: "General",
    description: "Remove map",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].remove();
    }
  },
  {
    group: "Language",
    description: "Set language to english",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].setLanguage('en');
    }
  },
  {
    group: "Language",
    description: "Set language to french",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].setLanguage('fr');
    }
  },
  {
    group: "Theme",
    description: "Set theme to geo.ca",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].setTheme('geo.ca');
    }
  },
  {
    group: "Theme",
    description: "Set theme to light",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].setTheme('light');
    }
  },
  {
    group: "Theme",
    description: "Set theme to dark",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].setTheme('dark');
    }
  },

  {
    group: "Notifications",
    description: "Add info notification",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.addNotificationMessage('this is an info notification');
    }
  },
  {
    group: "Notifications",
    description: "Add warning notification",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.addNotificationWarning('this is an warning notification');
    }
  },
  {
    group: "Notifications",
    description: "Add error notification",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.addNotificationError('this is an error notification');
    }
  },
  {
    group: "Notifications",
    description: "Add success notification",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.addNotificationSuccess('this is a success notification title');
    }
  },
  {
    group: "Notifications",
    description: "Show info snack-bar",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.showMessage('this is an info snack-bar');
    }
  },
  {
    group: "Notifications",
    description: "Show warning snack-bar",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.showWarning('this is an warning snack-bar');
    }
  },
  {
    group: "Notifications",
    description: "Show error snack-bar",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.showError('this is an error snack-bar');
    }
  },
  {
    group: "Notifications",
    description: "Show success snack-bar",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.showSuccess('this is a success snack-bar');
    }
  },
  {
    group: "Layers",
    description: "Add WMS Layer",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.showSuccess('this is a success snack-bar');
    },
    code: `cgpv.api.maps.Map1.layer.addGeoviewLayer(config)`
  },
  {
    group: "Layers",
    description: "Remove GeoJSON Layer",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].notifications.showSuccess('this is a success snack-bar');
    },
    code: `cgpv.api.maps.Map1.layer.removeLayerUsingPath('geojsonLYR1/geojsonLYR1')`
  },
  {
    group: "Layers",
    description: "Remove all layers",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].layer.removeAllGeoviewLayers();
    },
    code: `cgpv.api.maps.Map1.layer.removeAllGeoviewLayers()`
  },
  {
    group: "Layers",
    description: "Set all layers visible",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].layer.setAllLayersVisibility(true);
    }
  },
  {
    group: "Layers",
    description: "Set all layers NOT visible",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].layer.setAllLayersVisibility(false);
    }
  },
  {
    group: "Map markers",
    description: "Place a marker on the map",
    function: (mapId: string) => {
      cgpv.api.maps[mapId].clickMarkerIconShow({lnglat: [-90, 60]});
    },
    code: `cgpv.api.maps.Map1.clickMarkerIconShow({lnglat: [-90, 60]})`
  },
];


export default apiFuncs;