import style from './Features.module.css';
import line from '../../assets/icons/divider.svg';
import { useOutletContext } from 'react-router';

// Icons -------------------------------------------------------
import acIcon from '../../assets/icons/features/ac.svg';
import bathroomIcon from '../../assets/icons/features/bathroom.svg';
import kitchenIcon from '../../assets/icons/features/kitchen.svg';
import radioIcon from '../../assets/icons/features/radio.svg';
import refrigeratorIcon from '../../assets/icons/features/refrigerator.svg';
import microwaveIcon from '../../assets/icons/features/microwave.svg';
import gasIcon from '../../assets/icons/features/gas.svg';
import waterIcon from '../../assets/icons/features/water.svg';
import tvIcon from '../../assets/icons/features/tv.svg';
// ------------------------------------------------------------

const Features = ({ truck: propTruck }) => {
  const { truck: contextTruck } = useOutletContext() || {};
  const truck = propTruck || contextTruck;

  if (!truck) return null;

  const featuresData = [
    { key: 'AC', label: 'Air Conditioning', icon: acIcon },
    { key: 'bathroom', label: 'Bathroom', icon: bathroomIcon },
    { key: 'kitchen', label: 'Kitchen', icon: kitchenIcon },
    { key: 'TV', label: 'TV', icon: tvIcon },
    { key: 'radio', label: 'Radio', icon: radioIcon },
    { key: 'refrigerator', label: 'Refrigerator', icon: refrigeratorIcon },
    { key: 'microwave', label: 'Microwave', icon: microwaveIcon },
    { key: 'gas', label: 'Gas', icon: gasIcon },
    { key: 'water', label: 'Water', icon: waterIcon },
  ];

  const featuresList = featuresData.filter(({ key }) => Boolean(truck[key]));

  return (
    <div className={style.containerFeatures}>
      <div className={style.categories}>
        {featuresList.map(({ key, icon, label }) => (
          <div key={key} className={style.category}>
            <img src={icon} alt={label} />
            <h3>{label}</h3>
          </div>
        ))}
      </div>
      <div className={style.VehicleDetailsContainer}>
        <div className={style.VehicleDetailsTitle}>
          <h2>Vehicle details</h2>
        </div>
        <div className={style.VehicleDetailsLine}>
          <img src={line} alt="line" />
        </div>
        <div className={style.VehicleDetailsList}>
          <ul>
            <li className={style.VehicleDetailsListItem}>
              <h3>Form</h3>
              <p>{truck.form}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Length</h3>
              <p>{truck.length}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Width</h3>
              <p>{truck.width}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Height</h3>
              <p>{truck.height}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Tank</h3>
              <p>{truck.tank}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Consumption</h3>
              <p>{truck.consumption}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Transmission</h3>
              <p>{truck.transmission}</p>
            </li>
            <li className={style.VehicleDetailsListItem}>
              <h3>Engine</h3>
              <p>{truck.engine}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
