import React, { useState } from 'react';
import styled from 'styled-components';
import type { Task } from '../../types/board';
import { useDrag } from '../../context/DragContext';
import { useAppDispatch } from '../../store/store';
import { deleteTask, updateTask } from '../../features/board/boardSlice';

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: string;
}

const CardContainer = styled.div<{ isDragging: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacings.md};
  margin-bottom: ${({ theme }) => theme.spacings.sm};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  transition: box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  cursor: grab;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.disabled};
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 4px;
  border-radius: 50%;
  display: none;

  ${CardContainer}:hover & {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.error};
    background-color: ${({ theme }) => theme.colors.divider};
  }
`;

const EditTextarea = styled.textarea`
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  outline: none;
`;

const TaskCard: React.FC<TaskCardProps> = ({ task, index, columnId }) => {
  const { draggedItem, setDraggedItem } = useDrag();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(task.content);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (isEditing) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.setData('sourceColumnId', columnId);
    e.dataTransfer.setData('sourceIndex', String(index));
    setDraggedItem({ taskId: task.id, sourceColumnId: columnId, sourceIndex: index });
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDelete = () => {
    dispatch(deleteTask({ columnId, taskId: task.id }));
  };

  const handleSave = () => {
    if (content.trim() && content !== task.content) {
      dispatch(updateTask({ taskId: task.id, content: content.trim() }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setContent(task.content);
      setIsEditing(false);
    }
  };

  const isDragging = draggedItem?.taskId === task.id;

  return (
    <CardContainer
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      isDragging={isDragging}
    >
      {isEditing ? (
        <EditTextarea
          autoFocus
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>{task.content}</p>
      )}
      <DeleteButton onClick={handleDelete} aria-label="Delete task">&times;</DeleteButton>
    </CardContainer>
  );
};

export default TaskCard;
