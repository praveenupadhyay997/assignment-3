import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setSearchTerm } from '../../features/filters/filterSlice';

const FilterContainer = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacings.lg}`};
  margin-bottom: ${({ theme }) => theme.spacings.md};
  display: flex;
  justify-content: flex-end;
`;

const SearchInput = styled.input`
  padding: ${({ theme }) => theme.spacings.sm};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.background.paper};
  color: ${({ theme }) => theme.colors.text.primary};
  width: 250px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.filters.searchTerm);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <FilterContainer>
      <SearchInput
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </FilterContainer>
  );
};

export default FilterBar;
