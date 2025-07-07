import { createSlice } from "@reduxjs/toolkit";
import { getTrucks } from "./operations.js";
import {
  fetchTrucksWithFilters,
  searchTrucksWithFilters,
  loadMoreTrucks,
} from "./operations.js";

const initialState = {
  allTrucks: [], // All trucks (unfiltered)
  filteredTrucks: [], // Filtered trucks for display
  allFilteredTrucks: [], // All filtered trucks (for load more)
  loadingStates: {
    get: false,
    filter: false,
    loadMore: false,
  },
  error: null,
  // Pagination info
  hasMorePages: false,
  isAppending: false, // For "Load More" functionality
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
      // Original getTrucks (get all trucks)
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

      // Fetch trucks with filters (handles both search and pagination)
      .addCase(fetchTrucksWithFilters.pending, (state, action) => {
        const { pagination } = action.meta.arg;

        if (pagination.currentPage === 1) {
          // New search - show main loading
          state.loadingStates.filter = true;
          state.isAppending = false;
        } else {
          // Load more - show load more loading
          state.loadingStates.loadMore = true;
          state.isAppending = true;
        }
        state.error = null;
      })
      .addCase(fetchTrucksWithFilters.fulfilled, (state, action) => {
        const { trucks, totalPages, currentPage, allFilteredTrucks } =
          action.payload;

        // Store all filtered trucks for future load more operations
        state.allFilteredTrucks = allFilteredTrucks;

        if (currentPage === 1) {
          // New search - replace trucks
          state.filteredTrucks = trucks;
        } else {
          // Load more - append trucks
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

      // Search trucks with filters (reset pagination)
      .addCase(searchTrucksWithFilters.pending, (state) => {
        state.loadingStates.filter = true;
        state.isAppending = false;
        state.error = null;
      })
      .addCase(searchTrucksWithFilters.fulfilled, (state) => {
        // This will be handled by fetchTrucksWithFilters.fulfilled
        state.loadingStates.filter = false;
      })
      .addCase(searchTrucksWithFilters.rejected, (state, action) => {
        state.loadingStates.filter = false;
        state.error = action.payload || action.error.message;
      })

      // Load more trucks (next page)
      .addCase(loadMoreTrucks.pending, (state) => {
        state.loadingStates.loadMore = true;
        state.isAppending = true;
      })
      .addCase(loadMoreTrucks.fulfilled, (state) => {
        // This will be handled by fetchTrucksWithFilters.fulfilled
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
