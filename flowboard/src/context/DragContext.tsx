import * as React from 'react';

interface DragItem {
  taskId: string;
  sourceColumnId: string;
  sourceIndex: number;
}

interface DragContextType {
  draggedItem: DragItem | null;
  setDraggedItem: (item: DragItem | null) => void;
}

const DragContext = React.createContext<DragContextType | undefined>(undefined);

export const DragProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draggedItem, setDraggedItem] = React.useState<DragItem | null>(null);

  const setDraggedItemWithLog = React.useCallback((item: DragItem | null) => {
    console.log('Setting dragged item:', item);
    setDraggedItem(item);
  }, []);

  const value = React.useMemo(() => ({
    draggedItem,
    setDraggedItem: setDraggedItemWithLog,
  }), [draggedItem, setDraggedItemWithLog]);

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