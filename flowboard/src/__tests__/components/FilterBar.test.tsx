import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FilterBar from '../../components/FilterBar/FilterBar';
import boardReducer from '../../features/board/boardSlice';
import filterReducer from '../../features/filters/filterSlice';

describe('FilterBar', () => {
  const renderWithStore = (preloadedState = {}) => {
    const store = configureStore({
      reducer: {
        board: boardReducer,
        filters: filterReducer,
      },
      preloadedState,
    });

    return {
      ...render(
        <Provider store={store}>
          <FilterBar />
        </Provider>
      ),
      store,
    };
  };

  it('renders the search input', () => {
    renderWithStore();
    const input = screen.getByPlaceholderText('Search tasks...');
    expect(input).toBeInTheDocument();
  });

  it('updates the search term when typing', () => {
    const { store } = renderWithStore();
    const input = screen.getByPlaceholderText('Search tasks...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(input).toHaveValue('test');
    expect(store.getState().filters.searchTerm).toBe('test');
  });

  it('clears the search term when clear button is clicked', () => {
    const { store } = renderWithStore({
      filters: { searchTerm: 'test' }
    });
    
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    fireEvent.click(clearButton);
    
    expect(store.getState().filters.searchTerm).toBe('');
  });

  it('displays the clear button only when there is text', () => {
    renderWithStore();
    
    // Initially, clear button should not be visible
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
    
    // Type something
    const input = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Now clear button should be visible
    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument();
    
    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    
    // Clear button should be hidden again
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument();
  });
});
