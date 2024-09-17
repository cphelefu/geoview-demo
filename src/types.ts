

export type ListOptionType = {
  title: string;
  value: string | number;
  group?: string;
};

export type EventListItemType = {
  eventName: string;
  description: string;
  status?: string;
}


export type LegendLayerStatus = {
  layerName: string;
  status: string;
}