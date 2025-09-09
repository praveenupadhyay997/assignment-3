import React from 'react';
import { render, screen } from '../../utils/test-utils';
import Board from '../../components/Board/Board';
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../../features/board/boardSlice';
import filterReducer from '../../features/filters/filterSlice';

describe('Board', () => {
  const initialState = {
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

  const renderWithStore = (state = {}) => {
    const store = configureStore({
      reducer: {
        board: boardReducer,
        filters: filterReducer,
      },
      preloadedState: state,
    });

    return render(
      <Board />,
      {
        wrapper: ({ children }) => (
          <div>
            {children}
          </div>
        ),
        store,
      }
    );
  };

  it('renders all columns', () => {
    renderWithStore(initialState);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
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
