export type Language = 'en' | 'fi' | 'sv';

export interface AddressFeature {
  type: string;
  geometry?: {
    type: string;
    coordinates: number[];
  };
  properties?: {
    name: string;
  };
  name?: Record<string, string>;
  parent?: {
    name: Record<string, string>;
  };
  bbox?: number[];
}

export interface ModalMeta {
  event?: Event;
  apiAccessToken?: string;
  [key: string]: unknown;
}

export interface AutoSuggestEvent {
  target: {
    id: string;
    value: AddressFeature | { type: string; coordinates: number[] } | string;
  };
}
