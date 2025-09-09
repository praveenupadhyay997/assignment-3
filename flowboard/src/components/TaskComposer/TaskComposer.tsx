import React, { useState } from 'react';
import styled from 'styled-components';

interface TaskComposerProps {
  onConfirm: (content: string) => void;
}

const ComposerContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.sm};
`;

const AddCardButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacings.sm};
  width: 100%;
  text-align: left;
  border-radius: ${({ theme }) => theme.borderRadius};
  &:hover {
    background-color: ${({ theme }) => theme.colors.divider};
  }
`;

const ComposerForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const ComposerTextarea = styled.textarea`
  width: 100%;
  min-height: 60px;
  padding: ${({ theme }) => theme.spacings.sm};
  margin-bottom: ${({ theme }) => theme.spacings.sm};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => `${theme.spacings.sm} ${theme.spacings.md}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacings.sm};
  font-size: 1.5rem;
  line-height: 1;
`;

const TaskComposer: React.FC<TaskComposerProps> = ({ onConfirm }) => {
  const [isComposing, setIsComposing] = useState(false);
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (content.trim()) {
      onConfirm(content.trim());
      setContent('');
      setIsComposing(false);
    }
  };

  if (!isComposing) {
    return (
      <ComposerContainer>
        <AddCardButton onClick={() => setIsComposing(true)}>+ Add a card</AddCardButton>
      </ComposerContainer>
    );
  }

  return (
    <ComposerContainer>
      <ComposerForm>
        <ComposerTextarea
          autoFocus
          placeholder="Enter a title for this card..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSave()}
        />
        <ControlsContainer>
          <SaveButton onClick={handleSave}>Add Card</SaveButton>
          <CancelButton onClick={() => setIsComposing(false)}>&times;</CancelButton>
        </ControlsContainer>
      </ComposerForm>
    </ComposerContainer>
  );
};

export default TaskComposer;
