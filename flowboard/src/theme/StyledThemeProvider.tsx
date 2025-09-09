import React, { useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { Theme } from '../types/theme';
import { useTheme } from './ThemeProvider';

declare module 'styled-components' {
  export interface DefaultTheme extends Omit<Theme, 'spacing'> {
    spacing: (multiplier?: number) => string;
    spacings: Theme['spacing'];
  }
}

export const StyledComponentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();

  const memoizedTheme = useMemo(() => ({
    ...theme,
    spacings: theme.spacing, // Keep original spacing object
    spacing: (multiplier: number = 1) => {
      const base = parseInt(theme.spacing.md, 10);
      return `${base * multiplier}px`;
    },
  }), [theme]);

  return (
    <StyledThemeProvider theme={memoizedTheme}>
      {children}
    </StyledThemeProvider>
  );
};
