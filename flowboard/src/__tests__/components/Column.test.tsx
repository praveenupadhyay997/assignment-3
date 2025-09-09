import React from 'react';
import { render, screen } from '../../utils/test-utils';
import Column from '../../components/Column/Column';
import { Task, Column as ColumnType } from '../../types/board';

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

  it('renders the column title', () => {
    render(<Column column={mockColumn} tasks={mockTasks} />);
    expect(screen.getByText('Test Column')).toBeInTheDocument();
  });

  it('renders all tasks in the column', () => {
    render(<Column column={mockColumn} tasks={mockTasks} />);
    expect(screen.getByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Test Task 2')).toBeInTheDocument();
  });
});
