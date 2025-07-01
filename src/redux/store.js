import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./trucks/slice.js";
import favouritesReducer from "./favourites/slice.js";

const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    favourites: favouritesReducer,
  },
});

export default store;