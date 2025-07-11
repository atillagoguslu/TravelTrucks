import style from './Truck.module.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addFavourite, removeFavourite } from '../../redux/favourites/slice.js';
import { selectFavouritedIds } from '../../redux/favourites/selectors.js';
import { useSelector } from 'react-redux';

// Icons -------------------------------------------------------
import favBlackIcon from '../../assets/icons/fav/fav_black.svg';
import favOrangeIcon from '../../assets/icons/fav/fav_orange.svg';
import ratingStar from '../../assets/icons/rating/star_filled.svg';
import mapIcon from '../../assets/icons/map.svg';
import automaticIcon from '../../assets/icons/equipment/automatic.svg';
import acIcon from '../../assets/icons/features/ac.svg';
import petrolIcon from '../../assets/icons/features/petrol.svg';
import kitchenIcon from '../../assets/icons/features/kitchen.svg';
import radioIcon from '../../assets/icons/features/radio.svg';
import bathroomIcon from '../../assets/icons/features/bathroom.svg';
import refrigeratorIcon from '../../assets/icons/features/refrigerator.svg';
import microwaveIcon from '../../assets/icons/features/microwave.svg';
import gasIcon from '../../assets/icons/features/gas.svg';
import waterIcon from '../../assets/icons/features/water.svg';
import tvIcon from '../../assets/icons/features/tv.svg';
// ------------------------------------------------------------
const Truck = ({ truck }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavouritedIds);
  const isFavourite = (id) => favourites.includes(id);

  const descriptionLimit = 61; // Bu ayar yazıyı Inter tipinde güzel limitliyor.
  const shortDescription =
    truck.description.length > descriptionLimit
      ? truck.description.slice(0, descriptionLimit) + '...'
      : truck.description;

  const featuresList = [
    {
      name: 'Automatic',
      key: 'transmission',
      value: true,
      icon: automaticIcon,
    },
    { name: 'AC', key: 'AC', value: true, icon: acIcon },
    { name: 'Petrol', key: 'engine', value: true, icon: petrolIcon },
    { name: 'Kitchen', key: 'kitchen', value: true, icon: kitchenIcon },
    { name: 'Radio', key: 'radio', value: true, icon: radioIcon },
    { name: 'Bathroom', key: 'bathroom', value: true, icon: bathroomIcon },
    {
      name: 'Refrigerator',
      key: 'refrigerator',
      value: true,
      icon: refrigeratorIcon,
    },
    { name: 'Microwave', key: 'microwave', value: true, icon: microwaveIcon },
    { name: 'Gas', key: 'gas', value: true, icon: gasIcon },
    { name: 'Water', key: 'water', value: true, icon: waterIcon },
    { name: 'TV', key: 'TV', value: true, icon: tvIcon },
  ];

  const handleShowMore = () => {
    navigate(`/catalog/${truck.id}`);
  };

  const handleFavorite = (id) => {
    if (isFavourite(id)) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(addFavourite(id));
    }
  };

  return (
    <div className={style.containerTruck}>
      <div className={style.truckLayout}>
        <div className={style.truckImage}>
          <img src={truck.gallery[0].thumb} alt={truck.name} />
        </div>
        <div className={style.truckInfo}>
          <div className={style.truckInfoHeader}>
            <div className={style.truckInfoHeaderUpper}>
              <h2>{truck.name}</h2>
              <div className={style.truckInfoHeaderUpperRight}>
                <p>€{truck.price.toFixed(2)}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFavorite(truck.id);
                  }}
                >
                  {isFavourite(truck.id) ? (
                    <img src={favOrangeIcon} alt="Favorited" />
                  ) : (
                    <img src={favBlackIcon} alt="Not favorited" />
                  )}
                </button>
              </div>
            </div>
            <div className={style.truckInfoHeaderLower}>
              <img src={ratingStar} alt="star" />
              <p>
                {truck.rating} ({truck.reviews.length} reviews)
              </p>
              <div className={style.truckLocation}>
                <img src={mapIcon} alt="location" />
                <p>{truck.location}</p>
              </div>
            </div>
          </div>
          <div className={style.truckInfoDescription}>
            <p>{shortDescription}</p>
          </div>
          <div className={style.truckInfoFeatures}>
            {featuresList.map((feature) => {
              const truckValue = truck[feature.key];
              if (truckValue === feature.value) {
                return (
                  <div key={feature.name} className={style.featureItem}>
                    <img src={feature.icon} alt={feature.name} />
                    <span>{feature.name}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={style.truckShowMoreButton}>
            <a
              href={`/catalog/${truck.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleShowMore();
              }}
            >
              <span>Show more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Truck;
