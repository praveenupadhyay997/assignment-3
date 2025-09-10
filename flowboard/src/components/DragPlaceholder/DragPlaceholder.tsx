import React from 'react';
import styled from 'styled-components';

const PlaceholderContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  height: 50px; /* match TaskCard height as needed */
  margin-bottom: ${({ theme }) => theme.spacings.sm};
`;

const DragPlaceholder: React.FC = () => {
  return <PlaceholderContainer />;
};

export default DragPlaceholder;