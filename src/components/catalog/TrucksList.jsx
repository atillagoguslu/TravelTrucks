import style from "./TrucksList.module.css";
import Truck from "./Truck";
import { useSelector } from "react-redux";
import { selectDisplayedTrucks } from "../../redux/trucks/selectors";

const TrucksList = () => {
  const trucks = useSelector(selectDisplayedTrucks);
  return (
    <div className={style.container}>
      <div className={style.trucksList}>
        {trucks.map((truck) => (
          <Truck key={truck.id} truck={truck} />
        ))}
      </div>
    </div>
  );
};

export default TrucksList;