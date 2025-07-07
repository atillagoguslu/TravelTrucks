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
    removeFavourite: (state, action) => {
      state.favouritedIds = state.favouritedIds.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;