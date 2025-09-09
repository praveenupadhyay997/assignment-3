import { configureStore } from '@reduxjs/toolkit';
import boardReducer, { addTask, deleteTask, updateTask, moveTask } from '../../features/board/boardSlice';
import type { BoardState } from '../../types/board';
import type { EnhancedStore } from '@reduxjs/toolkit';

// Helper function to create a preloaded store for testing
const createTestStore = (preloadedState?: BoardState): EnhancedStore<{ board: BoardState }> => {
  return configureStore({
    reducer: {
      board: boardReducer,
    },
    preloadedState: preloadedState ? { board: preloadedState } : { board: {
      tasks: {},
      columns: {},
      columnOrder: [],
    }},
  });
};

describe('boardSlice', () => {
  let store: ReturnType<typeof createTestStore>;
  let initialState: BoardState;

  beforeEach(() => {
    initialState = {
      tasks: {
        'task-1': { id: 'task-1', content: 'Task 1' },
        'task-2': { id: 'task-2', content: 'Task 2' },
      },
      columns: {
        'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1', 'task-2'] },
        'column-2': { id: 'column-2', title: 'In Progress', taskIds: [] },
      },
      columnOrder: ['column-1', 'column-2'],
    };
    
    store = createTestStore(initialState);
  });

  it('should have initial state', () => {
    const state = store.getState().board;
    expect(state).toEqual(initialState);
  });

  it('should handle addTask', () => {
    const newTask = { id: 'task-3', content: 'Task 3' };
    store.dispatch(addTask({ columnId: 'column-1', task: newTask }));
    
    const state = store.getState().board;
    expect(state.tasks['task-3']).toEqual(newTask);
    expect(state.columns['column-1'].taskIds).toContain('task-3');
  });

  it('should handle deleteTask', () => {
    store.dispatch(deleteTask({ columnId: 'column-1', taskId: 'task-1' }));
    
    const state = store.getState().board;
    expect(state.tasks['task-1']).toBeUndefined();
    expect(state.columns['column-1'].taskIds).not.toContain('task-1');
  });

  it('should handle updateTask', () => {
    store.dispatch(updateTask({ taskId: 'task-1', content: 'Updated Task 1' }));
    
    const state = store.getState().board;
    expect(state.tasks['task-1'].content).toBe('Updated Task 1');
  });

  it('should handle moveTask within the same column', () => {
    store.dispatch(moveTask({ 
      taskId: 'task-1', 
      sourceColumnId: 'column-1', 
      sourceIndex: 0, 
      destColumnId: 'column-1', 
      destIndex: 1 
    }));
    
    const state = store.getState().board;
    expect(state.columns['column-1'].taskIds).toEqual(['task-2', 'task-1']);
  });

  it('should handle moveTask between different columns', () => {
    store.dispatch(moveTask({ 
      taskId: 'task-1', 
      sourceColumnId: 'column-1', 
      sourceIndex: 0, 
      destColumnId: 'column-2', 
      destIndex: 0 
    }));
    
    const state = store.getState().board;
    expect(state.columns['column-1'].taskIds).not.toContain('task-1');
    expect(state.columns['column-2'].taskIds).toContain('task-1');
  });
});
