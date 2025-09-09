export interface Task {
  id: string;
  content: string;
  // Additional task properties like description, priority, etc., can be added here.
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface BoardState {
  tasks: { [taskId: string]: Task };
  columns: { [columnId: string]: Column };
  columnOrder: string[];
}
