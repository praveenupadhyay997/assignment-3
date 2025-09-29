import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import type { Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import filterReducer from '../features/filters/filterSlice';
import { DragContext, type DragContextType } from '../context/DragContext';

// Define the shape of our test state
interface TestStoreState {
  board: {
    tasks: Record<string, any>;
    columns: Record<string, any>;
    columnOrder: string[];
    status?: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string | null;
  };
  filters: {
    searchTerm: string;
  };
}

// Define the store state type
type StoreState = {
  board: any;
  filters: any;
};

// Mock the DragContext with proper typing
const mockDragContext: DragContextType = {
  draggedItem: null,
  setDraggedItem: jest.fn(),
  isDraggingOver: false,
  setIsDraggingOver: jest.fn(),
  handleDragStart: jest.fn(),
  handleDragEnd: jest.fn(),
  handleDragOver: jest.fn(),
  handleDrop: jest.fn(),
};

// Mocked DragProvider component
const MockedDragProvider: React.FC<{ children: ReactNode; context?: Partial<DragContextType> }> = ({ 
  children, 
  context = {} 
}) => {
  const mergedContext = { ...mockDragContext, ...context };
  
  return (
    <DragContext.Provider value={mergedContext}>
      {children}
    </DragContext.Provider>
  );
};

// Create a function to create a test store with proper typing
const createTestStore = (preloadedState: Partial<TestStoreState> = {}) => {
  const initialState: TestStoreState = {
    board: {
      tasks: {},
      columns: {},
      columnOrder: [],
      status: 'idle',
      error: null,
      ...preloadedState.board,
    },
    filters: {
      searchTerm: '',
      ...preloadedState.filters,
    },
  };

  return configureStore({
    reducer: {
      board: boardReducer,
      filters: filterReducer,
    },
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// Create a minimal test theme that satisfies TypeScript requirements
const testTheme = {
  spacing: (factor: number = 1) => `${8 * factor}px`,
  spacings: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  colors: {
    primary: '#1976d2',
    secondary: '#9c27b0',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
    error: '#d32f2f',
    warning: '#ed6c02',
    success: '#2e7d32',
    info: '#0288d1',
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 500 },
    h2: { fontSize: '2rem', fontWeight: 500 },
    h3: { fontSize: '1.75rem', fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.43 },
    button: { fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 4,
  },
  borderRadius: '4px',
  transitions: {
    create: () => 'all 0.3s ease-in-out',
  },
  zIndex: {
    tooltip: 1500,
  },
  breakpoints: {
    up: () => '',
    down: () => '',
  },
  shadows: {
    sm: '0px 2px 1px -1px rgba(0,0,0,0.2)',
    md: '0px 3px 3px -2px rgba(0,0,0,0.14)',
    lg: '0px 1px 8px 0px rgba(0,0,0,0.12)',
  },
  direction: 'ltr',
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
  mode: 'light',
  transition: 'all 0.3s ease-in-out',
  palette: {
    mode: 'light',
  },
};

// Extend the DefaultTheme type from styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    spacing: (factor?: number) => string;
    spacings: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    colors: {
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
    };
    typography: {
      fontFamily: string;
      h1: { fontSize: string; fontWeight: number };
      h2: { fontSize: string; fontWeight: number };
      h3: { fontSize: string; fontWeight: number };
      body1: { fontSize: string; lineHeight: number };
      body2: { fontSize: string; lineHeight: number };
      button: { fontSize: string; fontWeight: number; textTransform: string };
    };
    shape: {
      borderRadius: number;
    };
    borderRadius: string | number;
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
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    direction: 'ltr' | 'rtl';
    mixins: {
      toolbar: {
        minHeight: number;
      };
    };
    mode: 'light' | 'dark';
    transition: string;
    palette: {
      mode: 'light' | 'dark';
    };
    // Allow additional properties
    [key: string]: any;
  }
}

// Custom render function with providers
const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState) as Store<StoreState>,
    dragContext = {},
    ...renderOptions
  }: {
    preloadedState?: Partial<TestStoreState>;
    store?: Store<StoreState>;
    dragContext?: Partial<DragContextType>;
  } & Omit<RenderOptions, 'queries'> = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <StyledThemeProvider theme={testTheme}>
        <MockedDragProvider context={dragContext}>
          {children}
        </MockedDragProvider>
      </StyledThemeProvider>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// Helper function to create a drag event
const createDragEvent = (data: any) => {
  const event = new Event('drag', { bubbles: true });
  Object.assign(event, {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    dataTransfer: {
      setData: jest.fn(),
      getData: jest.fn(() => JSON.stringify(data)),
      effectAllowed: 'move',
      setDragImage: jest.fn(),
      ...data.dataTransfer
    },
    ...data
  });
  return event;
};

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { customRender as render };
// Export the store creation function and test utilities
export { createTestStore, createDragEvent, MockedDragProvider };
// Export the mock drag context for testing
export { mockDragContext };
