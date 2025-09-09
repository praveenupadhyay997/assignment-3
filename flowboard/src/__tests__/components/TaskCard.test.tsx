import { fireEvent, screen } from '@testing-library/react';
import TaskCard from '../../components/TaskCard/TaskCard';
import type { Task } from '../../types/board';
import { renderWithProviders } from '../../utils/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../../features/board/boardSlice';

// Mock the DragContext
jest.mock('../../context/DragContext', () => ({
  useDrag: () => ({
    dragStart: jest.fn(),
    dragEnd: jest.fn(),
    dragOver: jest.fn(),
    dragEnter: jest.fn(),
    dragLeave: jest.fn(),
    drop: jest.fn(),
  }),
}));

describe('TaskCard', () => {
  const mockTask: Task = { id: 'task-1', content: 'Test Task' };
  const mockStore = configureStore({
    reducer: {
      board: boardReducer,
    },
    preloadedState: {
      board: {
        tasks: {
          'task-1': { id: 'task-1', content: 'Test Task' },
        },
        columns: {
          'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1'] },
        },
        columnOrder: ['column-1'],
      },
    },
  });

  it('renders the task content', () => {
    renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('enters edit mode on click', () => {
    renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    
    fireEvent.click(screen.getByText('Test Task'));
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('saves changes when Enter is pressed', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    
    renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    
    // Enter edit mode
    fireEvent.click(screen.getByText('Test Task'));
    
    // Change the task content
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    
    // Press Enter to save
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'board/updateTask',
        payload: { taskId: 'task-1', content: 'Updated Task' },
      })
    );
    
    dispatchSpy.mockRestore();
  });

  it('cancels edit mode when Escape is pressed', () => {
    renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    
    // Enter edit mode
    fireEvent.click(screen.getByText('Test Task'));
    
    // Change the task content but don't save
    const input = screen.getByDisplayValue('Test Task');
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    
    // Press Escape to cancel
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    
    // Should revert to the original content
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('Updated Task')).not.toBeInTheDocument();
  });

  it('has a delete button that can be clicked', () => {
    const { container } = renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    
    // Find the delete button by its aria-label
    const deleteButton = container.querySelector('button[aria-label="Delete task"]');
    expect(deleteButton).toBeInTheDocument();
    
    // The button should be rendered in the DOM
    expect(deleteButton).toHaveTextContent('×');
  });

  it('calls deleteTask when delete button is clicked', () => {
    const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
    
    const { container } = renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    
    // Hover to show delete button
    fireEvent.mouseEnter(container.firstChild!);
    const deleteButton = container.querySelector('button[aria-label="Delete task"]');
    
    // Click delete button
    if (deleteButton) {
      fireEvent.click(deleteButton);
      
      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'board/deleteTask',
          payload: { columnId: 'column-1', taskId: 'task-1' },
        })
      );
      
      dispatchSpy.mockRestore();
    } else {
      fail('Delete button not found');
    }
  });

  it('handles drag events', () => {
    const { container } = renderWithProviders(
      <TaskCard task={mockTask} index={0} columnId="column-1" />,
      { store: mockStore }
    );
    
    const card = container.firstChild as HTMLElement;
    
    // Simulate drag start - this should not throw any errors
    expect(() => {
      fireEvent.dragStart(card);
    }).not.toThrow();
    
    // Simulate drag end - this should not throw any errors
    expect(() => {
      fireEvent.dragEnd(card);
    }).not.toThrow();
  });
});
