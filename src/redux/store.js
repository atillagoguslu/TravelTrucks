import { configureStore } from "@reduxjs/toolkit";
import trucksReducer from "./trucks/slice.js";

const store = configureStore({
  reducer: {
    trucks: trucksReducer,
  }
})

export default store;