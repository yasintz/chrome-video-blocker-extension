import { Blocked } from '~/store';

export interface RealtimeTypes {
  updatedBlockeds: Blocked[];
}

export type RealtimeTypeKeys = keyof RealtimeTypes;

export type RealtimeObjectType<K extends RealtimeTypeKeys> = RealtimeTypes[K];
