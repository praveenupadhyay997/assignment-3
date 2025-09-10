import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BoardState, Task } from '../../types/board';

const initialState: BoardState = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Configure the project' },
    'task-2': { id: 'task-2', content: 'Design the UI' },
    'task-3': { id: 'task-3', content: 'Implement drag and drop' },
    'task-4': { id: 'task-4', content: 'Write unit tests' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ columnId: string; task: Task }>) => {
      const { columnId, task } = action.payload;
      state.tasks[task.id] = task;
      state.columns[columnId].taskIds.push(task.id);
    },
    moveTask: (state, action: PayloadAction<{ sourceColumnId: string; destColumnId: string; sourceIndex: number; destIndex: number; taskId: string }>) => {
      const { sourceColumnId, destColumnId, sourceIndex, destIndex, taskId } = action.payload;
      
      console.log('moveTask reducer called with:', { sourceColumnId, destColumnId, sourceIndex, destIndex, taskId });
      
      // Move within the same column
      if (sourceColumnId === destColumnId) {
        const column = state.columns[sourceColumnId];
        console.log('Moving within column. Before move:', { taskIds: [...column.taskIds] });
        
        const newTaskIds = Array.from(column.taskIds);
        // Remove from old position
        const [movedTask] = newTaskIds.splice(sourceIndex, 1);
        // Insert at new position
        newTaskIds.splice(destIndex, 0, movedTask);
        
        column.taskIds = newTaskIds;
        console.log('After move:', { taskIds: [...column.taskIds] });
      } else {
        // Move between columns
        const sourceColumn = state.columns[sourceColumnId];
        const destColumn = state.columns[destColumnId];
        
        // Remove from source column
        const newSourceTaskIds = Array.from(sourceColumn.taskIds);
        newSourceTaskIds.splice(sourceIndex, 1);
        
        // Add to destination column
        const newDestTaskIds = Array.from(destColumn.taskIds);
        newDestTaskIds.splice(destIndex, 0, taskId);
        
        // Update state
        sourceColumn.taskIds = newSourceTaskIds;
        destColumn.taskIds = newDestTaskIds;
      }
    },
    deleteTask: (state, action: PayloadAction<{ columnId: string; taskId: string }>) => {
      const { columnId, taskId } = action.payload;
      const column = state.columns[columnId];
      column.taskIds = column.taskIds.filter(id => id !== taskId);
      delete state.tasks[taskId];
    },
    updateTask: (state, action: PayloadAction<{ taskId: string; content: string }>) => {
      const { taskId, content } = action.payload;
      if (state.tasks[taskId]) {
        state.tasks[taskId].content = content;
      }
    },
  },
});

export const { addTask, moveTask, deleteTask, updateTask } = boardSlice.actions;

export default boardSlice.reducer;
