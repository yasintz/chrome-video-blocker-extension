import React from 'react';

import { StoreProvider } from '~/store/store-context';
import { ThemeProvider } from '~/components/styles/themes';

export function AppProvider(props: React.Props<any>) {
  return (
    <StoreProvider>
      <ThemeProvider>{props.children}</ThemeProvider>
    </StoreProvider>
  );
}
