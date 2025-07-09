import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilters: {
    location: "",
    equipment: [],
    vehicleTypes: [],
  },
  pagination: {
    currentPage: 1,
    limit: 4,
    totalPages: 1,
    totalItems: 0,
  },
  isFiltersChanged: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.activeFilters.location = action.payload;
      state.isFiltersChanged = true;
    },

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

    clearAllFilters: (state) => {
      state.activeFilters = {
        location: "",
        equipment: [],
        vehicleTypes: [],
      };
      state.pagination.currentPage = 1;
      state.isFiltersChanged = true;
    },

    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    setPaginationData: (state, action) => {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },

    resetPagination: (state) => {
      state.pagination.currentPage = 1;
    },

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
