import type { Theme } from "../types/theme";

const baseSpacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

const baseTypography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.3,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none' as const,
  },
};

const baseShadows = {
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
};

export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#3f51b5',
    secondary: '#f50057',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#2196f3',
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  spacing: baseSpacing,
  typography: baseTypography,
  shadows: baseShadows,
  borderRadius: '4px',
  transition: 'all 0.3s ease-in-out',
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#7986cb',
    secondary: '#ff4081',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#2196f3',
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  spacing: baseSpacing,
  typography: baseTypography,
  shadows: baseShadows,
  borderRadius: '4px',
  transition: 'all 0.3s ease-in-out',
};

export const getTheme = (mode: 'light' | 'dark'): Theme => {
  return mode === 'dark' ? darkTheme : lightTheme;
};
