import * as React from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';
import { useStore } from '../../../store/store-context';

export type ThemeTypes = 'light' | 'dark';

export const lightTheme: DefaultTheme = {
  backgroundColor: 'lightblue',
};

export const darkTheme: DefaultTheme = {
  backgroundColor: '#181818',
};

export const themes: Record<ThemeTypes, DefaultTheme> = {
  light: lightTheme,
  dark: darkTheme,
};

export function ThemeProvider(props: React.Props<any>) {
  const { theme } = useStore();

  return <StyledThemeProvider theme={themes[theme]}>{props.children}</StyledThemeProvider>;
}
