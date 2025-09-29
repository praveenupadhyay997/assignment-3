import { screen, fireEvent } from '@testing-library/react';
import { render, createTestStore } from '../../utils/test-utils';
import FilterBar from '../../components/FilterBar/FilterBar';

describe('FilterBar', () => {
  const renderWithStore = (preloadedState = {}) => {
    const store = createTestStore(preloadedState);

    return {
      ...render(<FilterBar />, { store }),
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

  it('clears the search term when input is cleared', () => {
    const { store } = renderWithStore({
      filters: { searchTerm: 'test' }
    });
    
    const input = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(input, { target: { value: '' } });
    
    expect(store.getState().filters.searchTerm).toBe('');
  });

  it('updates search term with multiple changes', () => {
    const { store } = renderWithStore();
    const input = screen.getByPlaceholderText('Search tasks...');
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(store.getState().filters.searchTerm).toBe('test');
    
    fireEvent.change(input, { target: { value: 'testing' } });
    expect(store.getState().filters.searchTerm).toBe('testing');
    
    fireEvent.change(input, { target: { value: '' } });
    expect(store.getState().filters.searchTerm).toBe('');
  });

  it('handles special characters in search', () => {
    const { store } = renderWithStore();
    const input = screen.getByPlaceholderText('Search tasks...');
    
    const specialChars = '!@#$%^&*()';
    fireEvent.change(input, { target: { value: specialChars } });
    
    expect(store.getState().filters.searchTerm).toBe(specialChars);
  });

  it('preserves search term value from store', () => {
    renderWithStore({
      filters: { searchTerm: 'existing search' }
    });
    
    const input = screen.getByPlaceholderText('Search tasks...');
    expect(input).toHaveValue('existing search');
  });
});
