import { ThemeTypes } from '../components/styles/themes';
import storage from './storage';
import { objectForeach } from '~/utils';

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

const inialStore: AppStore = {
  blockeds: [],
  theme: 'dark',
};

export async function loadInitalStore() {
  objectForeach(inialStore, async (key, value) => {
    await storage.set(key, prev => (prev === undefined ? value : prev));
  });
}

export async function getTheme(): Promise<ThemeTypes> {
  const theme = await storage.get<ThemeTypes>('theme');

  return theme || 'dark';
}

export async function setTheme(theme: ThemeTypes) {
  await storage.set('theme', theme);
}

export async function addBlocked(blocked: Blocked) {
  const newBlockeds = await storage.set<Blocked[]>('blockeds', prev => [...prev, blocked]);

  return newBlockeds;
}

export async function updateBlocked(blockedId: string, blocked: Omit<Partial<Blocked>, 'id'>) {
  const newBlockeds = await storage.set<Blocked[]>('blockeds', prev =>
    prev.map(b => (b.id === blockedId ? { ...b, ...blocked } : b)),
  );

  return newBlockeds;
}

export async function removeBlocked(blockedId: string) {
  const newBlockeds = await storage.set<Blocked[]>('blockeds', prev => prev.filter(b => b.id !== blockedId));

  return newBlockeds;
}

export async function getAllBlockeds() {
  const blockeds = await storage.get<Blocked[]>('blockeds');

  return blockeds;
}

export async function clearAllBlocked() {
  await storage.set<Blocked[]>('blockeds', []);

  return [];
}
