import React from 'react';
import { render, screen, fireEvent } from '../../utils/test-utils';
import FilterBar from '../../components/FilterBar/FilterBar';

describe('FilterBar', () => {
  it('renders the search input', () => {
    render(<FilterBar />);
    const input = screen.getByPlaceholderText('Search tasks...');
    expect(input).toBeInTheDocument();
  });

  it('updates the search term when typing', () => {
    render(<FilterBar />);
    const input = screen.getByPlaceholderText('Search tasks...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });
});
