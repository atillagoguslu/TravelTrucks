// Trucks selectors
const selectTrucks = (state) => state.trucks.allTrucks;
const selectFilteredTrucks = (state) => state.trucks.filteredTrucks;
const selectTrucksLoadingStates = (state) => state.trucks.loadingStates;
const selectTrucksErrors = (state) => state.trucks.error;

// Loading state selectors
const selectIsLoadingTrucks = (state) => state.trucks.loadingStates.get;
const selectIsLoadingFilters = (state) => state.trucks.loadingStates.filter;
const selectIsLoadingMore = (state) => state.trucks.loadingStates.loadMore;

// Pagination selectors
const selectHasMorePages = (state) => state.trucks.hasMorePages;
const selectIsAppending = (state) => state.trucks.isAppending;

// Computed selectors
const selectDisplayedTrucks = (state) => {
  // Return filtered trucks if they exist, otherwise return all trucks
  return state.trucks.filteredTrucks.length > 0
    ? state.trucks.filteredTrucks
    : state.trucks.allTrucks;
};

const selectTrucksCount = (state) => {
  const displayedTrucks = selectDisplayedTrucks(state);
  return displayedTrucks.length;
};

export {
  selectTrucks,
  selectFilteredTrucks,
  selectTrucksErrors,
  selectTrucksLoadingStates,
  selectIsLoadingTrucks,
  selectIsLoadingFilters,
  selectIsLoadingMore,
  selectHasMorePages,
  selectIsAppending,
  selectDisplayedTrucks,
  selectTrucksCount,
};
