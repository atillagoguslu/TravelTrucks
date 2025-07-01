const selectTrucks = (state) => state.trucks.allTrucks;
const selectTrucksLoadingStates = (state) => state.trucks.loadingStates;
const selectTrucksErrors = (state) => state.trucks.error;

export { selectTrucks, selectTrucksErrors, selectTrucksLoadingStates };
