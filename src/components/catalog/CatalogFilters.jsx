import { useDispatch, useSelector } from "react-redux";
import style from "./CatalogFilters.module.css"
import {
  setLocation,
  addEquipmentFilter,
  removeEquipmentFilter,
  addVehicleTypeFilter,
  removeVehicleTypeFilter,
  resetPagination,
  markFiltersApplied,
  setPaginationData,
} from "../../redux/filters/slice.js";
import {
  selectActiveFilters,
  selectLocation,
  selectEquipmentFilters,
  selectVehicleTypeFilters,
  selectIsFiltersChanged,
  selectHasActiveFilters,
} from "../../redux/filters/selectors.js";
import { searchTrucksWithFilters } from "../../redux/filters/operations.js";
import { clearFilteredTrucks } from "../../redux/trucks/slice.js";

const CatalogFilters = () => {
  const dispatch = useDispatch();
  const activeFilters = useSelector(selectActiveFilters);
  const location = useSelector(selectLocation);
  const equipmentFilters = useSelector(selectEquipmentFilters);
  const vehicleTypeFilters = useSelector(selectVehicleTypeFilters);
  const isFiltersChanged = useSelector(selectIsFiltersChanged);
  const hasActiveFilters = useSelector(selectHasActiveFilters);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    dispatch(setLocation(value));
  };

  const handleEquipmentToggle = (equipment) => {
    const isSelected = equipmentFilters.includes(equipment);
    if (isSelected) {
      dispatch(removeEquipmentFilter(equipment));
    } else {
      dispatch(addEquipmentFilter(equipment));
    }
  };

  const handleVehicleTypeToggle = (type) => {
    const isSelected = vehicleTypeFilters.includes(type);
    if (isSelected) {
      dispatch(removeVehicleTypeFilter(type));
    } else {
      dispatch(addVehicleTypeFilter(type));
    }
  };

  const handleSearch = async () => {
    if (!isFiltersChanged && !hasActiveFilters) {
      return;
    }
    dispatch(resetPagination());
    dispatch(clearFilteredTrucks());
    try {
      const result = await dispatch(searchTrucksWithFilters(activeFilters));
      if (result.payload) {
        dispatch(setPaginationData({
          totalPages: result.payload.totalPages,
          totalItems: result.payload.totalItems,
          currentPage: result.payload.currentPage,
        }));
      }
      dispatch(markFiltersApplied());
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.locationSection}>
        <label className={style.locationLabel}>Location</label>
        <div className={style.locationInput}>
          <input
            type="text"
            placeholder="Kiev, Ukraine"
            value={location}
            onChange={handleLocationChange}
            className={style.input}
          />
        </div>
      </div>
      <div className={style.filtersSection}>
        <h3 className={style.sectionTitle}>Filters</h3>
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Vehicle equipment</h4>
          <img src="/src/assets/icons/divider.svg" alt="Divider" className={style.groupMiddleLine} />
          <div className={style.optionsGrid}>
            <button
              className={`${style.filterOption} ${
                equipmentFilters.includes("AC") ? style.selected : ""
              }`}
              onClick={() => handleEquipmentToggle("AC")}
            >
              <img src="/src/assets/icons/equipment/ac.svg" alt="AC" className={style.icon} />
              <span className={style.label}>AC</span>
            </button>
            <button
              className={`${style.filterOption} ${
                equipmentFilters.includes("automatic") ? style.selected : ""
              }`}
              onClick={() => handleEquipmentToggle("automatic")}
            >
              <img src="/src/assets/icons/equipment/automatic.svg" alt="Automatic" className={style.icon} />
              <span className={style.label}>Automatic</span>
            </button>
            <button
              className={`${style.filterOption} ${
                equipmentFilters.includes("kitchen") ? style.selected : ""
              }`}
              onClick={() => handleEquipmentToggle("kitchen")}
            >
              <img src="/src/assets/icons/equipment/kitchen.svg" alt="Kitchen" className={style.icon} />
              <span className={style.label}>Kitchen</span>
            </button>
            <button
              className={`${style.filterOption} ${
                equipmentFilters.includes("TV") ? style.selected : ""
              }`}
              onClick={() => handleEquipmentToggle("TV")}
            >
              <img src="/src/assets/icons/equipment/tv.svg" alt="TV" className={style.icon} />
              <span className={style.label}>TV</span>
            </button>
            <button
              className={`${style.filterOption} ${
                equipmentFilters.includes("bathroom") ? style.selected : ""
              }`}
              onClick={() => handleEquipmentToggle("bathroom")}
            >
              <img src="/src/assets/icons/equipment/bathroom.svg" alt="Bathroom" className={style.icon} />
              <span className={style.label}>Bathroom</span>
            </button>
          </div>
        </div>
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Vehicle type</h4>
          <img src="/src/assets/icons/divider.svg" alt="Divider" className={style.groupMiddleLine} />
          <div className={style.optionsGrid}>
            <button
              className={`${style.filterOption} ${
                vehicleTypeFilters.includes("panelTruck") ? style.selected : ""
              }`}
              onClick={() => handleVehicleTypeToggle("panelTruck")}
            >
              <img src="/src/assets/icons/type/van.svg" alt="Van" className={style.icon} />
              <span className={style.label}>Van</span>
            </button>
            <button
              className={`${style.filterOption} ${
                vehicleTypeFilters.includes("fullyIntegrated") ? style.selected : ""
              }`}
              onClick={() => handleVehicleTypeToggle("fullyIntegrated")}
            >
              <img src="/src/assets/icons/type/fully_integrated.svg" alt="Fully Integrated" className={style.icon} />
              <span className={style.label}>Fully Integrated</span>
            </button>
            <button
              className={`${style.filterOption} ${
                vehicleTypeFilters.includes("alcove") ? style.selected : ""
              }`}
              onClick={() => handleVehicleTypeToggle("alcove")}
            >
              <img src="/src/assets/icons/type/alcove.svg" alt="Alcove" className={style.icon} />
              <span className={style.label}>Alcove</span>
            </button>
          </div>
        </div>
      </div>
      <button 
        className={style.searchButton}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}

export default CatalogFilters;