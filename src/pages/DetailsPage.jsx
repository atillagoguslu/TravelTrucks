import style from './DetailsPage.module.css';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectTrucks, selectIsLoadingTrucks } from '../redux/trucks/selectors';
import ratingStar from '../assets/icons/rating/star_filled.svg';
import mapIcon from '../assets/icons/map.svg';
import { Outlet } from 'react-router';
import Features from '../components/details/Features';
import Book from '../components/details/Book';
import Reviews from '../components/details/Reviews';

const DetailsPage = () => {
  const { id } = useParams();
  const trucks = useSelector(selectTrucks);
  const isLoading = useSelector(selectIsLoadingTrucks);
  const truck = trucks.find((truck) => truck.id === id);

  if (isLoading) {
    return (
      <div className={style.detailsPageContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!truck) {
    return (
      <div className={style.detailsPageContainer}>
        <div>Truck not found</div>
      </div>
    );
  }

  const descriptionLimit = 320;
  let shortenDescription = null;
  if (truck) {
    shortenDescription = truck.description.slice(0, descriptionLimit) + '...';
  }

  return (
    <>
      <div className={style.detailsPageContainer}>
        <div className={style.detailsPageHeader}>
          <h1 className={style.detailsPageHeaderTitle}>{truck.name}</h1>
          <div className={style.detailsPageHeaderLower}>
            <div className={style.detailsPageHeaderLowerUp}>
              <div className={style.detailsPageHeaderLowerUpLeft}>
                <img src={ratingStar} alt="star" />
                <p>
                  {truck.rating} ({truck.reviews.length} reviews)
                </p>
              </div>
              <div className={style.detailsPageHeaderLowerUpRight}>
                <img src={mapIcon} alt="location" />
                <p>{truck.location}</p>
              </div>
            </div>
            <div className={style.detailsPageHeaderLowerDown}>
              <p>€{truck.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className={style.detailsPagePictures}>
          {truck.gallery.map((picture) => (
            <img
              key={picture.original}
              src={picture.original}
              alt={picture.thumb}
            />
          ))}
        </div>
        <div className={style.detailsPageDescription}>
          <p>{shortenDescription}</p>
        </div>
        <div className={style.detailsPageFeaturesAndReviewsHeader}>
          <h2>Features</h2>
          <h2>Reviews</h2>
        </div>
        <div className={style.detailsPageFeaturesAndReviews}>
          <Reviews truck={truck} />
          {/* <Features truck={truck} /> */}
          <Book />
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
