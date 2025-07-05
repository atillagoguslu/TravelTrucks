import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Active filters that will be sent to API
  activeFilters: {
    location: "",
    equipment: [], // Array of equipment IDs/names
    vehicleTypes: [], // Array of vehicle types: "panelTruck", "fullyIntegrated", "alcove"
  },
  // Pagination state
  pagination: {
    currentPage: 1,
    limit: 4, // Items per page
    totalPages: 1,
    totalItems: 0,
  },
  // UI state
  isFiltersChanged: false, // Track if filters changed since last search
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Location filter
    setLocation: (state, action) => {
      state.activeFilters.location = action.payload;
      state.isFiltersChanged = true;
    },

    // Equipment filters (checkboxes)
    addEquipmentFilter: (state, action) => {
      const equipment = action.payload;
      if (!state.activeFilters.equipment.includes(equipment)) {
        state.activeFilters.equipment.push(equipment);
        state.isFiltersChanged = true;
      }
    },

    removeEquipmentFilter: (state, action) => {
      const equipment = action.payload;
      state.activeFilters.equipment = state.activeFilters.equipment.filter(
        (item) => item !== equipment
      );
      state.isFiltersChanged = true;
    },

    // Vehicle type filters (checkboxes)
    addVehicleTypeFilter: (state, action) => {
      const type = action.payload;
      if (!state.activeFilters.vehicleTypes.includes(type)) {
        state.activeFilters.vehicleTypes.push(type);
        state.isFiltersChanged = true;
      }
    },
    removeVehicleTypeFilter: (state, action) => {
      const type = action.payload;
      state.activeFilters.vehicleTypes =
        state.activeFilters.vehicleTypes.filter((item) => item !== type);
      state.isFiltersChanged = true;
    },

    // Clear all filters
    clearAllFilters: (state) => {
      state.activeFilters = {
        location: "",
        equipment: [],
        vehicleTypes: [],
      };
      state.pagination.currentPage = 1;
      state.isFiltersChanged = true;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    setPaginationData: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },

    // Reset pagination when filters change
    resetPagination: (state) => {
      state.pagination.currentPage = 1;
    },

    // Mark filters as applied (after successful API call)
    markFiltersApplied: (state) => {
      state.isFiltersChanged = false;
    },
  },
});

export const {
  setLocation,
  addEquipmentFilter,
  removeEquipmentFilter,
  addVehicleTypeFilter,
  removeVehicleTypeFilter,
  clearAllFilters,
  setCurrentPage,
  setPaginationData,
  resetPagination,
  markFiltersApplied,
} = filterSlice.actions;

export default filterSlice.reducer;
