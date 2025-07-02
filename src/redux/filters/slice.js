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
    
  },
});

export const { addFilters } = filterSlice.actions;
export default filterSlice.reducer;