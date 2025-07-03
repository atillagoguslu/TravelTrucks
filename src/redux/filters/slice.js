import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allFilters: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    addFilters: (state, action) => {
      state.allFilters.push(action.payload);
    },
    removeFilters: (state, action) => {
      state.allFilters = state.allFilters.filter(
        (filter) => filter.id !== action.payload
      );
    },
  },
});

export const { addFilters, removeFilters } = filterSlice.actions;
export default filterSlice.reducer;