import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Column from '../../components/Column/Column';
import boardReducer from '../../features/board/boardSlice';
import type { Task, Column as ColumnType } from '../../types/board';
// Using native HTML5 drag and drop for testing

// Mock the DragContext
jest.mock('../../context/DragContext', () => ({
  useDrag: () => ({
    setDraggedItem: jest.fn(),
    setIsDraggingOver: jest.fn(),
  }),
}));

describe('Column', () => {
  const mockTasks: Task[] = [
    { id: 'task-1', content: 'Test Task 1' },
    { id: 'task-2', content: 'Test Task 2' },
  ];

  const mockColumn: ColumnType = {
    id: 'column-1',
    title: 'Test Column',
    taskIds: ['task-1', 'task-2'],
  };

  const renderWithProviders = (ui: React.ReactElement, { preloadedState = {} } = {}) => {
    const store = configureStore({
      reducer: {
        board: boardReducer,
      },
      preloadedState: {
        board: {
          tasks: {
            'task-1': { id: 'task-1', content: 'Test Task 1' },
            'task-2': { id: 'task-2', content: 'Test Task 2' },
          },
          columns: { [mockColumn.id]: mockColumn },
          columnOrder: [mockColumn.id],
        },
        ...preloadedState,
      },
    });

    return {
      ...render(
        <Provider store={store}>
          <div data-testid="test-container">
            {ui}
          </div>
        </Provider>
      ),
      store,
    };
  };

  it('renders the column title', () => {
    renderWithProviders(<Column column={mockColumn} tasks={mockTasks} />);
    expect(screen.getByText('Test Column')).toBeInTheDocument();
  });

  it('renders all tasks in the column', () => {
    renderWithProviders(<Column column={mockColumn} tasks={mockTasks} />);
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });

  it('allows adding a new task', () => {
    const { store } = renderWithProviders(<Column column={mockColumn} tasks={mockTasks} />);
    
    const addButton = screen.getByText('+ Add a card');
    fireEvent.click(addButton);
    
    const input = screen.getByPlaceholderText('Enter a title for this card...');
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Get all tasks after the action
    const tasks = store.getState().board.tasks;
    const newTask = Object.values(tasks).find(task => task.content === 'New Task');
    
    // Verify a new task was created with the correct content
    expect(newTask).toBeDefined();
    expect(newTask?.content).toBe('New Task');
    
    // Verify the task was added to the current column
    const column = store.getState().board.columns[mockColumn.id];
    expect(column.taskIds).toContain(newTask?.id);
  });

  it('handles drag start and end events', () => {
    renderWithProviders(<Column column={mockColumn} tasks={mockTasks} />);
    const taskElement = screen.getByText('Test Task 1');
    
    fireEvent.dragStart(taskElement);
    fireEvent.dragEnd(taskElement);
    
    // Verify the task is still in the DOM after drag operations
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
  });
});
