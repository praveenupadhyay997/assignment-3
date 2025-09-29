import React from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../store/store';
import Column from '../Column/Column';

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacings.lg};
  overflow-x: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Board: React.FC = () => {
  const board = useAppSelector(state => state.board);
  const searchTerm = useAppSelector(state => state.filters.searchTerm);

  return (
    <BoardContainer>
      {board.columnOrder.map(columnId => {
        const column = board.columns[columnId];
        const tasks = column.taskIds
          .map(taskId => board.tasks[taskId])
          .filter(task => task && task.content) // Check if task exists and has content
          .filter(task =>
            task.content.toLowerCase().includes(searchTerm.toLowerCase())
          );

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </BoardContainer>
  );
};

export default Board;
