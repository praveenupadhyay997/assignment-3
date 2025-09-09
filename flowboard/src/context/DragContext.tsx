import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface DragItem {
  taskId: string;
  sourceColumnId: string;
  sourceIndex: number;
}

interface DragContextType {
  draggedItem: DragItem | null;
  setDraggedItem: (item: DragItem | null) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const DragProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  return (
    <DragContext.Provider value={{ draggedItem, setDraggedItem }}>
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};
