import * as React from 'react';
import type { Column as ColumnType, Task } from '../../types/board';
import TaskCard from '../TaskCard/TaskCard';
import { useAppDispatch } from '../../store/store';
import { addTask, moveTask } from '../../features/board/boardSlice';
import { useDrag } from '../../context/DragContext';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = React.memo(({ column, tasks }) => {
  const dispatch = useAppDispatch();
  const { setDraggedItem } = useDrag();
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const dragCounterRef = React.useRef(0);

  const handleAddTask = (content: string) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask: Task = {
      id: newTaskId,
      content,
    };
    dispatch(addTask({ columnId: column.id, task: newTask }));
  };

  const handleDragOver = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('=== DRAG OVER ===');
    console.log('Current column:', column.id);

    // Check if we're dragging a task (not other elements)
    const types = e.dataTransfer.types;
    console.log('DataTransfer types:', types);

    if (!types.includes('application/json') && !types.includes('text/plain')) {
      console.log('No valid drag data found, ignoring drag over');
      return;
    }

    e.dataTransfer.dropEffect = 'move';

    if (!isDraggingOver) {
      console.log('Setting drag over state to true');
      setIsDraggingOver(true);
    }
  }, [isDraggingOver, column.id]);

  const handleDragEnter = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current += 1;
    console.log('Drag enter:', dragCounterRef.current);
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current -= 1;
    console.log('Drag leave:', dragCounterRef.current);
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDraggingOver(false);
    }
  }, []);

  const handleDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
    console.log('=== HANDLE DROP TRIGGERED ===');
    console.log('Current column:', column.id);

    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDraggingOver(false);

    // Log the element that received the drop
    console.log('Drop target:', e.currentTarget);

    // Log all available data transfer types
    const types = [...e.dataTransfer.types];
    console.log('Available data transfer types:', types);

    // Try to get the data that was set during drag start
    let rawData = '';

    // Try application/json first, then text/plain
    if (types.includes('application/json')) {
      console.log('Getting data as application/json');
      rawData = e.dataTransfer.getData('application/json');
    } else if (types.includes('text/plain')) {
      console.log('Getting data as text/plain');
      rawData = e.dataTransfer.getData('text/plain');
    }

    console.log('Raw drop data:', rawData);

    if (!rawData) {
      console.warn('No valid drag data found in drop event');
      return;
    }

    try {
      const dragData = JSON.parse(rawData);
      console.log('Parsed drop data:', dragData);

      const { taskId, sourceColumnId, sourceIndex } = dragData;

      if (!taskId || sourceColumnId === undefined || sourceIndex === undefined) {
        console.error('Invalid drop data format - missing required fields:', {
          hasTaskId: !!taskId,
          hasSourceColumnId: sourceColumnId !== undefined,
          hasSourceIndex: sourceIndex !== undefined,
          data: dragData,
        });
        return;
      }

      // Calculate the drop position
      const listEl = e.currentTarget;
      const cards = Array.from(listEl.querySelectorAll<HTMLElement>('.task-card'));
      const mouseY = e.clientY;

      // Find the drop position
      let destIndex = cards.length; // Default to the end

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;

        if (mouseY < midY) {
          destIndex = i;
          break;
        }
      }

      // If moving within the same column, adjust the destination index
      if (sourceColumnId === column.id) {
        if (destIndex > sourceIndex) {
          destIndex -= 1;
        }
        if (destIndex === sourceIndex) {
          console.log('No position change, ignoring drop');
          return;
        }
      }

      console.log('Dispatching moveTask action:', {
        taskId,
        sourceColumnId,
        sourceIndex,
        destColumnId: column.id,
        destIndex,
      });

      dispatch(
        moveTask({
          taskId,
          sourceColumnId,
          sourceIndex,
          destColumnId: column.id,
          destIndex,
        }),
      );
    } catch (error) {
      console.error('Error processing drop:', error);
    } finally {
      setDraggedItem(null);
    }
  }, [column.id, dispatch, setDraggedItem]);

  return (
    <div className="column-container" style={{
      margin: '0 8px',
      display: 'flex',
      flexDirection: 'column',
      minWidth: '280px',
      maxWidth: '280px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      padding: '8px',
      userSelect: 'none'
    }}>
      <h3 style={{
        padding: '8px 12px',
        margin: '0 0 12px',
        fontSize: '14px',
        fontWeight: 600,
        color: '#172b4d'
      }}>{column.title}</h3>
      <div 
        className="task-list"
        style={{
          position: 'relative',
          padding: '8px',
          flexGrow: 1,
          minHeight: '100px',
          borderRadius: '8px',
          backgroundColor: isDraggingOver ? 'rgba(9, 30, 66, 0.04)' : '#ebecf0',
          transition: 'background-color 0.2s ease',
          border: isDraggingOver ? '2px dashed #4c9aff' : '2px dashed transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)'
        }}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="list"
        aria-label={`${column.title} tasks`}
      >
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            columnId={column.id}
          />
        ))}
        <div 
          style={{
            marginTop: '8px',
            padding: '8px',
            borderRadius: '4px',
            backgroundColor: 'white',
            boxShadow: '0 1px 0 rgba(9, 30, 66, 0.1)',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#5e6c84',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(9, 30, 66, 0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
          onClick={() => {
            const content = prompt('Enter task content:');
            if (content) {
              const newTaskId = `task-${Date.now()}`;
              const newTask: Task = {
                id: newTaskId,
                content,
              };
              dispatch(addTask({ columnId: column.id, task: newTask }));
            }
          }}
        >
          + Add a card
        </div>
      </div>
    </div>
  );
}, (prevProps: ColumnProps, nextProps: ColumnProps) => {
  return (
    prevProps.column.id === nextProps.column.id &&
    prevProps.column.title === nextProps.column.title &&
    JSON.stringify(prevProps.tasks) === JSON.stringify(nextProps.tasks)
  );
});

export default Column;