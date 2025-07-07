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
  selectActiveFilters,
  selectPagination,
} from "../redux/filters/selectors.js";
import { fetchTrucksWithFilters } from "../redux/trucks/operations.js";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const isLoadingFilters = useSelector(selectIsLoadingFilters);
  const error = useSelector(selectTrucksErrors);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const activeFilters = useSelector(selectActiveFilters);
  const pagination = useSelector(selectPagination);

  useEffect(() => {
    // Load first 4 trucks with current filters (empty filters = all trucks)
    dispatch(
      fetchTrucksWithFilters({
        filters: activeFilters,
        pagination: { currentPage: 1, limit: 4 },
      })
    );
  }, [dispatch]);

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

  if (error) {
    return (
      <div className={style.container}>
        <CatalogFilters />
        <div className={style.error}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
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
