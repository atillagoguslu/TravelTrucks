import style from "./TrucksList.module.css";
import Truck from "./Truck";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDisplayedTrucks,
  selectHasMorePages,
  selectIsLoadingMore,
} from "../../redux/trucks/selectors";
import { loadMoreTrucks } from "../../redux/trucks/operations";

const TrucksList = () => {
  const dispatch = useDispatch();
  const trucks = useSelector(selectDisplayedTrucks);
  const hasMorePages = useSelector(selectHasMorePages);
  const isLoadingMore = useSelector(selectIsLoadingMore);

  const handleLoadMore = () => {
    if (hasMorePages && !isLoadingMore) {
      dispatch(loadMoreTrucks());
    }
  };

  return (
    <div className={style.container}>
      <div className={style.trucksList}>
        {trucks.map((truck) => (
          <Truck key={truck.id} truck={truck} />
        ))}
      </div>

      {/* Show Load More button only if there are more pages */}
      {hasMorePages && (
        <div className={style.trucksListPagination}>
          <button onClick={handleLoadMore} disabled={isLoadingMore}>
            <span>{isLoadingMore ? "Loading..." : "Load more"}</span>
          </button>
        </div>
      )}

      {/* Show message when no more trucks */}
      {!hasMorePages && trucks.length > 0 && (
        <div className={style.trucksListPagination}>
          <p>No more trucks to load</p>
        </div>
      )}

      {/* Show message when no trucks found */}
      {trucks.length === 0 && (
        <div className={style.trucksListPagination}>
          <p>No trucks found</p>
        </div>
      )}
    </div>
  );
};

export default TrucksList;
