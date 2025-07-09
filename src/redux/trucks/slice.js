import { createSlice } from "@reduxjs/toolkit";
import { getTrucks } from "./operations.js";
import {
  fetchTrucksWithFilters,
  searchTrucksWithFilters,
  loadMoreTrucks,
} from "./operations.js";

const initialState = {
  allTrucks: [],
  filteredTrucks: [],
  allFilteredTrucks: [],
  loadingStates: {
    get: false,
    filter: false,
    loadMore: false,
  },
  error: null,
  hasMorePages: false,
  isAppending: false,
};

const trucksSlice = createSlice({
  name: "trucks",
  initialState,
  reducers: {
    clearFilteredTrucks: (state) => {
      state.filteredTrucks = [];
      state.allFilteredTrucks = [];
      state.hasMorePages = false;
      state.isAppending = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrucks.fulfilled, (state, action) => {
        state.allTrucks = action.payload;
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
      })

      .addCase(fetchTrucksWithFilters.pending, (state, action) => {
        const { pagination } = action.meta.arg;

        if (pagination.currentPage === 1) {
          state.loadingStates.filter = true;
          state.isAppending = false;
        } else {
          state.loadingStates.loadMore = true;
          state.isAppending = true;
        }
        state.error = null;
      })
      .addCase(fetchTrucksWithFilters.fulfilled, (state, action) => {
        const { trucks, totalPages, currentPage, allFilteredTrucks } =
          action.payload;

        state.allFilteredTrucks = allFilteredTrucks;

        if (currentPage === 1) {
          state.filteredTrucks = trucks;
        } else {
          state.filteredTrucks = [...state.filteredTrucks, ...trucks];
        }

        state.hasMorePages = currentPage < totalPages;
        state.loadingStates.filter = false;
        state.loadingStates.loadMore = false;
        state.isAppending = false;
        state.error = null;
      })
      .addCase(fetchTrucksWithFilters.rejected, (state, action) => {
        state.loadingStates.filter = false;
        state.loadingStates.loadMore = false;
        state.isAppending = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(searchTrucksWithFilters.pending, (state) => {
        state.loadingStates.filter = true;
        state.isAppending = false;
        state.error = null;
      })
      .addCase(searchTrucksWithFilters.fulfilled, (state) => {
        state.loadingStates.filter = false;
      })
      .addCase(searchTrucksWithFilters.rejected, (state, action) => {
        state.loadingStates.filter = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(loadMoreTrucks.pending, (state) => {
        state.loadingStates.loadMore = true;
        state.isAppending = true;
      })
      .addCase(loadMoreTrucks.fulfilled, (state) => {
        state.loadingStates.loadMore = false;
      })
      .addCase(loadMoreTrucks.rejected, (state, action) => {
        state.loadingStates.loadMore = false;
        state.isAppending = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearFilteredTrucks } = trucksSlice.actions;
const trucksReducer = trucksSlice.reducer;

export default trucksReducer;
