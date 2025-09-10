import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Theme, ThemeMode } from '../types/theme';
import { getTheme } from './theme';

type ThemeContextType = {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'flowboard-theme-mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Initialize theme mode from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (savedMode) return savedMode;
      
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Update theme when mode changes
  const theme = useMemo(() => {
    return getTheme(themeMode === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      : themeMode
    );
  }, [themeMode]);

  // Save theme preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode]);

  // Watch for system theme changes when in 'system' mode
  useEffect(() => {
    if (themeMode !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Force re-render when system theme changes
      setThemeMode('system');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prevMode => {
      if (prevMode === 'light') return 'dark';
      if (prevMode === 'dark') return 'system';
      return 'light';
    });
  };

  const value = {
    theme,
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
