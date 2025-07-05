// Filter selectors
export const selectActiveFilters = (state) => state.filters.activeFilters;
export const selectLocation = (state) => state.filters.activeFilters.location;
export const selectEquipmentFilters = (state) =>
  state.filters.activeFilters.equipment;
export const selectVehicleType = (state) =>
  state.filters.activeFilters.vehicleType;
export const selectVehicleTypeFilters = (state) =>
  state.filters.activeFilters.vehicleTypes;

// Pagination selectors
export const selectPagination = (state) => state.filters.pagination;
export const selectCurrentPage = (state) =>
  state.filters.pagination.currentPage;
export const selectTotalPages = (state) => state.filters.pagination.totalPages;
export const selectTotalItems = (state) => state.filters.pagination.totalItems;
export const selectLimit = (state) => state.filters.pagination.limit;

// UI state selectors
export const selectIsFiltersChanged = (state) => state.filters.isFiltersChanged;

// Computed selectors
export const selectHasActiveFilters = (state) => {
  const filters = state.filters.activeFilters;
  return (
    filters.location.trim() !== "" ||
    filters.equipment.length > 0 ||
    filters.vehicleTypes.length > 0
  );
};

export const selectFilterCount = (state) => {
  const filters = state.filters.activeFilters;
  let count = 0;

  if (filters.location.trim() !== "") count++;
  if (filters.equipment.length > 0) count += filters.equipment.length;
  if (filters.vehicleTypes.length > 0) count += filters.vehicleTypes.length;

  return count;
};

// Check if specific equipment is selected
export const selectIsEquipmentSelected = (equipment) => (state) => {
  return state.filters.activeFilters.equipment.includes(equipment);
};
