import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heroTitleContainer}>
        <h1 className={styles.heroTitle}>Campers of your dreams</h1>
        <p className={styles.heroDescription}>You can find everything you want in our catalog</p>
        <button className={styles.heroButton}>View Now</button>
      </div>
    </div>
  );
};
 
export default HomePage;