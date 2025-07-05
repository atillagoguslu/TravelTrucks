import { useDispatch, useSelector } from "react-redux";
import style from "./CatalogFilters.module.css"

// Actions
import {
  setLocation,
  addEquipmentFilter,
  removeEquipmentFilter,
  setVehicleType,
  resetPagination,
  markFiltersApplied,
  setPaginationData,
} from "../../redux/filters/slice.js";

// Selectors
import {
  selectActiveFilters,
  selectLocation,
  selectEquipmentFilters,
  selectVehicleType,
  selectIsFiltersChanged,
  selectHasActiveFilters,
} from "../../redux/filters/selectors.js";

// Operations
import { searchTrucksWithFilters } from "../../redux/filters/operations.js";
import { clearFilteredTrucks } from "../../redux/trucks/slice.js";

const CatalogFilters = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const activeFilters = useSelector(selectActiveFilters);
  const location = useSelector(selectLocation);
  const equipmentFilters = useSelector(selectEquipmentFilters);
  const vehicleType = useSelector(selectVehicleType);
  const isFiltersChanged = useSelector(selectIsFiltersChanged);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  

  
  // Vehicle type options with icons
  const vehicleTypeOptions = [
    { id: "panelTruck", label: "Van", icon: "/src/assets/icons/type/van.svg" },
    { id: "fullyIntegrated", label: "Fully Integrated", icon: "/src/assets/icons/type/fully_integrated.svg" },
    { id: "alcove", label: "Alcove", icon: "/src/assets/icons/type/alcove.svg" },
  ];
  
  // Handler functions
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
  
  const handleVehicleTypeChange = (type) => {
    // If same type is selected, deselect it
    if (vehicleType === type) {
      dispatch(setVehicleType(""));
    } else {
      dispatch(setVehicleType(type));
    }
  };
  
  const handleSearch = async () => {
    if (!isFiltersChanged && !hasActiveFilters) {
      return; // No changes to search
    }
    
    // Reset pagination and clear previous results
    dispatch(resetPagination());
    dispatch(clearFilteredTrucks());
    
    // Perform search
    try {
      const result = await dispatch(searchTrucksWithFilters(activeFilters));
      
      if (result.payload) {
        // Update pagination data
        dispatch(setPaginationData({
          totalPages: result.payload.totalPages,
          totalItems: result.payload.totalItems,
          currentPage: result.payload.currentPage,
        }));
      }
      
      // Mark filters as applied
      dispatch(markFiltersApplied());
    } catch (error) {
      console.error("Search failed:", error);
    }
  };
  
  return (
    <div className={style.container}>
      {/* Location Filter */}
      <div className={style.locationSection}>
        <label className={style.locationLabel}>Location</label>
        <div className={style.locationInput}>
          <img src="/src/assets/icons/map.svg" alt="Location" className={style.locationIcon} />
          <input
            type="text"
            placeholder="Kiev, Ukraine"
            value={location}
            onChange={handleLocationChange}
            className={style.input}
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className={style.filtersSection}>
        <h3 className={style.sectionTitle}>Filters</h3>
        
        {/* Vehicle Equipment */}
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

        {/* Vehicle Type */}
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Vehicle type</h4>
          <img src="/src/assets/icons/divider.svg" alt="Divider" className={style.groupMiddleLine} />
          <div className={style.optionsGrid}>
            {vehicleTypeOptions.map((type) => (
              <button
                key={type.id}
                className={`${style.filterOption} ${
                  vehicleType === type.id ? style.selected : ""
                }`}
                onClick={() => handleVehicleTypeChange(type.id)}
              >
                <img src={type.icon} alt={type.label} className={style.icon} />
                <span className={style.label}>{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
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