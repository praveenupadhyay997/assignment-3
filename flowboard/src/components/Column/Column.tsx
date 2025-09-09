import React, { useState } from 'react';
import styled from 'styled-components';
import type { Column as ColumnType, Task } from '../../types/board';
import TaskCard from '../TaskCard/TaskCard';
import { useAppDispatch } from '../../store/store';
import { moveTask, addTask } from '../../features/board/boardSlice';
import { useDrag } from '../../context/DragContext';
import DragPlaceholder from '../DragPlaceholder/DragPlaceholder';
import TaskComposer from '../TaskComposer/TaskComposer';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const ColumnContainer = styled.div`
  margin: ${({ theme }) => `0 ${theme.spacings.sm}`};
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.background.default};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.divider};

  @media (max-width: 768px) {
    width: 90%;
    margin: ${({ theme }) => `${theme.spacings.sm} 0`};
  }
`;

const Title = styled.h3`
  padding: ${({ theme }) => theme.spacings.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  margin: 0;
`;

const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: ${({ theme }) => theme.spacings.sm};
  flex-grow: 1;
  min-height: 100px;
  transition: background-color 0.2s ease;
  background-color: ${({ theme, isDraggingOver }) =>
    isDraggingOver ? theme.colors.divider : 'transparent'};
`;


const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const dispatch = useAppDispatch();
  const { draggedItem } = useDrag();

  const handleAddTask = (content: string) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask: Task = {
      id: newTaskId,
      content,
    };
    dispatch(addTask({ columnId: column.id, task: newTask }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData('taskId');
    const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'), 10);
    const destColumnId = column.id;
    const destIndex = tasks.length; // Simple drop at the end for now

    if (taskId && sourceColumnId) {
      dispatch(
        moveTask({
          taskId,
          sourceColumnId,
          sourceIndex,
          destColumnId,
          destIndex,
        })
      );
    }
    setIsDraggingOver(false);
  };

  return (
    <ColumnContainer>
      <Title>{column.title}</Title>
      <TaskList
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        isDraggingOver={isDraggingOver}
      >
        {tasks.map((task, index) => {
          if (draggedItem && draggedItem.taskId === task.id && draggedItem.sourceColumnId === column.id) {
            return <DragPlaceholder key={task.id} />;
          }
          return <TaskCard key={task.id} task={task} index={index} columnId={column.id} />;
        })}
      </TaskList>
      <TaskComposer onConfirm={handleAddTask} />
    </ColumnContainer>
  );
};

export default Column;
