import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import trucksReducer from "./trucks/slice.js";
import favouritesReducer from "./favourites/slice.js";
import filtersReducer from "./filters/slice.js";


const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["activeFilters", "pagination"],
};

const favouritesPersistConfig = {
  key: "favourites",
  storage,
};

const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);
const persistedFavouritesReducer = persistReducer(
  favouritesPersistConfig,
  favouritesReducer
);

const store = configureStore({
  reducer: {
    trucks: trucksReducer,
    favourites: persistedFavouritesReducer,
    filters: persistedFiltersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
