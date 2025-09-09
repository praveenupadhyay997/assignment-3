import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchTerm: string;
}

const initialState: FilterState = {
  searchTerm: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

export const { setSearchTerm } = filterSlice.actions;

export default filterSlice.reducer;
