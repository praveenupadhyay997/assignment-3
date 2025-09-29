import type { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        paper: string;
        default: string;
      };
      primary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrastText: string;
      };
      error: {
        main: string;
      };
      warning: {
        main: string;
      };
      info: {
        main: string;
      };
      success: {
        main: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      divider: string;
    };
    spacing: (value?: number) => string;
    borderRadius: string | number;
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontFamily: string;
      h1: {
        fontSize: string;
        fontWeight: number;
      };
      h2: {
        fontSize: string;
        fontWeight: number;
      };
      h3: {
        fontSize: string;
        fontWeight: number;
      };
      body1: {
        fontSize: string;
        lineHeight: number;
      };
      body2: {
        fontSize: string;
        lineHeight: number;
      };
      button: {
        textTransform: string;
        fontWeight: number;
      };
    };
    transitions: {
      create: () => string;
    };
    zIndex: {
      tooltip: number;
    };
    breakpoints: {
      up: () => string;
      down: () => string;
    };
    shape: {
      borderRadius: number;
    };
    mixins: {
      toolbar: {
        minHeight: number;
      };
    };
    palette: {
      mode: 'light' | 'dark';
    };
    mode: 'light' | 'dark';
    spacings: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transition: string;
  }
}

// Export both named and default for backward compatibility
export const theme: DefaultTheme = {
  colors: {
    background: {
      paper: '#ffffff',
      default: '#f5f5f5',
    },
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  spacing: (value = 1) => `${value * 8}px`,
  borderRadius: '4px',
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  transitions: {
    create: () => 'all 0.3s ease',
  },
  zIndex: {
    tooltip: 1500,
  },
  breakpoints: {
    up: () => '@media (min-width:0px)',
    down: () => '@media (max-width:0px)',
  },
  shape: {
    borderRadius: 4,
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
  palette: {
    mode: 'light' as const,
  },
  mode: 'light',
  spacings: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  transition: 'all 0.3s ease',
} as const;

export default theme;
