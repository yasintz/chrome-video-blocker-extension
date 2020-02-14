import { ThemeTypes } from '../components/styles/themes';

export interface Blocked {
  byChannelId: boolean;
  byKeywordInVideoDescription: boolean;
  byKeywordInChannelName: boolean;
  str: string;
  id: string;
}

export interface AppStore {
  theme: ThemeTypes;
  blockeds: Blocked[];
}

const STORE_LOCAL_STORAGE_KEY = 'nftxk7loxyhxki';

export function loadStore(): AppStore {
  return JSON.parse(localStorage.getItem(STORE_LOCAL_STORAGE_KEY) || '{}');
}

export function saveStore(state: AppStore) {
  localStorage.setItem(STORE_LOCAL_STORAGE_KEY, JSON.stringify(state));
}
