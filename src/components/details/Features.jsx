import style from './Features.module.css';
import line from '../../assets/icons/divider.svg';

const Features = ({ truck }) => {
  const featuresList = [
    { name: 'AC', value: truck.AC, label: 'Air Conditioning' },
    { name: 'bathroom', value: truck.bathroom, label: 'Bathroom' },
    { name: 'kitchen', value: truck.kitchen, label: 'Kitchen' },
    { name: 'TV', value: truck.TV, label: 'TV' },
    { name: 'radio', value: truck.radio, label: 'Radio' },
    { name: 'refrigerator', value: truck.refrigerator, label: 'Refrigerator' },
    { name: 'microwave', value: truck.microwave, label: 'Microwave' },
    { name: 'gas', value: truck.gas, label: 'Gas' },
    { name: 'water', value: truck.water, label: 'Water' },
  ].filter((feature) => feature.value);

  return (
    <div className={style.container}>
      <div className={style.categories}>
        {featuresList.map((feature) => (
          <div key={feature.name} className={style.category}>
            <h3>{feature.label}</h3>
          </div>
        ))}
      </div>
      <div className={style.VehicleDetailsContainer}>
        <div className={style.VehicleDetailsTitle}>
          <h3>Vehicle details</h3>
        </div>
        <div className={style.VehicleDetailsLine}>
          <img src={line} alt="line" />
        </div>
        <div className={style.VehicleDetailsList}>
          <div className={style.VehicleDetailsListItem}>
            <h3>Form</h3>
            <p>{truck.form}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Length</h3>
            <p>{truck.length}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Width</h3>
            <p>{truck.width}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Height</h3>
            <p>{truck.height}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Tank</h3>
            <p>{truck.tank}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Consumption</h3>
            <p>{truck.consumption}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Transmission</h3>
            <p>{truck.transmission}</p>
          </div>
          <div className={style.VehicleDetailsListItem}>
            <h3>Engine</h3>
            <p>{truck.engine}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
