import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./CatalogPage.module.css";
import CatalogFilters from "../components/catalog/CatalogFilters.jsx";
import TrucksList from "../components/catalog/TrucksList.jsx";
import {
  selectIsLoadingFilters,
  selectTrucksErrors,
} from "../redux/trucks/selectors.js";
import {
  selectHasActiveFilters,
} from "../redux/filters/selectors.js";
import { getTrucks } from "../redux/trucks/operations.js";

const CatalogPage = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const isLoadingFilters = useSelector(selectIsLoadingFilters);
  const error = useSelector(selectTrucksErrors);
  
  // Filter info
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  
  // Load initial data
  useEffect(() => {
    if (!hasActiveFilters) {
      dispatch(getTrucks());
    }
  }, [dispatch, hasActiveFilters]);
  
  // Render loading state
  if (isLoadingFilters) {
    return (
      <div className={style.container}>
        <CatalogFilters />
        <div className={style.loading}>
          <p>Loading trucks...</p>
        </div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className={style.container}>
        <CatalogFilters />
        <div className={style.error}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <CatalogFilters />
      <TrucksList />
    </div>
  );
};

export default CatalogPage;