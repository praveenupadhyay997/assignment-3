import type { ReactElement, ReactNode } from 'react';
import { render as rtlRender, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../theme/ThemeProvider';
import { StyledComponentsProvider } from '../theme/StyledThemeProvider';
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import type { RootState } from '../store/store';

// Mock the DragContext
jest.mock('../context/DragContext', () => ({
  useDrag: () => ({
    draggedItem: null,
    setDraggedItem: jest.fn()
  }),
  DragProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>
}));

// Define the shape of our test state
type TestState = {
  board: RootState['board'];
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<TestState>;
  store?: ReturnType<typeof configureStore>;
}

// Mocked DragProvider component
const MockedDragProvider: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const AllTheProviders = ({ 
  children,
  store 
}: { 
  children: ReactNode;
  store: ReturnType<typeof configureStore>;
}) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StyledComponentsProvider>
          <MockedDragProvider>{children}</MockedDragProvider>
        </StyledComponentsProvider>
      </ThemeProvider>
    </Provider>
  );
};

// Create a function to create a test store with proper typing
const createTestStore = (preloadedState?: Partial<TestState>) => {
  const defaultState: TestState = {
    board: { tasks: {}, columns: {}, columnOrder: [] },
  };
  
  return configureStore({
    reducer: {
      board: boardReducer,
    },
    preloadedState: {
      ...defaultState,
      ...(preloadedState || {}),
    },
  });
};

const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    store = createTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <AllTheProviders store={store}>{children}</AllTheProviders>
  );

  return {
    store,
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Re-export everything
export * from '@testing-library/react';
// Override render method
export { customRender as renderWithProviders };
