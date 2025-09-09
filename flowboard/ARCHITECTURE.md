# Application Architecture

This document outlines the architectural decisions, component hierarchy, and state management approach used in the FlowBoard application.

## Architectural Pattern

FlowBoard follows a **Feature-Based Architecture** with **Unidirectional Data Flow**, implemented using:

- **React 18+** for the view layer
- **Redux Toolkit** for state management
- **TypeScript** for type safety
- **Styled Components** for styling
- **React DnD** for drag and drop functionality

## Component Hierarchy

```
App
├── Board
│   ├── FilterBar
│   ├── Column (multiple)
│   │   └── TaskCard (multiple)
│   └── AddColumn
└── Modal (when active)
```

### Key Components

1. **App**
   - Root component
   - Handles global state and routing
   - Renders the main layout

2. **Board**
   - Main container for the kanban board
   - Manages column layout
   - Handles drag and drop context

3. **Column**
   - Represents a single board column
   - Manages tasks within the column
   - Handles column-specific actions

4. **TaskCard**
   - Displays task information
   - Handles task editing and deletion
   - Implements drag and drop functionality

5. **FilterBar**
   - Provides filtering and sorting controls
   - Updates filter state in Redux

## State Management

### Redux Store Structure

```typescript
{
  board: {
    tasks: Record<TaskId, Task>,
    columns: Record<ColumnId, Column>,
    columnOrder: ColumnId[],
  },
  filters: {
    searchTerm: string,
    status: 'all' | 'active' | 'completed',
    sortBy: 'dueDate' | 'priority' | 'title',
    sortOrder: 'asc' | 'desc'
  }
}
```

### Key Redux Slices

1. **boardSlice**
   - Manages tasks and columns
   - Handles CRUD operations for tasks and columns
   - Manages task movement between columns

2. **filterSlice**
   - Manages filter and sort state
   - Handles search, filtering, and sorting logic

## Drag and Drop Implementation

### Why React DnD?

React DnD was chosen for drag and drop functionality because:
1. **Flexibility**: Works well with React's component model
2. **Performance**: Optimized for smooth drag operations
3. **Accessibility**: Built-in support for keyboard and screen readers
4. **Maintainability**: Clear separation of concerns with drag sources and drop targets

### Implementation Details

1. **DragContext**
   - Manages drag state
   - Provides drag and drop methods to components
   - Handles drag previews

2. **Drag Types**
   - `TASK`: For dragging tasks between columns
   - `COLUMN`: For reordering columns (if implemented)

3. **Drop Zones**
   - Columns are drop targets for tasks
   - The board is a drop target for columns

## Performance Considerations

1. **Memoization**
   - React.memo for preventing unnecessary re-renders
   - useCallback for event handlers
   - useMemo for expensive calculations

2. **Virtualization**
   - Considered for large lists of tasks
   - Not currently implemented as the number of tasks is manageable

3. **Code Splitting**
   - Components are code-split using React.lazy
   - Redux state is normalized for efficient updates

## Future Improvements

1. **Real-time Collaboration**
   - Add WebSocket support for real-time updates
   - Implement presence indicators

2. **Offline Support**
   - Add service worker for offline functionality
   - Implement optimistic updates

3. **Enhanced Accessibility**
   - Improve keyboard navigation
   - Add ARIA labels and roles
