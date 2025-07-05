import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./trucks/slice.js";
import favouritesReducer from "./favourites/slice.js";
import filtersReducer from "./filters/slice.js";

const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    favourites: favouritesReducer,
    filters: filtersReducer,
  },
});

export default store;
