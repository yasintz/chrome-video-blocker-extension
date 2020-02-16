import React from 'react';
import { loadStore, saveStore as saveStoreToLocalStorage, Blocked } from './index';
import { ThemeTypes } from '../components/styles/themes';
import useInterval from '~/hooks/use-interval';

interface StoreContextValue {
  theme: ThemeTypes;
  blockeds: Blocked[];
  saveStore: () => void;
  setTheme: (theme: ThemeTypes) => void;
  addBlocked: (blocked: Blocked) => void;
  removeBlocked: (id: string) => void;
  updateBlocked: (id: string, value: Partial<Blocked>) => void;
}

const store = loadStore();

function ef() {
  // empty function
}

export const StoreContext = React.createContext<StoreContextValue>({
  addBlocked: ef,
  blockeds: [],
  removeBlocked: ef,
  saveStore: ef,
  setTheme: ef,
  theme: 'light',
  updateBlocked: ef,
});

function useBlockedsState() {
  const [blockeds, setBlockeds] = React.useState<Blocked[]>([]);

  const addBlocked = React.useCallback((newBlocked: Blocked) => {
    setBlockeds(prev => [...prev, newBlocked]);
  }, []);

  const removeBlocked = React.useCallback((blockedId: string) => {
    setBlockeds(prev => prev.filter(b => b.id !== blockedId));
  }, []);
  const updateBlocked = React.useCallback((id: string, newValue: Partial<Blocked>) => {
    setBlockeds(prev =>
      prev.map(blocked => {
        if (blocked.id === id) {
          return { ...blocked, ...newValue };
        }

        return blocked;
      }),
    );
  }, []);

  return React.useMemo(() => ({ addBlocked, blockeds, removeBlocked, updateBlocked }), [
    addBlocked,
    blockeds,
    removeBlocked,
    updateBlocked,
  ]);
}

export function StoreProvider(props: React.Props<any>) {
  const [theme, setTheme] = React.useState<ThemeTypes>(store.theme);
  const { blockeds, removeBlocked, addBlocked, updateBlocked } = useBlockedsState();

  const saveStore = React.useCallback(() => {
    saveStoreToLocalStorage({
      theme,
      blockeds,
    });
  }, [blockeds, theme]);

  useInterval(saveStore, 15000);

  const value = React.useMemo<StoreContextValue>(() => {
    return {
      blockeds,
      theme,
      updateBlocked,
      saveStore,
      setTheme,
      addBlocked,
      removeBlocked,
    };
  }, [addBlocked, blockeds, removeBlocked, saveStore, theme, updateBlocked]);

  return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>;
}

export function useStore() {
  return React.useContext(StoreContext);
}
