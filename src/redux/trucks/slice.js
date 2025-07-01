import { createSlice } from "@reduxjs/toolkit";
import { getTrucks } from "./operations.js";

const initialState = {
  trucks: [],
  loadingStates: {
    get: false,
  },
  error: null,
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTrucks.fulfilled, (state, action) => {
        state.trucks = action.payload;
        state.loadingStates.get = false;
        state.error = null;
      })
      .addCase(getTrucks.pending, (state) => {
        state.loadingStates.get = true;
        state.error = null;
      })
      .addCase(getTrucks.rejected, (state, action) => {
        state.loadingStates.get = false;
        state.error = action.error.message;
      });
  },
});

const trucksReducer = trucksSlice.reducer;

export default trucksReducer;
