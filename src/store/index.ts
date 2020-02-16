import { ThemeTypes } from '../components/styles/themes';

export type BlockedType = 'channel-link' | 'keyword-in-video-description' | 'keyword-in-channel-name';

export interface Blocked {
  type: BlockedType;
  key: string;
  id: string;
}

export interface AppStore {
  theme: ThemeTypes;
  blockeds: Blocked[];
}

const STORE_LOCAL_STORAGE_KEY = 'nftxk7loxyhxki';

export function loadStore(): AppStore {
  const initialStore: AppStore = {
    blockeds: [],
    theme: 'dark',
  };

  return {
    ...initialStore,
    ...JSON.parse(localStorage.getItem(STORE_LOCAL_STORAGE_KEY) || JSON.stringify(initialStore)),
  };
}

export function saveStore(state: AppStore) {
  localStorage.setItem(STORE_LOCAL_STORAGE_KEY, JSON.stringify(state));
}
