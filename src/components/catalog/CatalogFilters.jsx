import style from "./CatalogFilters.module.css"

const CatalogFilters = () => {
  
  return (
    <div className={style.container}>
      <div className={style.location}>
        <p>Location</p>

      </div>
      <div className={style.vehicleEquipment}>
        <h2>Vehicle equipment</h2>

      </div>
      <div className={style.vehicleType}>
        
      </div>
      <button className={style.searchButton}>Search</button>

    </div>
    
)
}

export default CatalogFilters;