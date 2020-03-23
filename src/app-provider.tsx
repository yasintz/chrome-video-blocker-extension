// TODO  : update this file
import React from 'react';
import { ThemeProvider, ThemeTypes } from '~/components/styles/themes';

interface StoreContextValue {
  theme: ThemeTypes;
  setTheme: (theme: ThemeTypes) => void;
}

export const StoreContext = React.createContext<StoreContextValue>({
  setTheme: () => null,
  theme: 'light',
});

export function StoreProvider(props: React.Props<any>) {
  const [theme, setTheme] = React.useState<ThemeTypes>('dark');

  const value = React.useMemo<StoreContextValue>(() => {
    return {
      theme,
      setTheme,
    };
  }, [theme]);

  return <StoreContext.Provider value={value}>{props.children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  return React.useContext(StoreContext);
}

export function AppProvider(props: React.Props<any>) {
  return (
    <StoreProvider>
      <ThemeProvider>{props.children}</ThemeProvider>
    </StoreProvider>
  );
}
