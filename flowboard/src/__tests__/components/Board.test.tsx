import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Board from '../../components/Board/Board';
import boardReducer from '../../features/board/boardSlice';
import filterReducer from '../../features/filters/filterSlice';
import type { BoardState } from '../../types/board';
import type { FilterState } from '../../features/filters/filterSlice';

// Define the test state type
interface TestState {
  board: BoardState;
  filters: FilterState;
}

describe('Board', () => {
  const initialState: TestState = {
    board: {
      tasks: {
        'task-1': { id: 'task-1', content: 'Task 1' },
        'task-2': { id: 'task-2', content: 'Task 2' },
      },
      columns: {
        'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
        'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
      },
      columnOrder: ['column-1', 'column-2'],
    },
    filters: {
      searchTerm: '',
    },
  };

  const renderWithStore = (preloadedState: Partial<TestState> = {}) => {
    const mergedState: TestState = {
      board: { ...initialState.board, ...(preloadedState.board || {}) },
      filters: { ...initialState.filters, ...(preloadedState.filters || {}) }
    };

    const testStore = configureStore({
      reducer: {
        board: boardReducer,
        filters: filterReducer,
      },
      preloadedState: mergedState
    });

    return render(
      <Provider store={testStore}>
        <Board />
      </Provider>
    );
  };

  it('renders all columns', () => {
    renderWithStore(initialState);
    
    // Check if column titles are rendered
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    
    // Check if tasks are rendered in the correct columns
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('filters tasks based on search term', () => {
    const stateWithSearch = {
      ...initialState,
      filters: {
        searchTerm: 'Task 1',
      },
    };
    
    renderWithStore(stateWithSearch);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
