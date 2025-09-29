import { screen } from '@testing-library/react';
import { render, createTestStore } from '../../utils/test-utils';
import Board from '../../components/Board/Board';
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

    const store = createTestStore(mergedState);
    return render(<Board />, { store });
  };

  it('renders all columns with their tasks', () => {
    renderWithStore(initialState);
    
    // Check if column titles are rendered
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    
    // Check if tasks are rendered
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

  it('filters tasks case-insensitively', () => {
    const stateWithSearch = {
      ...initialState,
      filters: {
        searchTerm: 'task 1',
      },
    };
    
    renderWithStore(stateWithSearch);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });

  it('renders empty column when it has no tasks', () => {
    renderWithStore(initialState);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    // The In Progress column should exist but have no tasks
  });

  it('renders multiple columns in order', () => {
    renderWithStore(initialState);
    const columns = screen.getAllByText(/To Do|In Progress/);
    expect(columns).toHaveLength(2);
  });

  it('shows no tasks when search does not match', () => {
    const stateWithSearch = {
      ...initialState,
      filters: {
        searchTerm: 'Non-existent task',
      },
    };
    
    renderWithStore(stateWithSearch);
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
  });
});
