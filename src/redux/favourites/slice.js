import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favouritedIds: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.favouritedIds.push(action.payload);
    },
  },
});

export const { addFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;