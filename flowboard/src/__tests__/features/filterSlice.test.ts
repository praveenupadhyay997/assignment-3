import { configureStore } from '@reduxjs/toolkit';
import filterReducer, { setSearchTerm } from '../../features/filters/filterSlice';
import type { FilterState } from '../../features/filters/filterSlice';

// Helper function to create a preloaded store for testing
const createTestStore = (preloadedState?: FilterState) => {
  return configureStore({
    reducer: {
      filters: filterReducer,
    },
    preloadedState: preloadedState ? { filters: preloadedState } : { filters: { searchTerm: '' } },
  });
};

describe('filterSlice', () => {
  let store: ReturnType<typeof createTestStore>;
  let initialState: FilterState;

  beforeEach(() => {
    initialState = { searchTerm: '' };
    store = createTestStore(initialState);
  });

  it('should have initial state', () => {
    const state = store.getState().filters;
    expect(state).toEqual(initialState);
  });

  it('should handle setSearchTerm', () => {
    store.dispatch(setSearchTerm('test'));
    const state = store.getState().filters;
    expect(state.searchTerm).toBe('test');
  });

  it('should handle setSearchTerm with an empty string', () => {
    store.dispatch(setSearchTerm(''));
    const state = store.getState().filters;
    expect(state.searchTerm).toBe('');
  });

  it('should handle multiple setSearchTerm actions', () => {
    store.dispatch(setSearchTerm('first'));
    expect(store.getState().filters.searchTerm).toBe('first');
    
    store.dispatch(setSearchTerm('second'));
    expect(store.getState().filters.searchTerm).toBe('second');
    
    store.dispatch(setSearchTerm(''));
    expect(store.getState().filters.searchTerm).toBe('');
  });

  it('should handle special characters in search term', () => {
    const specialChars = '!@#$%^&*()_+{}|:"<>?~`';
    store.dispatch(setSearchTerm(specialChars));
    expect(store.getState().filters.searchTerm).toBe(specialChars);
  });

  it('should handle long search terms', () => {
    const longString = 'a'.repeat(1000);
    store.dispatch(setSearchTerm(longString));
    expect(store.getState().filters.searchTerm).toBe(longString);
  });
});
