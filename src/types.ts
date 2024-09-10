

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