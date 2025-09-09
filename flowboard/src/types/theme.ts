import type { CSSObject } from 'styled-components';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  error: string;
  warning: string;
  success: string;
  info: string;
  divider: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTypography {
  fontFamily: string;
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  body1: CSSObject;
  body2: CSSObject;
  button: CSSObject;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  borderRadius: string;
  transition: string;
}
