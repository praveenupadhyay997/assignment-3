import * as React from 'react';
import styled from 'styled-components';
import { useDrag } from '../../context/DragContext';
import { useAppDispatch } from '../../store/store';
import { deleteTask, updateTask } from '../../features/board/boardSlice';
import type { Task } from '../../types/board';

interface TaskCardProps {
  task: Task;
  index: number;
  columnId: string;
}

const CardContainer = styled.div<{ $isDragging: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ theme }) => theme.spacings.md};
  margin-bottom: ${({ theme }) => theme.spacings.sm};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  transition: box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
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

const TaskCard: React.FC<TaskCardProps> = React.memo(({ task, index, columnId }) => {
  const { draggedItem, setDraggedItem } = useDrag();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState(task.content);

  const handleDragStart = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      console.log('=== DRAG START ===');
      console.log('Task ID:', task.id, 'Column ID:', columnId, 'Index:', index);
      
      if (isEditing) {
        console.log('Task is in edit mode, preventing drag');
        e.preventDefault();
        return;
      }

      const dragData = {
        taskId: task.id,
        sourceColumnId: columnId,
        sourceIndex: index,
      };

      console.log('Drag data:', dragData);
      const dragDataString = JSON.stringify(dragData);
      e.dataTransfer.effectAllowed = 'move';
      
      try {
        console.log('Setting data transfer data...');
        e.dataTransfer.setData('text/plain', dragDataString);
        e.dataTransfer.setData('application/json', dragDataString);
        console.log('DataTransfer types:', e.dataTransfer.types);

        // Create a simple drag preview
        console.log('Creating drag image...');
        const dragImage = new Image();
        dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(dragImage, 0, 0);

        // Set the dragged item in context
        console.log('Setting dragged item in context...');
        setDraggedItem(dragData);

        // Add a class to the dragged element
        console.log('Adding dragging class...');
        e.currentTarget.classList.add('dragging');
        console.log('=== DRAG START COMPLETE ===');
      } catch (error) {
        console.error('Error during drag start:', error);
      }
    },
    [isEditing, task.id, columnId, index, setDraggedItem]
  );

  const handleDragEnd = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedItem(null);
  }, [setDraggedItem]);

  const handleDelete = React.useCallback(() => {
    dispatch(deleteTask({ columnId, taskId: task.id }));
  }, [dispatch, columnId, task.id]);

  const handleSave = React.useCallback(() => {
    if (content.trim()) {
      dispatch(
        updateTask({
          taskId: task.id,
          content: content.trim(),
        })
      );
      setIsEditing(false);
    }
  }, [content, dispatch, task.id]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        setContent(task.content);
        setIsEditing(false);
      }
    },
    [handleSave, task.content]
  );

  const isDragging = draggedItem?.taskId === task.id;

  return (
    <CardContainer
      draggable={!isEditing}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      $isDragging={isDragging}
      className={`task-card ${isDragging ? 'is-dragging' : ''}`}
      data-task-id={task.id}
      role="listitem"
      aria-grabbed={isDragging}
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
      <DeleteButton onClick={handleDelete} aria-label="Delete task">
        &times;
      </DeleteButton>
    </CardContainer>
  );
}, (prevProps, nextProps) => {
  // Avoid stale renders: track content changes too
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.columnId === nextProps.columnId &&
    prevProps.task.content === nextProps.task.content
  );
});

export default TaskCard;