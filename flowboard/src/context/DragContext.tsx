import * as React from 'react';

export interface DragItem {
  taskId: string;
  sourceColumnId: string;
  sourceIndex: number;
  task?: any; // Add task field for backward compatibility
}

export interface DragContextType {
  draggedItem: DragItem | null;
  setDraggedItem: (item: DragItem | null) => void;
  isDraggingOver: boolean;
  setIsDraggingOver: (isDragging: boolean) => void;
  handleDragStart: (e: React.DragEvent, item: DragItem) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
}

export const DragContext = React.createContext<DragContextType | undefined>(undefined);

export const DragProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draggedItem, setDraggedItem] = React.useState<DragItem | null>(null);
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  const setDraggedItemWithLog = React.useCallback((item: DragItem | null) => {
    console.log('Setting dragged item:', item);
    setDraggedItem(item);
  }, []);

  const handleDragStart = React.useCallback((e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    setDraggedItem(item);
  }, []);

  const handleDragEnd = React.useCallback(() => {
    setDraggedItem(null);
    setIsDraggingOver(false);
  }, []);

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDraggingOver) {
      setIsDraggingOver(true);
    }
  }, [isDraggingOver]);

  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  }, []);

  const value = React.useMemo(() => ({
    draggedItem,
    setDraggedItem: setDraggedItemWithLog,
    isDraggingOver,
    setIsDraggingOver,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  }), [
    draggedItem, 
    setDraggedItemWithLog, 
    isDraggingOver, 
    handleDragStart, 
    handleDragEnd, 
    handleDragOver, 
    handleDrop
  ]);

  return (
    <DragContext.Provider value={value}>
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = (): DragContextType => {
  const context = React.useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};