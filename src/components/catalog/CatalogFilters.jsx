import { useDispatch, useSelector } from 'react-redux';
import style from './CatalogFilters.module.css';
import {
  setLocation,
  addEquipmentFilter,
  removeEquipmentFilter,
  addVehicleTypeFilter,
  removeVehicleTypeFilter,
  resetPagination,
} from '../../redux/filters/slice.js';
import {
  selectActiveFilters,
  selectLocation,
  selectEquipmentFilters,
  selectVehicleTypeFilters,
  selectIsFiltersChanged,
  selectHasActiveFilters,
} from '../../redux/filters/selectors.js';
import { searchTrucksWithFilters } from '../../redux/trucks/operations.js';
import { clearFilteredTrucks } from '../../redux/trucks/slice.js';

import mapIcon from '../../assets/icons/map.svg';
import dividerIcon from '../../assets/icons/divider.svg';

import acIcon from '../../assets/icons/equipment/ac.svg';
import automaticIcon from '../../assets/icons/equipment/automatic.svg';
import kitchenIcon from '../../assets/icons/equipment/kitchen.svg';
import tvIcon from '../../assets/icons/equipment/tv.svg';
import bathroomIcon from '../../assets/icons/equipment/bathroom.svg';
import vanIcon from '../../assets/icons/type/van.svg';
import fullyIntegratedIcon from '../../assets/icons/type/fully_integrated.svg';
import alcoveIcon from '../../assets/icons/type/alcove.svg';

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

  const handleVehicleTypeSet = (type) => {
    if (vehicleTypeFilters[0] === type) {
      dispatch(removeVehicleTypeFilter(type));
    } else {
      dispatch(removeVehicleTypeFilter(vehicleTypeFilters[0]));
      dispatch(addVehicleTypeFilter(type));
    }
  };

  const handleSearch = () => {
    if (!isFiltersChanged && !hasActiveFilters) {
      return;
    }
    dispatch(clearFilteredTrucks());
    dispatch(resetPagination());
    dispatch(searchTrucksWithFilters(activeFilters));
  };

  return (
    <div className={style.container}>
      <div className={style.locationSection}>
        <label className={style.locationLabel}>Location</label>
        <div className={style.locationInput}>
          <img src={mapIcon} alt="Map" className={style.locationIcon} />
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
          <img src={dividerIcon} alt="Divider" className={style.groupMiddleLine} />
          <div className={style.optionsGrid}>
            <button
              className={`${style.filterOption} ${equipmentFilters.includes('AC') ? style.selected : ''}`}
              onClick={() => handleEquipmentToggle('AC')}
            >
              <img src={acIcon} alt="AC" className={style.icon} />
              <span className={style.label}>AC</span>
            </button>
            <button
              className={`${style.filterOption} ${equipmentFilters.includes('automatic') ? style.selected : ''}`}
              onClick={() => handleEquipmentToggle('automatic')}
            >
              <img src={automaticIcon} alt="Automatic" className={style.icon} />
              <span className={style.label}>Automatic</span>
            </button>
            <button
              className={`${style.filterOption} ${equipmentFilters.includes('kitchen') ? style.selected : ''}`}
              onClick={() => handleEquipmentToggle('kitchen')}
            >
              <img src={kitchenIcon} alt="Kitchen" className={style.icon} />
              <span className={style.label}>Kitchen</span>
            </button>
            <button
              className={`${style.filterOption} ${equipmentFilters.includes('TV') ? style.selected : ''}`}
              onClick={() => handleEquipmentToggle('TV')}
            >
              <img src={tvIcon} alt="TV" className={style.icon} />
              <span className={style.label}>TV</span>
            </button>
            <button
              className={`${style.filterOption} ${equipmentFilters.includes('bathroom') ? style.selected : ''}`}
              onClick={() => handleEquipmentToggle('bathroom')}
            >
              <img src={bathroomIcon} alt="Bathroom" className={style.icon} />
              <span className={style.label}>Bathroom</span>
            </button>
          </div>
        </div>
        <div className={style.filterGroup}>
          <h4 className={style.groupTitle}>Vehicle type</h4>
          <img src={dividerIcon} alt="Divider" className={style.groupMiddleLine} />
          <div className={style.optionsGrid}>
            <button
              className={`${style.filterOption} ${vehicleTypeFilters.includes('panelTruck') ? style.selected : ''}`}
              onClick={() => handleVehicleTypeSet('panelTruck')}
            >
              <img src={vanIcon} alt="Van" className={style.icon} />
              <span className={style.label}>Van</span>
            </button>
            <button
              className={`${style.filterOption} ${
                vehicleTypeFilters.includes('fullyIntegrated') ? style.selected : ''
              }`}
              onClick={() => handleVehicleTypeSet('fullyIntegrated')}
            >
              <img src={fullyIntegratedIcon} alt="Fully Integrated" className={style.icon} />
              <span className={style.label}>Fully Integrated</span>
            </button>
            <button
              className={`${style.filterOption} ${vehicleTypeFilters.includes('alcove') ? style.selected : ''}`}
              onClick={() => handleVehicleTypeSet('alcove')}
            >
              <img src={alcoveIcon} alt="Alcove" className={style.icon} />
              <span className={style.label}>Alcove</span>
            </button>
          </div>
        </div>
      </div>
      <button className={style.searchButton} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default CatalogFilters;
