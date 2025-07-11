import style from './TrucksList.module.css';
import Truck from './Truck';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectDisplayedTrucks,
  selectHasMorePages,
  selectIsLoadingMore,
  selectIsLoadingTrucks,
} from '../../redux/trucks/selectors';
import { loadMoreTrucks } from '../../redux/trucks/operations';
import Loader from '../Loader';

const TrucksList = () => {
  const dispatch = useDispatch();
  const trucks = useSelector(selectDisplayedTrucks);
  const hasMorePages = useSelector(selectHasMorePages);
  const isLoadingMore = useSelector(selectIsLoadingMore);
  const isLoadingTrucks = useSelector(selectIsLoadingTrucks);

  const handleLoadMore = () => {
    if (hasMorePages && !isLoadingMore) {
      dispatch(loadMoreTrucks());
    }
  };

  return (
    <div className={style.containerTrucksList}>
      {isLoadingTrucks && <Loader />}
      <div className={style.trucksList}>
        {trucks.map((truck) => (
          <Truck key={truck.id} truck={truck} />
        ))}
      </div>
      {hasMorePages && (
        <div className={style.trucksListPagination}>
          <button onClick={handleLoadMore} disabled={isLoadingMore}>
            <span>{isLoadingMore ? 'Loading...' : 'Load more'}</span>
          </button>
        </div>
      )}
      {!hasMorePages && trucks.length > 0 && (
        <div className={style.trucksListPagination}>
          <p>No more trucks to load</p>
        </div>
      )}
      {trucks.length === 0 && (
        <div className={style.trucksListPagination}>
          <p>No trucks found</p>
        </div>
      )}
    </div>
  );
};

export default TrucksList;
