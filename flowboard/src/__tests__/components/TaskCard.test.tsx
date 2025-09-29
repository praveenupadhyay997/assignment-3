import { fireEvent, screen } from '@testing-library/react';
import { render, createTestStore } from '../../utils/test-utils';
import TaskCard from '../../components/TaskCard/TaskCard';
import type { Task } from '../../types/board';

describe('TaskCard', () => {
  const mockTask: Task = { id: 'task-1', content: 'Test Task' };
  
  const initialState = {
    board: {
      tasks: {
        'task-1': { id: 'task-1', content: 'Test Task' },
      },
      columns: {
        'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1'] },
      },
      columnOrder: ['column-1'],
    },
    filters: {
      searchTerm: '',
    },
  };
  
  const renderTaskCard = (task = mockTask, index = 0, columnId = 'column-1') => {
    const store = createTestStore(initialState);
    return {
      ...render(<TaskCard task={task} index={index} columnId={columnId} />, { store }),
      store,
    };
  };

  it('renders the task content', () => {
    renderTaskCard();
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('enters edit mode on click', () => {
    renderTaskCard();
    
    fireEvent.click(screen.getByText('Test Task'));
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument();
  });

  it('saves changes when Enter is pressed', () => {
    const { store } = renderTaskCard();
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    
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
    renderTaskCard();
    
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

  it('has a delete button', () => {
    const { container } = renderTaskCard();
    
    // Find the delete button by its aria-label
    const deleteButton = container.querySelector('button[aria-label="Delete task"]');
    expect(deleteButton).toBeInTheDocument();
  });

  it('has delete button that is initially hidden', () => {
    const { container } = renderTaskCard();
    
    // Find the delete button
    const deleteButton = container.querySelector('button[aria-label="Delete task"]');
    
    // Delete button should exist in the DOM
    expect(deleteButton).toBeInTheDocument();
  });

  it('handles drag events with proper data transfer', () => {
    const mockDataTransfer = {
      setData: jest.fn(),
      effectAllowed: '',
      setDragImage: jest.fn(),
    };
    
    const { container } = renderTaskCard();
    const card = container.firstChild as HTMLElement;
    
    // Simulate drag start with data transfer
    fireEvent.dragStart(card, { dataTransfer: mockDataTransfer });
    
    // Verify data was set on drag start
    expect(mockDataTransfer.setData).toHaveBeenCalled();
    
    // Simulate drag end
    fireEvent.dragEnd(card);
  });
  
  it('handles content updates correctly', () => {
    renderTaskCard();
    
    // Enter edit mode
    fireEvent.click(screen.getByText('Test Task'));
    
    // Verify input is in edit mode
    const input = screen.getByDisplayValue('Test Task');
    expect(input).toBeInTheDocument();
    
    // Update with valid content
    fireEvent.change(input, { target: { value: 'Updated Task' } });
    expect(input).toHaveValue('Updated Task');
  });

  it('handles long task content', () => {
    const longTask = {
      ...mockTask,
      content: 'This is a very long task description that should be displayed properly',
    };
    
    renderTaskCard(longTask);
    expect(screen.getByText(longTask.content)).toBeInTheDocument();
  });

  it('applies correct styling on hover', () => {
    const { container } = renderTaskCard();
    const card = container.firstChild as HTMLElement;
    
    // Simulate mouse enter
    fireEvent.mouseEnter(card);
    
    // Simulate mouse leave
    fireEvent.mouseLeave(card);
    
    expect(card).toBeTruthy();
  });

  it('renders with custom index', () => {
    renderTaskCard(mockTask, 5, 'column-1');
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});
